<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCookie } from '#app'
import { definePageMeta } from '#imports'
import Swal from 'sweetalert2';

definePageMeta({
  layout: 'admin',
});

// =================================================================
// LANGKAH 1: SETUP KONFIGURASI DAN DATA AWAL (SSR-FRIENDLY)
// =================================================================

// Ambil konfigurasi URL API dari nuxt.config
const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiBase

// Ambil token dari cookie
const token = useCookie('token').value
const { $api } = useNuxtApp()

// -- INI BAGIAN UTAMA PENGGANTI onMounted --
// Kita gunakan useAsyncData untuk mengambil kategori dan tag secara paralel di server
const { data, pending, error, refresh } = await useAsyncData(
  'kategori-dan-tag', // Key unik untuk data ini
  () => Promise.all([
    $fetch(`${apiBaseUrl}admin/kategori`, { headers: { Authorization: `Bearer ${token}` } }),
    $fetch(`${apiBaseUrl}admin/tag`, { headers: { Authorization: `Bearer ${token}` } })
  ])
)

// Setelah data didapat, kita pasang ke ref masing-masing
// `data.value[0]` adalah hasil dari fetch pertama (kategori)
// `data.value[1]` adalah hasil dari fetch kedua (tag)
const kategoriList = ref(data.value?.[0]?.data || [])
const tagList = ref(data.value?.[1]?.data || [])

// =================================================================
// LANGKAH 2: REFAKTOR FUNGSI CRUD (PRINSIP DRY)
// =================================================================

// State untuk modal, pagination, dan form
const showCategoryModal = ref(false)
const showTagsModal = ref(false)
const itemsPerPage = 10
const newItemName = ref('')
const isSubmitting = ref(false)
const showEditModal = ref(false)
const editItem = ref({ id: null, nama: '' })
const showDeleteConfirm = ref(false)
const deletedItem = ref({ id: null, nama: '' })
const isEditingCategory = ref(true)
const isDeletingCategory = ref(true)

// Fungsi generik untuk CRUD. Kita tidak perlu lagi if/else di setiap fungsi
async function handleCrud(action, type, payload = {}) {
  let endpoint = `${apiBaseUrl}admin/${type}`;
  let method;
  let body;
  const itemId = payload.id || editItem.value.id;

  // Logika switch yang hilang, sekarang kita kembalikan
  switch (action) {
    case 'STORE':
      method = 'POST';
      body = { nama: newItemName.value };
      if (!body.nama.trim()) return Swal.fire('Error', 'Nama tidak boleh kosong', 'error');
      break;
    case 'UPDATE':
      method = 'PUT';
      endpoint += `/${itemId}`;
      body = { nama: editItem.value.nama };
      if (!body.nama.trim()) return Swal.fire('Error', 'Nama tidak boleh kosong', 'error');
      break;
    case 'DELETE':
      method = 'DELETE';
      endpoint += `/${itemId}`;
      if (type === 'kategori') {
            const index = kategoriList.value.findIndex(item => Number(item.id) === Number(itemId));
            if (index !== -1) kategoriList.value.splice(index, 1);
        } else {
            const index = tagList.value.findIndex(item => Number(item.id) === Number(itemId));
            if (index !== -1) tagList.value.splice(index, 1);
        }
      break;
    default:
      return; // Aksi tidak dikenal
  }
  
  isSubmitting.value = true;
  try {
    // Gunakan $api, bukan $fetch
    const response = $fetch(endpoint, { method, body, headers: { Authorization: `Bearer ${token}` } });

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: response.message || `Data berhasil diproses!`,
      showConfirmButton: false,
      timer: 3000
    });

    // Panggil refresh() untuk sinkronisasi data dengan server cara termudah
    await refresh();

    // Tutup modal yang relevan
    if (action === 'STORE') {
        if (type === 'kategori') showCategoryModal.value = false; else showTagsModal.value = false;
        newItemName.value = '';
    }
    if (action === 'UPDATE') {
        showEditModal.value = false;
        editItem.value = { id: null, nama: '' };
    }

  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Operasi Gagal',
      text: err.data?.message || 'Terjadi kesalahan pada server.',
    });
    console.error(`Gagal ${action} ${type}:`, err);
  } finally {
    isSubmitting.value = false;
  }
}


