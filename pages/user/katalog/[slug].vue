<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#imports';

// --- INTERFACES & TYPES ---
interface SimpleRelasi {
  id: number;
  nama: string;
}

interface Product {
  id: number;
  title: string;
  slug: string;
  deskripsi: string;
  detail: string;
  image: string;
  rating: number;
  reviews_count: number;
  toko: SimpleRelasi;
  kategori: SimpleRelasi;
  tags: SimpleRelasi[];
}

interface Review {
  id: number;
  rating: number;
  komentar: string;
  created_at: string;
  user: {
    name: string;
  };
}

// --- STATE MANAGEMENT ---
const route = useRoute();
const { $api } = useNuxtApp();

const slug = route.params.slug as string;
const activeTab = ref('deskripsi');
const showReviewModal = ref(false);

// State untuk form ulasan baru
const newReviewRating = ref(5);
const newReviewText = ref('');
const isSubmittingReview = ref(false);

// State untuk filter & sorting review
const reviewSort = ref<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
const selectedRatings = ref<number[]>([]);

// --- DATA FETCHING ---
// Mengambil data utama produk dan rekomendasi content-based
const { data: pageData, pending: isLoadingProduct, error: productError } = await useAsyncData(
  `product-${slug}`,
  async () => {
    const { data, rekomendasi } = await $api<{ data: Product, rekomendasi: Product[] }>(`produk/${slug}`);
    return { product: data, recommendations: rekomendasi };
  }
);

// Mengambil data review secara terpisah agar bisa di-refresh saat filter berubah
const { data: reviewsData, pending: isLoadingReviews, refresh: refreshReviews } = await useAsyncData(
  `reviews-${slug}`,
  () => {
    const params = new URLSearchParams();
    params.append('sort', reviewSort.value);
    selectedRatings.value.forEach(r => params.append('ratings[]', String(r)));
    return $api<{ data: Review[], meta: any }>(`produk/${slug}/reviews?${params.toString()}`);
  },
  { watch: [reviewSort, selectedRatings] } // Otomatis refresh saat filter berubah
);

// --- COMPUTED PROPERTIES ---
// Menghitung ringkasan rating untuk bar chart
const ratingSummary = computed(() => {
  const summary = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  if (reviewsData.value?.data) {
    reviewsData.value.data.forEach(review => {
      if (review.rating in summary) {
        summary[review.rating]++;
      }
    });
  }
  return summary;
});

const totalReviews = computed(() => reviewsData.value?.meta?.total || 0);

