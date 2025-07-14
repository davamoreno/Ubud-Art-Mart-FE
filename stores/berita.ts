import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useNuxtApp, useCookie, navigateTo } from '#imports';

// Definisikan interface untuk struktur data yang konsisten
export interface Berita {
  id: number;
  title: string;
  deskripsi: string;
  image: string; // Tetap menggunakan 'image' sesuai permintaan
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBeritaPayload {
  title: string;
  deskripsi: string;
  image: File | null;
}

export interface UpdateBeritaPayload {
  title: string;
  deskripsi: string;
  image?: File | null; // Image bisa jadi opsional saat update
}

interface PaginationMeta {
  current_page: number;
  last_page: number;
  links: { url: string | null; label: string; active: boolean }[];
  total: number;
}

export const useBeritaStore = defineStore('berita', () => {
  // State
  const stores = ref<Berita[]>([]);
  const currentBerita = ref<Berita | null>(null);
  const meta = ref<PaginationMeta | null>(null);
  const loading = ref(false);
  const error = ref<any>(null);

  // Mengambil $api dari Nuxt plugin
  const { $api } = useNuxtApp();

  // Getters
  const hasMore = computed(() => {
    if (!meta.value) return false;
    return meta.value.current_page < meta.value.last_page;
  });

  // Actions
  async function fetchAllBerita(page: number = 1, perPage: number = 10) {
    loading.value = true;
    error.value = null;
    try {
      const response = await $api<{ data: Berita[], meta: PaginationMeta }>(`berita?page=${page}&per_page=${perPage}`);
      stores.value = response.data;
      meta.value = response.meta;
    } catch (e) {
      error.value = e;
      console.error('Gagal fetch berita:', e);
    } finally {
      loading.value = false;
    }
  }

   async function fetchStores(page: number, per_page : number): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api<{ data: Berita[], meta: PaginationMeta }>(`berita?page=${page}&per_page=${per_page}`);
         if (page === 1) {
        // Jika halaman pertama, ganti seluruh data.
        stores.value = response.data;
      } else {
        // Jika halaman berikutnya, tambahkan data baru ke akhir daftar.
        stores.value.push(...response.data);
      }
      meta.value = response.meta;
      console.log('Stores fetched:', stores.value);
    } catch (e) {
      error.value = e as Error;
      console.error('Failed to fetch stores:', e);
    } finally {
      loading.value = false;
    }
  }

  async function fetchBeritaBySlug(slug: string) {
    loading.value = true;
    error.value = null;
    try {
      const response = await $api<{ data: Berita }>(`berita/${slug}`);
      currentBerita.value = response.data;
    } catch (e) {
      error.value = e;
      console.error('Gagal fetch detail berita:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function createBerita(payload: CreateBeritaPayload) {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('deskripsi', payload.deskripsi);
    if (payload.image) {
      formData.append('image', payload.image);
    }

    try {
      // PERBAIKAN: Gunakan $api yang sudah otomatis melampirkan token
      await $api('admin/berita', {
        method: 'POST',
        body: formData,
      });
    } catch (e) {
      error.value = e;
      console.error('Gagal membuat berita:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function updateBerita(slug: string, payload: UpdateBeritaPayload) {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('deskripsi', payload.deskripsi);
    if (payload.image) {
      formData.append('image', payload.image);
    }
    // Trik untuk method spoofing di Laravel
    formData.append('_method', 'PUT');

    try {
      // PERBAIKAN: Gunakan $api
      await $api(`admin/berita/${slug}`, {
        method: 'POST', // Method tetap POST
        body: formData,
      });
    } catch (e) {
      error.value = e;
      console.error('Gagal mengupdate berita:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function deleteBerita(slug: string) {
    loading.value = true;
    error.value = null;
    try {
      // PERBAIKAN: Gunakan $api
      await $api(`admin/berita/${slug}`, { method: 'DELETE' });
      // Panggil fetch lagi untuk menyegarkan daftar
      await fetchAllBerita();
    } catch (e) {
      error.value = e;
      console.error('Gagal menghapus berita:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    stores,
    currentBerita,
    meta,
    loading,
    error,
    hasMore,
    fetchAllBerita,
    fetchBeritaBySlug,
    createBerita,
    fetchStores,
    updateBerita,
    deleteBerita,
  };
});
