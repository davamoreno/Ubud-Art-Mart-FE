<script setup lang="ts">
import { useBeritaStore } from '~/stores/berita';
import BeritaCard from '@/components/BeritaCard.vue';

const beritaStore = useBeritaStore();

await useAsyncData('berita-list', () => beritaStore.fetchStores());

import { storeToRefs } from 'pinia'
const { stores, loading } = storeToRefs(beritaStore)
</script>

<template>
  <div class="news-wrapper">
    <h2 class="section-title">Artikel Sorotan</h2>

    <div class="news-grid">
      <BeritaCard v-for="berita in stores" :key="berita.id" :title="berita.title" :image="berita?.image"
        :timestamp="berita.created_at" />
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
  font-size: 2rem; // diperbesar
  font-weight: 700; // bold
  margin-bottom: 2rem;
  color: #1a1a1a;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
</style>
