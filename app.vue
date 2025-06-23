<script setup>
import { ref } from 'vue';

const { isLoading } = useLoadingState();
const nuxtApp = useNuxtApp();

const timer = ref(null);

nuxtApp.hook('page:start', () => {
  timer.value = setTimeout(() => {
    isLoading.value = true;
  }, 250);
});

nuxtApp.hook('page:finish', () => {
  clearTimeout(timer.value);
  
  isLoading.value = false;
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NuxtLayout />
    <GlobalLoading />
  </div>
</template>


<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.2s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(0.5rem);
  }
</style>