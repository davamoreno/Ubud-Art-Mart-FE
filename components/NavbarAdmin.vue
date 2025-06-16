<template>
    <nav class="relative flex items-center border-b px-6 py-6 shadow-sm bg-white">
      <!-- Brand di kiri -->
      <div class="absolute left-[50px] text-[#328E6E] text-lg font-[Gilroy-Light] ">
        Ubud Art Market - Admin
      </div>
  
      <!-- Navigation Menu di tengah -->
      <ul class="mx-auto flex space-x-10 items-center text-sm font-medium text-gray-700">
        <li class="flex items-center space-x-2 hover:text-[#328E6E] cursor-pointer ">
          <img src="/assets/images/Dashboard.svg" class="fas fa-th-large text-gray-400 ">
          <span>Dashboard</span>
        </li>
        <li class="flex items-center space-x-2 hover:text-[#328E6E]  cursor-pointer">
          <img src="/assets/images/Products.svg" class="fas fa-th-large text-gray-400">
          <span>Produk</span>
        </li>
        <li class="flex items-center space-x-2 hover:text-[#328E6E] cursor-pointer">
          <img src="/assets/images/Product Stock.svg" class="fas fa-th-large text-gray-400">
          <span>Toko</span>
        </li>
        <li class="flex items-center space-x-2 hover:text-[#328E6E] cursor-pointer">
          <img src="/assets/images/Invoice.svg" class="fas fa-th-large text-gray-400">
          <span>Berita</span>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavbarAdmin',
  };
  </script>
  
 

