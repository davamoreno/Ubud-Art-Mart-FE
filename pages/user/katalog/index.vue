<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#imports';

// --- INTERFACES & TYPES ---
interface Category {
  id: number;
  nama: string;
  image: string; 
}

interface Product {
  id: number;
  title: string;
  slug: string;
  image: string;
  rating: number;
  toko: {
    nama: string;
  };
}

// --- STATE MANAGEMENT ---
const searchQuery = ref('');

// --- COMPOSABLES & HELPERS ---
const router = useRouter();
const { $api } = useNuxtApp();

// --- METHODS ---
function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push(`/user/katalog/search?q=${searchQuery.value.trim()}`);
  }
}

// --- DATA FETCHING (BEST PRACTICE DENGAN useAsyncData) ---
// useAsyncData akan mengambil data di server (untuk load pertama) atau di client (saat navigasi).
// Ini memastikan SEO dan performa UX yang optimal.
const { data, pending: loading, error } = await useAsyncData(
  'dashboard-data', // Kunci unik untuk data ini
  async () => {
    // Kita panggil kedua endpoint secara bersamaan untuk efisiensi
    const [categoryResponse, recommendationResponse] = await Promise.all([
      $api<{ data: Category[] }>('kategori'),
      $api<{ data: Product[] }>('dashboard/recommendations')
    ]);

    // Kembalikan objek yang berisi kedua hasil
    return {
      categories: categoryResponse.data,
      recommendations: recommendationResponse.data
    };
  }
);

</script>

<template>
    <div class="container mx-auto px-[50px] pt-[113px] items-center h-full">
        <h1 class="text-center text-3xl font-medium mb-5">
            Temukan keajaiban seni di setiap sudut
        </h1>
        <h1 class="text-center text-3xl font-medium mb-10">
            Pasar Kesenian Ubud
        </h1>
        <p class="text-center text-lg mb-5">
            Telurusi koleksi seni dan kerajinan dari para Seniman Ubud yang
        </p>
        <p class="text-center text-lg mb-5">
            mempersembahkan warisan budaya bali ke mata
            dunia
        </p>

        <div
            class="relative py-[5px] px-[10px] mb-[89px] mx-auto w-[740px] h-[50px] border border-slate-950 rounded-3xl">
            <div class="relative rounded-3xl w-[36px] h-[36px] bg-[#328E6E]">
                <img src="/assets/images/search.svg" alt="" class="absolute top-2 left-2">
            </div>
            <div class="absolute top-0 left-[60px] w-full h-full flex items-center">
                <form @submit.prevent="handleSearch" class="w-full h-full">
                    <input type="text" name="" id=""  v-model="searchQuery" placeholder="Cari di Katalog"
                        class="w-full h-full bg-transparent text-[#a8d4c5] placeholder:text-[#a8d4c5] focus:outline-none">
                </form>
            </div>
        </div>

        <div class="w-[1060px] mx-auto flex flex-row justify-between">

            <div v-if="loading" class="text-center py-20">
        <p class="text-slate-500">Memuat data...</p>
      </div>
      <div v-else-if="error" class="text-center py-20 bg-red-50 p-8 rounded-lg">
        <p class="text-red-600 font-semibold">Oops, terjadi kesalahan!</p>
        <p class="text-red-500 mt-2">Tidak dapat memuat data. Silakan coba lagi nanti.</p>
      </div>
      
      <!-- Tampilkan konten jika data berhasil dimuat -->
      <div v-else-if="data">
        <!-- Section 2: Kategori -->
        <section class="mb-20 md:mb-28">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-bold text-slate-800">Jelajahi Kategori</h3>
            <p class="text-slate-500 mt-2">Temukan karya seni berdasarkan jenisnya.</p>
          </div>
          <!-- PERBAIKAN: Gunakan v-for untuk menampilkan kategori dinamis -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            <NuxtLink
              v-for="category in data.categories"
              :key="category.id"
              :to="`/user/katalog/search?q=&kategori=${category.id}`"
              class="group flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <img :src="category.image || 'https://placehold.co/150x150/e5e7eb/333333?text=Icon'" :alt="category.nama" class="w-24 h-24 object-cover rounded-full mb-4 border-4 border-white group-hover:border-emerald-200 transition-colors duration-300">
              <span class="font-semibold text-slate-700">{{ category.nama }}</span>
            </NuxtLink>
          </div>
        </section>

        </div>
        </div>

        <div class="flex justify-between mb-[32px]">
            <h1 class="text-2xl font-semibold">
                Kamu mungkin suka
            </h1>
            <p class="text-base font-semibold text-[#a8d4c5]">
                <a href="">Lihat semua</a>
            </p>
        </div>

        <div class="mx-auto mb-[133px] flex flex-wrap gap-10">
            <div v-for="product in data?.recommendations" :key="product?.id" class="mb-10 hover:scale-105 transition duration-300 ease-in-out">
                <NuxtLink :to="`/user/katalog/${product.slug}`" class="block">
                    <div class="w-[250px] h-[313px] bg-white rounded-lg shadow-xl overflow-hidden">
                        <img :src="`http://localhost:8000/storage/${product.image}`" alt="Lukisan Bali" class="w-full h-[220px] object-cover">
                        <div class="p-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h2 class="text-lg font-semibold text-gray-800">{{ product.title }}</h2>
                                    <p class="text-sm text-gray-600">{{ product.toko.nama }}</p>
                                </div>


                                <div class="flex items-center mt-4">
                                    <img src="/assets/images/Star.svg" alt="" class="h-5 w-5">
                                    <span class="ml-1 mt-1 text-sm text-gray-700 font-medium">{{ product.rating }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>




</template>