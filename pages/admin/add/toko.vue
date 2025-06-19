<script setup lang="ts"> // <-- Tambahkan lang="ts" di sini
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useTokoStore } from '~/stores/toko';
// Impor tipe/interface dari store untuk digunakan di komponen
import type { CreateTokoPayload } from '~/stores/toko';

// --- Setup Store dan Router ---
const tokoStore = useTokoStore();
const router = useRouter();

definePageMeta({
  layout: 'admin',
});


// --- State Lokal untuk Form ---
// Berikan tipe pada objek reactive kita menggunakan interface yang sudah dibuat.
// Ini akan memberikan autocomplete dan pengecekan tipe pada `form`.
const form = reactive<CreateTokoPayload>({
  name: '',
  lantai: '',
  nomor_toko: '',
  telepon: '',
  link: '',
  status: 'active',
  image: null,
});

const imagePreview = ref<string | null>(null);

// --- Fungsi dan Handler ---
// Tipe `event` di sini akan di-infer secara otomatis oleh TypeScript
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0]; // Optional chaining untuk keamanan

  if (file && file.type.startsWith('image/')) {
    form.image = file;
    imagePreview.value = URL.createObjectURL(file);
  } else {
    alert('File yang diunggah bukan gambar!');
    form.image = null;
    imagePreview.value = null;
    if (target) {
      target.value = '';
    }
  }
};

const cancelImage = () => {
  form.image = null;
  imagePreview.value = null;
  const fileInput = document.getElementById('file-input') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
};

const submitForm = async () => {
  try {
    await tokoStore.createStore(form);
    alert('Toko berhasil ditambahkan!');
    router.push('/admin/main/dashboard'); 
  } catch (err) {
    alert('Gagal menambahkan toko. Silakan coba lagi.');
    console.error("Submit error:", err);
  }
};
</script>

<template>
  <div class="container my-5 max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Tambahkan Toko Baru</h2>
    </div>
    <p class="text-sm text-gray-500 mb-4">
      Lengkapi informasi toko lalu klik tambah untuk menyimpannya.
    </p>

    <form @submit.prevent="submitForm" class="space-y-4" :class="{ 'opacity-50 pointer-events-none': tokoStore.loading }">
      
      <div>
        <label for="name" class="text-sm font-medium">Nama Toko</label>
        <input id="name" type="text" v-model="form.name" class="w-full border rounded p-2 mt-1" placeholder="Cth: Toko Abhi" required />
      </div>

      <div>
        <label for="lantai" class="text-sm font-medium">Lantai</label>
        <input id="lantai" type="text" v-model="form.lantai" class="w-full border rounded p-2 mt-1" placeholder="Cth: Lantai 1" required />
      </div>

      <div>
        <label for="nomor_toko" class="text-sm font-medium">Nomor Toko</label>
        <input id="nomor_toko" type="text" v-model="form.nomor_toko" class="w-full border rounded p-2 mt-1" placeholder="Cth: A-10" required />
      </div>
      
      <div>
        <label for="telepon" class="text-sm font-medium">No Telepon</label>
        <input id="telepon" type="tel" v-model="form.telepon" class="w-full border rounded p-2 mt-1" placeholder="Cth: 081234567890" />
      </div>

      <div>
        <label class="text-sm font-medium">Foto Toko</label>
        <div class="w-full border-dashed border-2 border-gray-300 rounded p-6 text-center mt-2 relative">
          <input
            id="file-input"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload foto toko"
          />
          <div class="text-gray-500 pointer-events-none">
            <svg class="mx-auto mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="gray"/></svg>
            <span class="text-blue-600">Upload file</span><br />
            <span class="text-sm text-gray-400">PNG, JPG, GIF hingga 5MB</span>
          </div>
        </div>
        <div v-if="imagePreview" class="relative mt-4 w-fit">
          <p class="text-sm text-gray-500 mb-2">Preview Gambar:</p>
          <img :src="imagePreview" alt="Preview Gambar Toko" class="max-h-48 rounded border" />
          <button type="button" @click="cancelImage" class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 -translate-y-2 translate-x-2" title="Hapus Gambar">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      <div class="flex justify-end space-x-2 pt-4">
        <NuxtLink to="/admin/main/toko" class="px-6 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">
          Batal
        </NuxtLink>
        <button type="submit" class="px-6 py-2 rounded bg-black text-white hover:bg-gray-800 w-28" :disabled="tokoStore.loading">
          <span v-if="!tokoStore.loading">Tambah</span>
          <span v-else>Loading...</span>
        </button>
      </div>
    </form>
  </div>
</template>