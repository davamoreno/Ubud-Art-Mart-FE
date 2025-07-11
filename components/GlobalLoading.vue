<template>
  <Transition
    enter-active-class="transition-transform duration-500 ease-in-out"
    enter-from-class="transform -translate-y-full"
    enter-to-class="transform translate-y-0"
    leave-active-class="transition-transform duration-500 ease-in-out"
    leave-from-class="transform translate-y-0"
    leave-to-class="transform -translate-y-full"
  >
    <div v-if="isLoading" class="fixed inset-0 z-[999] flex items-center justify-center bg-white">
      <div class="flex flex-col items-center gap-4">
        <svg class="animate-spin h-10 w-10 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">Loading...</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { isLoading } = useLoadingState();
</script>