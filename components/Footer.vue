<template>
  <footer class="text-white py-12 fixed w-full bottom-0" style="background-image: url('/assets/images/background.png');">
    <div class="container mx-auto px-5">
      <div class="flex flex-col md:flex-row justify-between items-center pb-8">
        <div class="text-[25px] font-[Gilroy-Light] mb-6 md:mb-0">
          Ubud Art Market
        </div>
        <div class="flex flex-wrap justify-center md:justify-end space-x-6">
          <a href="#" class="hover:underline">{{ $t('nav_bar.home') }}</a>
          <a href="#" class="hover:underline">{{ $t('nav_bar.event') }}</a>
          <a href="#" class="hover:underline">{{ $t('nav_bar.katalog') }}</a>
          <a href="#" class="hover:underline">{{ $t('nav_bar.about_us') }}</a>
        </div>
      </div>

      <hr class="border-gray-400 my-8">

      <div class="flex flex-col md:flex-row justify-between items-center pt-4 text-sm">
        <div class="mb-4 md:mb-0">
          © 2025 Ubud Art Market. All rights reserved.
        </div>
        <div class="flex space-x-6 text-lg">
          <a href="#" aria-label="Facebook" class="hover:text-gray-300">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Twitter" class="hover:text-gray-300">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="Instagram" class="hover:text-gray-300">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="LinkedIn" class="hover:text-gray-300">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Pastikan Font Awesome terinclude di proyek Anda jika menggunakan ikon ini: */
/* Contoh, di main.js atau file layout global Anda: */
/* import '@fortawesome/fontawesome-free/css/all.css'; */
/* Atau melalui CDN di index.html Anda: */
/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" /> */
</style>