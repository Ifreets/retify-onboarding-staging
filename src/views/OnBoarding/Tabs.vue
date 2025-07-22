<template>
  <section class="flex gap-2">
    <div
      v-for="i in total_tabs"
      :key="i"
      class="h-1 flex-1 rounded-full duration-1000"
      :class="{
        'bg-blue-700': i <= current_tab,
        'bg-slate-200': i > current_tab,
      }"
    ></div>
  </section>
</template>
<script setup lang="ts">
const $props = defineProps({
  current_tab: {
    type: Number,
    required: true,
  },
  total_tabs: {
    type: Number,
    required: true,
  },
})
</script>
