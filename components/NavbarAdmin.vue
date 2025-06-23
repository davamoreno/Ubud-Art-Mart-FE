<script setup>
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const auth = useAuthStore()
const router = useRouter()

const confirmLogout = async () => {
  const result = await Swal.fire({
    title: 'Logout?',
    text: 'Apakah kamu yakin ingin logout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e3342f',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Ya, Logout',
    cancelButtonText: 'Batal'
  })

  if (result.isConfirmed) {
    auth.logout()
    router.push('/admin/auth/login')
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
      <NuxtLink to="/admin/main/produk" class="flex items-center space-x-2 hover:text-[#328E6E]  cursor-pointer">
        <img src="/assets/images/Products.svg" class="fas fa-th-large text-gray-400">
        <span>Produk</span>
      </NuxtLink>
      <NuxtLink to="/admin/main/toko" class="flex items-center space-x-2 hover:text-[#328E6E] cursor-pointer">
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
