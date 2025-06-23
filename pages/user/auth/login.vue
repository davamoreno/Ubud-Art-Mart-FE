<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { navigateTo } from '#app'
import Swal from 'sweetalert2'

const auth = useAuthStore();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const errorMessage = ref('')


// TAMBAHKAN INI:
const email = ref('')
const password = ref('')
const showPassword = ref(false)

// Fungsi submit login
const handleLogin = async () => {
    errorMessage.value = '' // Reset pesan error dulu
  try {
    const response = await $fetch(`${apiBase}costumer/users/login`, {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })

    auth.login({
      token: response.access_token,
      user: response.user,
      expiresIn: response.expires_in
    })

    // ✅ Tampilkan popup sukses
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil Login!',
      text: 'Selamat datang di Ubud Art Market!',
      confirmButtonColor: '#328E6E'
    })

    navigateTo('/')
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
<div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div class="mt-12 flex flex-col items-center">
                <h1 class="text-2xl xl:text-3xl font-extrabold">
                    Sign in
                </h1>
                <div class="w-full flex-1 mt-8">
                    <div class="flex flex-col items-center">
                        <button
                            class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-[#328E6E] text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                            <div class="bg-white p-2 rounded-full">
                                <svg class="w-4" viewBox="0 0 533.5 544.3">
                                    <path
                                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                        fill="#4285f4" />
                                    <path
                                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                        fill="#34a853" />
                                    <path
                                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                        fill="#fbbc04" />
                                    <path
                                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                        fill="#ea4335" />
                                </svg>
                            </div>
                            <span class="ml-4">
                                Sign In with Google
                            </span>
                        </button>

                        
                    </div>

                    <div class="my-12 border-b text-center">
                        <div
                            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or sign in with e-mail
                        </div>
                    </div>

                    <div class="mx-auto max-w-xs">
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email" name="email" v-model="email" />
                            <div class="relative mt-5">
    <input
      class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Password"
      name="password"
      v-model="password"
    />
    <button
      type="button"
      class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
      @click="showPassword = !showPassword"
    >
      <!-- Eye icon (hide/show) -->
      <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
          d="M2.458 12C3.732 7.943 7.522 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z" />
      </svg>
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <path
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.966 9.966 0 012.628-4.362M6.423 6.423A9.965 9.965 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.962 9.962 0 01-4.143 5.21M3 3l18 18" />
      </svg>
    </button>
  </div>
                        <button  @click="handleLogin"
                            class="mt-5 tracking-wide font-semibold bg-[#328E6E] text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span class="ml-3">
                                Sign In
                            </span>
                        </button>
                        <p class="mt-6 text-xs text-gray-600 text-center">
                            Don't Have An Account?
  <NuxtLink to="register" class="text-[#328E6E] font-semibold hover:underline">
   Sign Up Now
  </NuxtLink>
</p>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>