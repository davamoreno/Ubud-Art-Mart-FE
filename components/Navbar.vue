<script setup lang="ts">
    import { useDark, useToggle } from '@vueuse/core';
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    const localePath = useLocalePath();

    const { locale, locales, setLocale } = useI18n()
    import { useI18n, useLocalePath } from '#imports'
</script>

<template>
    <nav class="flex items-center justify-between py-5 px-4 bg-orange-300 dark:bg-black shadow-md">
        <div class="text-xl font-bold text-gray-800 dark:text-white">
            Ubud Art Market
        </div>
        <div class="space-x-4">
            <NuxtLink :to="localePath('/')" class="nav-link">{{ $t('home') }}</NuxtLink>
            <NuxtLink to="/about" class="nav-link">About</NuxtLink>
            <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>

            <div class="flex items-center space-x-2">
                <button
                  v-for="lang in locales"
                  :key="lang.code"
                  @click="setLocale(lang.code)"
                  class="px-2 py-1 rounded border text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  :class="{ 'bg-gray-300 dark:bg-gray-600 font-bold': locale === lang.code }"
                >
                  {{ lang.flag }} {{ lang.name }}
                </button>
            </div>

            <client-only>
                <button @click="toggleDark()" class="text-md text-gray-600 dark:text-gray-200">
                    {{ isDark ? '🌙' : '☀️' }}
                </button>
            </client-only>  
        </div>
    </nav>
</template>

<style scoped>
.nav-link{
    @apply text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition;
}
</style>