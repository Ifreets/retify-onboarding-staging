<template>
  <PaginationRoot
    show-edges
    v-model:page="page"
    :total="total"
    :sibling-count="siblingCount"
    :items-per-page="itemsPerPage"
    @update:page="changePage"
  >
    <PaginationList
      v-slot="{ items }"
      class="flex items-center justify-center gap-1"
    >
      <PaginationFirst
        class="w-9 h-9 flex items-center justify-center disabled:opacity-50 rounded"
      >
        <ChevronDoubleLeftIcon class="size-4" />
      </PaginationFirst>
      <PaginationPrev
        class="w-9 h-9 flex items-center justify-center disabled:opacity-50 rounded"
      >
        <ChevronLeftIcon class="size-4" />
      </PaginationPrev>
      <template v-for="(page, index) in items">
        <PaginationListItem
          v-if="page.type === 'page'"
          :key="index"
          class="flex-shrink-0 size-8 border rounded data-[selected]:bg-blue-700 data-[selected]:text-white data-[selected]:border-blue-700 hover:bg-white/10 transition"
          :value="page.value"
        >
          {{ page.value }}
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
          class="w-9 h-9 flex items-center justify-center"
        >
          &#8230;
        </PaginationEllipsis>
      </template>
      <PaginationNext
        class="w-9 h-9 flex items-center justify-center disabled:opacity-50 rounded"
      >
        <ChevronLeftIcon class="size-4 rotate-180" />
      </PaginationNext>
      <PaginationLast
        class="w-9 h-9 flex items-center justify-center disabled:opacity-50 rounded"
      >
        <ChevronDoubleLeftIcon class="size-4 rotate-180" />
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
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
} from 'radix-vue';
import type { PropType } from 'vue';

import { ChevronDoubleLeftIcon, ChevronLeftIcon } from '@heroicons/vue/24/solid';

const $props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  siblingCount: {
    type: Number,
    default: 1,
  },
  itemsPerPage: {
    type: Number,
    default: 25,
  },
  changePage: {
    type: Function as PropType<(value: number) => void>,
    default: () => {},
  },
})

const page = defineModel<number>('page', {
  default: 1,
})
</script>
