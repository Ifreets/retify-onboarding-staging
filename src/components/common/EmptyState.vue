<template>
  <div class="h-full flex flex-col gap-5 overflow-hidden">
    <div class="flex-grow flex flex-col gap-5 items-center justify-center">
      <img :src="EmptyOrderImage" class="w-24 drop-shadow-xl" />
      <p class="text-xl font-medium text-slate-500">{{ empty_content }}</p>
      <button class="flex gap-1 items-center rounded-xl py-3 px-5 font-medium bg-black text-white">
        <PlusIcon class="size-4" />
        {{ add_content }}
      </button>
    </div>
    <div
      v-if="route.path?.includes('order') && route.path?.includes('customer')"
      class="text-blue-700 border border-blue-700 rounded-lg py-3 px-4 flex gap-3 bg-blue-50"
    >
      <SparklesIcon class="size-6 flex-shrink-0" />
      <div>
        <p class="text-base font-semibold">AI Retify is working</p>
        <p>
          Retify is currently generating your Selling Page and AI Agent. This message will disappear
          automatically once the process is complete.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

import EmptyOrderImage from '@/assets/image/empty-order.png'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { SparklesIcon } from '@heroicons/vue/24/solid'

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

const route = useRoute()

</script>
