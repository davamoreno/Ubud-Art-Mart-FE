<script setup lang="ts">
interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationMeta {
  links?: Link[];
}

const props = defineProps<{
  meta: PaginationMeta;
}>();

const emit = defineEmits(['change-page']);

function changePage(link: Link) {
  // Jangan lakukan apa-apa jika link tidak punya URL (misal: '...') atau sudah aktif
  if (!link.url || link.active) {
    return;
  }
  // Ambil nomor halaman dari URL string
  const pageNumber = new URL(link.url).searchParams.get('page');
  emit('change-page', Number(pageNumber));
}
</script>

<template>
  <nav v-if="meta && meta.links && meta.links.length > 3" class="flex justify-center mt-6">
    <div class="flex rounded-md shadow-sm">
      <button
        v-for="(link, index) in meta.links"
        :key="index"
        @click="changePage(link)"
        :disabled="!link.url || link.active"
        v-html="link.label"
        class="px-4 py-2 text-sm font-medium leading-5 transition-colors duration-150 border"
        :class="{
          'bg-emerald-600 border-emerald-600 text-white z-10': link.active,
          'bg-white border-gray-300 text-gray-700 hover:bg-gray-50': !link.active && link.url,
          'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed': !link.url,
          'rounded-l-md': index === 0,
          'rounded-r-md': index === meta.links.length - 1
        }"
      ></button>
    </div>
  </nav>
</template>