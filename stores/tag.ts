import { defineStore } from 'pinia';
import { ref } from 'vue';

// Definisikan interface-nya di sini agar bisa di-import di tempat lain
export interface Tag {
  id: number;
  nama: string;
}
interface PaginationMeta { links?: any[]; }

export const useTagStore = defineStore('tag', () => {
  const list = ref<Tag[]>([]);
  const loading = ref(false);
  const meta = ref<PaginationMeta>({});
  const { $api } = useNuxtApp();

  async function fetchTags(page: number) {
    loading.value = true;
    try {
      const response = await $api<{ data: Tag[], meta: PaginationMeta }>(`tag?page=${page}`);
      list.value = response.data;
      meta.value = response.meta;
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
    meta,  
    loading,
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
  };
});