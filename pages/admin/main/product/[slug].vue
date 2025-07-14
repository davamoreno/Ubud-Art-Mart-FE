<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useRoute, navigateTo } from '#imports';
import { useProductStore, type UpsertProductPayload } from '~/stores/produk';
import { useTokoStore } from '~/stores/toko';
import { useKategoriStore } from '~/stores/kategori';
import { useTagStore } from '~/stores/tag';
import { storeToRefs } from 'pinia';
import { onClickOutside } from '@vueuse/core';
import Swal from 'sweetalert2';

definePageMeta({
  layout: 'admin',
});

// --- 1. SETUP & FETCH DATA ---
const route = useRoute();
const productSlug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;

// Inisialisasi semua store yang dibutuhkan
const productStore = useProductStore();
const tokoStore = useTokoStore();
const kategoriStore = useKategoriStore();
const tagStore = useTagStore();

// Ambil state loading dari product store
const { loading: isSubmitting } = storeToRefs(productStore);

// Fetch data produk dan data untuk dropdown secara bersamaan
const { data, pending, error } = await useAsyncData(
  `product-edit-${productSlug}`,
  () => Promise.all([
    productStore.fetchProduct(productSlug), // Ambil detail produk
    tokoStore.fetchStores(),
    kategoriStore.fetchKategori(),
    tagStore.fetchTags(),
  ])
);

// Cek jika produk tidak ditemukan
if (error.value || !data.value?.[0]) {
  console.error("Gagal mengambil data produk:", error.value);
  await Swal.fire('Error', 'Data produk tidak ditemukan.', 'error');
  await navigateTo('/admin/main/product', { replace: true });
}

// Data dari hasil fetch
const initialProduct = ref(data?.value?.[0]);
const tokoList = computed(() => tokoStore.stores);
const kategoriList = computed(() => kategoriStore.list);
const allTags = computed(() => tagStore.list);

// --- 2. FORM STATE ---
const form = reactive<UpsertProductPayload>({
  title: initialProduct.value?.title ?? '',
  deskripsi: initialProduct.value?.deskripsi ?? '',
  detail: initialProduct.value?.detail ?? '',
  image: undefined,
  toko_id: initialProduct.value?.toko?.id ?? null,
  kategori_id: initialProduct.value?.kategori?.id ?? null,
  // --- PERBAIKAN TYPESCRIPT DI SINI ---
  tags: initialProduct.value?.tags.map((tag: Tag) => tag.id) ?? [],
});

const imagePreview = ref<string | null>(initialProduct.value?.image ? `http://localhost:8000/storage/${initialProduct.value.image}` : null);

// --- 3. LOGIKA INTERAKSI ---
const dropdownRef = ref(null);
const tagDropdownOpen = ref(false);
onClickOutside(dropdownRef, () => tagDropdownOpen.value = false);

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    form.image = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const handleUpdate = async () => {
  try {
    await productStore.updateProduct(initialProduct.value!.slug, form);
    await Swal.fire('Berhasil!', 'Data produk telah diperbarui.', 'success');
    await navigateTo('/admin/main/product');
  } catch (err: any) {
    await Swal.fire('Gagal', err.data?.message || 'Gagal memperbarui produk.', 'error');
  }
};

const handleDelete = async () => {
  const result = await Swal.fire({
    title: 'Konfirmasi Hapus',
    text: `Anda yakin ingin menghapus produk "${initialProduct.value?.title}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  });

  if (result.isConfirmed) {
    try {
      await productStore.deleteProduct(initialProduct.value!.slug);
      await Swal.fire('Terhapus!', 'Produk telah berhasil dihapus.', 'success');
      await navigateTo('/admin/main/product');
    } catch (err: any) {
      await Swal.fire('Gagal', err.data?.message || 'Gagal menghapus produk.', 'error');
    }
  }
};
</script>

<template>
  <div v-if="pending && !initialProduct" class="text-center p-10">Memuat data produk...</div>
  <div v-else-if="!initialProduct" class="text-center p-10 text-red-500">Gagal memuat data atau produk tidak ditemukan.
  </div>

  <form v-else @submit.prevent="handleUpdate">
    <div class="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-8 p-4 mt-5">

      <div class="w-full lg:w-1/3">
        <label class="block text-sm font-medium text-gray-700 mb-2">Foto Produk</label>
        <div
          class="relative w-full aspect-square group border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
          <img v-if="imagePreview" :src="imagePreview" alt="Preview Produk"
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
        <h1 class="font-semibold text-2xl mb-4">Edit Detail Produk</h1>

        <div>
          <label class="mb-1 text-sm text-gray-600 block">Nama Produk</label>
          <input type="text" v-model="form.title" class="w-full border rounded p-2" required />
        </div>
        <div>
          <label class="mb-1 text-sm text-gray-600 block">Deskripsi</label>
          <textarea v-model="form.deskripsi" class="w-full border rounded p-2 h-24" required></textarea>
        </div>
        <div>
          <label class="mb-1 text-sm text-gray-600 block">Detail Produk</label>
          <textarea v-model="form.detail" class="w-full border rounded p-2 h-32"></textarea>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="mb-1 text-sm text-gray-600 block">Toko</label>
            <select v-model="form.toko_id" class="w-full border rounded p-2" required>
              <option :value="null" disabled>Pilih Toko</option>
              <option v-for="toko in tokoList" :key="toko.id" :value="toko.id">{{ toko.nama }}</option>
            </select>
          </div>
          <div>
            <label class="mb-1 text-sm text-gray-600 block">Kategori</label>
            <select v-model="form.kategori_id" class="w-full border rounded p-2" required>
              <option :value="null" disabled>Pilih Kategori</option>
              <option v-for="kategori in kategoriList" :key="kategori.id" :value="kategori.id">{{ kategori.nama }}
              </option>
            </select>
          </div>
        </div>
        <div class="relative" ref="dropdownRef">
          <label class="mb-1 text-sm text-gray-600 block">Tag</label>
          <div @click="tagDropdownOpen = !tagDropdownOpen"
            class="w-full border rounded p-2 bg-white cursor-pointer flex justify-between items-center">
            <span class="text-gray-700 text-sm">{{ form.tags.length ? `${form.tags.length} tag terpilih` : 'Pilih Tag'
            }}</span>
          </div>
          <div v-if="tagDropdownOpen"
            class="absolute z-10 bg-white border mt-1 w-full rounded shadow-lg max-h-40 overflow-y-auto">
            <label v-for="tag in allTags" :key="tag.id"
              class="flex items-center p-2 hover:bg-gray-100 text-sm cursor-pointer">
              <input type="checkbox" :value="tag.id" v-model="form.tags" class="mr-2" />
              {{ tag.nama }}
            </label>
          </div>
        </div>

        <div class="flex justify-between items-center pt-4">
          <NuxtLink to="/admin/main/product" class="px-6 py-2 rounded-lg border hover:bg-gray-100">Kembali</NuxtLink>
          <div class="flex gap-4">
            <button type="button" @click="handleDelete" :disabled="isSubmitting"
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