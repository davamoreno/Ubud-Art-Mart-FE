<script setup>

</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-800">
    <Navbar/>
    
    <main class="flex-1">
      <slot />
    </main>

    <Footer />
  </div>
</template>