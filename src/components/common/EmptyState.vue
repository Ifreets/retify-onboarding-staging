<template>
  <div class="h-full flex flex-col gap-5 overflow-hidden">
    <div class="flex-grow flex flex-col gap-5 items-center justify-center">
      <img :src="EmptyOrderImage" class="w-24 drop-shadow-xl" />
      <p class="text-xl font-medium text-slate-500">{{ empty_content }}</p>
      <button class="flex gap-1 items-center rounded-xl py-3 px-5 font-medium bg-black text-white">
        <!-- <PlusIcon class="size-4" /> -->
        {{ add_content }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import EmptyOrderImage from '@/assets/image/empty-order.png'
import { PlusIcon } from '@heroicons/vue/24/outline'

const $props = defineProps({
  empty_content: {
    type: String,
    default: 'Not Found',
  },
  add_content: {
    type: String,
    default: 'New',
  },
})
</script>
