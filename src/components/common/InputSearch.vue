<template>
  <div class="relative border rounded-lg bg-slate-50 border-slate-200">
    <MagnifyingGlassIcon
      class="text-slate-500 size-5 absolute left-4 top-0 bottom-0 my-auto pointer-events-none"
    />
    <input
      class="py-2 px-4 pl-11 w-full bg-transparent outline-none text-black placeholder:text-slate-500"
      type="text"
      :placeholder="placeholder"
      v-model="search"
      @input="debounceCallApi()"
    />
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash';

import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const $props = defineProps({
  placeholder: {
    type: String,
    default: 'Search...',
  },
  callApiSearch: {
    type: Function,
    required: true
  }
})

/** từ khóa tìm kiếm đơn hàng */
const search = defineModel('search', {
  default: ''
})

/** hàm debounce call api */
const debounceCallApi = debounce(() => {
  $props.callApiSearch()
}, 300)

</script>