<template>
    <div class=" container my-20 max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Tambahkan Produk</h2>
        <button class="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
      </div>
      <p class="text-sm text-gray-500 mb-4">
        Lengkapi informasi produk lalu klik tambah untuk menambahkannya.
      </p>
  
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium">Nama Produk</label>
          <input type="text" class="w-full border rounded p-2 mt-1" placeholder="Enter Text Here..." />
        </div>
  
        <div>
          <label class="text-sm font-medium">Deskripsi Produk</label>
          <textarea class="w-full border rounded p-2 mt-1" placeholder="Enter Text Here..."></textarea>
        </div>
  
        <div>
          <label class="text-sm font-medium">Detail Produk</label>
          <textarea class="w-full border rounded p-2 mt-1" placeholder="Enter Text Here..."></textarea>
        </div>
  
        <div>
          <label class="text-sm font-medium">Katalog</label>
          <select class="w-full border rounded p-2 mt-1">
            <option disabled selected>Pilih Katalog</option>
            <option>Katalog A</option>
            <option>Katalog B</option>
          </select>
        </div>
  
        <div>
          <label class="text-sm font-medium">Nama Toko</label>
          <select class="w-full border rounded p-2 mt-1">
            <option disabled selected>Pilih Toko</option>
            <option>Toko 1</option>
            <option>Toko 2</option>
          </select>
        </div>
  
        <div>
          <label class="text-sm font-medium">Foto Produk</label>
          <div class="w-full border-dashed border-2 border-gray-300 rounded p-6 text-center mt-2">
            <div class="text-gray-500">
              <svg class="mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24"><path d="M19 13v-2H5v2H3v2h18v-2z" fill="gray"/></svg>
              <span class="text-blue-600 cursor-pointer">Upload a file</span> or drag and drop<br />
              <span class="text-sm text-gray-400">PNG, JPG, GIF up to 5MB</span>
            </div>
          </div>
        </div>
  
        <div class="flex justify-end space-x-2 mt-4">
          <button class="px-6 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">Batal</button>
          <button class="px-6 py-2 rounded bg-black text-white hover:bg-gray-800">Tambah</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddProductForm',
  };
  </script>
  
  <style scoped>
  </style>
  