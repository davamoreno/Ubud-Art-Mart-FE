<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore, useTagStore, useKategoriStore } from '#imports';
import { storeToRefs } from 'pinia';
import { debounce } from 'lodash-es';

// --- Inisialisasi Store & Router ---
const productStore = useProductStore();
const kategoriStore = useKategoriStore();
const tagStore = useTagStore();
const route = useRoute();
const router = useRouter();

// Ambil state yang reaktif dari store
const { searchResults, loading, error, hasMoreSearchResults, searchMeta } = storeToRefs(productStore);
const { list: kategoriList } = storeToRefs(kategoriStore);
const { list: tagList } = storeToRefs(tagStore);

// --- State Lokal untuk Filter ---
const filters = ref({
  q: route.query.q || '',
  kategori: '',
  tags: Array.isArray(route.query.tags) ? route.query.tags.map(Number) : (route.query.tags ? [Number(route.query.tags)] : []),
  sort: route.query.sort || 'newest'
});

// --- Logika Pencarian ---
// Fungsi yang akan dipanggil untuk melakukan pencarian
const performSearch = () => {
  // Update URL dengan filter terbaru
  router.replace({ query: filters.value });
  // Panggil action dari store
  productStore.fetchSearchProducts(filters.value);
};

// Gunakan debounce untuk mencegah pemanggilan API berlebihan saat mengetik
const debouncedSearch = debounce(performSearch, 500);

// "Mata-mata" yang akan memanggil debouncedSearch setiap kali filter berubah
watch(filters, debouncedSearch, { deep: true });

// --- Data Awal & Infinite Scroll ---
const isLoadingMore = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

async function loadMore() {
  if (isLoadingMore.value || !hasMoreSearchResults.value || !searchMeta.value) return;
  isLoadingMore.value = true;
  await productStore.fetchSearchProducts({ ...filters.value, page: searchMeta.value.current_page + 1 }, true);
  isLoadingMore.value = false;
}

// Ambil data awal (kategori, tag, dan hasil pencarian pertama)
useAsyncData('search-initial-data', () => Promise.all([
  kategoriStore.fetchKategori(1),
  tagStore.fetchTags(1),
  productStore.fetchSearchProducts(filters.value)
]));

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => { if (entries[0].isIntersecting) loadMore(); },
    { rootMargin: '200px' }
  );
  if (loadMoreTrigger.value) observer.observe(loadMoreTrigger.value);
});

onUnmounted(() => {
  if (observer && loadMoreTrigger.value) observer.unobserve(loadMoreTrigger.value);
});

</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 md:px-8 py-16 md:py-24">
      <div class="flex flex-col md:flex-row gap-8">
        
        <!-- Sidebar Filter -->
        <aside class="w-full md:w-1/4 lg:w-1/5">
          <div class="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            <h3 class="text-lg font-semibold mb-4">Filter</h3>
            <!-- Filter Kategori -->
            <div class="mb-6">
            <h4 class="font-semibold mb-2">Kategori</h4>
            <select v-model="filters.kategori" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
              <option value="">Semua Kategori</option>
              
              <option v-for="kategori in kategoriList" :key="kategori.id" :value="kategori.id">
                {{ kategori.nama }}
              </option>
            </select>
            </div>
            <!-- Filter Tags -->
            <div>
              <h4 class="font-semibold mb-2">Tag</h4>
              <div class="space-y-2 max-h-60 overflow-y-auto">
                <label v-for="tag in tagList" :key="tag.id" class="flex items-center">
                  <input type="checkbox" :value="tag.id" v-model="filters.tags" class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500">
                  <span class="ml-3 text-sm text-gray-600">{{ tag.nama }}</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <!-- Konten Utama -->
        <main class="w-full md:w-3/4 lg:w-4/5">
          <!-- Search Bar & Sorting -->
          <div class="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <input
              v-model="filters.q"
              type="search"
              placeholder="Cari produk di sini..."
              class="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
            <select v-model="filters.sort" class="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
              <option value="highest">Rating Tertinggi</option>
              <option value="lowest">Rating Terendah</option>
            </select>
          </div>

          <!-- Hasil Pencarian -->
          <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             <div v-for="n in 9" :key="`skel-${n}`" class="bg-white rounded-2xl shadow-lg overflow-hidden"><div class="animate-pulse flex flex-col h-full"><div class="bg-gray-300 h-56 w-full"></div><div class="p-5 flex-1"><div class="h-5 bg-gray-300 rounded w-3/4 mb-3"></div><div class="h-4 bg-gray-300 rounded w-1/2"></div></div></div></div>
          </div>
          <div v-else-if="error" class="text-center py-20 text-red-500">Gagal memuat hasil pencarian.</div>
          <div v-else-if="searchResults.length > 0">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="product in searchResults" :key="product.id" class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <NuxtLink :to="`/produk/${product.slug}`">
                  <div class="relative"><img :src="`http://localhost:8000/storage/${product.image}`" :alt="product.title" class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"><div class="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-sm font-bold text-yellow-600"><svg class="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg><span>{{ product.rating.toFixed(1) }}</span></div></div>
                  <div class="p-5"><h4 class="text-lg font-semibold text-slate-800 truncate group-hover:text-emerald-600 transition-colors">{{ product.title }}</h4><p class="text-sm text-slate-500">{{ product.toko.nama }}</p></div>
                </NuxtLink>
              </div>
            </div>
            <div ref="loadMoreTrigger" class="h-20 flex items-center justify-center">
              <div v-if="isLoadingMore" class="text-center text-slate-500">Memuat lebih banyak...</div>
            </div>
          </div>
          <div v-else class="text-center py-20 text-gray-500">
            <p class="text-lg font-semibold">Tidak ada produk yang cocok.</p>
            <p>Coba ganti kata kunci atau filter Anda.</p>
          </div>
        </main>

      </div>
    </div>
  </div>
</template>