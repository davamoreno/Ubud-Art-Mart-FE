<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useBeritaStore } from '~/stores/berita';
import { computed } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id';

dayjs.extend(relativeTime);
dayjs.locale('id');

const route = useRoute();
const slug = route.params.slug;
const beritaStore = useBeritaStore();
const berita = computed(() => beritaStore.store);

onMounted(async () => {
    if (typeof slug === 'string') {
        beritaStore.getBerita(slug);
        if (beritaStore.store) {
            console.log('Data berhasil didapatkan:', beritaStore.store);
        } else {
            console.error('Gagal memuat data');
        }
    }
});

console.log(beritaStore?.store?.created_at)
const timeAgo = computed(() => {
    return dayjs(beritaStore?.store?.created_at).fromNow();
});


</script>
<template>
    <div class="container mx-auto px-[120px] pt-[113px] items-center h-full">
        <div>
            <h1 class=" font-semibold text-6xl">{{ berita?.title }}</h1>
            <div class="mt-[32px]">
                <button
                    class="w-[119px] h-[40px] outline-2 text-[#328E6E] border-2 rounded-md border-[#328E6E] shadow-md">
                    Berita
                </button>
            </div>
            <div class="mt-[32px] flex flex-row">
                <img src="/assets/images/profileadmin.svg" alt="" class="w-[50px] h-[50px]">
                <p class="text-base my-auto ms-[18px]">Admin</p>
                <img src="/assets/images/Ellipse_black.svg" alt="" class="ms-[18px]">
                <p class=" my-auto ms-[18px]">{{ timeAgo }}</p>

            </div>
            <div class="mt-[32px]">
                <img :src="berita?.image" alt="" class="w-full h-[600px] rounded-lg">
            </div>

            <div class="my-[71px]">
                <p>{{ berita?.deskripsi }}</p>
            </div>
        </div>
    </div>
</template>
