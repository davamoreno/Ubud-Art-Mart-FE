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
              <img v-for="i in 5" :key="'star-' + i" src="/assets/images/bintangg.svg" alt="Bintang" class="w-4 h-4" />
            </div>
            <span>(2 Rating)</span>
          </div>

          <p class="text-base text-gray-500 dark:text-gray-400 mb-4">Kios Pak Ketut - Lantai 2</p>

          <!-- Tabs -->
          <div class="mb-3">
            <div class="inline-flex gap-6 border-b border-gray-300 dark:border-gray-600">
              <span
                :class="activeTab === 'detail' ? 'text-green-600 dark:text-green-400 font-semibold border-b-2 border-green-600 dark:border-green-400' : 'text-gray-800 dark:text-white font-semibold border-b-2 border-transparent'"
                class="text-lg pb-2 cursor-pointer"
                @click="activeTab = 'detail'">
                Detail
              </span>
              <span
                :class="activeTab === 'deskripsi' ? 'text-green-600 dark:text-green-400 font-semibold border-b-2 border-green-600 dark:border-green-400' : 'text-gray-800 dark:text-white font-semibold border-b-2 border-transparent'"
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
              <li>Bahan: Kanvas & Cat Minyak</li>
              <li>Ukuran: 80x80 cm</li>
              <li>Asal: Ubud, Bali</li>
            </ul>
          </div>
        </div>

        <!-- Tombol WhatsApp & Ulasan -->
        <div class="mt-6 flex gap-4">
          <button class="bg-[#2F8F60] text-white text-base font-semibold px-6 py-3 rounded-full flex items-center hover:bg-[#276c4f] transition">
            <img src="/assets/images/whatsapp.svg" alt="WhatsApp" class="w-5 h-5 mr-2" />
            Pesan Sekarang
          </button>

          <button class="border border-[#2F8F60] text-[#2F8F60] text-base font-semibold px-6 py-3 rounded-full hover:bg-[#f0f9f4] transition" @click="showModal = true">
            Berikan Ulasan
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Modal Ulasan -->
  <div v-if="showModal" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-semibold">Ulasan</h5>
        <button class="text-gray-500 hover:text-gray-700" @click="showModal = false">&times;</button>
      </div>
      <p class="mb-3 text-gray-600">Berikan penilaian dan ulasan pada produk ini</p>
      <div class="mb-3">
        <i v-for="n in 5" :key="n" class="bi" :class="rating >= n ? 'bi-star-fill text-yellow-400' : 'bi-star text-gray-400'" style="font-size: 1.5rem; cursor: pointer;" @click="rating = n"></i>
      </div>
      <div class="mb-4">
        <textarea v-model="reviewText" class="w-full bg-white border border-gray-300 rounded-xl p-4 resize-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" style="min-height: 300px;" placeholder="Berikan ulasan anda..."></textarea>
      </div>
      <button @click="submitReview" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">Kirim</button>
    </div>
  </div>

  <section class="px-6 py-10 bg-gray-100 dark:bg-gray-900 flex justify-center">
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-5xl w-full space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Ulasan</h2>
   
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Kolom Ringkasan Rating & Angka -->
    <div class="md:col-span-2 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
      
      <!-- Ringkasan Rating -->
      <div class="flex flex-col space-y-2 w-full md:w-2/3">
        <div class="flex items-center gap-3" v-for="n in [5,4,3,2,1]" :key="n">

          <!-- Bintang -->
          <div class="flex gap-1 w-28">
            <img v-for="i in n" :key="i" src="/assets/images/bintangg.svg" alt="star" class="w-4 h-4" />
          </div>

          <!-- Angka Rating -->
          <div class="text-sm text-gray-600 w-7 text-right">{{ n }}</div>

          <!-- Bar -->
          <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div class="bg-yellow-400 h-2 rounded-full"
                 :style="{ width: n === 5 ? '100%' : '0%' }"></div>
          </div>
        </div>
      </div>

      <!-- Rating Angka Tengah -->
      <div class="flex flex-col items-center justify-center w-full md:w-1/3 mt-4 md:mt-0 text-center">
        <div class="text-5xl font-bold text-gray-900">5.0</div>
        <div class="flex justify-center gap-1 mt-1">
          <img v-for="i in 5" :key="i" src="/assets/images/bintangg.svg" class="w-5 h-5" />
        </div>
        <div class="text-sm text-gray-500 mt-1">3 Ulasan</div>
      </div>
    </div>

    <!-- Kolom Filter -->
    <div class="md:col-span-1 bg-white border border-gray-300 rounded-xl p-4 shadow-sm space-y-4">
      <!-- Urutkan -->
      <div>
        <p class="text-sm font-semibold text-gray-700">Urutkan</p>
        <div class="text-sm text-gray-600 space-y-1 mt-1">
          <label class="flex items-center gap-2">
            <input type="checkbox" class="accent-green-600" />
            Terendah
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" checked class="accent-green-600" />
            Tertinggi
          </label>
        </div>
      </div>

      <!-- Filter Rating -->
      <div>
        <p class="text-sm font-semibold text-gray-700">Rating</p>
        <div class="text-sm text-gray-600 space-y-1 mt-1">
          <label v-for="n in [5,4,3,2,1]" :key="'rating-'+n" class="flex items-center gap-2">
            <input type="checkbox" :checked="n === 5" class="accent-green-600" />
            <div class="flex space-x-1">
              <img src="/assets/images/bintangg.svg" class="w-4 h-4" v-for="i in n" :key="'star-'+i" />
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>

    <!-- Garis pemisah -->
    <hr class="border-t border-gray-300 my-4" />

    <!-- Daftar Ulasan -->
    <div class="space-y-4">
      <div
        v-for="i in 2"
        :key="'review-' + i"
        class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex gap-4"
      >
        <img src="/assets/images/people.png" alt="Guest" class="w-8 h-8 rounded-full" />
        <div class="flex-1">
          <div class="flex justify-between items-center mb-1">
            <div class="flex items-center gap-2 text-sm text-gray-700">
              <span class="font-semibold text-gray-800">Guest</span>
              <span class="text-gray-500">• 22 Jul</span>
            </div>
            <div class="flex space-x-1">
              <img v-for="j in 5" :key="'star-'+i+'-'+j" src="/assets/images/bintangg.svg" class="w-4 h-4" />
            </div>
          </div>
          <p class="text-base text-gray-800">Bagus banget, rekomendasi bagi yang suka seni!!</p>
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
                <img src="/assets/images/bintangg.svg" alt="Bintang" class="w-5 h-5" />
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
      activeTab: 'deskripsi',
      showModal: false,
      rating: 5,
      reviewText: '',
    };
  },
  methods: {
    submitReview() {
      console.log('Rating:', this.rating);
      console.log('Review:', this.reviewText);
      alert('Ulasan dikirim!');
      this.reviewText = '';
      this.rating = 5;
      this.showModal = false;
    },
  },
};
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css');
</style>
