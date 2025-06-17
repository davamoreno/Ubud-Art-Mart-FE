<template>
    <div class="container my-5 max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Tambahkan Produk</h2>
      </div>
      <p class="text-sm text-gray-500 mb-4">
        Lengkapi informasi produk lalu klik tambah untuk menambahkannya.
      </p>
  
      <div class="space-y-4">
        <!-- Nama Produk -->
        <div>
          <label class="text-sm font-medium">Nama Produk</label>
          <input type="text" class="w-full border rounded p-2 mt-1" placeholder="Enter Text Here..." />
        </div>
  
        <!-- Deskripsi -->
        <div>
          <label class="text-sm font-medium">Deskripsi Produk</label>
          <textarea class="w-full border rounded p-2 mt-1" placeholder="Enter Text Here..."></textarea>
        </div>
  
        <!-- Detail -->
        <div>
          <label class="text-sm font-medium">Detail Produk</label>
          <textarea class="w-full border rounded p-2 mt-1" placeholder="Enter Text Here..."></textarea>
        </div>
  
        <!-- Kategori -->
        <div>
          <label class="text-sm font-medium">Kategori</label>
          <select class="w-full border rounded p-2 mt-1">
            <option disabled selected>Pilih Kategori</option>
            <option>Katalog A</option>
            <option>Katalog B</option>
          </select>
        </div>
  
        <!-- Tag (Multi-select Dropdown with Checkbox) -->
        <div class="relative">
          <label class="text-sm font-medium">Tag</label>
          <div
            @click="toggleDropdown"
            class="w-full border rounded p-2 mt-1 bg-white cursor-pointer flex justify-between items-center"
          >
            <span class="text-gray-700 text-sm">
              {{ selectedTags.length ? selectedTags.join(', ') : 'Pilih Tag' }}
            </span>
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div
            v-if="tagDropdownOpen"
            class="absolute z-10 bg-white border mt-1 w-full rounded shadow max-h-40 overflow-y-auto"
          >
            <label
              v-for="tag in allTags"
              :key="tag"
              class="flex items-center p-2 hover:bg-gray-100 text-sm"
            >
              <input
                type="checkbox"
                :value="tag"
                v-model="selectedTags"
                class="mr-2"
              />
              {{ tag }}
            </label>
          </div>
        </div>
  
        <!-- Toko -->
        <div>
          <label class="text-sm font-medium">Nama Toko</label>
          <select class="w-full border rounded p-2 mt-1">
            <option disabled selected>Pilih Toko</option>
            <option>Toko 1</option>
            <option>Toko 2</option>
          </select>
        </div>
  
        <!-- Foto Produk -->
        <div>
          <label class="text-sm font-medium">Foto Produk</label>
          <div
            class="w-full border-dashed border-2 border-gray-300 rounded p-6 text-center mt-2 relative"
          >
            <input
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div class="text-gray-500">
              <img src="/assets/images/Vector.svg" class="mx-auto mb-2"  height="24" viewBox="0 0 24 24">
                <path d="M19 13v-2H5v2H3v2h18v-2z" fill="gray" />
              
              <span class="text-blue-600 cursor-pointer">Upload a file</span><br />
              <span class="text-sm text-gray-400">PNG, JPG, GIF up to 5MB</span>
            </div>
          </div>
  
          <!-- Preview -->
          <div v-if="imagePreview" class="relative mt-4 w-fit">
            <p class="text-sm text-gray-500 mb-2">Preview Gambar:</p>
            <img :src="imagePreview" alt="Preview" class="max-h-48 rounded border" />
            <button
              @click="cancelImage"
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 -translate-y-2 translate-x-2"
              title="Hapus Gambar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
  
        <!-- Tombol Aksi -->
        <div class="flex justify-end space-x-2 mt-4">
          <button class="px-6 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">
            Batal
          </button>
          <button class="px-6 py-2 rounded bg-black text-white hover:bg-gray-800">
            Tambah
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddProductForm',
    data() {
      return {
        selectedImage: null,
        imagePreview: null,
        tagDropdownOpen: false,
        allTags: ['Tag A', 'Tag B', 'Tag C', 'Tag D'],
        selectedTags: [],
      };
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          this.selectedImage = file;
          this.imagePreview = URL.createObjectURL(file);
        } else {
          alert('File bukan gambar!');
        }
      },
      cancelImage() {
        this.selectedImage = null;
        this.imagePreview = null;
      },
      toggleDropdown() {
        this.tagDropdownOpen = !this.tagDropdownOpen;
      },
    },
    mounted() {
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.relative')) {
          this.tagDropdownOpen = false;
        }
      });
    },
  };
  </script>
  

  