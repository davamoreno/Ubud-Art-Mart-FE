<template>
  <!-- ===== Card Detail Produk ===== -->
  <section class="px-6 py-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto">
      
      <!-- Gambar Produk -->
      <div class="md:w-1/2 flex justify-center items-center">
        <img src="/assets/images/seni_ubud.png" alt="Lukisan Bali" class="w-[420px] h-[420px] object-cover rounded-xl" />
      </div>

      <!-- Informasi Produk -->
      <div class="md:w-1/2 flex flex-col justify-between">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Lukisan Bali</h2> 

          <!-- Rating -->
          <div class="flex items-center text-gray-600 dark:text-gray-300 mb-2 text-base"> 
            <span class="font-medium mr-1">5.0</span>
            <div class="flex items-center space-x-1 mr-2">
              <img v-for="i in 5" :key="'star-' + i" src="/assets/images/bintang.svg" alt="Bintang" class="w-4 h-4" />
            </div>
            <span>(2 Rating)</span>
          </div>

          <p class="text-base text-gray-500 dark:text-gray-400 mb-4">Kios Pak Ketut - Lantai 2</p> 

          <!-- Tabs -->
          <div class="mb-3">
            <div class="inline-flex gap-6 border-b border-gray-300 dark:border-gray-600">
              <span
                :class="activeTab === 'detail'
                  ? 'text-green-600 dark:text-green-400 font-semibold border-b-2 border-green-600 dark:border-green-400'
                  : 'text-gray-800 dark:text-white font-semibold border-b-2 border-transparent'"
                class="text-lg pb-2 cursor-pointer"
                @click="activeTab = 'detail'">
                Detail
              </span>
              <span
                :class="activeTab === 'deskripsi'
                  ? 'text-green-600 dark:text-green-400 font-semibold border-b-2 border-green-600 dark:border-green-400'
                  : 'text-gray-800 dark:text-white font-semibold border-b-2 border-transparent'"
                class="text-lg pb-2 cursor-pointer"
                @click="activeTab = 'deskripsi'">
                Deskripsi
              </span>
            </div>
          </div>

          <!-- Isi Tab -->
          <div v-if="activeTab === 'deskripsi'">
            <p class="text-base text-gray-700 dark:text-gray-300 leading-relaxed"> 
              Karya seni otentik yang menggambarkan keindahan alam, budaya, dan spiritualitas Bali dalam goresan penuh warna dan makna. Cocok untuk dekorasi bernuansa etnik dan artistik.
            </p>
          </div>

          <div v-if="activeTab === 'detail'">
            <ul class="text-base text-gray-700 dark:text-gray-300 list-disc ml-5 space-y-1"> 
              <!-- Tambahkan detail jika perlu -->
            </ul>
          </div>
        </div>

        <!-- Tombol WhatsApp -->
        <div class="mt-6">
          <button class="bg-green-600 dark:bg-green-500 text-base text-white font-semibold px-6 py-3 rounded-full flex items-center hover:bg-green-700 dark:hover:bg-green-600 transition"> 
            <img src="/assets/images/whatsapp.svg" alt="WhatsApp" class="w-5 h-5 mr-3" />
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== Ulasan Produk ===== -->
  <section class="px-6 py-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex justify-center">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-6xl w-full space-y-6">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Ulasan</h2>
      <p class="text-base text-gray-700 dark:text-gray-300">Berikan penilaian dan ulasan pada produk ini</p>
  
      <!-- Formulir Ulasan -->
      <div class="space-y-4">
        <div class="flex space-x-1">
          <img src="/assets/images/bintang-kosong.svg" alt="Bintang kosong" class="w-15 h-15" />
        </div>
        <textarea placeholder="Tulis ulasan anda di sini...." class="w-full h-28 p-4 border border-gray-300 rounded-lg text-gray-800 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"></textarea>
        <div class="flex justify-end">
          <button class="px-12 py-3 text-lg border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 dark:hover:bg-green-800 transition shadow-md">
            Kirim
          </button>
        </div>
      </div>
  
      <!-- Ulasan Ditampilkan -->
      <div class="space-y-4">
        <div
          v-for="i in 2"
          :key="'review-' + i"
          class="border-t border-gray-300 dark:border-gray-600 pt-4"
        >
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm">
            <div class="flex gap-4">
              <img src="/assets/images/people.png" alt="Guest" class="w-8 h-8" />
              <div class="flex-1">
                <div class="flex justify-between items-center mb-1">
                  <div class="flex items-center gap-2">
                    <span class="text-base font-bold text-gray-800 dark:text-white">Guest</span>
                    <span class="text-sm font-bold text-gray-500 dark:text-gray-400">• 22 Jul</span>
                  </div>
                  <div class="flex space-x-1">
                    <img v-for="j in 5" :key="'star-' + i + '-' + j" src="/assets/images/bintang.svg" class="w-4 h-4" />
                  </div>
                </div>
                <p class="text-base text-gray-700 dark:text-gray-300">
                  Bagus banget, rekomendasi bagi yang suka seni!!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tombol lihat semua -->
      <div class="text-right">
        <a href="#" class="text-sm text-green-700 font-medium hover:underline">Lihat Semua Ulasan</a>
      </div>
    </div>
  </section>

  <!-- ===== Rekomendasi Produk ===== -->
  <section class="px-10 py-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Rekomendasi Lainnya</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="i in 5" :key="'rekom-' + i" class="hover:scale-105 transition duration-300 ease-in-out">
        <div class="h-[313px] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <img src="/assets/images/seni_ubud.png" alt="Lukisan Bali" class="w-full h-[220px] object-cover" />
          <div class="p-4">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Lukisan Bali</h2>
                <p class="text-sm text-gray-600 dark:text-gray-300">Kios Pak Ketut</p>
              </div>
              <div class="flex items-center mt-1">
                <img src="/assets/images/bintang.svg" alt="Bintang" class="w-5 h-5" />
                <span class="ml-1 text-sm text-gray-700 dark:text-gray-300 font-medium">3.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'deskripsi'
    };
  }
};
</script>