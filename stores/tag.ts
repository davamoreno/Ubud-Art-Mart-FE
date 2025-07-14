import { defineStore } from 'pinia';
import { ref } from 'vue';

// Definisikan interface-nya di sini agar bisa di-import di tempat lain
export interface Tag {
  id: number;
  nama: string;
}

export const useTagStore = defineStore('tag', () => {
  const list = ref<Tag[]>([]);
  const loading = ref(false);

  const { $api } = useNuxtApp();

  async function fetchTags() {
    loading.value = true;
    try {
      const response = await $api<{ data: Tag[] }>('tag');
      list.value = response.data;
    } catch (error) {
      console.error("Gagal fetch tag:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  }

  async function createTag(payload: { nama: string }) {
    try {
      await $api('admin/tag', { method: 'POST', body: payload });
    } catch (error) {
      console.error("Gagal membuat tag:", error);
      throw error;
    }
  }

  async function updateTag(id: number, payload: { nama: string }) {
    try {
      await $api(`admin/tag/${id}`, { method: 'PUT', body: payload });
    } catch (error) {
      console.error("Gagal update tag:", error);
      throw error;
    }
  }

  async function deleteTag(id: number) {
    try {
      await $api(`admin/tag/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error("Gagal menghapus tag:", error);
      throw error;
    }
  }

  return {
    list,
    loading,
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
  };
});