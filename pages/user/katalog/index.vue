<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useKategoriStore } from '#imports';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#imports';


const kategoriStore = useKategoriStore();

const { refresh } = await useAsyncData(
    'stores', // key unik untuk data ini
    () => kategoriStore.fetchKategori(1),
    { lazy: true }
);

const { list, loading: pending } = storeToRefs(kategoriStore);

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
const kategoriQuery = ref('');

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
                    <input type="text" name="" id="" v-model="searchQuery" placeholder="Cari di Katalog"
                        class="w-full h-full bg-transparent text-[#a8d4c5] placeholder:text-[#a8d4c5] focus:outline-none">
                </form>
            </div>
        </div>

        <div class="w-[1060px] h-[200px] mx-auto flex flex-wrap gap-5 overflow-y-hidden">


            <nuxt-link class=" mb-[133px] hover:scale-105 transition duration-300 ease-in-out" v-for="kategori in list"
                :key="kategori.id" :to="`/user/katalog/search?q=&kategori=${kategori.id}&sort=newest`">
                <div class="w-[150px] h-[150px] py-[8px] bg-white rounded-lg shadow-xl overflow-hidden">
                    <img src="/assets/images/Dashboard_1.svg" alt="Lukisan Bali" class="mx-auto w-[100px] h-[100px]">
                    <div class="p-[14px]">
                        <div>
                            <h2 class="text-center text-base font-semibold text-gray-800">{{ kategori.nama }}</h2>\
                        </div>
                    </div>
                </div>
            </nuxt-link>


        </div>

        <div class="flex justify-between mb-[32px]">
            <h1 class="text-2xl font-semibold">
                Kamu mungkin suka
            </h1>
            <p class="text-base font-semibold text-[#328E6E]">
                <a href="http://localhost:3000/user/katalog/search?q=&kategori=&sort=newest">Lihat semua</a>
            </p>
        </div>

        <div class="mx-auto mb-[133px] flex flex-wrap gap-10">
            <div v-for="product in data?.recommendations" :key="product?.id"
                class="mb-10 hover:scale-105 transition duration-300 ease-in-out">
                <NuxtLink :to="`/user/katalog/${product.slug}`" class="block">
                    <div class="w-[250px] h-[313px] bg-white rounded-lg shadow-xl overflow-hidden">
                        <img :src="`http://localhost:8000/storage/${product.image}`" alt="Lukisan Bali"
                            class="w-full h-[220px] object-cover">
                        <div class="p-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h2 class="text-lg font-semibold text-gray-800">{{ product.title }}</h2>
                                    <p class="text-sm text-gray-600">{{ product.toko.nama }}</p>
                                </div>


                                <div class="flex items-center mt-4">
                                    <img src="/assets/images/Star.svg" alt="" class="h-5 w-5">
                                    <span class="ml-1 mt-1 text-sm text-gray-700 font-medium">{{ product.rating
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>




</template>