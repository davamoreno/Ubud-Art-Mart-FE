// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
   devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000/api/',
    }
  },
  nitro: {
    devProxy: {
      '/api/': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        prependPath: true
      }
    }
  },
  ssr: true,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
    },
  },

  css : [
    '@/assets/css/main.css'
  ],
  
  appConfig: {
    darkModeKey: 'vueuse-color-scheme'
  },


  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxt/eslint', '@nuxtjs/i18n'],

  i18n: {
    langDir: resolve(process.cwd(), 'locales/'),
    locales: [
      { code: 'en', iso: 'en', name: 'en', file: 'en.json', flag: '🇬🇧' },
      { code: 'id', iso: 'id' , name: 'id', file: 'id.json' , flag: '🇮🇩'},
    ],
    defaultLocale: 'id',
    lazy: false,
    strategy: 'prefix_except_default',
  },

  imports: {
    dirs: ['stores', 'composable']
  },

  typescript:{
    strict: true,
    shim: false
  }

})