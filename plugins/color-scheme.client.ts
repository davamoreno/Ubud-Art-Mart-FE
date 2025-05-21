export default defineNuxtPlugin(() => {
  try {
    const theme = localStorage.getItem('vueuse-color-scheme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (theme === 'dark' || (!theme && prefersDark)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  } catch (e) {
    console.warn('Gagal set dark mode lebih awal', e)
  }
})
