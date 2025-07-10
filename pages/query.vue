<script>
export default {
  data() {
    return {
      activeTab: 'produk',
      currentPage: 1,
      totalPages: 10, // statis untuk sekarang, bisa disesuaikan dengan kebutuhan
      tokoList: [
        { nama: 'Kios Pak Ketut', lokasi: 'Ubud, Bali', jumlahProduk: 23 },
        { nama: 'Galeri Dewi Art', lokasi: 'Gianyar', jumlahProduk: 15 },
        { nama: 'Toko Seni Ayu', lokasi: 'Denpasar', jumlahProduk: 42 },
        { nama: 'Studio Budi', lokasi: 'Sanur', jumlahProduk: 12 },
        { nama: 'Studio Mega', lokasi: 'Kuta', jumlahProduk: 19 },
        { nama: 'Art House Raka', lokasi: 'Ubud', jumlahProduk: 30 },
        { nama: 'Dewata Gallery', lokasi: 'Seminyak', jumlahProduk: 25 },
        { nama: 'Bali Art Center', lokasi: 'Singaraja', jumlahProduk: 17 },
        { nama: 'Studio Nyoman', lokasi: 'Tabanan', jumlahProduk: 21 }
      ]
    };
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        // Tambahkan logika pengambilan data jika pakai API
      }
    }
  }
};
</script>

<template>
  <div class="font-[Plus Jakarta Sans] bg-white">
    <div class="w-[1360px] min-h-screen overflow-visible mx-auto px-6 pt-6">
      <div class="flex h-full gap-6">
        <!-- Sidebar Filter -->
        <aside class="w-[240px] shrink-0">
          <h1 class="font-bold text-lg mb-4">Filter</h1>
          <div class="border-2 rounded-lg shadow-md p-4 h-[384px]">
            <h2 class="font-bold text-lg mb-3">Jenis Produk</h2>
            <form class="flex flex-col mb-6 space-y-3">
              <label class="flex items-center"><input type="checkbox" class="me-2" /> <span class="font-bold">Patung</span></label>
              <label class="flex items-center"><input type="checkbox" class="me-2" checked /> <span class="font-bold">Lukisan</span></label>
              <label class="flex items-center"><input type="checkbox" class="me-2" /> <span class="font-bold">Aksesoris</span></label>
            </form>
            <h2 class="font-bold text-lg mb-3">Rating</h2>
            <form class="flex flex-col space-y-3">
              <label class="flex items-center"><input type="checkbox" class="me-2" /> <span class="font-bold">Terendah</span></label>
              <label class="flex items-center"><input type="checkbox" class="me-2" checked /> <span class="font-bold">Tertinggi</span></label>
            </form>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col">
          <!-- Search Bar -->
          <div class="relative mb-6 w-[730px] h-[50px] flex items-center border border-black rounded-full px-4">
            <div class="w-[36px] h-[36px] bg-[#328E6E] rounded-full flex items-center justify-center">
              <img src="/assets/images/search.svg" alt="Search" class="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Cari di Katalog"
              class="ml-4 w-full h-full bg-transparent text-[#a8d4c5] placeholder:text-[#a8d4c5] focus:outline-none"
            />
          </div>

          <!-- Filter Chips -->
          <div class="flex gap-3 mb-6">
            <span class="px-4 py-1 rounded-full border text-gray-500 text-sm bg-white hover:bg-gray-100 cursor-pointer">Bali</span>
            <span class="px-4 py-1 rounded-full border text-gray-500 text-sm bg-white hover:bg-gray-100 cursor-pointer">Estetik</span>
            <span class="px-4 py-1 rounded-full border text-gray-500 text-sm bg-white hover:bg-gray-100 cursor-pointer">Kanvas</span>
          </div>

          <!-- Tab Navigation -->
          <div class="flex gap-4 mb-6">
            <button
              :class="[
                'flex items-center gap-2 px-4 py-2 border-b-2 transition-all duration-300',
                activeTab === 'produk' ? 'border-green-600 text-green-600 font-semibold' : 'border-transparent text-gray-700 hover:border-green-600'
              ]"
              @click="activeTab = 'produk'"
            >
              <img src="/assets/images/addcart.svg" alt="Produk" class="w-4 h-4" />
              Produk
            </button>
            <button
              :class="[
                'flex items-center gap-2 px-4 py-2 border-b-2 transition-all duration-300',
                activeTab === 'toko' ? 'border-green-600 text-green-600 font-semibold' : 'border-transparent text-gray-700 hover:border-green-600'
              ]"
              @click="activeTab = 'toko'"
            >
              <img src="/assets/images/toko.svg" alt="Toko" class="w-4 h-4" />
              Toko
            </button>
          </div>

          <!-- Produk Grid -->
          <div v-if="activeTab === 'produk'" class="grid grid-cols-4 gap-6">
            <div
              v-for="(item, index) in 8"
              :key="index"
              class="w-[250px] hover:scale-105 transition duration-300 ease-in-out"
            >
              <a href="/katalogView">
                <div class="bg-white rounded-lg shadow-xl overflow-hidden">
                  <img src="/assets/images/katalog.png" alt="Lukisan Bali" class="w-full h-[220px] object-cover" />
                  <div class="p-4">
                    <div class="flex justify-between items-start">
                      <div>
                        <h2 class="text-lg font-semibold text-gray-800">Lukisan Bali</h2>
                        <p class="text-sm text-gray-600">Kios Pak Ketut</p>
                      </div>
                      <div class="flex items-center mt-4">
                        <img src="/assets/images/Star.svg" alt="" class="h-5 w-5" />
                        <span class="ml-1 mt-1 text-sm text-gray-700 font-medium">3.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <!-- Toko Grid -->
          <div v-else class="grid grid-cols-3 gap-6">
            <div v-for="(toko, index) in tokoList" :key="index" class="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:scale-105 transition duration-300 ease-in-out">
              <div class="flex items-center gap-4">
                <img src="/assets/images/seni_ubud.png" alt="Foto Toko" class="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h3 class="text-base font-semibold text-black">{{ toko.nama }}</h3>
                  <div class="flex items-center text-sm text-black mt-1">
                    <span class="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Buka
                  </div>
                </div>
              </div>
              <button class="px-4 py-1 text-green-700 border border-green-600 rounded-lg text-sm font-semibold hover:bg-green-50">
                Lihat Toko
              </button>
            </div>
          </div>

          <!-- Pagination -->
          <div class="mt-10 mb-4 flex justify-end">
            <nav class="inline-flex items-center space-x-1">
              <button
                class="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-200"
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)"
              >&laquo;</button>

              <button
                v-for="page in totalPages"
                :key="page"
                class="px-3 py-1 rounded-md"
                :class="currentPage === page ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-200'"
                @click="goToPage(page)"
              >{{ page }}</button>

              <button
                class="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-200"
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
              >&raquo;</button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
