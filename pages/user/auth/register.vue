<script setup lang="ts">
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { navigateTo } from '#app'

const auth = useAuthStore();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const showPassword = ref(false)
const showConfirm = ref(false)
const errorMessage = ref('')


// TAMBAHKAN INI:
const email = ref('')
const name = ref('')
const password = ref('')
const password_confirmation = ref('')



const handleRegister = async () => {
  errorMessage.value = '' // Reset pesan error dulu

  if (password.value !== password_confirmation.value) {
    errorMessage.value = 'Password tidak cocok!'
    return
  }

  try {
    const response = await $fetch(`${apiBase}costumer/users/register`, {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value
      }
    })

    // Simpan user ke store
    auth.register({
      user: response.user,
    })

    // ✅ Tampilkan popup sukses
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil Register!',
      text: 'Selamat datang di Ubud Art Market!',
      confirmButtonColor: '#328E6E'
    })

    navigateTo('/')
  } catch (error: any) {
    // ❌ Tampilkan popup error
    await Swal.fire({
      icon: 'error',
      title: 'Gagal Register',
      text: error?.data?.message || 'Cek kembali email dan password kamu!',
      confirmButtonColor: '#e3342f'
    })
  }
}


</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>

      <input v-model="name" type="text" placeholder="Name"
        class="w-full mb-4 px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />

      <input v-model="email" type="email" placeholder="Email"
        class="w-full mb-4 px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />

      <!-- Password Field -->
      <div class="relative mb-4">
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password"
          class="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
        <button type="button" @click="showPassword = !showPassword"
          class="absolute right-3 top-3 text-gray-500 hover:text-gray-800">
          <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              d="M2.458 12C3.732 7.943 7.522 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" viewBox="0 0 24 24">
            <path
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.966 9.966 0 012.628-4.362M6.423 6.423A9.965 9.965 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.962 9.962 0 01-4.143 5.21M3 3l18 18" />
          </svg>
        </button>
      </div>


      <!-- Confirm Password -->
      <div class="relative mb-2">
        <input :type="showConfirm ? 'text' : 'password'" v-model="password_confirmation" placeholder="Confirm Password"
          class="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
        <button type="button" @click="showConfirm = !showConfirm"
          class="absolute right-3 top-3 text-gray-500 hover:text-gray-800">
          <svg v-if="!showConfirm" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              d="M2.458 12C3.732 7.943 7.522 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" viewBox="0 0 24 24">
            <path
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.966 9.966 0 012.628-4.362M6.423 6.423A9.965 9.965 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.962 9.962 0 01-4.143 5.21M3 3l18 18" />
          </svg>
        </button>
      </div>
      <p v-if="errorMessage" class="text-red-500 text-sm mt-1">
        {{ errorMessage }}
      </p>


      <!-- Register Button -->
      <button @click="handleRegister"
        class="tracking-wide font-semibold bg-[#328E6E] text-white w-full py-3 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out">
        Sign Up
      </button>
      <p>Sudah punya akun</p>
      <p class="mt-6 text-xs text-gray-600 text-center">
        I agree to abide by Ubud Art Market's
        <a href="#" class="border-b border-gray-500 border-dotted">Terms of Service</a> and its
        <a href="#" class="border-b border-gray-500 border-dotted">Privacy Policy</a>
      </p>
    </div>
  </div>
</template>