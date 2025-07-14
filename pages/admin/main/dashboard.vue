<script setup lang="ts">
import { ref, computed } from 'vue';
import { useKategoriStore } from '~/stores/kategori';
import { useTagStore } from '~/stores/tag';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';

definePageMeta({ layout: 'admin' });

const kategoriStore = useKategoriStore();
const tagStore = useTagStore();

const { list: kategoriList, loading: kategoriLoading, meta: kategoriMeta } = storeToRefs(kategoriStore);
const { list: tagList, loading: tagLoading, meta: tagMeta } = storeToRefs(tagStore);

const isLoading = computed(() => kategoriLoading.value || tagLoading.value);

const { error, refresh } = await useAsyncData(
  'kategori-dan-tag',
  () => Promise.all([
    kategoriStore.fetchKategori(1),
    tagStore.fetchTags(1)
  ]),
  { lazy: true }
);

const isSubmitting = ref(false);
const showItemModal = ref(false);
const modalMode = ref('STORE');
const modalType = ref('kategori');
const modalItem = ref<any>(null);

const modalTitle = computed(() => `${modalMode.value === 'STORE' ? 'Tambah' : 'Edit'} ${modalType.value === 'kategori' ? 'Kategori' : 'Tag'}`);
const modalPlaceholder = computed(() => `Nama ${modalType.value}`);
const modalItemName = computed(() => modalMode.value === 'UPDATE' ? modalItem.value?.nama : '');

function openModal(mode: string, type: string, item: any = null) {
  modalMode.value = mode;
  modalType.value = type;
  modalItem.value = item ? { ...item } : null;
  showItemModal.value = true;
}

function confirmDelete(item: any, type: string) {
  Swal.fire({
    title: 'Konfirmasi Hapus',
    text: `Anda yakin ingin menghapus "${item.nama}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete(item, type);
    }
  });
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

async function handleSave(newName: string) {
  const store = modalType.value === 'kategori' ? kategoriStore : tagStore;
  const payload = { nama: newName };
  const createAction = `create${capitalize(modalType.value)}`;
  const updateAction = `update${capitalize(modalType.value)}`;

  isSubmitting.value = true;
  try {
    if (modalMode.value === 'UPDATE' && modalItem.value) {
      await store[updateAction](modalItem.value.id, payload);
    } else {
      await store[createAction](payload);
    }
    showItemModal.value = false;
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Data berhasil disimpan!', showConfirmButton: false, timer: 3000 });
    
    // PERBAIKAN: Panggil refresh() setelah operasi berhasil.
    // Ini akan menjalankan ulang useAsyncData dan mengambil data terbaru untuk KEDUA tabel.
    await refresh();

  } catch (err: any) {
    Swal.fire('Error', err.data?.message || 'Operasi gagal.', 'error');
  } finally {
    isSubmitting.value = false;
  }
}

async function handleDelete(item: any, type: string) {
  const store = type === 'kategori' ? kategoriStore : tagStore;
  const deleteAction = `delete${capitalize(type)}`;

  isSubmitting.value = true;
  try {
    await store[deleteAction](item.id);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Data berhasil dihapus!', showConfirmButton: false, timer: 3000 });
    
    // PERBAIKAN: Panggil refresh() setelah operasi berhasil.
    await refresh();

  } catch (err: any) {
    Swal.fire('Error', err.data?.message || 'Operasi gagal.', 'error');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-8 py-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Manajemen Kategori & Tag</h1>

    <div v-if="isLoading && (!kategoriList.length || !tagList.length)" class="text-center text-gray-500">Memuat data...</div>
    <div v-else-if="error" class="text-center text-red-500">Gagal memuat data. Silakan refresh halaman.</div>

    <div v-else class="bg-white rounded-xl shadow p-6">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Tabel Kategori dengan Pagination -->
        <div class="flex-1 flex flex-col">
          <AdminCrudTable
            title="Daftar Kategori"
            :items="kategoriList"
            @add="openModal('STORE', 'kategori')"
            @edit="openModal('UPDATE', 'kategori', $event)"
            @delete="confirmDelete($event, 'kategori')"
          />
          <AdminPagination
            class="mt-auto"
            :meta="kategoriMeta"
            @change-page="kategoriStore.fetchKategori($event)"
          />
        </div>
        
        <!-- Tabel Tag dengan Pagination -->
        <div class="flex-1 flex flex-col">
          <AdminCrudTable
            title="Daftar Tag"
            :items="tagList"
            @add="openModal('STORE', 'tag')"
            @edit="openModal('UPDATE', 'tag', $event)"
            @delete="confirmDelete($event, 'tag')"
          />
          <AdminPagination
            class="mt-auto"
            :meta="tagMeta"
            @change-page="tagStore.fetchTags($event)"
          />
        </div>
      </div>
    </div>

    <!-- Modal untuk Tambah/Edit -->
    <ItemModal
      v-model="showItemModal"
      :title="modalTitle"
      :placeholder="modalPlaceholder"
      :initialValue="modalItemName"
      :isSubmitting="isSubmitting"
      @save="handleSave"
    />
  </div>
</template>