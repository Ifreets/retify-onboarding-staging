<template>
  <section class="border py-3 px-4 rounded-lg flex flex-col gap-3">
    <div class="w-full flex justify-between text-base">
      <p class="font-semibold">{{ title }}</p>
      <p>
        Total Items:
        <span class="font-medium text-sm">{{ products.length }}</span>
      </p>
    </div>
    <div class="w-full h-px bg-slate-200"></div>
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
    <div
      v-if="note"
      class="w-full text-sm text-slate-500"
    >
      Note:
      {{ note }}
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductItem from '@/components/common/ProductItem.vue'
import type { PropType } from 'vue'

import type { OrderProduct } from '@/interfaces'

const $props = defineProps({
  title: {
    type: String,
    required: true,
  },
  products: {
    type: Array as PropType<OrderProduct[]>,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
})
</script>
