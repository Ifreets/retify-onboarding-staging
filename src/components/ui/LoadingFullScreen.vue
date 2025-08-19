<template>
  <div
    v-if="loading"
    class="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
  >
    <div class="flex space-x-2">
      <div class="w-3 h-3 bg-white rounded-full animate-bounce"></div>
      <div
        class="w-3 h-3 bg-white rounded-full animate-bounce"
        style="animation-delay: 0.2s"
      ></div>
      <div
        class="w-3 h-3 bg-white rounded-full animate-bounce"
        style="animation-delay: 0.4s"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const $props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
})
</script>
