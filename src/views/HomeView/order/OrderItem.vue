<template>
  <li class="flex gap-3 py-2 border-b">
    <img src="@/assets/image/product.png" class="w-21 h-21" />
    <div class="flex flex-col w-full">
      <div class="flex justify-between font-medium">
        <p class="text-base text-slate-700">#103429 - 20:25</p>
        <p v-if="$props.index % 2" class="bg-blue-500 text-white rounded-md py-0.5 px-2">
          New Order
        </p>
        <p v-else class="bg-green-500 text-white rounded-md py-0.5 px-2">Paid</p>
      </div>
      <p class="text-lg font-semibold">Sophia Chen</p>
      <p class="text-lg font-semibold text-blue-700">$60.00</p>
    </div>
  </li>
</template>

<script setup lang="ts">
const $props = defineProps({
  index: {
    type: Number,
    required: true,
  },
})
</script>
