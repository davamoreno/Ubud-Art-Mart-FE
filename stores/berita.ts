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
  image: File | null; // 🔥 PENTING: gunakan File, bukan string!
}

export const useBeritaStore = defineStore('berita', () => {
  const stores = ref<Berita[]>([]);
  const store = ref<Berita | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  async function fetchStores(): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<{ data: Berita[] }>('http://127.0.0.1:8000/api/admin/berita', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`
        }
      });
      stores.value = response.data;
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
      const response = await $fetch<{ data: Berita }>('http://127.0.0.1:8000/api/admin/berita', {
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
    const response = await $fetch<{ data: Berita[] }>(`http://127.0.0.1:8000/api/admin/berita/${slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`
      }
    });
    stores.value = response.data;
  } catch (e) {
    error.value = e as Error;
    console.error('Failed to fetch berita detail:', e);
  } finally {
    loading.value = false;
  }
}

  return {
    stores,
    store,
    loading,
    error,
    fetchStores,
    createStore,
    getBerita,
  };
});
