<script setup lang="ts">
import { NuxtLink } from '#components';
import { ref, onMounted, watch } from 'vue';
import { useBeritaStore } from '~/stores/berita';
import { useRoute, useRouter } from 'vue-router';
import type { UpdateBeritaPayload } from '~/stores/berita';
import { computed } from 'vue';
import Swal from 'sweetalert2';

const store = computed(() => beritaStore.store);
const router = useRouter();
const route = useRoute();
const slug = route.params.slug;

const beritaStore = useBeritaStore();
const berita = computed(() => beritaStore.store);
const { loading: isSubmitting } = storeToRefs(beritaStore);
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
                await Swal.fire('Berhasil!', 'Berita berhasil diubah.', 'success');
                console.log('Update result:', result);
                router.push('/admin/main/news');
            }
        } catch (err) {
            await Swal.fire('Gagal!', 'Gagal mengedit berita', 'error');
            console.error("Submit error:", err);
        }
    }
};

async function deleteBerita(slug: string) {
    console.log(`Menghapus berita dengan slug: ${slug}`);
    if (!slug) {
        console.error('Slug tidak ditemukan!');
        return;
    }
    const result = await Swal.fire({
        title: 'Anda Yakin?',
        text: `Berita "${slug}" akan dihapus secara permanen!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
        try {
            await beritaStore.deleteBerita(slug);
            await Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
            router.push('/admin/main/news');
        } catch (err) {
            console.error('Gagal menghapus data:', err);
            await Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus.', 'error');
        }
    }


    const canShowDelete = computed(() => {
        return store.value && Object.keys(store.value).length > 0;
    });
}

</script>

<template>
    <form @submit.prevent="submitForm">

        <div class="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-8 p-4 mt-5" v-if="berita">

            <div class="w-full lg:w-1/3">
                <label class="block text-sm font-medium text-gray-700 mb-2">Foto Berita</label>
                <div
                    class="relative w-full aspect-square group border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
                    <img v-if="!imagePreview" :src="berita?.image" alt="Preview Produk"
                        class="w-full h-full object-cover rounded-lg">
                    <img v-else-if="imagePreview" :src="imagePreview" alt="Preview Produk"
                        class="w-full h-full object-cover rounded-lg">

                    <p v-else class="text-gray-400">Tidak ada gambar</p>
                    <label
                        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        Ganti Gambar
                        <input type="file" @change="handleImageUpload" class="hidden" accept="image/*" />
                    </label>
                </div>
            </div>

            <div class="w-full lg:w-2/3 border-2 rounded-lg p-6 space-y-4 bg-white">
                <h1 class="font-semibold text-2xl mb-4">Edit Detail Berita</h1>

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

                <div class="flex justify-between items-center pt-4">
                    <NuxtLink to="/admin/main/news" class="px-6 py-2 rounded-lg border hover:bg-gray-100">
                        Kembali
                    </NuxtLink>
                    <div class="flex gap-4">
                        <button type="button" @click="deleteBerita(berita?.slug)" :disabled="isSubmitting"
                            class="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300">
                            <span v-if="!isSubmitting">Hapus</span><span v-else>...</span>
                        </button>
                        <button type="submit" :disabled="isSubmitting"
                            class="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 disabled:bg-gray-400">
                            <span v-if="!isSubmitting">Simpan Perubahan</span><span v-else>Menyimpan...</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>