<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useProductStore, type UpsertProductPayload } from '~/stores/produk';
import { useTokoStore } from '~/stores/toko';
import { useKategoriStore } from '~/stores/kategori';
import { useTagStore } from '~/stores/tag';
import { storeToRefs } from 'pinia';
import { onClickOutside } from '@vueuse/core';
import Swal from 'sweetalert2';

definePageMeta({ layout: 'admin' });

// --- 1. SETUP & FETCH DATA UNTUK FORM ---
const productStore = useProductStore();

// Inisialisasi semua store yang dibutuhkan
const tokoStore = useTokoStore();
const kategoriStore = useKategoriStore();
const tagStore = useTagStore();

// Fetch data untuk dropdowns secara paralel
const { pending } = await useAsyncData('product-dependencies', () => Promise.all([
  tokoStore.fetchStores(),
  kategoriStore.fetchKategori(), // Memastikan nama action benar
  tagStore.fetchTags()           // Memastikan nama action benar
]));

// Ambil list dari masing-masing store menggunakan computed agar reaktif
const tokoList = computed(() => tokoStore.stores);
const kategoriList = computed(() => kategoriStore.list); // Nama state di store adalah 'list'
const allTags = computed(() => tagStore.list);          // Nama state di store adalah 'list'


// --- 2. FORM STATE & LOGIKA ---
const form = reactive<UpsertProductPayload>({
  title: '',
  deskripsi: '',
  detail: '',
  image: undefined,
  toko_id: null,
  kategori_id: null,
  tags: [],
});

const imagePreview = ref<string | null>(null);

// Dropdown Tags Logic
const dropdownRef = ref(null);
const tagDropdownOpen = ref(false);
onClickOutside(dropdownRef, () => tagDropdownOpen.value = false);

// Image Upload Logic
const fileInput = ref<HTMLInputElement | null>(null);

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file && file.type.startsWith('image/')) {
    form.image = file;
    imagePreview.value = URL.createObjectURL(file);
  } else if (file) {
    Swal.fire('File Salah', 'Silakan pilih file gambar (PNG, JPG).', 'warning');
    if (fileInput.value) fileInput.value.value = '';
  }
};

// Form Submission Logic
const submitForm = async () => {
  if (!form.title || !form.deskripsi || !form.toko_id || !form.kategori_id) {
    return Swal.fire('Data Tidak Lengkap', 'Mohon isi semua field yang wajib diisi.', 'error');
  }

  try {
    await productStore.createProduct(form);
    await Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Produk baru telah ditambahkan.' });
    await navigateTo('/admin/main/product');
  } catch (err: any) {
    await Swal.fire({ icon: 'error', title: 'Gagal Menambahkan Produk', text: err.data?.message || 'Cek kembali data yang Anda masukkan!' });
  }
};


const cancelImage = () => {
  form.image = undefined;
  imagePreview.value = null;
  // Reset input file melalui ref, bukan getElementById
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

</script>

<template>
  <div class="container my-5 max-w-2xl mx-auto bg-white p-6 shadow-xl rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Tambahkan Produk Baru</h2>
      <NuxtLink to="/admin/main/produk" class="text-sm text-blue-600 hover:underline">
        &larr; Kembali ke Daftar Produk
      </NuxtLink>
    </div>
    <p class="text-sm text-gray-500 mb-6">Lengkapi informasi produk lalu klik tambah untuk menyimpannya.</p>

    <div v-if="pending" class="text-center p-10 text-gray-500 animate-pulse">
      Memuat data Toko, Kategori, dan Tag...
    </div>
    <form v-else @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="text-sm font-medium">Nama Produk</label>
        <input type="text" v-model="form.title" class="w-full border rounded p-2 mt-1" required />
      </div>
      <div>
        <label class="text-sm font-medium">Deskripsi</label>
        <textarea v-model="form.deskripsi" class="w-full border rounded p-2 mt-1 h-24" required></textarea>
      </div>
      <div>
        <label class="text-sm font-medium">Detail Produk</label>
        <textarea v-model="form.detail" class="w-full border rounded p-2 mt-1 h-32"></textarea>
      </div>
      <div>
        <label class="text-sm font-medium">Toko</label>
        <select v-model="form.toko_id" class="w-full border rounded p-2 mt-1" required>
          <option :value="null" disabled>Pilih Toko</option>
          <option v-for="toko in tokoList" :key="toko.id" :value="toko.id">{{ toko.nama }}</option>
        </select>
      </div>
      <div>
        <label class="text-sm font-medium">Kategori</label>
        <select v-model="form.kategori_id" class="w-full border rounded p-2 mt-1" required>
          <option :value="null" disabled>Pilih Kategori</option>
          <option v-for="kategori in kategoriList" :key="kategori.id" :value="kategori.id">{{ kategori.nama }}</option>
        </select>
      </div>
      <div class="relative" ref="dropdownRef">
        <label class="text-sm font-medium">Tag</label>
        <div @click="tagDropdownOpen = !tagDropdownOpen" class="w-full border rounded p-2 mt-1 bg-white cursor-pointer flex justify-between items-center">
          <span class="text-gray-700 text-sm">{{ form.tags.length ? `${form.tags.length} tag terpilih` : 'Pilih Tag' }}</span>
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
        <div v-if="tagDropdownOpen" @click.stop class="absolute z-10 bg-white border mt-1 w-full rounded shadow-lg max-h-40 overflow-y-auto">
          <label v-for="tag in allTags" :key="tag.id" class="flex items-center p-2 hover:bg-gray-100 text-sm cursor-pointer">
            <input type="checkbox" :value="tag.id" v-model="form.tags" class="mr-2 h-4 w-4 rounded text-blue-600 focus:ring-blue-500" />
            {{ tag.nama }}
          </label>
        </div>
      </div>
    <div>
        <label class="block text-sm font-medium text-gray-700">Foto Toko</label>
        <div class="w-full border-dashed border-2 border-gray-300 rounded-lg p-6 text-center mt-2 relative">
          <input
            ref="fileInput"
            id="file-input"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload foto toko"
          />
          <div class="text-gray-500 pointer-events-none">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span class="font-semibold text-blue-600">Klik untuk upload file</span>
            <p class="text-xs text-gray-500">PNG, JPG, GIF hingga 10MB</p>
          </div>
        </div>
        <div v-if="imagePreview" class="relative mt-4 w-fit">
          <p class="text-sm text-gray-500 mb-2">Preview Gambar:</p>
          <img :src="imagePreview" alt="Preview Gambar Toko" class="max-h-48 rounded-lg border shadow-sm" />
          <button type="button" @click="cancelImage" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 shadow-md" title="Hapus Gambar">
            &times;
          </button>
        </div>
      </div>
      <div class="flex justify-end space-x-4 pt-4">
        <NuxtLink to="/admin/main/product" class="px-6 py-2 rounded-lg border hover:bg-gray-100">Batal</NuxtLink>
        <button type="submit" class="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 w-32 disabled:bg-gray-400" :disabled="productStore.loading">
          <span v-if="!productStore.loading">Tambah</span>
          <span v-else>Loading...</span>
        </button>
      </div>
    </form>
  </div>
</template>