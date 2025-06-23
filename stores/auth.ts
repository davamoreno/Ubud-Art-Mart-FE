import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface Register {
  id: number
  name: string
  email: string
  password: string
  password_confirmation: string
  role: string
}

interface AuthState {
  token: string | null
  user: User | null
  expiresIn: number | null
  isReady: boolean | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
    expiresIn: null,
    isReady: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isCustomer: (state) => state.user?.role === 'Costumer',
    isAdmin: (state) => state.user?.role === 'Admin',
  },

  actions: {
    login(data: { token: string; user: User; expiresIn: number }) {
      this.token = data.token
      this.user = data.user
      this.expiresIn = data.expiresIn
      this.isReady = true

      useCookie('token').value = data.token
      useCookie('user').value = JSON.stringify(data.user)

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    register(data: { user: Register; }) {

      this.user = data.user
      this.isReady = true

    },



    logout() {
      this.token = null
      this.user = null
      this.expiresIn = null
      this.isReady = false

      useCookie('token').value = null
      useCookie('user').value = null
    },

    initializeFromStorage() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
      }
      this.isReady = true
    }
  }
})
