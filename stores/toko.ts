import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Toko {
  id: number;
  nama: string;
  lantai: string;
  nomor_toko: string;
  telepon: string;
  image: string;
  link: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTokoPayload {
  nama: string;
  lantai: string;
  nomor_toko: string;
  telepon: string;
  link: string;
  status: string;
  image: File | null;
}

export const useTokoStore = defineStore('toko', () => {
  const stores = ref<Toko[]>([]);
  const store = ref<Toko | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  async function fetchStores(): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<{data: Toko[],  meta: any, links: any }>(`${apiBase}admin/toko`, {
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

  async function createStore(payload: CreateTokoPayload): Promise<Toko | undefined> {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append('nama', payload.nama);
    formData.append('lantai', payload.lantai);
    formData.append('nomor_toko', payload.nomor_toko);
    formData.append('telepon', payload.telepon);
    formData.append('link', payload.link);
    formData.append('status', payload.status);
    
    if (payload.image) {
      formData.append('image', payload.image);
    }

    try {
      const response = await $fetch<{ success : boolean, data: Toko }>(`${apiBase}admin/toko`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`
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

  return {
    stores,
    store,
    loading,
    error,
    fetchStores,
    createStore,
  };
});
