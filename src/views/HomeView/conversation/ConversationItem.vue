<template>
  <li class="flex gap-3 p-2 items-center">
    <img src="@/assets/image/avatar2.png" class="w-11 h-11 rounded-oval" />
    <div class="flex-grow overflow-hidden">
      <div class="flex-grow flex items-center overflow-hidden">
        <p class="truncate flex-grow text-lg font-semibold">Hoàng Đức Mạnh</p>
        <p
          class="flex-shrink-0"
          :class="{
            'font-medium': $props.index % 2 === 0,
            'text-slate-700': $props.index % 2 === 1,
          }"
        >
          5m ago
        </p>
      </div>
      <div class="flex-grow flex items-center overflow-hidden">
        <p class="truncate flex-grow text-base"
          :class="{
            'font-medium': $props.index % 2 === 0,
            'text-slate-700': $props.index % 2 === 1,
          }"
        >I want to change my shipping address</p>
        <BagdeDot v-if="$props.index % 2 === 0" :number="10" />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import BagdeDot from '@/components/common/BagdeDot.vue'

const $props = defineProps({
  index: {
    type: Number,
    required: true,
  },
})
</script>
