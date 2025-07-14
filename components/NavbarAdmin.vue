<script setup>
import { useAuthStore } from '~/stores/auth'
import Swal from 'sweetalert2'

const authStore = useAuthStore()

const confirmLogout = async () => {
  const result = await Swal.fire({
    title: 'Logout dari Panel Admin?',
    text: 'Anda akan dikembalikan ke halaman login admin.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Ya, Logout',
    cancelButtonText: 'Batal'
  })

  if (result.isConfirmed) {
    // CUKUP PANGGIL INI.
    // Aksi logout di store akan membersihkan state, cookie,
    // DAN mengarahkan pengguna. Kita akan buat ini lebih fleksibel.
    authStore.logout('/admin/auth/login')
  }
}


</script>

<template>
  <nav class="relative flex items-center border-b px-6 py-6 shadow-sm bg-white">
    <!-- Brand di kiri -->
    <div class="absolute left-[50px] text-[#328E6E] text-lg font-[Gilroy-Light] ">
      Ubud Art Market - Admin
    </div>

    <!-- Navigation Menu di tengah -->
    <ul class="mx-auto flex space-x-10 items-center text-sm font-medium text-gray-700">
      <NuxtLink to="/admin/main/dashboard" class="flex items-center space-x-2 hover:text-[#328E6E] cursor-pointer ">
        <img src="/assets/images/Dashboard.svg" class="fas fa-th-large text-gray-400 ">
        <span>Dashboard</span>
      </NuxtLink>
      <NuxtLink to="/admin/main/product" class="flex items-center space-x-2 hover:text-[#328E6E]  cursor-pointer">
        <img src="/assets/images/Products.svg" class="fas fa-th-large text-gray-400">
        <span>Produk</span>
      </NuxtLink>
      <NuxtLink to="/admin/main/shop" class="flex items-center space-x-2 hover:text-[#328E6E] cursor-pointer">
        <img src="/assets/images/Product Stock.svg" class="fas fa-th-large text-gray-400">
        <span>Toko</span>
      </NuxtLink>
      <NuxtLink to="/admin/main/news" class="flex items-center space-x-2 hover:text-[#328E6E] cursor-pointer">
        <img src="/assets/images/Invoice.svg" class="fas fa-th-large text-gray-400">
        <span>Berita</span>
      </NuxtLink>
    </ul>
    <button @click="confirmLogout" class="px-6 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition">
      Logout
    </button>
  </nav>
</template>
