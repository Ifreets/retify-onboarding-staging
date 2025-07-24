<template>
  <p
    class="rounded-full bg-red-500 text-white w-4.5 h-4.5 flex items-center justify-center font-medium text-xs"
  >
    {{ number }}
  </p>
</template>

<script setup lang="ts">
const $props = defineProps({
  number: {
    type: Number,
    required: true,
  },
})
</script>
