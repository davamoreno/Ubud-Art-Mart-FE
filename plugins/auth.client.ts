export default defineNuxtPlugin(async (nuxtApp) => {
   const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    await authStore.initialize();
  }
})