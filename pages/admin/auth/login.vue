<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { navigateTo } from '#app'
import Swal from 'sweetalert2'

const auth = useAuthStore()
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const email = ref('')
const password = ref('')
const showPassword = ref(false)

definePageMeta({
  layout: 'blank'
})

const handleLogin = async () => {
  try {
    const response = await $fetch(`${apiBase}auth/admin/login`, {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })

    auth.login({
      token: response.access_token,
      user: response.user,
      expiresIn: response.expires_in
    })
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil Login!',
      text: 'Selamat datang Admin!',
      confirmButtonColor: '#328E6E'
    })

    navigateTo('/admin/main/dashboard')
  } catch (error: any) {
    // ❌ Tampilkan popup error
    await Swal.fire({
      icon: 'error',
      title: 'Gagal Login',
      text: error?.data?.message || 'Cek kembali email dan password kamu!',
      confirmButtonColor: '#e3342f'
    })
  }
}

</script>

<template>
  <div class="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-green-400 to-green-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
      </div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

        <div class="max-w-md mx-auto">
          <div>
            <h1 class="text-2xl font-semibold">Login</h1>
          </div>
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div class="relative">
                <input autocomplete="on" id="email" name="email" type="text"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                  placeholder="Email address" v-model="email" />
                <label for="email"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email
                  Address</label>
              </div>
              <div class="relative">
                <input autocomplete="on" id="password" name="password" :type="showPassword ? 'text' : 'password'"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                  placeholder="Password" v-model="password" />

                <button type="button"
                  class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                  @click="showPassword = !showPassword">
                  <!-- Eye icon (hide/show) -->
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
                <label for="password"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
              </div>
              <div class="relative">
                <button class="bg-green-500 text-white rounded-md px-2 py-1" @click="handleLogin">Submit</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>