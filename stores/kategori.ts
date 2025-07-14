import { defineStore } from 'pinia';
import { ref } from 'vue';

// Definisikan interface-nya di sini agar bisa di-import di tempat lain
export interface Kategori {
  id: number;
  nama: string;
}

export const useKategoriStore = defineStore('kategori', () => {
  const list = ref<Kategori[]>([]);
  const loading = ref(false);
  const meta = ref({});

  const { $api } = useNuxtApp();

  async function fetchKategori(page: number) { // <-- Terima parameter page
      loading.value = true;
      try {
        // Kirim parameter page ke API
        const response = await $api<{ data: Kategori[], meta: any }>(`kategori?page=${page}`);
        list.value = response.data;
        meta.value = response.meta; // <-- Simpan meta
      } catch (error) {
        // ...
      } finally {
        loading.value = false;
      }
   }

  async function fetchAllKategori() {
    // Mencegah fetch ulang jika data sudah ada
    if (list.value.length > 0) return;

    loading.value = true;
    try {
      // Panggil endpoint tanpa pagination untuk mendapatkan semua kategori
      const response = await $api<{ data: Kategori[] }>('kategori');
      list.value = response.data;
    } catch (error) {
      console.error("Gagal fetch semua kategori:", error);
    } finally {
      loading.value = false;
    }
  }



  async function createKategori(payload: { nama: string }) {
    try {
      await $api('admin/kategori', { method: 'POST', body: payload });
    } catch (error) {
      console.error("Gagal membuat kategori:", error);
      throw error;
    }
  }

  async function updateKategori(id: number, payload: { nama: string }) {
    try {
      await $api(`admin/kategori/${id}`, { method: 'PUT', body: payload });
    } catch (error) {
      console.error("Gagal update kategori:", error);
      throw error;
    }
  }

  async function deleteKategori(id: number) {
    try {
      await $api(`admin/kategori/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error("Gagal menghapus kategori:", error);
      throw error;
    }
  }

  return {
    list,
    loading,
    meta,
    fetchKategori,
    createKategori,
    fetchAllKategori,
    updateKategori,
    deleteKategori,
  };
});