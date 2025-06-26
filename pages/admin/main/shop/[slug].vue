<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTokoStore } from '~/stores/toko';
import type { UpsertTokoPayload, Toko } from '~/stores/toko';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';

definePageMeta({
  layout: 'admin',
});

// --- SETUP AWAL ---
const route = useRoute();
const tokoStore = useTokoStore();
const { loading } = storeToRefs(tokoStore);
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

// Ambil ID dari URL
const tokoSlug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;

// --- FETCH DATA AWAL (SSR-FRIENDLY) ---
const { data: initialToko, error } = await useAsyncData(
  `toko-${tokoSlug}`,
  () => tokoStore.fetchStore(tokoSlug)
);

// Jika toko tidak ditemukan, tampilkan error dan hentikan eksekusi
if (error.value) {
  console.error("Gagal mengambil data toko:", error.value);
  // Redirect ke halaman 404 atau daftar toko dengan pesan error
  await navigateTo('/admin/main/toko', { replace: true });
}

// --- FORM STATE ---
// Buat form reaktif dan isi dengan data awal dari server
const form = reactive<UpsertTokoPayload>({
  nama: initialToko.value?.nama ?? '',
  deskripsi: initialToko.value?.deskripsi ?? '',
  telepon: initialToko.value?.telepon ?? '',
  link: initialToko.value?.link ?? '',
  status: initialToko.value?.status ?? 'active',
  image: undefined, // Mulai dengan kosong, hanya diisi jika ada file baru
});

const imagePreview = ref<string | null>(initialToko.value?.image ? `http://127.0.0.1:8000/storage/${initialToko.value.image}` : null);
const fileInput = ref<HTMLInputElement | null>(null);

// --- FUNGSI-FUNGSI ---
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file && file.type.startsWith('image/')) {
    form.image = file;
    imagePreview.value = URL.createObjectURL(file);
  } else if (file) {
    Swal.fire('File Salah', 'Silakan pilih file gambar (PNG, JPG).', 'warning');
  }
};

const handleUpdate = async () => {
  try {
    await tokoStore.updateStore(tokoSlug, form);
    await Swal.fire('Berhasil!', 'Data toko telah diperbarui.', 'success');
    await navigateTo('/admin/main/shop');
  } catch (err: any) {
    await Swal.fire('Gagal', err.data?.message || 'Gagal memperbarui toko.', 'error');
  }
};

const handleDelete = async () => {
  const result = await Swal.fire({
    title: 'Konfirmasi Hapus',
    text: `Anda yakin ingin menghapus toko "${initialToko.value?.nama}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  });

  if (result.isConfirmed) {
    try {
      await tokoStore.deleteStore(tokoSlug);
      await Swal.fire('Terhapus!', 'Toko telah berhasil dihapus.', 'success');
      await navigateTo('/admin/main/shop');
    } catch (err: any) {
      await Swal.fire('Gagal', err.data?.message || 'Gagal menghapus toko.', 'error');
    }
  }
};
</script>

<template>
  <div v-if="initialToko">
    <form @submit.prevent="handleUpdate">
      <div class="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-8 p-4 mt-5">
        
        <div class="w-full lg:w-1/3">
          <label class="block text-sm font-medium text-gray-700 mb-2">Foto Toko</label>
          <div class="relative w-full aspect-square group border-2 border-dashed rounded-lg flex items-center justify-center">
            <img v-if="imagePreview" :src="imagePreview" alt="Preview Toko" class="w-full h-full object-cover rounded-lg">
            <p v-else class="text-gray-400">Tidak ada gambar</p>
            <label class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              Ganti Gambar
              <input type="file" @change="handleImageUpload" class="hidden" />
            </label>
          </div>
        </div>

        <div class="w-full lg:w-2/3 border-2 rounded-lg p-6 space-y-4">
          <h1 class="font-semibold text-2xl mb-4">Edit Detail Toko</h1>
          
          <div>
            <label class="mb-1 text-sm text-gray-600 block">Status</label>
            <select v-model="form.status" class="w-full border rounded p-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="active">Aktif</option>
              <option value="inactive">Non-Aktif</option>
            </select>
          </div>

          <div>
            <label class="mb-1 text-sm text-gray-600 block">Nama Toko</label>
            <input type="text" v-model="form.nama" class="w-full border rounded p-2" required />
          </div>

          <div>
            <label class="mb-1 text-sm text-gray-600 block">No Telepon</label>
            <input type="text" v-model="form.telepon" class="w-full border rounded p-2" />
          </div>

          <div>
            <label class="mb-1 text-sm text-gray-600 block">Deskripsi Toko</label>
            <textarea v-model="form.deskripsi" class="w-full border rounded p-2 resize-y h-48" required></textarea>
          </div>

          <div class="flex justify-between items-center pt-4">
            <NuxtLink to="/admin/main/shop" class="px-6 py-2 rounded-lg border hover:bg-gray-100">
              Kembali
            </NuxtLink>
            <div class="flex gap-4">
              <button type="button" @click="handleDelete" :disabled="loading" class="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300">
                <span v-if="!loading">Hapus</span>
                <span v-else>Loading...</span>
              </button>
              <button type="submit" :disabled="loading" class="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-gray-800 disabled:bg-gray-400">
                <span v-if="!loading">Simpan Perubahan</span>
                <span v-else>Loading...</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    
    <div class="w-full max-w-7xl mx-auto px-4 mt-10 mb-20">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Daftar Produk di Toko Ini</h2>
      <div class="bg-white p-4 rounded-lg shadow-md border">
        <p class="text-gray-500">Fitur untuk menampilkan produk akan dibuat nanti.</p>
      </div>
    </div>
  </div>
  <div v-else class="text-center p-10">
    <p>Memuat data toko atau toko tidak ditemukan...</p>
  </div>
</template>