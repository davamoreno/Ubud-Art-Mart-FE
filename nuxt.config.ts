// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
    },
  },
  
  runtimeConfig: {
    public : {
      apiBase : process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api'
    }
  },

  css : [
    '@/assets/css/main.css'
  ],
  
  appConfig: {
    darkModeKey: 'vueuse-color-scheme'
  },


  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxt/eslint', '@nuxtjs/i18n'],

  i18n: {
    langDir: resolve(process.cwd(), 'locales'),
    locales: [
      { code: 'en', iso: 'en', name: 'en', file: 'en.json', flag: '🇬🇧' },
      { code: 'id', iso: 'id' , name: 'id', file: 'id.json' , flag: '🇮🇩'},
    ],
    defaultLocale: 'id',
    lazy: true,
    strategy: 'prefix_except_default',
  },

  imports: {
    dirs: ['stores', 'composable']
  },

  nitro: {
    compressPublicAssets: true,
  },

  typescript:{
    strict: true,
    shim: false
  }

})