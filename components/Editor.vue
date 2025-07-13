<script setup lang="ts">
import { computed } from 'vue';

// 1. Definisikan props yang akan diterima dari parent
// Props adalah cara komponen menerima data dari luar.
const props = defineProps({
  // 'modelValue' adalah nama prop standar di Vue 3 untuk v-model.
  // Ini akan menerima konten teks dari parent.
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Tulis sesuatu di sini...'
  },
  label: {
    type: String,
    default: 'Deskripsi'
  }
});

// 2. Definisikan event yang akan dikirim kembali ke parent
const emit = defineEmits(['update:modelValue']);

// 3. Buat "jembatan" v-model menggunakan computed property
// Ini adalah cara best practice untuk membuat v-model di komponen kustom.
const content = computed({
  // Saat komponen membaca nilai, ia akan mengambil dari prop 'modelValue'.
  get: () => props.modelValue,
  // Saat pengguna mengetik di editor, nilai baru akan dikirim (emit) ke parent.
  set: (value) => {
    emit('update:modelValue', value);
  }
});

// Opsi untuk tombol-tombol yang ada di toolbar editor.
const editorOptions = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  ['link', 'image', 'video'],
  ['clean']
];
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <!--
      Komponen QuillEditor sekarang menggunakan 'content' dari computed property kita.
      Ini akan secara otomatis mengambil nilai dari prop dan mengirim update ke parent,
      sehingga v-model bisa bekerja dengan sempurna.
    -->
    <QuillEditor
      v-model:content="content"
      theme="snow"
      :toolbar="editorOptions"
      content-type="html"
      :placeholder="placeholder"
      style="height: 300px;"
    />
  </div>
</template>