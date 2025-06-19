export default defineNuxtPlugin((nuxtApp) => {
    const auth = useAuthStore();
    const token = useCookie('token', { watch: false })
    const user = useCookie('user', { watch: false })

    try {
      if (token.value && user.value) {
        auth.token = token.value
        auth.user = typeof user.value === 'string' ? JSON.parse(user.value) : user.value
        auth.isReady = true
      }
    } catch (e) {
      auth.token = null
      auth.user = null
      auth.isReady = true
    }
})