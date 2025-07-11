<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTokoStore } from '~/stores/toko';
import type { UpsertTokoPayload } from '~/stores/toko';

// Meng-import Swal langsung sesuai permintaanmu
import Swal from 'sweetalert2'; 
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: 'admin',
});

const tokoStore = useTokoStore();
const { loading } = storeToRefs(tokoStore); // Ambil loading state secara reaktif

// Menggunakan reactive untuk form state dengan field yang sudah diperbarui
const form = reactive<UpsertTokoPayload>({
  nama: '',
  deskripsi: '',
  telepon: '',
  link: '',
  status: 'active',
  image: undefined,
});

const imagePreview = ref<string | null>(null);
// Template Ref untuk menghindari getElementById (Cara Vue yang Benar)
const fileInput = ref<HTMLInputElement | null>(null);

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file && file.type.startsWith('image/')) {
    form.image = file;
    imagePreview.value = URL.createObjectURL(file);
  } else if (file) {
    Swal.fire('File Salah', 'Silakan pilih file gambar (PNG, JPG).', 'warning');
    cancelImage();
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

const submitForm = async () => {
  try {
    await tokoStore.createStore(form);
    
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Toko baru telah berhasil ditambahkan.',
      confirmButtonColor: '#328E6E'
    });

    // Gunakan navigateTo bawaan Nuxt untuk redirect, bukan router.push
    await navigateTo('/admin/main/shop');

  } catch (error: any) {
    await Swal.fire({
      icon: 'error',
      title: 'Gagal Menambahkan Toko',
      text: error?.data?.message || 'Cek kembali data yang Anda masukkan!',
      confirmButtonColor: '#e3342f'
    });
  }
};
</script>

<template>
  <div class="container my-5 max-w-2xl mx-auto bg-white p-6 shadow-xl rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">Tambahkan Toko Baru</h2>
      <NuxtLink to="/admin/main/shop" class="text-sm text-blue-600 hover:underline">
        &larr; Kembali ke Daftar Toko
      </NuxtLink>
    </div>
    <p class="text-sm text-gray-500 mb-6">
      Lengkapi informasi toko lalu klik tambah untuk menyimpannya.
    </p>

    <form @submit.prevent="submitForm" class="space-y-4" :class="{ 'opacity-50 pointer-events-none': loading }">
      
      <div>
        <label for="nama" class="block text-sm font-medium text-gray-700">Nama Toko</label>
        <input id="nama" type="text" v-model="form.nama" class="w-full border rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500" placeholder="Cth: Toko Seni Abadi" required />
      </div>

      <div>
        <label for="deskripsi" class="block text-sm font-medium text-gray-700">Deskripsi</label>
        <textarea id="deskripsi" v-model="form.deskripsi" rows="4" class="w-full border rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500" placeholder="Cth: Menjual berbagai kerajinan patung dan ukiran khas Gianyar..." required></textarea>
      </div>
      
      <div>
        <label for="telepon" class="block text-sm font-medium text-gray-700">No Telepon</label>
        <input id="telepon" type="tel" v-model="form.telepon" class="w-full border rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500" placeholder="Cth: 081234567890" />
      </div>
      
      <div>
        <label for="link" class="block text-sm font-medium text-gray-700">Link Eksternal (Opsional)</label>
        <input id="link" type="url" v-model="form.link" class="w-full border rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500" placeholder="Cth: https://tokopedia.com/toko-seni" />
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
        <NuxtLink to="/admin/main/shop" class="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
          Batal
        </NuxtLink>
        <button type="submit" class="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 w-32 transition-colors disabled:bg-gray-400" :disabled="loading">
          <span v-if="!loading">Tambah</span>
          <span v-else>Loading...</span>
        </button>
      </div>
    </form>
  </div>
</template>