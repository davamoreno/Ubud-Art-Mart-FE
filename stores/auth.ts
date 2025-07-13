import { defineStore } from 'pinia'
import { useNuxtApp, useCookie, navigateTo } from '#imports'

// Definisikan interface untuk struktur data yang konsisten
interface User {
  id: number
  name: string
  email: string
  role: string
}

interface AuthState {
  token: string | null
  user: User | null
  isReady: boolean
  error: any | null // State untuk menyimpan error terakhir
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: useCookie<string | null>('token').value,
    user: null,
    isReady: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!(state.token && state.user),
    isAdmin: (state) => state.user?.role === 'Admin',
    isCustomer: (state) => state.user?.role === 'Customer',
  },

  actions: {
    /**
     * Aksi internal untuk mengatur state setelah login atau fetch.
     */
    setAuth({ token, user }: { token?: string, user?: User }) {
      if (token) {
        this.token = token
        // Set cookie dengan opsi keamanan, berlaku selama 7 hari
        useCookie('token', { maxAge: 60 * 60 * 24 * 7 }).value = token
      }
      if (user) {
        this.user = user
      }
    },

    /**
     * Aksi untuk login.
     * --- PERBAIKAN DI SINI ---
     * Mengubah 'access_token' menjadi 'token' agar sesuai dengan panggilan dari komponen.
     */
    async login(data: { token: string; user: User }, redirectPath: string = '/') {
      // Panggil setAuth dengan menggunakan 'data.token'
      this.setAuth({ token: data.token, user: data.user })
      this.isReady = true
      await navigateTo(redirectPath)
    },

    /**
     * Aksi untuk mendaftarkan user baru.
     */
    async register(payload: RegisterPayload) {
      const { $api } = useNuxtApp();
      this.error = null;

      try {
        await $api('auth/customer/register', {
          method: 'POST',
          body: payload,
        });
      } catch (error) {
        this.error = error;
        console.error('Gagal register:', error);
        throw error;
      }
    },

    /**
     * Aksi untuk membersihkan state dan cookie saat logout.
     */
    logout(redirectPath: string = '/') {
      const tokenCookie = useCookie('token')
      tokenCookie.value = null

      this.user = null
      this.token = null
      this.isReady = true

      // Menggunakan window.location untuk memaksa refresh halaman penuh,
      // ini adalah strategi yang valid untuk memastikan semua state bersih.
      if (process.client) {
        window.location.pathname = redirectPath;
      }
    },

    /**
     * Memvalidasi token yang ada dan mengambil data user terbaru.
     */
    async fetchUser() {
      if (!this.token) {
        this.isReady = true;
        return;
      }
      const { $api } = useNuxtApp()
      try {
        const response = await $api<{ data: User }>('profile', { method: 'GET' })
        this.user = response.data
      } catch (error) {
        console.error('Token tidak valid atau fetch user gagal. Melakukan logout.', error)
        this.logout('/')
      }
    },
    
    /**
     * Aksi inisialisasi, dipanggil oleh plugin saat aplikasi pertama kali dimuat.
     */
    async initialize() {
      if (this.isReady) return
      await this.fetchUser()
      this.isReady = true
    }
  }
})
