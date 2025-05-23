<template>
    <section class="px-10 py-8">
  <div class="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row gap-6 p-6 max-w-[1165px] h-[602px] mx-auto">
    
    <!-- Gambar Produk -->
    <div class="md:w-1/2 h-full">
      <img src="/assets/images/seni_ubud.png" alt="Lukisan Bali" class="w-full h-full object-cover rounded-lg">
    </div>

    <!-- Informasi Produk -->
    <div class="md:w-1/2 flex flex-col justify-between h-full">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Lukisan Bali</h2>
        <div class="flex items-center text-sm text-gray-600 mb-1">
          <span>3.9</span>
          <span class="mx-1">•</span>
          <div class="flex items-center space-x-1 text-yellow-400">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46 1.286 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46-3.388 2.46c-.785.57-1.84-.196-1.54-1.118l1.286-3.966-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18l1.286-3.967z"/>
            </svg>
            <!-- Menggunakan file SVG eksternal -->
            <img src="/assets/images/bintang%205.svg" alt="Bintang Kosong" class="w-4 h-4">
          </div>
          <span class="ml-2">(10 Rating)</span>
        </div>
        <p class="text-sm text-gray-500 mb-4">Kios Pak Ketut</p>

        <div class="flex gap-6 mb-2">
          <span class="font-semibold text-gray-800">Detail</span>
          <span class="text-green-600 font-semibold border-b-2 border-green-600">Deskripsi</span>
        </div>

        <p class="text-sm text-gray-700">
          Karya seni otentik yang menggambarkan keindahan alam, budaya, dan spiritualitas Bali dalam goresan penuh warna dan makna. Cocok untuk dekorasi bernuansa etnik dan artistik.
        </p>
      </div>

      <div class="mt-6">
        <button class="bg-green-600 text-white font-semibold px-6 py-2 rounded-full flex items-center hover:bg-green-700 transition">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16 11V5a1 1 0 00-1-1H5a1 1 0 00-1 1v6H2v2h1v2a1 1 0 001 1h2v2h2v-2h4v2h2v-2h2a1 1 0 001-1v-2h1v-2h-2zm-2 2H6v-6h8v6z"/>
          </svg>
          Beli Sekarang
        </button>
      </div>
    </div>
  </div>
</section>

   <section class="px-10 py-8">
  <h2 class="text-2xl font-semibold mb-6">Rekomendasi Lainnya</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    
    <!-- CARD 1 -->
    <div class="hover:scale-105 transition duration-300 ease-in-out">
      <div class="h-[313px] bg-white rounded-lg shadow-xl overflow-hidden">
        <img src="/assets/images/seni_ubud.png" alt="Lukisan Bali"
          class="w-full h-[220px] object-cover">
        <div class="p-4">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-lg font-semibold text-gray-800">Lukisan Bali</h2>
              <p class="text-sm text-gray-600">Kios Pak Ketut</p>
            </div>
            <div class="flex items-center mt-1">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.444a1 1 0 00-.364 1.118l1.285 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.444a1 1 0 00-1.175 0l-3.36 2.444c-.784.57-1.838-.197-1.539-1.118l1.285-3.945a1 1 0 00-.364-1.118L2.075 9.372c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.945z" />
              </svg>
              <span class="ml-1 text-sm text-gray-700 font-medium">3.9</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CARD 2 -->
    <div class="hover:scale-105 transition duration-300 ease-in-out">
      <div class="h-[313px] bg-white rounded-lg shadow-xl overflow-hidden">
        <img src="/assets/images/seni_ubud.png" alt="Lukisan Bali"
          class="w-full h-[220px] object-cover">
        <div class="p-4">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-lg font-semibold text-gray-800">Lukisan Bali</h2>
              <p class="text-sm text-gray-600">Kios Pak Ketut</p>
            </div>
            <div class="flex items-center mt-1">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.444a1 1 0 00-.364 1.118l1.285 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.444a1 1 0 00-1.175 0l-3.36 2.444c-.784.57-1.838-.197-1.539-1.118l1.285-3.945a1 1 0 00-.364-1.118L2.075 9.372c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.945z" />
              </svg>
              <span class="ml-1 text-sm text-gray-700 font-medium">3.9</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CARD 3 -->
    <!-- Duplikat seperti di atas, ganti konten jika diperlukan -->
    <div class="hover:scale-105 transition duration-300 ease-in-out">
      <div class="h-[313px] bg-white rounded-lg shadow-xl overflow-hidden">
        <img src="/assets/images/seni_ubud.png" alt="Lukisan Bali"
          class="w-full h-[220px] object-cover">
        <div class="p-4">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-lg font-semibold text-gray-800">Lukisan Bali</h2>
              <p class="text-sm text-gray-600">Kios Pak Ketut</p>
            </div>
            <div class="flex items-center mt-1">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.444a1 1 0 00-.364 1.118l1.285 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.444a1 1 0 00-1.175 0l-3.36 2.444c-.784.57-1.838-.197-1.539-1.118l1.285-3.945a1 1 0 00-.364-1.118L2.075 9.372c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.945z" />
              </svg>
              <span class="ml-1 text-sm text-gray-700 font-medium">3.9</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CARD 4 -->
    <div class="hover:scale-105 transition duration-300 ease-in-out">
      <div class="h-[313px] bg-white rounded-lg shadow-xl overflow-hidden">
        <img src="/assets/images/seni_ubud.png" alt="Lukisan Bali"
          class="w-full h-[220px] object-cover">
        <div class="p-4">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-lg font-semibold text-gray-800">Lukisan Bali</h2>
              <p class="text-sm text-gray-600">Kios Pak Ketut</p>
            </div>
            <div class="flex items-center mt-1">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.444a1 1 0 00-.364 1.118l1.285 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.444a1 1 0 00-1.175 0l-3.36 2.444c-.784.57-1.838-.197-1.539-1.118l1.285-3.945a1 1 0 00-.364-1.118L2.075 9.372c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.945z" />
              </svg>
              <span class="ml-1 text-sm text-gray-700 font-medium">3.9</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CARD 5 -->
    <div class="hover:scale-105 transition duration-300 ease-in-out">
      <div class="h-[313px] bg-white rounded-lg shadow-xl overflow-hidden">
        <img src="/assets/images/seni_ubud.png" alt="Lukisan Bali"
          class="w-full h-[220px] object-cover">
        <div class="p-4">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-lg font-semibold text-gray-800">Lukisan Bali</h2>
              <p class="text-sm text-gray-600">Kios Pak Ketut</p>
            </div>
            <div class="flex items-center mt-1">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.444a1 1 0 00-.364 1.118l1.285 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.444a1 1 0 00-1.175 0l-3.36 2.444c-.784.57-1.838-.197-1.539-1.118l1.285-3.945a1 1 0 00-.364-1.118L2.075 9.372c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.945z" />
              </svg>
              <span class="ml-1 text-sm text-gray-700 font-medium">3.9</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>
</template>