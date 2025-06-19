import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCookie } from '#app';

// 1. Definisikan Interface untuk Type-Safety
// Interface ini mendeskripsikan struktur objek Toko yang diterima dari API.
export interface Toko {
  id: number;
  name: string;
  lantai: string;
  nomor_toko: string;
  telepon: string;
  image: string; // Ini adalah URL string dari server
  link: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}

// Interface ini mendeskripsikan payload yang akan dikirim dari form.
// Perhatikan `image` bertipe `File | null`.
export interface CreateTokoPayload {
  name: string;
  lantai: string;
  nomor_toko: string;
  telepon: string;
  link: string;
  status: string;
  image: File | null;
}

// 2. Definisikan Store dengan TypeScript
export const useTokoStore = defineStore('toko', () => {
    
  // === STATE ===
  // Berikan tipe pada setiap state menggunakan generic (`< >`)
  const stores = ref<Toko[]>([]);
  const store = ref<Toko | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const nuxtApp = useNuxtApp();

  // === ACTIONS ===

  /**
   * Mengambil semua data toko dari API.
   */
  async function fetchStores(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      // Definisikan tipe respons yang diharapkan dari $fetch
      const response = await $fetch<{ data: Toko[] }>('http://127.0.0.1:8000/api/admin/toko', {
        method: 'GET',
        headers : {
            Authorization : `Bearer ${useCookie('token').value}`
        }
      });
      console.log('Token : ', useCookie('token').value)
      stores.value = response.data;
    } catch (e) {
      error.value = e as Error; // Type assertion untuk error
      console.error('Failed to fetch stores:', e);
    } finally {
      loading.value = false;
    }
  }

  /**
   * Membuat toko baru.
   * @param {CreateTokoPayload} payload - Data toko dari form yang sudah ter-validasi tipenya.
   * @returns {Promise<Toko | undefined>} Data toko yang baru dibuat.
   */
  async function createStore(payload: CreateTokoPayload): Promise<Toko | undefined> {
    loading.value = true;
    error.value = null;

    const formData = new FormData();

    // Loop melalui payload. TypeScript akan memastikan `key` adalah salah satu dari `CreateTokoPayload`.
    Object.keys(payload).forEach(key => {
      const value = payload[key as keyof CreateTokoPayload];
      if (value !== null && value !== undefined) {
        formData.append(key, value as string | Blob); // `image` akan di-append sebagai Blob (File)
      }
    });

    try {
      // Definisikan tipe respons yang diharapkan
      const response = await $fetch<{ data: Toko }>('http://127.0.0.1:8000/api/admin/toko', {
        method: 'POST',
        body: formData,
        headers : {
            Authorization : `Bearer ${useCookie('token').value}`
        }
      });

      if (response.data) {
        stores.value.push(response.data);
      }
      return response.data;

    } catch (e) {
      error.value = e as Error;
      console.error('Failed to create store:', e);
      throw e; // Lempar kembali error agar komponen bisa menanganinya
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