function openEditModal(item, type) {
  isEditingCategory.value = type === 'kategori'
  editItem.value = { ...item }
  showEditModal.value = true
}

function confirmDelete(item, type) {
  Swal.fire({
    title: 'Anda Yakin?',
    text: `Data "${item.nama}" akan dihapus secara permanen!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      handleCrud('DELETE', type, item)
    }
  })
}


const currentPageKategori = ref(1)
const totalPagesKategori = computed(() => Math.ceil(kategoriList.value.length / itemsPerPage))
const paginatedKategori = computed(() =>
  kategoriList.value.slice((currentPageKategori.value - 1) * itemsPerPage, currentPageKategori.value * itemsPerPage)
)

// Tag pagination
const currentPageTag = ref(1)
const totalPagesTag = computed(() => Math.ceil(tagList.value.length / itemsPerPage))
const paginatedTag = computed(() =>
  tagList.value.slice((currentPageTag.value - 1) * itemsPerPage, currentPageTag.value * itemsPerPage)
)
// Di template-mu, panggil handleCrud
// contoh: @click="handleCrud('STORE', 'kategori')"
// contoh: @click="handleCrud('UPDATE', isEditingCategory ? 'kategori' : 'tag')"
// contoh: @click="handleCrud('DELETE', isDeletingCategory ? 'kategori' : 'tag')"
</script>

<template>
    <div class="min-h-screen bg-[#F6F7FB] px-[50px] py-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
  
      <div class="bg-white rounded-xl shadow p-6">
        <div class="flex flex-wrap gap-8 mb-10">
          <!-- KATEGORI -->
          <div class="flex-1 min-w-[300px]">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold">Daftar Kategori</h2>
              <button @click="showCategoryModal = true"
                class="border border-black text-black px-4 py-2 text-sm rounded-full hover:bg-black hover:text-white transition">
                Tambahkan Kategori +
              </button>
            </div>
  
            <table class="w-full text-left border border-gray-200 mb-3">
              <thead class="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th class="p-3 border-b">No</th>
                  <th class="p-3 border-b">Nama Kategori</th>
                  <th class="p-3 border-b">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(kategori, index) in paginatedKategori" :key="kategori.id" class="hover:bg-gray-50 text-sm">
                  <td class="p-3 border-b">{{ (currentPageKategori - 1) * itemsPerPage + index + 1 }}</td>
                  <td class="p-3 border-b">{{ kategori.nama }}</td>
                  <td class="p-3 border-b">
                    <div class="flex gap-2">
                      <button @click="openEditModal(kategori, 'kategori')" class="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">Edit</button>
                      <button @click="confirmDelete(kategori, 'kategori')" class="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Hapus</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
  
            <div class="flex justify-center gap-2 text-sm">
              <button :disabled="currentPageKategori === 1" @click="currentPageKategori--" class="px-2 py-1 border rounded disabled:opacity-50">Sebelumnya</button>
              <span v-for="n in totalPagesKategori" :key="n" @click="currentPageKategori = n"
                class="px-2 py-1 border rounded cursor-pointer"
                :class="{ 'bg-black text-white': currentPageKategori === n }">{{ n }}</span>
              <button :disabled="currentPageKategori === totalPagesKategori" @click="currentPageKategori++" class="px-2 py-1 border rounded disabled:opacity-50">Berikutnya</button>
            </div>
          </div>
  
          <!-- TAGS -->
          <div class="flex-1 min-w-[300px]">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold">Daftar Tags</h2>
              <button @click="showTagsModal = true"
                class="border border-black text-black px-4 py-2 text-sm rounded-full hover:bg-black hover:text-white transition">
                Tambahkan Tags +
              </button>
            </div>
  
            <table class="w-full text-left border border-gray-200 mb-3">
              <thead class="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th class="p-3 border-b">No</th>
                  <th class="p-3 border-b">Nama Tag</th>
                  <th class="p-3 border-b">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tag, index) in paginatedTag" :key="tag.id" class="hover:bg-gray-50 text-sm">
                  <td class="p-3 border-b">{{ (currentPageTag - 1) * itemsPerPage + index + 1 }}</td>
                  <td class="p-3 border-b">{{ tag.nama }}</td>
                  <td class="p-3 border-b">
                    <div class="flex gap-2">
                      <button @click="openEditModal(tag, 'tag')" class="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">Edit</button>
                      <button @click="confirmDelete(tag, 'tag')" class="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Hapus</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
  
            <div class="flex justify-center gap-2 text-sm">
              <button :disabled="currentPageTag === 1" @click="currentPageTag--" class="px-2 py-1 border rounded disabled:opacity-50">Sebelumnya</button>
              <span v-for="n in totalPagesTag" :key="n" @click="currentPageTag = n"
                class="px-2 py-1 border rounded cursor-pointer"
                :class="{ 'bg-black text-white': currentPageTag === n }">{{ n }}</span>
              <button :disabled="currentPageTag === totalPagesTag" @click="currentPageTag++" class="px-2 py-1 border rounded disabled:opacity-50">Berikutnya</button>
            </div>
          </div>
        </div>
      </div>
  
      

  <!-- MODAL: Tambah Kategori -->
  <div v-if="showCategoryModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Tambah Kategori</h2>
      <button @click="showCategoryModal = false" class="text-gray-500 hover:text-black text-xl">&times;</button>
    </div>
    <div class="mb-4">

      <input
        v-model="newItemName"
        type="text"
        class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring"
        placeholder="Masukkan nama kategori"
      />
          
      <button
        :disabled="isSubmitting"
        @click="handleCrud('STORE', 'kategori')"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {{ isSubmitting ? 'Menyimpan...' : 'Simpan' }}
      </button>

    </div>
  </div>
</div>


<!-- MODAL: Tambah Tags -->
<div v-if="showTagsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Tambah Tag</h2>
      <button @click="showTagsModal = false" class="text-gray-500 hover:text-black text-xl">&times;</button>
    </div>
    <div class="mb-4">
  
      <input
        v-model="newItemName"
        type="text"
        class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring"
        placeholder="Masukkan nama tag"
      />
          
      <button
        :disabled="isSubmitting"
        @click="handleCrud('STORE', 'tag')"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {{ isSubmitting ? 'Menyimpan...' : 'Simpan' }}
      </button>

    </div>
  </div>
</div>

      <!-- MODAL: Edit -->
      <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Edit {{ isEditingCategory ? 'Kategori' : 'Tag' }}</h2>
            <button @click="showEditModal = false" class="text-gray-500 hover:text-black text-xl">&times;</button>
          </div>
          <input v-model="editItem.nama" type="text" class="w-full border px-4 py-2 rounded-lg mb-4" />
          <div class="flex justify-end">
            <button @click="handleCrud('UPDATE', isEditingCategory ? 'kategori' : 'tag')" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan</button>
          </div>
        </div>
      </div>
  
      <!-- MODAL: Hapus -->
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg w-full max-w-sm p-6 shadow-xl text-center">
          <h2 class="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
          <p class="mb-6 text-gray-600">Yakin ingin menghapus {{ deletedItem.id }} <strong>{{ deletedItem.nama }}</strong>?</p>
          <div class="flex justify-center gap-4">
            <button @click="showDeleteConfirm = false" class="px-4 py-2 bg-blue-500 text-white rounded">No</button>
            <button :disabled="isSubmitting" @click="handleCrud('DELETE', isDeletingCategory ? 'kategori' : 'tag')" class="px-4 py-2 bg-red-600 text-white rounded">
              {{ isSubmitting ? 'Menghapus...' : 'Yes' }}
            </button>

          </div>
        </div>
      </div>
    </div>
  </template>
  
 

  