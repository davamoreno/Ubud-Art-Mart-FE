import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useNuxtApp } from '#imports';
import Slug from '~/pages/admin/main/news/[slug].vue';

// Interface sudah bagus, kita pertahankan
export interface Toko {
  id: number;
  nama: string;
  slug: string;
  deskripsi: string;
  telepon: string;
  image: string;
  link: string | null;
  status: string | null;
}

export interface UpsertTokoPayload {
  nama: string;
  deskripsi: string;
  telepon: string;
  link?: string;
  status?: string;
  image?: File | null;
}

export const useTokoStore = defineStore('toko', () => {
  const stores = ref<Toko[]>([]);
  const currentToko = ref<Toko | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<any>(null);

  // Ambil $api dari plugin untuk digunakan di semua actions
  const { $api } = useNuxtApp();

  // READ (Get All)
  async function fetchStores(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      // Gunakan $api, tidak perlu set header manual
      const response = await $api<{data: Toko[]}>('admin/toko');
      stores.value = response.data;
    } catch (e) {
      error.value = e;
      console.error('Failed to fetch stores:', e);
    } finally {
      loading.value = false;
    }
  }

  async function fetchStore(slug: string): Promise<Toko | undefined> {
    loading.value = true;
    error.value = null;
    try {
      const response = await $api<{data: Toko}>(`admin/toko/${slug}`);
      currentToko.value = response.data;
      return response.data;
    } catch (e) {
      error.value = e;
      console.error('Failed to fetch store:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }


  // CREATE
  async function createStore(payload: UpsertTokoPayload): Promise<Toko | undefined> {
    loading.value = true;
    error.value = null;
    const formData = new FormData();
    // Append semua data ke formData
    Object.entries(payload).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      const response = await $api<{data: Toko}>('admin/toko', {
        method: 'POST',
        body: formData,
      });
      return response.data;
    } catch (e) {
      error.value = e;
      console.error('Failed to create store:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // UPDATE
  async function updateStore(slug: string, payload: UpsertTokoPayload): Promise<Toko | undefined> {
    loading.value = true;
    error.value = null;
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    // PENTING: Karena HTML form tidak mendukung PUT/PATCH dengan multipart/form-data,
    // Laravel menggunakan trik `_method` untuk method spoofing.
    formData.append('_method', 'PUT');

    try {
      const response = await $api<{data: Toko}>(`admin/toko/${slug}`, {
        method: 'POST', // Method tetap POST, tapi Laravel akan membacanya sebagai PUT
        body: formData,
      });
      return response.data;
    } catch (e) {
      error.value = e;
      console.error('Failed to update store:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // DELETE
  async function deleteStore(slug : string): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      await $api(`admin/toko/${slug}`, {
        method: 'DELETE',
      });
    } catch (e) {
      error.value = e;
      console.error('Failed to delete store:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    stores,
    loading,
    error,
    fetchStores,
    fetchStore,
    createStore,
    updateStore,
    deleteStore,
  };
});