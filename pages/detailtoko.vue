<script setup>
import { ref } from 'vue'

const open = ref(false)

function toggleDropdown() {
  open.value = !open.value
}
</script>

<script>
export default {
  name: 'SellerProductPage',
}
</script>

<template>
  <div class="container mx-auto py-10 px-4">

    <!-- Seller Info Card -->
    <div class="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center mb-8">
  <img
    src="/assets/images/seni_ubud.png"
    alt="Profile"
    class="rounded-full w-[100px] h-[100px] object-cover mr-0 md:mr-6 mb-4 md:mb-0"
  />
  <div class="text-center md:text-left">
    <h4 class="text-2xl font-bold mb-1">Kios Pak Ketut</h4>
    <p class="text-green-600 flex items-center justify-center md:justify-start mb-1">
      <span class="w-2 h-2 rounded-full bg-green-500 inline-block mr-2"></span>Buka
    </p>
    <p class="mb-3 text-gray-600">Saya jualan aksesoris dengan ornamen Bali</p>
    <div class="flex justify-center md:justify-start gap-2">
      <button class="border border-green-600 text-green-600 px-4 py-1 rounded-md hover:bg-green-100 text-sm">
        Hubungi Penjual
      </button>
      <button class="p-2 rounded-md">
        <img
          src="/assets/images/share.jpg"
          alt="Share"
          class="w-5 h-5 object-contain"
        />
      </button>
    </div>
  </div>
</div>


    <!-- Filter Dropdown -->
    <div class="mb-6 relative inline-block text-left">
      <button
        @click="toggleDropdown"
        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Tampilkan semua produk
        <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
      <div
        v-show="open"
        class="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      >
        <div class="py-1">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Semua</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Aksesoris</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Lukisan</a>
        </div>
      </div>
    </div>

    <!-- Product Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      <div
        v-for="n in 5"
        :key="n"
        class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
      >
        <img
          src="/assets/images/seni_ubud.png"
          alt="Lukisan Bali"
          class="h-40 w-full object-cover"
        />
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h6 class="font-bold text-base mb-1">Lukisan Bali</h6>
            <p class="text-sm text-gray-500">Aksesoris</p>
            <p class="text-sm text-gray-500">Kios Pak Ketut</p>
          </div>
          <div class="flex items-center text-yellow-500 text-sm mt-2">
            <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
            3.9
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center">
      <nav class="inline-flex items-center space-x-1">
        <button class="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-200" disabled>&laquo;</button>
        <button class="px-3 py-1 rounded-md bg-green-600 text-white">1</button>
        <button class="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200">2</button>
        <span class="px-3 py-1 text-gray-400">...</span>
        <button class="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200">9</button>
        <button class="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200">10</button>
        <button class="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-200">&raquo;</button>
      </nav>
    </div>

  </div>
</template>

