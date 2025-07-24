<template>
  <div class="relative border rounded-lg bg-slate-50 border-slate-200 mb-3 mx-2">
    <MagnifyingGlassIcon
      class="text-slate-500 size-5 absolute left-4 top-0 bottom-0 my-auto pointer-events-none"
    />
    <input
      class="py-2 px-4 pl-11 w-full bg-transparent outline-none text-black placeholder:text-slate-500"
      type="text"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const $props = defineProps({
  placeholder: {
    type: String,
    default: 'Search...',
  },
})

</script>