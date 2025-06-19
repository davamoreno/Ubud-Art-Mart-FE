<template>
  <div class="news-wrapper">
    <h2 class="section-title">Berita & Acara</h2>

    <div class="news-grid">
      <BeritaCard
        v-for="i in 6"
        :key="i"
        title="Pasar Seni Ubud Kebakaran, Pedagang Akan Direlokasi"
        :image="imageSrc"
        timestamp="20 menit yang lalu"
      />
    </div>
  </div>
</template>

<script setup>
import BeritaCard from '@/components/BeritaCard.vue';
import imageSrc from '@/assets/images/contoh.png';
</script>

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
