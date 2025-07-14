<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-black text-xl">&times;</button>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
        <input
          v-model="itemName"
          @keyup.enter="save"
          type="text"
          class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          :placeholder="`Masukkan nama ${placeholder}`"
        />
      </div>
      <div class="flex justify-end mt-6">
        <button @click="closeModal" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mr-2">Batal</button>
        <button @click="save" :disabled="isSubmitting" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300">
          {{ isSubmitting ? 'Menyimpan...' : 'Simpan' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean, // Untuk v-model
  title: String,
  placeholder: String,
  initialValue: String,
  isSubmitting: Boolean,
});

const emit = defineEmits(['update:modelValue', 'save']);

const itemName = ref('');

// Awasi perubahan initialValue dari parent
watch(() => props.initialValue, (newValue) => {
  itemName.value = newValue;
});

const closeModal = () => {
  emit('update:modelValue', false);
};

const save = () => {
  emit('save', itemName.value);
};
</script>