<template>
  <div class="flex-1 min-w-[400px]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <button @click="$emit('add')"
        class="border border-black text-black px-4 py-2 text-sm rounded-full hover:bg-black hover:text-white transition">
        Tambahkan {{ titleSingular }} +
      </button>
    </div>

    <table class="w-full text-left border border-gray-200 mb-3">
      <thead class="bg-gray-100 text-gray-700 text-sm">
        <tr>
          <th class="p-3 border-b w-16">No</th>
          <th class="p-3 border-b">Nama {{ titleSingular }}</th>
          <th class="p-3 border-b w-32">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedItems" :key="item.id" class="hover:bg-gray-50 text-sm">
          <td class="p-3 border-b">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td class="p-3 border-b">{{ item.nama }}</td>
          <td class="p-3 border-b">
            <div class="flex gap-2">
              <button @click="$emit('edit', item)" class="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">Edit</button>
              <button @click="$emit('delete', item)" class="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Hapus</button>
            </div>
          </td>
        </tr>
        <tr v-if="items.length === 0">
          <td colspan="3" class="text-center p-4 text-gray-500">Tidak ada data.</td>
        </tr>
      </tbody>
    </table>

    <div v-if="totalPages > 1" class="flex justify-center gap-2 text-sm">
      <button :disabled="currentPage === 1" @click="currentPage--" class="px-3 py-1 border rounded disabled:opacity-50">Sebelumnya</button>
      <span v-for="n in totalPages" :key="n" @click="currentPage = n"
        class="px-3 py-1 border rounded cursor-pointer"
        :class="{ 'bg-black text-white': currentPage === n }">{{ n }}</span>
      <button :disabled="currentPage === totalPages" @click="currentPage++" class="px-3 py-1 border rounded disabled:opacity-50">Berikutnya</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Komponen ini menerima props dari parent (dashboard.vue)
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});

// Komponen ini memberitahu parent jika ada aksi (klik tombol)
const emit = defineEmits(['add', 'edit', 'delete']);

// Logika pagination sekarang ada di dalam komponen ini, jadi tidak duplikat
const itemsPerPage = 10;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage));
const paginatedItems = computed(() =>
  props.items.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
);

// Menurunkan judul plural ke singular (contoh: "Daftar Kategori" -> "Kategori")
const titleSingular = computed(() => props.title.replace('Daftar ', ''));
</script>