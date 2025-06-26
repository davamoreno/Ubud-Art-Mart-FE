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

  const { $api } = useNuxtApp();

  async function fetchKategori() {
    loading.value = true;
    try {
      const response = await $api<{ data: Kategori[] }>('admin/kategori');
      list.value = response.data;
    } catch (error) {
      console.error("Gagal fetch kategori:", error);
      throw error;
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
    fetchKategori,
    createKategori,
    updateKategori,
    deleteKategori,
  };
});