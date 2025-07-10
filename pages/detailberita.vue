<template>
  <div class="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
    <!-- Konten Artikel Utama -->
    <div class="container mx-auto px-[120px] pt-[113px]">
      <div>
        <!-- Judul Artikel -->
        <h1 class="font-semibold text-6xl mb-8">Title</h1>

        <!-- Kategori -->
        <div class="mb-8">
          <button
            class="w-[119px] h-[40px] text-[#328E6E] border-2 rounded-md border-[#328E6E] shadow-md font-medium">
            Berita
          </button>
        </div>

        <!-- Info Admin dan Waktu -->
        <div class="flex flex-row items-center gap-4 mb-8">
          <img src="/assets/images/profileadmin.svg" alt="Admin" class="w-[50px] h-[50px] rounded-full" />
          <p class="text-base">Admin</p>
          <img src="/assets/images/Ellipse_black.svg" alt="dot" class="w-1 h-1" />
          <p class="text-base">20 menit yang lalu</p>
        </div>

        <!-- Gambar Utama -->
        <div class="mb-12">
          <img src="/assets/images/contoh.png" alt="Gambar Utama" class="w-full h-[600px] object-cover rounded-lg shadow" />
        </div>

        <!-- Isi Artikel -->
        <div class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, nisi fugiat! Dolor eum
            consectetur repellendus blanditiis unde placeat aliquid minima repudiandae harum eos adipisci officia,
            in veniam reprehenderit illo. Reprehenderit expedita unde tenetur, ad commodi quam excepturi repellat
            similique recusandae repudiandae error fuga sequi accusantium! Ullam asperiores unde molestiae recusandae.
          </p>
        </div>
      </div>
    </div>

    <!-- Artikel Lainnya -->
    <section class="px-[120px] py-16 mt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <!-- Judul Section -->
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white border-b-4 border-green-700 inline-block mb-8">
        Artikel Lainnya
      </h2>

      <!-- Grid Artikel -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div v-for="i in 4" :key="'artikel-' + i"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <img src="/assets/images/bg.png" alt="Artikel" class="w-full h-[200px] object-cover" />
          <div class="p-4">
            <h3 class="text-base font-semibold text-gray-900 dark:text-white leading-snug mb-2">
              Pasar Seni di Ubud Tetap Eksis di Tengah Gempuran Toko Oleh-oleh Modern
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">1 Juli 2025</p>
            <button
              class="bg-green-700 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-green-800 transition">
              Berita
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Script kosong jika tidak ada logic dinamis
</script>
