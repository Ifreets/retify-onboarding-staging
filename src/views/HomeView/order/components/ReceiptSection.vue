<template>
  <div
    class="bg-[#f9f7f2] p-6 text-[#2d2a26] shadow-sm relative overflow-hidden font-mono"
    :class="{ 'border-b border-dashed border-gray-300 mb-2': !isLast }"
  >
    <!-- Decorative side perforations (subtle) -->
    <div
      class="absolute left-0 top-0 bottom-0 w-1 flex flex-col justify-around opacity-20"
    >
      <div
        v-for="i in 20"
        :key="`l-${i}`"
        class="w-1 h-1 bg-gray-400 rounded-full"
      ></div>
    </div>
    <div
      class="absolute right-0 top-0 bottom-0 w-1 flex flex-col justify-around opacity-20"
    >
      <div
        v-for="i in 20"
        :key="`r-${i}`"
        class="w-1 h-1 bg-gray-400 rounded-full"
      ></div>
    </div>

    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isLast?: boolean
}>()
</script>

<style scoped>
/* Optional: Add custom receipt font if available, fallback to mono */
</style>
