<script setup>
import { ref, computed } from 'vue'

// Data kategori dan tag
const kategoriList = ref([
  { id: 1, nama: 'Fashion' },
  { id: 2, nama: 'Kerajinan' },
  { id: 3, nama: 'Lukisan' },
  { id: 4, nama: 'Patung' },
  { id: 5, nama: 'Dekorasi' },
  { id: 6, nama: 'Aksesoris' },
  { id: 7, nama: 'Kuliner' }
])
const tagList = ref([
  { id: 1, nama: 'Vintage' },
  { id: 2, nama: 'Anyaman' },
  { id: 3, nama: 'Modern' },
  { id: 4, nama: 'Bali' },
  { id: 5, nama: 'Alami' },
  { id: 6, nama: 'Trendy' }
])

// Modal dan pagination
const showCategoryModal = ref(false)
const showTagsModal = ref(false)
const itemsPerPage = 5

// Kategori pagination
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

// Edit & Hapus
const showEditModal = ref(false)
const isEditingCategory = ref(true)
const editItem = ref({ id: null, nama: '' })

const showDeleteConfirm = ref(false)
const deleteItem = ref({ id: null, nama: '', type: '' })

function openEditModal(item, type) {
  isEditingCategory.value = type === 'kategori'
  editItem.value = { ...item }
  showEditModal.value = true
}

function openDeleteConfirm(item, type) {
  deleteItem.value = { ...item, type }
  showDeleteConfirm.value = true
}

function editItemById() {
  const list = isEditingCategory.value ? kategoriList.value : tagList.value
  const index = list.findIndex(item => item.id === editItem.value.id)
  if (index !== -1) {
    list[index].nama = editItem.value.nama
  }
  showEditModal.value = false
}

function deleteItemById() {
  const list = deleteItem.value.type === 'kategori' ? kategoriList.value : tagList.value
  const index = list.findIndex(item => item.id === deleteItem.value.id)
  if (index !== -1) {
    list.splice(index, 1)
  }
  showDeleteConfirm.value = false
}
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
                      <button @click="openDeleteConfirm(kategori, 'kategori')" class="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Hapus</button>
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
                      <button @click="openDeleteConfirm(tag, 'tag')" class="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Hapus</button>
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
        id="categoryName"
        type="text"
        class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring"
        placeholder="Masukkan nama kategori"
      />
    </div>
    <div class="flex justify-end">
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Simpan
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
        id="categoryName"
        type="text"
        class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring"
        placeholder="Masukkan nama Tag"
      />
    </div>
    <div class="flex justify-end">
      
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Simpan
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
            <button @click="editItemById" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan</button>
          </div>
        </div>
      </div>
  
      <!-- MODAL: Hapus -->
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg w-full max-w-sm p-6 shadow-xl text-center">
          <h2 class="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
          <p class="mb-6 text-gray-600">Yakin ingin menghapus {{ deleteItem.type }} <strong>{{ deleteItem.nama }}</strong>?</p>
          <div class="flex justify-center gap-4">
            <button @click="showDeleteConfirm = false" class="px-4 py-2 bg-blue-500 text-white rounded">No</button>
            <button @click="deleteItemById" class="px-4 py-2 bg-red-600 text-white rounded">Yes</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
 

  