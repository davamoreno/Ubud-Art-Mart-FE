<script setup>
import Swal from 'sweetalert2';
import { useKategoriStore } from '~/stores/kategori';
import { useTagStore } from '~/stores/tag';
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: 'admin',
});

const { $api } = useNuxtApp();
const kategoriStore = useKategoriStore();
const tagStore = useTagStore();


const { list: kategoriList, loading: kategoriLoading } = storeToRefs(kategoriStore);
const { list: tagList, loading: tagLoading } = storeToRefs(tagStore);

const isLoading = computed(() => kategoriLoading.value || tagLoading.value);

const { error, refresh } = await useAsyncData(
  'kategori-dan-tag',
  () => Promise.all([
    kategoriStore.fetchKategori(),
    tagStore.fetchTags()

  ]),
  { lazy: true }
);

const isSubmitting = ref(false);
const showItemModal = ref(false);
const modalMode = ref('STORE');
const modalType = ref('kategori');
const modalItem = ref(null);

const modalTitle = computed(() =>
  `${modalMode.value === 'STORE' ? 'Tambah' : 'Edit'} ${modalType.value === 'kategori' ? 'Kategori' : 'Tag'}`
);
const modalPlaceholder = computed(() =>
  `nama ${modalType.value}`
);
const modalItemName = computed(() =>
  modalMode.value === 'UPDATE' ? modalItem.value?.nama : ''
);

// --- LOGIC HANDLERS ---
function openModal(mode, type, item = null) {
  modalMode.value = mode;
  modalType.value = type;
  modalItem.value = item ? { ...item } : null;
  showItemModal.value = true;
}

function confirmDelete(item, type) {
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

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

async function handleSave(newName) {
  const store = modalType.value === 'kategori' ? kategoriStore : tagStore;
  const payload = { nama: newName };

  // Buat nama action secara dinamis
  const createAction = `create${capitalize(modalType.value)}`; // -> createKategori atau createTag
  const updateAction = `update${capitalize(modalType.value)}`; // -> updateKategori atau updateTag

  isSubmitting.value = true;
  try {
    if (modalMode.value === 'UPDATE') {
      // Panggil action secara dinamis menggunakan store[actionName]
      await store[updateAction](modalItem.value.id, payload);
    } else {
      await store[createAction](payload);
    }
    showItemModal.value = false;
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Data berhasil disimpan!', showConfirmButton: false, timer: 3000 });
    await refresh();
  } catch (err) {
    Swal.fire('Error', err.data?.message || 'Operasi gagal.', 'error');
  } finally {
    isSubmitting.value = false;
  }
}

async function handleDelete(item, type) {
  const store = type === 'kategori' ? kategoriStore : tagStore;

  // Buat nama action secara dinamis
  const deleteAction = `delete${capitalize(type)}`; // -> deleteKategori atau deleteTag

  isSubmitting.value = true;
  try {
    // Panggil action secara dinamis
    await store[deleteAction](item.id);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Data berhasil dihapus!', showConfirmButton: false, timer: 3000 });
    await refresh();
  } catch (err) {
    Swal.fire('Error', err.data?.message || 'Operasi gagal.', 'error');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#F6F7FB] px-[50px] py-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Manajemen Kategori & Tag</h1>

    <div v-if="isLoading" class="text-center text-gray-500">Memuat data...</div>

    <div v-else-if="error" class="text-center text-red-500">Gagal memuat data. Silakan refresh halaman.</div>

    <div v-else class="bg-white rounded-xl shadow p-6">
      <div class="flex flex-wrap gap-8">
        <AdminCrudTable title="Daftar Kategori" :items="kategoriList" @add="openModal('STORE', 'kategori')"
          @edit="openModal('UPDATE', 'kategori', $event)" @delete="confirmDelete($event, 'kategori')" />
        <AdminCrudTable title="Daftar Tag" :items="tagList" @add="openModal('STORE', 'tag')"
          @edit="openModal('UPDATE', 'tag', $event)" @delete="confirmDelete($event, 'tag')" />
      </div>
    </div>

    <ItemModal v-model="showItemModal" :title="modalTitle" :placeholder="modalPlaceholder" :initialValue="modalItemName"
      :isSubmitting="isSubmitting" @save="handleSave" />
  </div>
</template>