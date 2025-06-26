<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/stores/produk';
import type { Product } from '~/stores/produk';

definePageMeta({
  layout: 'admin'
});

const config = useRuntimeConfig();
const productStore = useProductStore();
const { $swal } = useNuxtApp();

const { products, loading: pending, error } = storeToRefs(productStore);

// Fetch data saat halaman dimuat (SSR-friendly)
const { refresh } = await useAsyncData(
  'products',
  () => productStore.fetchProducts(),
  { lazy: true }
);

// (Nanti fungsi delete bisa ditambahkan di sini)
</script>

<template>
  <div class="min-h-screen bg-[#F6F7FB] px-[50px] py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Katalog Produk</h1>
      <NuxtLink to="/admin/add/produk" class="border border-black text-black px-4 py-2 text-sm rounded-full hover:bg-black hover:text-white transition">
        Tambahkan Produk +
      </NuxtLink>
    </div>

    <div class="flex space-x-6 text-sm text-gray-500 mb-6">
      <button class="font-semibold text-black">Semua Produk</button>
      </div>

    <div v-if="pending && products.length === 0" class="text-center p-12 bg-white rounded-xl shadow">
      <p class="text-gray-500 animate-pulse">Memuat produk...</p>
    </div>

    <div v-else-if="error" class="text-center p-12 bg-white rounded-xl shadow">
      <p class="text-red-500">Gagal memuat produk.</p>
      <button @click="refresh" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Coba Lagi
      </button>
    </div>

    <div v-else class="bg-white rounded-xl shadow p-6 max-h-[600px] overflow-y-auto">
      <div v-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <NuxtLink
          v-for="product in products"
          :key="product.id"
          :to="`/admin/main/product/${product.slug}`"
          class="block bg-white rounded-xl shadow-sm border p-3 hover:shadow-lg transition hover:-translate-y-1"
        >
          <img
            :src="`http://localhost:8000/storage/${product.image}`"
            alt="Gambar Produk"
            class="w-full h-40 object-cover rounded-md mb-3"
          />
          <span class="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{{ product.kategori.nama }}</span>
          <h2 class="text-base font-semibold text-gray-800 truncate mt-2">{{ product.title }}</h2>
          <p class="text-sm font-medium text-gray-600">{{ product.toko.nama }}</p>
        </NuxtLink>
      </div>
      <div v-else class="flex flex-col items-center justify-center h-[500px]">
        <h3 class="text-xl font-semibold text-gray-700">Belum Ada Produk</h3>
        <p class="text-gray-500 mt-2">Mulai dengan menambahkan produk pertamamu.</p>
        <NuxtLink to="/admin/add/produk" class="mt-6 bg-black text-white px-5 py-2 text-sm rounded-full hover:bg-gray-800 transition">
          Tambahkan Produk
        </NuxtLink>
      </div>
    </div>
  </div>
</template>