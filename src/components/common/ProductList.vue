<template>
  <section class="border py-3 px-4 rounded-lg flex flex-col gap-3">
    <div class="w-full flex justify-between text-base">
      <p class="font-semibold">{{ title }}</p>
      <p>Total Items: <span class="font-medium text-sm">7</span></p>
    </div>
    <div class="w-full h-px bg-slate-200"></div>
    <ProductItem v-for="i in 3" :key="i" />
  </section>
</template>

<script setup lang="ts">
import ProductItem from '@/components/common/ProductItem.vue';


const $props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
