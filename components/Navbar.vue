<script setup lang="ts">
import { computed } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { useI18n, useLocalePath, useNuxtApp, navigateTo } from '#imports';
import { useAuthStore } from '~/stores/auth';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';

const authStore = useAuthStore();

// Ambil state dan getter yang dibutuhkan dengan storeToRefs agar tetap reaktif
const { isReady, isAuthenticated, user } = storeToRefs(authStore);

// Sisa script untuk dark mode dan i18n
const isDark = useDark();
const toggleDark = useToggle(isDark);
const localePath = useLocalePath();
const { locale, locales, setLocale } = useI18n();

const selectedLocale = computed({
  get: () => locale.value || 'id',
  set: (val: string) => setLocale(val)
});

const confirmLogout = async () => {
  const result = await Swal.fire({
    title: 'Konfirmasi Logout',
    text: 'Apakah Anda yakin ingin keluar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Ya, Logout!',
    cancelButtonText: 'Batal'
  });

  if (result.isConfirmed) {
    authStore.logout();
  }
}
</script>

<template>
  <nav class="flex items-center justify-between py-5 px-5 bg-[#FFFFFF] dark:bg-black shadow-md">
    <div class="text-[25px] text-[#328E6E] font-[Gilroy-Light] dark:text-white">
      Ubud Art Market
    </div>
    <div class="flex items-center space-x-8">
      <div class="space-x-4">
        <NuxtLink :to="localePath('/')" class="nav-link">{{ $t('nav_bar.home') }}</NuxtLink>
        <NuxtLink to="/BeritaAcara" class="nav-link">{{ $t('nav_bar.event') }}</NuxtLink>
        <NuxtLink to="/user/katalog" class="nav-link">{{ $t('nav_bar.katalog') }}</NuxtLink>
        <NuxtLink to="/about" class="nav-link">{{ $t('nav_bar.about_us') }}</NuxtLink>
      </div>

      <div class="flex items-center space-x-4">

        <client-only>
          <button @click="toggleDark()"
            class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl text-gray-600 dark:text-gray-200 shadow">
            {{ isDark ? '🌙' : '☀️' }}
          </button>
        </client-only>

        <div
          class="flex items-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 shadow">
          <span class="mr-2 text-xl">🇮🇩</span> <select v-model="selectedLocale"
            class="bg-transparent text-sm text-gray-900 dark:text-white appearance-none focus:outline-none">
            <option v-for="lang in locales" :key="lang.code" :value="lang.code"
              :class="{ 'bg-gray-300 dark:bg-gray-600 font-bold': selectedLocale === lang.code }">
              {{ lang.code.toUpperCase() }} </option>
          </select>
        </div>

        <div class="flex items-center space-x-4">
          <div v-if="isReady">
            <div v-if="isAuthenticated">
              <button @click="confirmLogout"
                class="px-6 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition">
                Logout
              </button>
            </div>
            <div v-else>
              <NuxtLink
                class="px-6 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                :to="localePath('/user/auth/login')">
                {{ $t("nav_bar.login") }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  @apply text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition;
}
</style>