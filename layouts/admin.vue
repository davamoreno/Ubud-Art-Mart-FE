<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-800">
    <NavbarAdmin/> <!-- atau komponen header kamu -->

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>