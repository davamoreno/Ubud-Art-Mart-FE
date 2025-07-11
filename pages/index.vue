<script setup>
// Script section (kosongkan atau tambahkan jika diperlukan)
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="relative w-full h-[450px]">
      <img src="@/assets/images/bg.png" alt="Pasar Seni Ubud" class="object-cover bg-center w-full h-full" />
      <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div class="text-white drop-shadow text-center">
          <h1 class="text-3xl lg:text-5xl font-bold mb-[10px]">RASAKAN KEAJAIBAN KARYA LOKAL</h1>
          <h2 class="text-3xl lg:text-4xl font-bold mb-[20px]">PASAR KESENIAN UBUD</h2>
        </div>
      </div>
    </div>

    <!-- Sorotan Produk -->
<section class="px-10 py-12 dark:bg-gray-900 transition-colors duration-300">
  <!-- Header: Judul + Lihat Semua -->
  <div class="flex items-center justify-between mb-8">
    <h2 class="text-3xl font-semibold text-gray-800 dark:text-white">Sorotan Produk</h2>
    <a href="katalog" class="text-sm font-semibold text-green-600 dark:text-green-400 hover:underline" >Lihat Semua </a>
  </div>

  <!-- Daftar Produk -->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    <div
      v-for="i in 5"
      :key="'rekom-' + i"
      class="hover:scale-105 transition duration-300 ease-in-out"
    >
      <div class="h-[313px] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden group">
        <div class="overflow-hidden">
          <img
            src="@/assets/images/seni_ubud.png"
            alt="Lukisan Bali"
            class="w-full h-[220px] object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div class="p-4">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Lukisan Bali</h2>
              <p class="text-sm text-gray-600 dark:text-gray-300">Kios Pak Ketut</p>
            </div>
            <div class="flex items-center mt-1">
              <img src="@/assets/images/bintangg.svg" alt="Bintang" class="w-5 h-5" />
              <span class="ml-1 text-sm text-gray-700 dark:text-gray-300 font-medium">3.9</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    <!-- Berita & Acara -->
    <section class="px-10 py-16 dark:bg-gray-800 transition-colors duration-300">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Kiri: Teks -->
          <div class="text-gray-800 dark:text-white">
            <p class="text-sm font-semibold text-gray-900 dark:text-gray-200">Berita & Acara</p>
            <h2 class="text-4xl font-bold mt-2 mb-4 leading-snug">
              Lihat apa yang sedang<br />
              berlangsung di Pasar Seni<br />
              Ubud saat ini.
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Ingin tahu apa yang baru di Pasar Kesenian Ubud? Dapatkan semua berita dan jadwal acara terkini di satu tempat.
            </p>
            <a href="BeritaAcara" class="inline-block px-6 py-3 border border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 rounded-md font-semibold hover:bg-green-600 hover:text-white dark:hover:bg-green-400 dark:hover:text-white transition-colors duration-300">
              Lihat Selengkapnya
            </a>
          </div>

          <!-- Kanan: Dua Card Berita -->
          <div class="flex space-x-4">
            <div v-for="i in 2" :key="i" class="relative w-1/2 h-[400px] rounded-lg overflow-hidden shadow-lg group">
              <img src="@/assets/images/seni_ubud.png" alt="Berita" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-4 text-white">
                <p class="text-xs">3 Juli 2025</p>
                <h3 class="font-bold mt-1 text-base leading-snug">
                  Mau belanja oleh oleh seru di Bali? Ubud Art Market aja!
                </h3>
                <p class="text-xs mt-2 opacity-80 line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit....
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigasi Panah -->
        <div class="flex justify-end mt-6 space-x-2">
          <button class="p-2 border rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button class="p-2 border rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Tentang Pasar -->
    <section class="px-10 py-16 dark:bg-gray-800 transition-colors duration-300">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <div class="order-last lg:order-first">
            <img src="@/assets/images/artmarket.png" alt="Tentang Pasar Seni Ubud" class="rounded-lg shadow-xl w-full h-[450px] object-cover" />
          </div>
          <div class="text-gray-800 dark:text-white">
            <h2 class="text-4xl font-bold mb-4">Tentang Pasar Kesenian Ubud</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Sejak awal abad ke-20, pasar ini telah menjadi saksi bagaimana seni tradisional Bali berkembang seiring waktu, tetap bertahan di tengah modernitas tanpa kehilangan akarnya. Pengunjung dari berbagai belahan dunia datang bukan hanya untuk berbelanja, tapi untuk merasakan sesuatu yang lebih dalam: keaslian.
            </p>
            <a href="About" class="inline-block px-6 py-3 border border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 rounded-md font-semibold hover:bg-green-600 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 transition-colors duration-300">
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>