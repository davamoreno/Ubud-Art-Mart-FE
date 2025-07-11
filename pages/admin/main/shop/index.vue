<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTokoStore } from '~/stores/toko';
import type { Toko } from '~/stores/toko';
import Swal from 'sweetalert2';

definePageMeta({
  layout: 'admin'
});

// Setup awal
const tokoStore = useTokoStore();
const config = useRuntimeConfig();

// Ambil state dari store dengan storeToRefs agar tetap reaktif
// Kita ganti nama 'loading' dari store menjadi 'pending' agar konsisten dengan `useAsyncData`
const { stores, loading: pending, error } = storeToRefs(tokoStore);

// --- INI PENGGANTI onMounted ---
// Menggunakan useAsyncData untuk fetch data di sisi server.
// Ini akan otomatis mengisi state `pending` dan `error` juga.
// Kita berikan 'lazy: true' agar tidak memblokir navigasi jika fetch-nya lama.
const { refresh } = await useAsyncData(
  'stores', // key unik untuk data ini
  () => tokoStore.fetchStores(),
  { lazy: true }
);

// Fungsi untuk menghapus toko
const confirmDelete = (toko: Toko) => {
  Swal.fire({
    title: 'Konfirmasi Hapus',
    text: `Anda yakin ingin menghapus toko "${toko.nama}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await tokoStore.deleteStore(toko.slug);
        Swal.fire({
          toast: true, position: 'top-end', icon: 'success',
          title: 'Toko berhasil dihapus!',
          showConfirmButton: false, timer: 3000
        });
        // Panggil refresh untuk mengambil ulang data terbaru dari server
        await refresh();
      } catch (e) {
        Swal.fire('Gagal', 'Gagal menghapus toko.', 'error');
      }
    }
  });
};
</script>

<template>
  <div class="min-h-screen bg-[#F6F7FB] px-[50px] py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Katalog Toko</h1>

      <div class="flex items-center space-x-4">
        <div class="relative">
          <input type="text" placeholder="Cari Toko"
            class="pl-10 pr-4 py-2 w-[400px] rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        </div>
        <NuxtLink to="/admin/add/toko"
          class="border border-black text-black px-4 py-2 text-sm rounded-full hover:bg-black hover:text-white transition whitespace-nowrap">
          Tambah Toko +
        </NuxtLink>
      </div>
    </div>

    <div v-if="pending" class="text-center p-12 bg-white rounded-xl shadow">
      <p class="text-gray-500 animate-pulse">Memuat data toko...</p>
    </div>

    <div v-else-if="error" class="text-center p-12 bg-white rounded-xl shadow">
      <p class="text-red-500">Terjadi kesalahan saat memuat data.</p>
      <button @click="refresh" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Coba Lagi
      </button>
    </div>

    <div v-else class="bg-white rounded-xl shadow p-6 min-h-[600px]">
      <div v-if="stores.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="toko in stores" :key="toko.id"
          class="block bg-white rounded-xl shadow-sm border p-3 group transition hover:shadow-lg hover:-translate-y-1">
          <img :src="`http://localhost:8000/storage/${toko.image}`" alt="Gambar Toko"
            class="w-full h-40 object-cover rounded-md mb-3" />
          <h2 class="text-base font-semibold text-gray-800 truncate">{{ toko.nama }}</h2>
          <p class="text-sm text-gray-500 line-clamp-2 h-10">
            {{ toko.deskripsi }}
          </p>
          <p class="text-sm text-gray-400 truncate mt-1">{{ toko.telepon }}</p>

          <div class="flex gap-2 pt-3 mt-2 border-t opacity-0 group-hover:opacity-100 transition-opacity">
            <NuxtLink :to="`/admin/main/shop/${toko.slug}`"
              class="flex-1 text-center px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">Edit
            </NuxtLink>
            <button @click="confirmDelete(toko)"
              class="flex-1 text-center px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Hapus</button>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center h-[500px] text-center">
        <svg class="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
        </svg>
        <h3 class="text-xl font-semibold text-gray-700">Belum Ada Data Toko</h3>
        <p class="text-gray-500 mt-2">Mulai dengan menambahkan toko pertamamu.</p>
        <NuxtLink to="/admin/add/toko"
          class="mt-6 border border-grey-100 text-black px-5 py-2 text-sm rounded-full hover:bg-gray-800 hover:text-white transition">
          Tambahkan Toko
        </NuxtLink>
      </div>
    </div>
  </div>
</template>