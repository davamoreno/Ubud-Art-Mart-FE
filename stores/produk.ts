import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useNuxtApp } from '#imports';

// --- INTERFACES BERDASARKAN JSON DARI POSTMAN ---
interface SimpleRelasi {
  id: number;
  nama: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  deskripsi: string;
  detail: string;
  image: string;
  toko: SimpleRelasi;
  kategori: SimpleRelasi;
  tags: SimpleRelasi[];
}

export interface UpsertProductPayload {
  title: string;
  deskripsi: string;
  detail: string;
  image?: File | null;
  toko_id: number | null;
  kategori_id: number | null;
  tags: number[]; // Kita akan kirim array of IDs untuk tags
}

export const useProductStore = defineStore('produk', () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<any>(null);

  const { $api } = useNuxtApp();

  // --- ACTIONS (CRUD) ---

  async function fetchProducts() {
    loading.value = true;
    error.value = null;
    try {
      const response = await $api<{ data: Product[] }>('produk');
      products.value = response.data;
    } catch (e) {
      error.value = e;
      console.error('Failed to fetch products:', e);
    } finally {
      loading.value = false;
    }
  }

   async function fetchProduct(slug: string | string[]) {
    loading.value = true;
    error.value = null;
    try {
      const response = await $api<{ data: Product }>(`produk/${slug}`);
      return response.data;
    } catch (e) {
      error.value = e;
      console.error(`Failed to fetch product ${slug}:`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function createProduct(payload: UpsertProductPayload) {
    loading.value = true;
    error.value = null;
    const formData = new FormData();

    // Append data ke FormData
    formData.append('title', payload.title);
    formData.append('deskripsi', payload.deskripsi);
    formData.append('detail', payload.detail);
    if (payload.toko_id) formData.append('toko_id', String(payload.toko_id));
    if (payload.kategori_id) formData.append('kategori_id', String(payload.kategori_id));
    if (payload.image) formData.append('image', payload.image);
    
    // Laravel seringkali lebih mudah menerima array dengan format seperti ini
    payload.tags.forEach(tagId => {
      formData.append('tags[]', String(tagId));
    });

    try {
      await $api('admin/produk', { method: 'POST', body: formData });
    } catch (e) {
      error.value = e;
      console.error('Failed to create product:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function updateProduct(slug: string, payload: UpsertProductPayload): Promise<Toko | undefined> {
    loading.value = true;
    error.value = null;
    const formData = new FormData();
    
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
      // PENTING: Karena HTML form tidak mendukung PUT/PATCH dengan multipart/form-data,
      // Laravel menggunakan trik `_method` untuk method spoofing.
      formData.append('_method', 'PUT');
  
      try {
        const response = await $api<{data: Toko}>(`admin/produk/${slug}`, {
          method: 'POST', // Method tetap POST, tapi Laravel akan membacanya sebagai PUT
          body: formData,
        });
        return response.data;
      } catch (e) {
        error.value = e;
        console.error('Failed to update Product:', e);
        throw e;
      } finally {
        loading.value = false;
      }
    }
  
    // DELETE
    async function deleteProduct(slug : string): Promise<void> {
      loading.value = true;
      error.value = null;
      try {
        await $api(`admin/produk/${slug}`, {
          method: 'DELETE',
        });
      } catch (e) {
        error.value = e;
        console.error('Failed to delete Product:', e);
        throw e;
      } finally {
        loading.value = false;
      }
    }
  
  // (Fungsi update dan delete bisa ditambahkan di sini dengan pola yang sama)

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct
  };
});