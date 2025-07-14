// plugins/api.js
import { ofetch } from 'ofetch'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const token = useCookie('token') // Ambil ref cookie

  // Buat instance ofetch (mesin di balik $fetch) yang sudah terkonfigurasi
  const apiFetch = ofetch.create({
    baseURL: config.public.apiBase,

    // Konfigurasi penting untuk mengirim header otentikasi
 onRequest({ options }) {
  if (token.value) {
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${token.value}`);
    options.headers = headers;
  }
},

    // Menangani error secara global
    async onResponseError({ response }) {
      if (response.status === 401) {
        // Contoh: jika token tidak valid, logout pengguna dan redirect
        console.error('Unauthorized, logging out.')
        // await nuxtApp.$auth.logout() // Jika pakai library auth
        // window.location.href = '/login'
      }
    }
  })

  // Sediakan instance fetch ini ke seluruh aplikasi
  return {
    provide: {
      api: apiFetch
    }
  }
})