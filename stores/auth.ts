import { defineStore } from 'pinia'
import { useNuxtApp, useCookie, navigateTo } from '#imports'

// Definisikan interface User
interface User {
  id: number
  name: string
  email: string
  role: string
}

// Definisikan bentuk state kita
interface AuthState {
  token: string | null
  user: User | null
  isReady: boolean // State kunci untuk mencegah flicker
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: useCookie<string | null>('token').value, // Ambil token dari cookie sebagai nilai awal
    user: null, // Selalu mulai dengan user null, akan di-fetch kemudian
    isReady: false, // Mulai dalam keadaan "belum siap"
  }),

  getters: {
    // Getter ini sekarang sangat bisa diandalkan
    isAuthenticated: (state) => !!(state.token && state.user),
    isAdmin: (state) => state.user?.role === 'Admin',
    isCustomer: (state) => state.user?.role === 'Customer',
  },

  actions: {
    /**
     * Aksi untuk mengisi state setelah login atau fetch user.
     */
    setAuth({ token, user }: { token?: string, user?: User }) {
      if (token) {
        this.token = token
        useCookie('token').value = token
      }
      if (user) {
        this.user = user
      }
    },

    /**
     * Aksi login generik.
     * @param data - Data dari respons API login { token, user }.
     * @param redirectPath - Path tujuan setelah login berhasil.
     */
    async login(data: { token: string; user: User }, redirectPath: string = '/') {
      this.setAuth(data)
      this.isReady = true
      await navigateTo(redirectPath)
    },

    /**
     * Aksi untuk membersihkan state dan cookie saat logout.
     * @param redirectPath
     */
    logout(redirectPath: string = '/') {
      const tokenCookie = useCookie('token')
      tokenCookie.value = null

      this.user = null
      this.token = null
      this.isReady = true

      return navigateTo(redirectPath)
    },

    /**
     * Aksi ini untuk memvalidasi token yang ada dan mengambil data user terbaru.
     */
    async fetchUser() {
      if (!this.token) return

      const { $api } = useNuxtApp()
      try {
        const user = await $api('costumer/users', { method: 'GET' })
        this.user = user
      } catch (error) {
        console.error('Token tidak valid atau fetch user gagal. Melakukan logout.', error)
        this.logout()
      }
    },
    
    /**
     * Aksi inisialisasi. Hanya dipanggil satu kali oleh plugin.
     */
    async initialize() {
      if (this.isReady) return

      if (this.token) {
        await this.fetchUser()
      }

      this.isReady = true
    }
  }
})