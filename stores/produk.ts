import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useNuxtApp } from '#imports';

// --- INTERFACES & TYPES ---
// Mendefinisikan bentuk data agar kode kita lebih aman dan mudah dibaca

interface SimpleRelasi {
  id: number;
  nama: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  telepon: string; // Menambahkan telepon untuk kontak
  deskripsi: string;
  detail: string;
  image: string; // Menggunakan _url untuk konsistensi bahwa ini adalah URL
  rating: number;
  toko: SimpleRelasi; // Toko bisa memiliki telepon, tapi tidak wajib
  kategori: SimpleRelasi;
  tags: SimpleRelasi[];
}

// Tipe data untuk payload saat membuat atau mengupdate produk
export interface UpsertProductPayload {
  title: string;
  deskripsi: string;
  detail: string;
  telepon?: string; // Opsional, bisa diisi saat update
  image?: File | null;
  toko_id: number | null;
  kategori_id: number | null;
  tags: number[];
}

// Tipe data untuk filter dan sorting saat mengambil daftar produk
export interface FetchProductsPayload {
  page?: number;
  per_page?: number;
  sort?: 'newest' | 'oldest' | 'asc' | 'desc' | 'highest' | 'lowest';
  tags?: number[];
  kategori?: number;
  search?: string;
}

// --- PINIA STORE DEFINITION ---
export const useProductStore = defineStore('produk', () => {
  // --- STATE ---
  // Menggunakan ref untuk menyimpan state yang reaktif
  const products = ref<Product[]>([]);
  const pagination = ref<any>({}); // Untuk menyimpan meta pagination dari Laravel
  const loading = ref(false);
  const error = ref<any>(null);

  // Mengambil instance $api dari Nuxt
  const { $api } = useNuxtApp();

  // --- GETTERS (COMPUTED PROPERTIES) ---
  const hasMorePages = computed(() => {
    if (!pagination.value.current_page || !pagination.value.last_page) return false;
    return pagination.value.current_page < pagination.value.last_page;
  });

  // --- ACTIONS (METHODS) ---

  /**
   * Mengambil daftar produk dari API dengan dukungan filter, sorting, dan pagination.
   * @param {FetchProductsPayload} filters - Objek berisi parameter query
   */
  async function fetchProducts(filters: FetchProductsPayload = {}) {
    loading.value = true;
    error.value = null;

    // Membangun query string dari objek filter
    const params = new URLSearchParams();
    if (filters.page) params.append('page', String(filters.page));
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.search) params.append('search', filters.search);
    if (filters.kategori) params.append('kategori', String(filters.kategori));
    if (filters.tags && filters.tags.length > 0) {
      filters.tags.forEach(tagId => params.append('tags[]', String(tagId)));
    }
    
    try {
      // Menambahkan query string ke URL jika ada
      const response = await $api<{ data: Product[], meta: any }>(`produk?${params.toString()}`);
      
      // Jika ini halaman pertama, ganti seluruh data.
      // Jika bukan, tambahkan ke data yang sudah ada (untuk fitur "load more").
      if (filters.page && filters.page > 1) {
        products.value.push(...response.data);
      } else {
        products.value = response.data;
      }
      
      pagination.value = response.meta; // Simpan data pagination
    } catch (e) {
      error.value = e;
      console.error('Failed to fetch products:', e);
    } finally {
      loading.value = false;
    }
  }

  /**
   * Mengambil detail satu produk berdasarkan slug-nya.
   * Juga mengambil rekomendasi produk terkait.
   * @param {string} slug - Slug produk
   * @returns {Promise<{product: Product, recommendations: Product[]}|null>}
   */
  async function fetchProductWithRecommendations(slug: string) {
    loading.value = true;
    error.value = null;
    try {
      // API akan mengembalikan objek dengan key 'data' dan 'rekomendasi'
      const response = await $api<{ data: Product, rekomendasi: Product[] }>(`produk/${slug}`);
      return {
        product: response.data,
        recommendations: response.rekomendasi
      };
    } catch (e) {
      error.value = e;
      console.error(`Failed to fetch product ${slug}:`, e);
      throw e; // Lemparkan error agar bisa ditangani di halaman/komponen
    } finally {
      loading.value = false;
    }
  }

  /**
   * Membuat produk baru.
   * @param {UpsertProductPayload} payload - Data produk baru
   */
  async function createProduct(payload: UpsertProductPayload) {
    loading.value = true;
    error.value = null;
    const formData = new FormData();

    // Membangun FormData dari payload
    formData.append('title', payload.title);
    formData.append('deskripsi', payload.deskripsi);
    formData.append('telepon', payload.telepon || ''); // Tambahkan telepon jika ada
    formData.append('detail', payload.detail);
    if (payload.toko_id) formData.append('toko_id', String(payload.toko_id));
    if (payload.kategori_id) formData.append('kategori_id', String(payload.kategori_id));
    if (payload.image) formData.append('image', payload.image);
    payload.tags.forEach(tagId => formData.append('tags[]', String(tagId)));

    try {
      await $api('admin/produk', { method: 'POST', body: formData });
      // Setelah berhasil, panggil fetchProducts lagi untuk menyegarkan data
      await fetchProducts(); 
    } catch (e) {
      error.value = e;
      console.error('Failed to create product:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Mengupdate produk yang sudah ada.
   * @param {string} slug - Slug produk yang akan diupdate
   * @param {UpsertProductPayload} payload - Data baru
   */
  async function updateProduct(slug: string, payload: UpsertProductPayload) {
    loading.value = true;
    error.value = null;
    const formData = new FormData();

    // Membangun FormData dari payload
    Object.entries(payload).forEach(([key, value]) => {
      if (key === 'tags' && Array.isArray(value)) {
        value.forEach(tagId => formData.append('tags[]', String(tagId)));
      } else if (key !== 'image' && value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    });
    if (payload.image) {
      formData.append('image', payload.image);
    }
    // Trik untuk method spoofing di Laravel saat mengirim file
    formData.append('_method', 'PUT');
 
    try {
      await $api(`admin/produk/${slug}`, {
        method: 'POST', // Method tetap POST, tapi Laravel akan membacanya sebagai PUT
        body: formData,
      });
      // Setelah berhasil, segarkan data
      await fetchProducts(); 
    } catch (e) {
      error.value = e;
      console.error('Failed to update product:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }
 
  /**
   * Menghapus produk.
   * @param {string} slug - Slug produk yang akan dihapus
   */
  async function deleteProduct(slug: string) {
    loading.value = true;
    error.value = null;
    try {
      await $api(`admin/produk/${slug}`, { method: 'DELETE' });
      // Hapus produk dari state lokal agar UI langsung update tanpa perlu fetch ulang
      const index = products.value.findIndex(p => p.slug === slug);
      if (index !== -1) {
        products.value.splice(index, 1);
      }
    } catch (e) {
      error.value = e;
      console.error('Failed to delete product:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }
 
  // Kembalikan semua state dan action agar bisa digunakan di komponen
   return {
    products,
    pagination,
    loading,
    error,
    hasMorePages,
    fetchProducts,
    fetchProductWithRecommendations,
    createProduct,
    updateProduct,
    deleteProduct
  };
});