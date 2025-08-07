<template>
  <img
    v-if="!is_error && url?.trim()"
    :src="url"
    @error="() => {
      is_error = true
    }"
  />
  <slot v-else />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const $props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const is_error = ref(false)
</script>
