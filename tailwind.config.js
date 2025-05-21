/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    fontFamily: {
      sans: ['JakartaSans', 'sans-serif']
    },
    extend: {
      colors : {
        primary : {
          light: '#4f46e5',
          dark: '#818cf8',
        }
      }
    },
  },
  plugins: [],
}

