import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default defineNuxtPlugin((nuxtApp) => {
  // Mendaftarkan komponen QuillEditor secara global
  nuxtApp.vueApp.component('QuillEditor', QuillEditor)
})