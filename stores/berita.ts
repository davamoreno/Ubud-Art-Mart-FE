import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Berita {
  id: number;
  title: string;
  deskripsi : string;
  image: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBeritaPayload {
  id: number;
  title: string;
  deskripsi : string;
  image: File | null;
}

export interface UpdateBeritaPayload {
  id: number;
  title: string;
  deskripsi : string;
  image: File | null;
}

interface PaginationMeta {
  current_page: number;
  last_page: number;
  links: { url: string | null; label: string; active: boolean }[];
  total: number;
}

export const useBeritaStore = defineStore('berita', () => {
  const stores = ref<Berita[]>([]);
  const store = ref<Berita | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const detail = ref<Berita[]>([]);
  const page = ref<number>();
  const meta = ref<PaginationMeta| null>(null);
  const per_page = ref<number>();

  const { $api } = useNuxtApp();

  const hasMore = computed(() => {
    if (!meta.value) return false;
    return meta.value.current_page < meta.value.last_page;
  });

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

  async function createStore(payload: CreateBeritaPayload): Promise<Berita | undefined> {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('deskripsi', payload.deskripsi);
    
    if (payload.image) {
      formData.append('image', payload.image); // ✅ HARUS File, bukan string
    }

    try {
      const response = await $fetch<{ data: Berita }>(`${apiBase}admin/berita`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`
          // ❌ JANGAN set Content-Type, biarkan browser yang handle!
        }
      });

      if (response.data) {
        stores.value.push(response.data);
      }
      return response.data;
    } catch (e) {
      error.value = e as Error;
      console.error('Failed to create store:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function getBerita(slug: string): Promise<void> {
  loading.value = true;
  error.value = null;

  try {
    const response = await $fetch<{ data: Berita }>(`${apiBase}berita/${slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`
      }
    });
    store.value = response.data;
    console.log('Berita detail fetched:', response.data);
  } catch (e) {
    error.value = e as Error;
    console.error('Failed to fetch berita detail:', e);
  } finally {
    loading.value = false;
  }
}

async function updateBeritaStore(payload: UpdateBeritaPayload, slug: String): Promise<Berita | undefined> {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('deskripsi', payload.deskripsi);
    
    if (payload.image) {
      formData.append('image', payload.image); // ✅ HARUS File, bukan string
    }

    try {
      const response = await $fetch<{ data: Berita }>(`${apiBase}admin/berita/${slug}`, {
        method: 'POST',
        params: {
          '_method' : 'PUT'
        },
        body: formData,
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`
          // ❌ JANGAN set Content-Type, biarkan browser yang handle!
        }
      });
      console.log(response.data)

      if (response.data?.data) {
        const index = stores.value.findIndex(item => item.id === response.data.id);
        if (index !== -1) {
          stores.value[index] = response.data; // ✅ update
        } else {
          stores.value.push(response.data); // fallback jika belum ada (opsional)
        }
      }
      return response.data;
    } catch (e) {
      error.value = e as Error;
      console.error('Failed to create store:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function deleteBerita(slug: string): Promise<void> {
    const beritaStore = useBeritaStore();
    loading.value = true;
    error.value = null;

    try {
      await $fetch(`${apiBase}admin/berita/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`
        }
      });
      stores.value = stores.value.filter(store => store.slug !== slug);
      beritaStore.store = null;
    } catch (e) {
      error.value = e as Error;
      console.error('Failed to delete berita:', e);
    } finally {
      loading.value = false;
    }
  }

  return {
    stores,
    store,
    loading,
    error,
    detail,
    page,
    meta,
    per_page,
    hasMore,
    fetchStores,
    createStore,
    getBerita,
    updateBeritaStore,
    deleteBerita,
  };
});
