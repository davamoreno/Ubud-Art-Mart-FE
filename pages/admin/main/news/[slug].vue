<script setup lang="ts">
import { NuxtLink } from '#components';
import { onMounted, watch } from 'vue';
import { useBeritaStore } from '~/stores/berita';
import { useRoute, useRouter } from 'vue-router';
import type { UpdateBeritaPayload } from '~/stores/berita';
import { computed } from 'vue';


const router = useRouter();
const route = useRoute();
const slug = route.params.slug;

const beritaStore = useBeritaStore();
const berita = computed(() => beritaStore.store);
const imagePreview = ref<string | null>(null);
const deskripsiError = ref(false);
const titleError = ref(false);

const form = <UpdateBeritaPayload>({
    title: '',
    deskripsi: '',
    image: null,
});

definePageMeta({
    layout: 'admin'
})

onMounted(() => {
    if (typeof slug === 'string') {
        beritaStore.getBerita(slug);
    }

});

watch(
    () => berita.value,
    (newVal) => {
        if (newVal) {
            form.title = newVal.title;
            form.deskripsi = newVal.deskripsi;
            // image tidak perlu diset karena kita hanya isi kalau user upload baru
        }
    },
    { immediate: true }
);

const cancelImage = () => {
    form.image = null;
    imagePreview.value = null;
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
};

const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file && file.type.startsWith('image/')) {
        form.image = file;
        imagePreview.value = URL.createObjectURL(file);
    } else {
        alert('File bukan gambar!');
        form.image = null;
        imagePreview.value = null;
        if (target) target.value = '';
    }
};

function hideErrorMessage() {
    titleError.value = false;
    deskripsiError.value = false;
}

const submitForm = async () => {
    if (form.title.trim() === '' && form.deskripsi.trim() === '') {
        titleError.value = true;
        deskripsiError.value = true;
    } else if (form.deskripsi.trim() === '') {
        deskripsiError.value = true;
    }
    else if (form.title.trim() === '') {
        titleError.value = true;
    } else {
        titleError.value = false;
        deskripsiError.value = false;
        try {
            if (typeof slug === 'string') {
                const result = await beritaStore.updateBeritaStore(form, slug);
                alert('Berita berhasil diubah!');
                console.log('Update result:', result);
                router.push('/admin/main/news');
            }
        } catch (err) {
            alert('Gagal mengedit berita.');
            console.error("Submit error:", err);
        }
    }
};

</script>

<template>
    <form @submit.prevent="submitForm">
        <div class="flex flex-row w-[1340px] h-[752px] p-[30px] mt-[60px] mb-[357px] mx-auto border-2 rounded-lg"
            v-if="berita">

            <div v-if="imagePreview" class="w-[550px] me-[50px] p-[25px] group border-2 rounded-lg hover:">
                <img :src="berita?.image" alt="" class="w-full h-[400px]">
                <div v-if="imagePreview" class="relative mt-4 w-fit">
                    <p class="text-sm text-gray-500 mb-2">Preview Gambar:</p>
                    <img :src="imagePreview" alt="Preview" class="max-h-48 rounded border" />
                    <button @click="cancelImage"
                        class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 -translate-y-2 translate-x-2"
                        title="Hapus Gambar">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div v-else class="relative w-[550px] me-[50px] p-[25px] group border-2 rounded-lg hover:">
                <img :src="berita?.image" alt="" class="w-full h-[630px]">
                <label class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium rounded-lg
             opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div class="rounded-2xl border-2 p-[5px]">
                        <p>Pilih Gambar</p>
                        <input id="file-input" type="file" accept="image/*" @change="handleImageUpload"
                            class="hidden" />
                    </div>
                </label>

                <div v-if="imagePreview" class="relative mt-4 w-fit">
                    <p class="text-sm text-gray-500 mb-2">Preview Gambar:</p>
                    <img :src="imagePreview" alt="Preview" class="max-h-48 rounded border" />
                    <button @click="cancelImage"
                        class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 -translate-y-2 translate-x-2"
                        title="Hapus Gambar">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>


            <div :class="[
                'w-[692px] border-2 rounded-lg p-[20px]',
                titleError || deskripsiError ? 'my-[25px]' : 'my-[41px]'
            ]">
                <div class="flex flex-row">
                    <div class="w-full">
                        <label class="mb-[8px] text-gray-500">Judul Berita</label>
                        <input type="text" @input="hideErrorMessage"
                            class="px-[16px] py-[12px] rounded-lg border-2 w-full mb-[14px] opacity-50"
                            v-model="form.title">
                        <span v-if="titleError" class="text-red-500 mb-3">Judul tidak boleh kosong!</span><br>
                        <label class="mb-[8px] text-gray-500">Isi Berita</label>
                        <textarea
                            class="px-[16px] py-[12px] rounded-lg border-2 w-full mb-[14px] resize-none h-[380px] opacity-50"
                            @input="hideErrorMessage" v-model="form.deskripsi">
                    </textarea>
                        <span v-if="deskripsiError" class="text-red-500">Isi tidak boleh kosong!</span>

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
                        <span v-if="!berita?.loading">Simpan</span>
                        <span v-else>Loading...</span>
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>