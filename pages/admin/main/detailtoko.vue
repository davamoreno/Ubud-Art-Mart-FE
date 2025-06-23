<script setup>
import { ref } from 'vue'

const status = ref('aktif') // Default: Active
</script>

<template>
  <form action="">
    <div class="flex flex-row w-[1340px] h-[752px] p-[30px] mt-[60px] mb-[40px] mx-auto border-2 rounded-lg">
      <div class="relative w-[550px] me-[50px] p-[25px] group border-2 rounded-lg">
        <img src="/assets/images/tas.png" alt="" class="w-full h-full object-cover">
        <label
          class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <div class="rounded-2xl border-2 p-[5px]">
            <p>Pilih Gambar</p>
            <input type="file" class="hidden" />
          </div>
        </label>
      </div>

      <div class="w-[692px] my-[20px] border-2 rounded-lg p-[30px]">
        <div class="flex flex-row">
          <div class="w-full">
            <h1 class="font-semibold text-2xl mb-[12px]">Toko</h1>

            <div class="mb-3">
              <label class="mb-1 text-sm text-gray-500 block">Status</label>
              <div class="relative inline-block w-[130px]">
                <!-- Wrapper with color background -->
                <div :class="[
                  'rounded-lg',
                  status === 'aktif' ? 'bg-green-500' : 'bg-red-500'
                ]">
                  <select v-model="status"
                    class="w-full appearance-none bg-transparent text-white font-semibold py-2 px-4 pr-8 rounded-lg focus:outline-none">
                    <option class="text-black" value="aktif">Active</option>
                    <option class="text-black" value="nonaktif">Non Active</option>
                  </select>

                  <!-- Dropdown arrow -->
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>

            <!-- Nama Toko -->
            <label class="mb-[8px] text-sm text-gray-500 block">Nama Toko</label>
            <input type="text" value="Toko Anyaman"
              class="px-[21px] py-[12px] rounded-lg border-2 w-full mb-[14px] opacity-50" />

            <!-- No Telepon -->
            <label class="mb-[8px] text-sm text-gray-500 block">No Telepon</label>
            <input type="text" value="08123456789"
              class="px-[21px] py-[12px] rounded-lg border-2 w-full mb-[14px] opacity-50" />

            <!-- Deskripsi Toko -->
            <label class="mb-[8px] text-sm text-gray-500 block">Deskripsi Toko</label>
            <textarea class="px-[16px] py-[12px] rounded-lg border-2 w-full mb-[14px] resize-none h-[189px] opacity-50">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae aspernatur totam at blanditiis nihil vitae numquam, cupiditate natus. Voluptatum ut magni atque cumque? Libero, autem. Reiciendis aliquam quas ea atque.
    </textarea>
          </div>
        </div>

        <div class="flex flex-row mt-4">
          <button class="bg-transparent rounded-3xl px-[39px] py-[10px] border-2 me-auto shadow-sm opacity-50">
            Kembali
          </button>
          <button class="bg-transparent rounded-3xl px-[39px] py-[10px] border-2 me-[14px] shadow-sm opacity-50">
            Hapus
          </button>
          <button class="bg-transparent rounded-3xl px-[39px] py-[10px] border-2 shadow-sm opacity-50">
            Simpan
          </button>
        </div>
      </div>
    </div>

    <div class="w-full px-[30px] mb-[80px]">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Daftar Produk</h2>

      <div class="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
            <tr>
              <th class="px-6 py-4 border-b text-left">No</th>
              <th class="px-6 py-4 border-b text-left">Nama Produk</th>
              <th class="px-6 py-4 border-b text-left">Kategori</th>
              <th class="px-6 py-4 border-b text-left">Tag</th>
              <th class="px-6 py-4 border-b text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="text-gray-700 text-sm">
            <tr class="border-b hover:bg-gray-50 transition duration-200">
              <td class="px-6 py-4">1</td>
              <td class="px-6 py-4">Tas Anyaman Bali</td>
              <td class="px-6 py-4">Kerajinan</td>
              <td class="px-6 py-4">#anyaman #bali</td>
              <td class="px-6 py-4 text-center">
                <button
                  class="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-1 rounded-full hover:bg-blue-200 transition duration-150">
                  Edit
                </button>
              </td>
            </tr>
            <tr class="border-b hover:bg-gray-50 transition duration-200">
              <td class="px-6 py-4">2</td>
              <td class="px-6 py-4">Lukisan Kayu Tradisional</td>
              <td class="px-6 py-4">Seni</td>
              <td class="px-6 py-4">#lukisan #kayu</td>
              <td class="px-6 py-4 text-center">
                <button
                  class="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-1 rounded-full hover:bg-blue-200 transition duration-150">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </form>
</template>
