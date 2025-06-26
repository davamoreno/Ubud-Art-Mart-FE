<template>
  <div class="news-card">
    <img :src="image" class="card-img-top" alt="Berita Image" />
    <div class="card-body">
      <span class="custom-badge">Berita</span>
      <h6 class="card-title">{{ title }}</h6>
      <p class="timestamp">{{ timestamp }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  image: String,
  timestamp: String
});
</script>

<style scoped lang="scss">
.news-card {
  width: 100%;
  max-width: 400px;
  height: 415px;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease;
  flex-shrink: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  text-align: left;

  &:hover {
    transform: scale(1.01);
  }

  .card-img-top {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 12px;
  }

  .card-body {
    padding-top: 10px;
    width: 100%; // biar mengikuti kontainer parent
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .custom-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #2F8F60;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 6px;
    height: 40px;
    padding: 0 16px;
    margin-bottom: 12px;
  }

  .card-title {
    font-size: 1rem;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 8px;
  }

  .timestamp {
    font-size: 0.875rem;
    color: #6c757d;
    margin: 0;
  }
}
</style>
