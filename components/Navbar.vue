<script setup lang="ts">
    import { useDark, useToggle } from '@vueuse/core';
    import { useI18n, useLocalePath } from '#imports';
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    const localePath = useLocalePath();
    const { locale, locales, setLocale } = useI18n()

    const selectedLocale = computed({
        get() {
            return locale.value || 'id' // fallback supaya tidak kosong
        },
        set(val: string) {
            setLocale(val)
        }
    })

</script>

<template>
    <nav class="flex items-center justify-between py-5 px-5 bg-[#FFFFFF] dark:bg-black shadow-md">
        <div class="text-[25px] text-[#328E6E] font-[Gilroy-Light] dark:text-white">
            Ubud Art Market
        </div>
        <div class="flex items-center space-x-8">
            <div class="space-x-4">
                <NuxtLink :to="localePath('/')" class="nav-link">{{ $t('nav_bar.home') }}</NuxtLink>
                <NuxtLink to="/event-news" class="nav-link">{{ $t('nav_bar.event') }}</NuxtLink>
                <NuxtLink to="/katalog" class="nav-link">{{ $t('nav_bar.katalog') }}</NuxtLink>
                <NuxtLink to="/about" class="nav-link">{{ $t('nav_bar.about_us') }}</NuxtLink>
            </div>

            <div class="flex items-center space-x-4">
                <div class="relative">
                    <input type="text" placeholder="Search..." class="pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#328E6E]">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </span>
                </div>

                <client-only>
                    <button @click="toggleDark()" class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl text-gray-600 dark:text-gray-200 shadow">
                        {{ isDark ? '🌙' : '☀️' }}
                    </button>
                </client-only>

                <div class="flex items-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 shadow">
                     <span class="mr-2 text-xl">🇮🇩</span> <select v-model="selectedLocale"
                         class="bg-transparent text-sm text-gray-900 dark:text-white appearance-none focus:outline-none">
                         <option
                           v-for="lang in locales"
                           :key="lang.code"
                           :value="lang.code"
                           :class="{ 'bg-gray-300 dark:bg-gray-600 font-bold': selectedLocale === lang.code }"
                         >
                           {{ lang.code.toUpperCase() }} </option>
                     </select>
                </div>
                
                <button class="px-6 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                    Sign in
                </button>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.nav-link{
    @apply text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition;
}
</style>