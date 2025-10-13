<template>
  <header class="px-3 pb-3 flex flex-col gap-2">
    <div class="flex gap-2">
      <InputSearch
        class="w-full"
        v-model:search="filter_param.search"
        placeholder="Search products..."
        :call-api-search="searchProduct"
      />

      <DropdownMenuRoot v-model:open="is_open_filter_status">
        <DropdownMenuTrigger
          class="p-2 border rounded-md flex-shrink-0 flex gap-1.5"
          :class="{
            'bg-blue-200 text-blue-700 border-blue-700':
              filter_param.status?.length,
          }"
        >
          <FunnelIcon class="size-5 flex-shrink-0" />
          <span v-if="filter_param.status?.length">
            {{ filter_param.status?.length }}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            class="border p-2 bg-white rounded-lg text-sm flex flex-col gap-1"
            align="end"
            :sideOffset="6"
          >
            <DropdownMenuCheckboxItem
              :checked="filter_param.status?.includes(status.value)"
              @select="event => selectStatus(event, status.value)"
              v-for="status in PRODUCT_STATUS"
              class="hover:bg-slate-100 rounded-md py-1.5 px-2 cursor-pointer flex gap-2"
            >
              <div
                class="text-blue-700 bg-white flex items-center justify-center border rounded shadow size-5"
              >
                <DropdownMenuItemIndicator>
                  <CheckIcon class="w-4 h-4" />
                </DropdownMenuItemIndicator>
              </div>
              {{ status.name }}
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator class="h-[1px] bg-slate-200 m-[5px]" />
            <p
              class="text-red-500 cursor-pointer text-center"
              @click="clearAllStatus"
            >
              Clear all
            </p>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>

      <DropdownMenuRoot v-model:open="is_open_sort">
        <DropdownMenuTrigger
          class="p-2 border rounded-md flex-shrink-0 flex gap-1.5"
          :class="{
            'bg-blue-200 text-blue-700 border-blue-700': filter_param.sort,
          }"
        >
          <ArrowsUpDownIcon class="size-5 flex-shrink-0" />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            class="border p-2 bg-white rounded-lg text-sm flex flex-col gap-1"
            align="end"
            :sideOffset="6"
          >
            <template v-for="sort in SORT_BY">
              <p class="text-xs bg-slate-100 px-2 py-1 font-medium rounded-md">
                {{ sort.title }}
              </p>
              <DropdownMenuItem
                class="hover:bg-slate-100 rounded-md py-1.5 px-2 cursor-pointer flex gap-2 justify-between"
                @select="selectSort(sort.key, 'asc')"
              >
                {{ sort.asc_title }}
                <CheckIcon
                  v-if="filter_param.sort?.[sort.key] === 'asc'"
                  class="w-4 h-4"
                />
              </DropdownMenuItem>
              <DropdownMenuItem
                class="hover:bg-slate-100 rounded-md py-1.5 px-2 cursor-pointer flex gap-2 justify-between"
                @select="selectSort(sort.key, 'desc')"
              >
                {{ sort.desc_title }}
                <CheckIcon
                  v-if="filter_param.sort?.[sort.key] === 'desc'"
                  class="w-4 h-4"
                />
              </DropdownMenuItem>
            </template>
            <DropdownMenuSeparator class="h-[1px] bg-slate-200 m-[5px]" />
            <p
              class="text-red-500 cursor-pointer text-center"
              @click="clearSort"
            >
              Clear
            </p>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>

      <button
        v-if="
          filter_param.search ||
          filter_param.status?.length ||
          filter_param.sort ||
          filter_param.category_selected
        "
        class="p-2 border rounded-md flex-shrink-0 border-red-500 bg-red-100 text-red-500"
        @click="clearAllFilter"
      >
        <XMarkIcon class="size-5 flex-shrink-0" />
    </button>
    </div>
    <ul class="flex gap-2 overflow-auto w-full">
      <li
        class="min-w-max px-3 py-1 border border-slate-200 rounded-full cursor-pointer"
        :class="{
          'bg-blue-700 text-white': !filter_param.category_selected,
        }"
        @click="selectCategory()"
      >
        All
      </li>
      <li
        v-for="item of categories"
        class="min-w-max px-3 py-1 border border-slate-200 rounded-full cursor-pointer"
        :class="{
          'bg-blue-700 text-white':
            filter_param.category_selected === item.category_id,
        }"
        @click="selectCategory(item)"
      >
        {{ item?.name }}
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { PRODUCT_STATUS, SORT_BY } from '@/utils/constant'
import { debounce } from 'lodash'
import { ref, type PropType } from 'vue'

import InputSearch from '@/components/common/InputSearch.vue'
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'radix-vue'

import {
  ArrowsUpDownIcon,
  FunnelIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { CheckIcon } from '@heroicons/vue/24/solid'

import type { Category } from '@/interfaces'

const $props = defineProps({
  categories: {
    type: Array as PropType<Category[]>,
    required: true,
  },
  getDataFilter: {
    type: Function,
    required: true,
  },
})

/** filter param */
const filter_param = defineModel<{
  search: string
  category_selected?: string
  status?: string[]
  sort?: Record<string, 'asc' | 'desc'>
}>({
  default: {
    search: '',
  },
})

/** ẩn hiện dropdown lọc trạng thái */
const is_open_filter_status = ref(false)

/** ẩn hiện dropdown sắp xếp */
const is_open_sort = ref(false)

/** debounce search sản phẩm */
const searchProduct = debounce(() => {
  $props.getDataFilter()
}, 300)

/** chuyển danh mục */
function selectCategory(item?: Category) {
  filter_param.value.category_selected = item?.category_id || ''
  $props.getDataFilter()
}

/** chọn trạng thái cần lọc */
function selectStatus(event: Event, status: string) {
  /** ngăn hành động tắt dropdown */
  event.preventDefault()

  // nếu trạng thái đang chọn thì xóa đi
  if (filter_param.value.status?.includes(status)) {
    filter_param.value.status = filter_param.value.status.filter(
      item => item !== status,
    )
  }
  // nếu chưa chọn thì thêm vào
  else {
    filter_param.value.status = [...(filter_param.value.status || []), status]
  }

  // call api lấy dữ liệu
  $props.getDataFilter()
}

/** chọn loại sắp xếp */
function selectSort(key: string, type: 'asc' | 'desc') {
  filter_param.value.sort = {
    [`${key}`]: type,
  }
  $props.getDataFilter()
}

/** xóa tất cả lọc trạng thái */
function clearAllStatus() {
  filter_param.value.status = []
  is_open_filter_status.value = false
  $props.getDataFilter()
}

/** xóa sort */
function clearSort() {
  filter_param.value.sort = undefined
  is_open_sort.value = false
  $props.getDataFilter()
}

/** xóa tất cả lọc */
function clearAllFilter() {
  filter_param.value.search = ''
  filter_param.value.category_selected = ''
  filter_param.value.status = []
  filter_param.value.sort = undefined
  $props.getDataFilter()
}
</script>
