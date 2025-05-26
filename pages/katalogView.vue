<template>
  <!-- ===== Card Detail ===== -->
  <section class="px-10 py-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row gap-6 p-6 max-w-[1165px] h-[602px] mx-auto">
      <!-- Gambar produk -->
      <div class="md:w-1/2 h-full flex items-center justify-center">
        <img src="/assets/images/seni_ubud.png" alt="Lukisan Bali" class="w-[450px] h-[450px] object-cover rounded-lg" />
      </div>

      <!-- Informasi produk -->
      <div class="md:w-1/2 h-[500px] flex flex-col justify-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Lukisan Bali</h2>

          <!-- Rating -->
          <div class="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-1">
            <span>3.9</span>
            <span class="mx-1">•</span>
            <div class="flex items-center space-x-1">
              <img v-for="i in 5" :key="'star-' + i" src="/assets/images/bintang.svg" alt="Bintang" class="w-4 h-4" />
            </div>
            <span class="ml-2">(10 Rating)</span>
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Kios Pak Ketut</p>

          <!-- Tabs -->
          <div class="flex gap-6 mb-2 cursor-pointer">
            <span :class="activeTab === 'detail' ? 'text-green-600 dark:text-green-400 font-semibold border-b-2 border-green-600 dark:border-green-400' : 'font-semibold text-gray-800 dark:text-white'"
                  @click="activeTab = 'detail'">
              Detail
            </span>
            <span :class="activeTab === 'deskripsi' ? 'text-green-600 dark:text-green-400 font-semibold border-b-2 border-green-600 dark:border-green-400' : 'font-semibold text-gray-800 dark:text-white'"
                  @click="activeTab = 'deskripsi'">
              Deskripsi
            </span>
          </div>

          <!-- Isi Tab -->
          <div v-if="activeTab === 'deskripsi'">
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Karya seni otentik yang menggambarkan keindahan alam, budaya, dan spiritualitas Bali dalam goresan penuh warna dan makna. Cocok untuk dekorasi bernuansa etnik dan artistik.
            </p>
          </div>

          <div v-if="activeTab === 'detail'">
            <ul class="text-sm text-gray-700 dark:text-gray-300 list-disc ml-5 space-y-1">
              <!-- Tambahkan detail jika diperlukan -->
            </ul>
          </div>
        </div>

        <!-- Tombol WhatsApp -->
        <div class="mt-6">
          <button class="bg-green-600 dark:bg-green-500 text-white font-semibold px-6 py-2 rounded-full flex items-center hover:bg-green-700 dark:hover:bg-green-600 transition">
            <img src="/assets/images/whatsapp.svg" alt="WhatsApp" class="w-5 h-5 mr-2" />
            Beli Sekarang
          </button>
        </div>
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

  <!-- ===== Ulasan ===== -->
  <section class="px-10 py-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex justify-center">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 space-y-6 max-w-[1330px] w-full h-[382px] overflow-y-auto">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Ulasan</h2>

      <!-- Ulasan John -->
      <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm flex items-start space-x-4">
        <div class="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-md font-bold">J</div>
        <div class="flex-1">
          <div class="flex justify-between items-center mb-1">
            <h4 class="font-semibold text-gray-800 dark:text-white">John</h4>
            <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300">
              <span>1 Jam lalu</span>
              <span>•</span>
              <div class="flex">
                <img v-for="i in 5" :key="'john-star-' + i" src="/assets/images/bintang.svg" class="w-4 h-4" />
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300">Kualitas bagus, artistik, dan indah.</p>
        </div>
      </div>

      <!-- Ulasan Donnie -->
      <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm flex items-start space-x-4">
        <div class="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-md font-bold">D</div>
        <div class="flex-1">
          <div class="flex justify-between items-center mb-1">
            <h4 class="font-semibold text-gray-800 dark:text-white">Donnie</h4>
            <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300">
              <span>10 Menit lalu</span>
              <span>•</span>
              <div class="flex">
                <img v-for="i in 5" :key="'donnie-star-' + i" src="/assets/images/bintang.svg" class="w-4 h-4" />
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300">Sangat indah, cocok untuk diletakkan sebagai interior ruang tamu.</p>
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