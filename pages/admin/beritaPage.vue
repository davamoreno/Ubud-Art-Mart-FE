<template>
    <div class="min-h-screen bg-[#F6F7FB] px-[50px] py-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Katalog Berita</h1>
  
        <!-- Search & Button -->
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Cari Berita"
              class="pl-10 pr-4 py-2 w-[500px] rounded-full bg-[#F0F0F0] text-sm focus:outline-none"
            />
            <span class="absolute left-3 top-2 text-gray-500">🔍</span>
          </div>
  
          <button
            class="border border-black text-black px-4 py-2 text-sm rounded-full hover:bg-black hover:text-white transition"
          >
            Tambahkan Berita +
          </button>
        </div>
      </div>
  
      <!-- Kategori -->
      <!-- <div class="flex space-x-6 text-sm text-gray-500 mb-6">
        <button class="hover:text-black">Semua Produk</button>
        <button class="hover:text-black">Katalog 1</button>
        <button class="hover:text-black">Katalog 2</button>
        <button class="hover:text-black">Katalog 3</button>
        <button class="hover:text-black">Katalog 4</button>
      </div> -->
  
      <!-- CARD PUTIH WRAPPER -->
      <div class="bg-white rounded-xl shadow p-6 h-[600px] overflow-y-auto">
        <!-- PRODUK GRID DI DALAM CARD -->
        <div class="grid grid-cols-4 gap-6">
            <div
  v-for="i in 12"
  :key="i"
  class="bg-white rounded-xl shadow-sm border p-3 transition hover:shadow-md h-72"
>
  <img
    src="/assets/images/galery.png"
    alt="Tas Anyaman"
    class="w-full h-40 object-cover rounded-md mb-3"
  />
  <h2 class="text-base font-semibold text-gray-800 line-clamp-q mb-2">
    Event Menarik di pasar yang sangat panjang sekali
  </h2>
  <p class="text-sm text-gray-400 line-clamp-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore magni obcaecati non totam at minima voluptate? Corporis dolores ipsa est.</p>
 
</div>

        </div>
      </div>
    </div>
  </template>
  