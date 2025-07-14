<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useBeritaStore } from '~/stores/berita';
import type { CreateBeritaPayload } from '~/stores/berita';
import Swal from 'sweetalert2'

const beritaStore = useBeritaStore();
const router = useRouter();

definePageMeta({
  layout: 'admin',
});


const selectedImage = ref(null);
const imagePreview = ref<string | null>(null);
const tagDropdownOpen = ref(false);

const form = <CreateBeritaPayload>({
  title: '',
  deskripsi: '',
  image: null,
});

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file && file.type.startsWith('image/')) {
    form.image = file;
    imagePreview.value = URL.createObjectURL(file);
  } else {
    alert('File bukan gambar!');
    form.image = null;
    imagePreview.value = null;
    if (target) target.value = '';
  }
};

const cancelImage = () => {
  form.image = null;
  imagePreview.value = null;
  const fileInput = document.getElementById('file-input') as HTMLInputElement;
  if (fileInput) fileInput.value = '';
};

const submitForm = async () => {
  try {
    await beritaStore.createStore(form);
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil Menambahkan Berita!',
      confirmButtonColor: '#328E6E'
    })

    router.push("/admin/main/news")
  } catch (error: any) {
    // ❌ Tampilkan popup error
    await Swal.fire({
      icon: 'error',
      title: 'Gagal Menambahkan Berita',
      text: error?.data?.message || 'Cek kembali inputan kamu!',
      confirmButtonColor: '#e3342f'
    })
  }
}


</script>

<template>
  <div class="container my-5 max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Tambahkan Berita</h2>
    </div>

    <p class="text-sm text-gray-500 mb-4">
      Lengkapi informasi produk lalu klik tambah untuk menambahkannya.
    </p>
    <form @submit.prevent="submitForm" class="space-y-4"
      :class="{ 'opacity-50 pointer-events-none': beritaStore.loading }">
      <div class="space-y-4">
        <!-- Judul Berita -->
        <div>
          <label class="text-sm font-medium">Judul Berita</label>
          <input type="text" class="w-full border rounded p-2 mt-1" v-model="form.title"
            placeholder="Enter Text Here..." />
        </div>

        <!-- Deskripsi -->
          <div class="mb-6">
       <ClientOnly>
          <Editor
            v-model="form.deskripsi"
            label="Deskripsi Berita"
            placeholder="Tulis deskripsi lengkap di sini..."
          />
          <!-- Anda bisa menambahkan placeholder loading jika mau -->
          <template #fallback>
            <div class="h-[300px] w-full border rounded-md flex items-center justify-center bg-gray-100">
              <p class="text-gray-500">Memuat editor...</p>
            </div>
          </template>
        </ClientOnly>
      </div>

        <!-- Foto Berita -->
        <div>
          <label class="text-sm font-medium">Foto Berita</label>
          <div class="w-full border-dashed border-2 border-gray-300 rounded p-6 text-center mt-2 relative">
            <input id="file-input" type="file" accept="image/*" @change="handleImageUpload"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div class="text-gray-500">
              <img src="/assets/images/Vector.svg" class="mx-auto mb-2" height="24" />
              <span class="text-blue-600 cursor-pointer">Upload a file</span><br />
              <span class="text-sm text-gray-400">PNG, JPG, GIF up to 5MB</span>
            </div>
          </div>

          <!-- Preview -->
          <div v-if="imagePreview" class="relative mt-4 w-fit">
            <p class="text-sm text-gray-500 mb-2">Preview Gambar:</p>
            <img :src="imagePreview" alt="Preview" class="max-h-48 rounded border" />
            <button @click="cancelImage"
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 -translate-y-2 translate-x-2"
              title="Hapus Gambar">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="flex justify-end space-x-2 mt-4">
          <NuxtLink to="/admin/main/news"
            class="px-6 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">
            Batal
          </NuxtLink>
          <button class="px-6 py-2 rounded bg-black text-white hover:bg-gray-800">
            <span v-if="!beritaStore.loading">Tambah</span>
            <span v-else>Loading...</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
