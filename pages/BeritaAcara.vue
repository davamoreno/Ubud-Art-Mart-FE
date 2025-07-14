<script setup lang="ts">
import { useBeritaStore } from '~/stores/berita';
import BeritaCard from '@/components/BeritaCard.vue'; // Asumsi BeritaCard ada di components
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const beritaStore = useBeritaStore();

// Ambil state dan getter yang reaktif dari store
const { stores: berita, loading, error, hasMore, meta } = storeToRefs(beritaStore);

const isLoadingMore = ref(false);

// Ambil data awal saat halaman dimuat di server
await useAsyncData('berita-list-initial', () => beritaStore.fetchStores(1, 6));

// Fungsi untuk memuat halaman berikutnya
async function loadMore() {
  if (!hasMore.value || !meta.value) return;

  isLoadingMore.value = true;
  // Ambil halaman berikutnya berdasarkan halaman saat ini
  await beritaStore.fetchStores(meta.value.current_page + 1, 6);
  isLoadingMore.value = false;
}
</script>

<template>
  <div class="news-wrapper">
    <h2 class="section-title">Artikel & Berita Sorotan</h2>

    <!-- Tampilkan Skeleton Loader saat loading awal -->
    <div v-if="loading && berita.length === 0" class="news-grid">
      <div v-for="n in 6" :key="`skel-${n}`" class="h-[415px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
    </div>

    <!-- Tampilkan pesan error jika ada -->
    <div v-else-if="error" class="text-center text-red-500">
      Gagal memuat berita. Silakan coba lagi nanti.
    </div>

    <!-- Tampilkan daftar berita jika ada -->
    <div v-else-if="berita.length > 0">
      <div class="news-grid">
        <BeritaCard
          v-for="item in berita"
          :key="item.id"
          :title="item.title"
          :image="item.image"
          :timestamp="item.created_at"
          :slug="item.slug"
        />
      </div>

      <!-- Tombol Load More -->
      <div v-if="hasMore" class="text-center mt-12">
        <button
          @click="loadMore"
          :disabled="isLoadingMore"
          class="bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-300 disabled:bg-gray-400"
        >
          {{ isLoadingMore ? 'Memuat...' : 'Lihat Lebih Banyak' }}
        </button>
      </div>
    </div>
    
    <!-- Tampilkan pesan jika tidak ada berita sama sekali -->
    <div v-else class="text-center text-gray-500">
      Belum ada berita yang tersedia.
    </div>
  </div>
</template>

<style scoped lang="scss">
.news-wrapper {
  max-width: 1224px;
  margin: 0 auto;
  padding: 50px 0;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1a1a1a;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px; /* Sedikit lebih besar untuk tampilan yang lebih lega */
}
</style>