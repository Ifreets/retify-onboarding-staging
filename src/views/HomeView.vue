<template>
  <main class="h-dvh w-dvw flex bg-white flex-col max-w-md mx-auto text-sm py-2">
    <div class="h-full overflow-hidden">
      <RouterView />
    </div>
    <Navigation />
  </main>
</template>

<script setup lang="ts">
import Navigation from '@/views/HomeView/Navigation.vue'
</script>
