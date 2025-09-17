<template>
  <header class="flex gap-2 pb-3 px-2">
    <InputSearch
      class="w-full"
      v-model:search="search"
      placeholder="Search Orders..."
      :call-api-search="getOrders"
    />
    <DropdownMenuRoot v-model:open="is_open_filter_status">
      <DropdownMenuTrigger
        class="p-2 border rounded-md flex-shrink-0 flex gap-1.5"
        :class="{
          'bg-blue-200 text-blue-700 border-blue-700':
            filter_param.status_list?.length,
        }"
      >
        <FunnelIcon class="size-5 flex-shrink-0" />
        <span v-if="filter_param.status_list?.length">
          {{ filter_param.status_list?.length }}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          class="border p-2 bg-white rounded-lg text-sm flex flex-col gap-1"
          align="end"
          :sideOffset="6"
        >
          <DropdownMenuCheckboxItem
            :checked="filter_param.status_list?.includes(status.value)"
            @select="event => selectStatus(event, status.value)"
            v-for="status in ORDER_STATUS"
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
  </header>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { ORDER_STATUS } from '@/utils/constant'

import InputSearch from '@/components/common/InputSearch.vue'
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItemIndicator,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'radix-vue'

import { CheckIcon } from '@heroicons/vue/24/solid'
import { FunnelIcon } from '@heroicons/vue/24/outline'

interface Props {
  getOrders: () => void
}

const $props = defineProps<Props>()

/** từ khóa tìm kiếm */
const search = defineModel('search', { type: String, default: '' })

/** dữ liệu lọc */
const filter_param = defineModel('filter_param', {
  type: Object as PropType<{ status_list: string[] }>,
  default: {
    status_list: [],
  },
})

/** ẩn hiển popover lọc trạng thái */
const is_open_filter_status = ref(false)

/** chọn trạng thái cần lọc */
function selectStatus(event: Event, status: string) {
  // ngăn hành động tắt dropdown
  event.preventDefault()

  // nếu trạng thái đang chọn thì xóa đi
  if (filter_param.value.status_list?.includes(status)) {
    filter_param.value.status_list = filter_param.value.status_list.filter(
      item => item !== status,
    )
  }
  // nếu chưa chọn thì thêm vào
  else {
    filter_param.value.status_list = [
      ...(filter_param.value.status_list || []),
      status,
    ]
  }

  // call api lấy dữ liệu
  $props.getOrders()
}

/** xóa tất cả lọc trạng thái */
function clearAllStatus() {
  filter_param.value.status_list = []
  $props.getOrders()
  is_open_filter_status.value = false
}
</script>