// --- METHODS ---
async function submitReview() {
  if (!pageData.value?.product) return;
  isSubmittingReview.value = true;
  try {
    // Panggil API untuk menyimpan review baru
    await $api(`customer/review/${pageData.value.product.id}`, {
      method: 'POST',
      body: {
        rating: newReviewRating.value,
        komentar: newReviewText.value,
      }
    });
    showReviewModal.value = false;
    newReviewRating.value = 5;
    newReviewText.value = '';
    await refreshReviews(); // Segarkan daftar review setelah berhasil
  } catch (error) {
    console.error("Gagal mengirim ulasan:", error);
    alert("Gagal mengirim ulasan. Silakan coba lagi.");
  } finally {
    isSubmittingReview.value = false;
  }
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Loading State -->
    <div v-if="isLoadingProduct" class="flex items-center justify-center h-screen">
      <p class="text-slate-500">Memuat detail produk...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="productError || !pageData" class="flex items-center justify-center h-screen">
      <div class="text-center bg-red-50 p-8 rounded-lg">
        <p class="text-red-600 font-semibold text-xl">Oops, Produk Tidak Ditemukan!</p>
        <p class="text-red-500 mt-2">Produk yang Anda cari tidak ada. Silakan kembali ke katalog.</p>
        <NuxtLink to="/katalog" class="mt-4 inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg">
          Kembali ke Katalog
        </NuxtLink>
      </div>
    </div>

    <!-- Konten Utama -->
    <div v-else>
      <!-- ===== Card Detail Produk ===== -->
      <section class="px-6 py-8 pt-28 md:pt-32 dark:bg-gray-900 transition-colors duration-300">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto">
          <!-- Gambar Produk -->
          <div class="md:w-1/2 flex justify-center items-center">
            <img :src="`http://localhost:8000/storage/${pageData.product.image}`" :alt="pageData.product.title" class="w-full max-w-md h-auto object-cover rounded-xl aspect-square" />
          </div>

          <!-- Informasi Produk -->
          <div class="md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ pageData.product.title }}</h2>
              <div class="flex items-center text-gray-600 dark:text-gray-300 mb-2 text-base">
                <span class="font-medium mr-1">{{ pageData.product.rating.toFixed(1) }}</span>
                <div class="flex items-center space-x-1 mr-2">
                  <svg v-for="i in 5" :key="'star-' + i" class="w-4 h-4" :class="i <= Math.round(pageData.product.rating) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                </div>
                <span>({{ pageData.product.reviews_count }} Ulasan)</span>
              </div>
              <p class="text-base text-gray-500 dark:text-gray-400 mb-4">{{ pageData.product.toko.nama }}</p>
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">{{ pageData.product.kategori.nama }}</span>
                <span v-for="tag in pageData.product.tags" :key="tag.id" class="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">{{ tag.nama }}</span>
              </div>
              <div class="mb-3">
                <div class="inline-flex gap-6 border-b border-gray-300 dark:border-gray-600">
                  <span @click="activeTab = 'deskripsi'" :class="activeTab === 'deskripsi' ? 'text-emerald-600 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600' : 'text-gray-500 dark:text-gray-400'" class="pb-2 cursor-pointer hover:text-emerald-600">Deskripsi</span>
                  <span @click="activeTab = 'detail'" :class="activeTab === 'detail' ? 'text-emerald-600 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600' : 'text-gray-500 dark:text-gray-400'" class="pb-2 cursor-pointer hover:text-emerald-600">Detail</span>
                </div>
              </div>
              <div class="text-base text-gray-700 dark:text-gray-300 leading-relaxed min-h-[x`6rem]">
                <p v-if="activeTab === 'deskripsi'">{{ pageData.product.deskripsi }}</p>
                <p v-if="activeTab === 'detail'">{{ pageData.product.detail }}</p>
              </div>
            </div>
            <div class="mt-6 flex gap-4">
              <a :href="`https://wa.me/62${pageData.product.toko?.telepon}?text=Halo, saya tertarik dengan produk ${pageData.product.title}`" target="_blank" class="w-full text-center bg-emerald-600 text-white text-base font-semibold px-6 py-3 rounded-full flex items-center justify-center hover:bg-emerald-700 transition">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.58-1.452L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.287.468-.009.439-1.564 5.679 5.844-1.611z"/></svg>
                Pesan Sekarang
              </a>
              <button @click="showReviewModal = true" class="w-full border border-emerald-600 text-emerald-600 text-base font-semibold px-6 py-3 rounded-full hover:bg-emerald-50 transition">
                Berikan Ulasan
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Modal Ulasan ===== -->
      <div v-if="showReviewModal" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h5 class="text-xl font-semibold">Ulasan Anda</h5>
            <button class="text-gray-400 hover:text-gray-700 text-2xl" @click="showReviewModal = false">&times;</button>
          </div>
          <p class="mb-3 text-gray-600">Berikan penilaian dan ulasan pada produk ini.</p>
          <div class="flex justify-center text-4xl mb-4">
            <span v-for="n in 5" :key="n" @click="newReviewRating = n" class="cursor-pointer" :class="newReviewRating >= n ? 'text-yellow-400' : 'text-gray-300'">★</span>
          </div>
          <div class="mb-4">
            <textarea v-model="newReviewText" class="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500" rows="5" placeholder="Tulis pengalaman Anda..."></textarea>
          </div>
          <button @click="submitReview" :disabled="isSubmittingReview" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400">
            {{ isSubmittingReview ? 'Mengirim...' : 'Kirim Ulasan' }}
          </button>
        </div>
      </div>

      <!-- ===== Bagian Ulasan Produk ===== -->
      <section class="px-6 py-10 dark:bg-gray-900 flex justify-center">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-5xl w-full space-y-6">
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Ulasan Produk</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
              <div class="flex flex-col space-y-2 w-full md:w-2/3">
                <div class="flex items-center gap-3" v-for="n in [5,4,3,2,1]" :key="n">
                  <div class="text-sm text-gray-600 w-7 text-right">{{ n }}</div>
                  <div class="flex gap-1">
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  </div>
                  <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div class="bg-yellow-400 h-2 rounded-full" :style="{ width: totalReviews > 0 ? `${(ratingSummary[n] / totalReviews) * 100}%` : '0%' }"></div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center w-full md:w-1/3 mt-4 md:mt-0 text-center">
                <div class="text-5xl font-bold text-gray-900">{{ pageData.product.rating.toFixed(1) }}</div>
                <div class="flex justify-center gap-1 mt-1">
                  <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= Math.round(pageData.product.rating) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                </div>
                <div class="text-sm text-gray-500 mt-1">{{ totalReviews }} Ulasan</div>
              </div>
            </div>
            <div class="md:col-span-1 bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-inner space-y-4">
              <div>
                <p class="text-sm font-semibold text-gray-700">Urutkan</p>
                <select v-model="reviewSort" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md">
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                  <option value="highest">Rating Tertinggi</option>
                  <option value="lowest">Rating Terendah</option>
                </select>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-700">Filter Rating</p>
                <div class="text-sm text-gray-600 space-y-1 mt-1">
                  <label v-for="n in [5,4,3,2,1]" :key="'rating-'+n" class="flex items-center gap-2">
                    <input type="checkbox" :value="n" v-model="selectedRatings" class="accent-emerald-600" />
                    <span>Bintang {{ n }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <hr class="border-t border-gray-200 my-4" />
          <div v-if="isLoadingReviews" class="text-center text-gray-500">Memuat ulasan...</div>
          <div v-else-if="reviewsData?.data.length > 0" class="space-y-4">
            <div v-for="review in reviewsData.data" :key="review.id" class="bg-white p-4 rounded-xl border border-gray-200 flex gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">{{ review.user.name.charAt(0) }}</div>
              <div class="flex-1">
                <div class="flex justify-between items-center mb-1">
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <span class="font-semibold text-gray-800">{{ review.user.name }}</span>
                    <span class="text-gray-500">• {{ new Date(review.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }}</span>
                  </div>
                  <div class="flex space-x-1">
                    <svg v-for="j in 5" :key="'star-'+j" class="w-4 h-4" :class="j <= review.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  </div>
                </div>
                <p class="text-base text-gray-800">{{ review.komentar }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-10 text-gray-500">Belum ada ulasan untuk filter ini.</div>
        </div>
      </section>

      <!-- ===== Rekomendasi Produk ===== -->
      <section class="px-6 py-10">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Rekomendasi Lainnya</h2>
        <div v-if="pageData.recommendations.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div v-for="reco in pageData.recommendations" :key="reco.id" class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <NuxtLink :to="`/user/katalog/${reco.slug}`">
              <div class="relative">
                <img :src="`http://localhost:8000/storage/${reco.image}`" :alt="reco.title" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105">
              </div>
              <div class="p-4">
                <h4 class="text-base font-semibold text-slate-800 truncate group-hover:text-emerald-600 transition-colors">{{ reco.title }}</h4>
                <p class="text-sm text-slate-500">{{ reco.toko.nama }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div v-else class="text-center py-10 text-gray-500">
          <p>Tidak ada rekomendasi lainnya saat ini.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
/* Impor Bootstrap Icons untuk ikon di modal (opsional) */
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css');
</style>