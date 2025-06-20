<script setup lang="ts">
import { NuxtLink } from '#components';
import { onMounted } from 'vue';
import { useBeritaStore } from '~/stores/berita';

const beritaStore = useBeritaStore();

definePageMeta({
    layout: 'admin'
})

onMounted(() => {
    beritaStore.fetchStores();
});

</script>

<template>
    <form action="">
        <div class="flex flex-row w-[1340px] h-[752px] p-[30px] mt-[60px] mb-[357px] mx-auto border-2 rounded-lg"
            v-for="berita in beritaStore.detail">
            <div class="relative w-[550px] me-[50px] p-[25px] group border-2 rounded-lg hover:">
                <img src="/assets/images/contoh.png" alt="" class="w-full h-full">
                <label class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium rounded-lg
             opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div class="rounded-2xl border-2 p-[5px]">
                        <p>Pilih Gambar</p>
                        <input type="file" class="hidden" />
                    </div>
                </label>

            </div>

            <div class="w-[692px] my-[41px] border-2 rounded-lg p-[20px]">
                <div class="flex flex-row">
                    <div class="w-full">
                        <label class="mb-[8px] text-gray-500">Judul Berita</label>
                        <input type="text" :value="`${berita.title}`"
                            class="px-[16px] py-[12px] rounded-lg border-2 w-full mb-[14px] opacity-50">

                        <label class="mb-[8px] text-gray-500">Isi Berita</label>
                        <textarea
                            class="px-[16px] py-[12px] rounded-lg border-2 w-full mb-[14px] resize-none h-[380px] opacity-50"
                            :value="`${berita.deskripsi}`">
                    </textarea>

                    </div>
                </div>

                <div class="flex flex-row">
                    <NuxtLink to="/admin/main/news"
                        class="bg-transparent rounded-3xl px-[39px] py-[10px] border-2 me-auto shadow-sm opacity-50">
                        Kembali
                    </NuxtLink>
                    <button
                        class="bg-transparent rounded-3xl px-[39px] py-[10px] border-2 me-[14px] shadow-sm opacity-50">
                        Hapus
                    </button>
                    <button class="bg-transparent rounded-3xl px-[39px] py-[10px] border-2 shadow-sm opacity-50">
                        <span v-if="!beritaStore.loading">Simpan</span>
                        <span v-else>Loading...</span>
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>