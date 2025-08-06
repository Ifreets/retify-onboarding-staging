<template>
  <div class="py-2 flex gap-3">
    <img :src="product.images?.[0]" class="size-20 object-contain border shadow rounded-xl" />
    <div class="text-base font-medium flex-1">
      <p>{{ product.product_name }}</p>
      <p>Quantity: {{ product.quantity }}</p>
      <p class="text-lg font-semibold text-blue-700">{{ product.price }}</p>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import type { PropType } from 'vue';

import type { OrderProduct } from '@/interfaces';

const $props = defineProps({
  product: {
    type: Object as PropType<OrderProduct>,
    required: true,
  },
})
</script>