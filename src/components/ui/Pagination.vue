<template>
  <div class="flex justify-between items-center w-full">
    <PaginationRoot
      :show-edges="false"
      v-model:page="page"
      :total="total"
      :sibling-count="siblingCount"
      :items-per-page="page_size"
      @update:page="changePage"
    >
      <PaginationList
        v-slot="{ items }"
        class="flex items-center justify-center gap-1"
      >
        <PaginationFirst
          class="size-7 flex items-center justify-center disabled:opacity-50 rounded"
        >
          <ChevronDoubleLeftIcon class="size-4" />
        </PaginationFirst>
        <PaginationPrev
          class="size-7 flex items-center justify-center disabled:opacity-50 rounded"
        >
          <ChevronLeftIcon class="size-4" />
        </PaginationPrev>
        <template v-for="(page, index) in items">
          <PaginationListItem
            v-if="page.type === 'page'"
            :key="index"
            class="flex-shrink-0 size-7 border rounded data-[selected]:bg-blue-700 data-[selected]:text-white data-[selected]:border-blue-700 hover:bg-white/10 transition"
            :value="page.value"
          >
            {{ page.value }}
          </PaginationListItem>
          <PaginationEllipsis
            v-else
            :key="page.type"
            :index="index"
            class="size-7 flex items-center justify-center"
          >
            &#8230;
          </PaginationEllipsis>
        </template>
        <PaginationNext
          class="size-7 flex items-center justify-center disabled:opacity-50 rounded"
        >
          <ChevronLeftIcon class="size-4 rotate-180" />
        </PaginationNext>
        <PaginationLast
          class="size-7 flex items-center justify-center disabled:opacity-50 rounded"
        >
          <ChevronDoubleLeftIcon class="size-4 rotate-180" />
        </PaginationLast>
      </PaginationList>
    </PaginationRoot>
    <PopoverRoot v-model:open="is_open">
      <PopoverTrigger
        class="rounded-md border px-3 py-1 flex gap-2 items-center"
      >
        {{ page_size }} / page
        <ChevronDownIcon class="size-4" />
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          side="bottom"
          :side-offset="5"
          class="rounded p-2 border bg-white text-sm flex flex-col"
        >
          <button
            class="py-1 px-2 text-start rounded-md"
            v-for="option in OPTIONS"
            :class="{ 'bg-blue-700 text-white': page_size === option }"
            @click="changePageSize(option)"
          >
            {{ option }} / page
          </button>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>

<script setup lang="ts">
import {
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from 'radix-vue'
import { ref, type PropType } from 'vue'

import {
  ChevronDoubleLeftIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from '@heroicons/vue/24/solid'

const $props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  siblingCount: {
    type: Number,
    default: 1,
  },
  changePage: {
    type: Function as PropType<() => void>,
    default: () => {},
  },
})
/** danh sánh các option số trang trên 1 page */
const OPTIONS = [25, 50, 100]

/** ẩn hiện popover chọn số phần tử trên trang */
const is_open = ref(false)

/** trang hiện tại */
const page = defineModel<number>('page', {
  default: 1,
})

/** số phần tử trong 1 trang */
const page_size = defineModel<number>('page_size', {
  default: 25,
})

/** hàm chọn option số phần tử trên 1 trang */
function changePageSize(value: number) {
  // lưu lại dữ liệu pagging mới
  page.value = 1
  page_size.value = value
  // đóng popover
  is_open.value = false
  // call api
  $props.changePage()
}
</script>
