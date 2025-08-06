<template>
  <li class="flex gap-3 py-2 border-b">
    <img
      v-if="order.products?.[0]?.images?.[0]"
      :src="order.products?.[0]?.images?.[0]"
      class="w-21 h-21 object-contain shadow border border-slate-100 rounded-xl"
    />
    <div class="flex flex-col w-full">
      <div class="flex justify-between font-medium">
        <p class="text-base text-slate-700">
          #{{ order.order_id }} -
          {{ order.created_date && format(order.created_date, 'HH:mm') }}
        </p>
        <div v-if="order?.order_journey">
          <div v-for="(step, index) in order.order_journey">
            <div v-if="getLastStatus(order) === index">
              <div
                v-for="(status, status_index) in step"
                v-show="status.is_active"
                :class="`${status.bg_color} ${status.text_color} rounded-md py-0.5 px-2`"
                v-tooltip="action_status_obj?.[status.action || '']?.name || ''"
                class="flex gap-1"
              >
                <p class="w-fit lg:max-w-20 truncate">
                  {{ action_status_obj?.[status.action || '']?.name || '' }}
                </p>
                <LockClosedIcon
                  v-if="order?.is_locked"
                  class="w-4 h-4"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- <p v-if="$props.index % 2" class="bg-blue-500 text-white rounded-md py-0.5 px-2">
          New Order
        </p>
        <p v-else class="bg-green-500 text-white rounded-md py-0.5 px-2">Paid</p> -->
      </div>
      <p class="text-lg font-semibold">{{ order.contact_info?.first_name }}</p>
      <p class="text-lg font-semibold text-blue-700">{{ order.total_money }}</p>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import type { Order } from '@/interfaces'
import { format } from 'date-fns'
import { ACTION_STATUS } from '@/utils/constant';

type ActionStatus = typeof ACTION_STATUS[number]

const $props = defineProps({
  order: {
    type: Object as PropType<Order>,
    required: true,
  },
})

// danh sách action dạng object
const action_status_obj = convert(ACTION_STATUS);

/** Lấy trạng thái cuối đang được kích hoạt */
function getLastStatus(order: Order) {
  let order_journey = order.order_journey || []
  let index = 0
  order_journey.map((step, index_step) => {
    step.map((status, index_status) => {
      if (status.is_active) index = index_step
    })
  })
  return index
}

/** hàm chuyển đổi mảng action sang object */ 
function convert(array: ActionStatus[]) {
  /** object của action */
  let obj: { [key: string]: ActionStatus } = {};

  /** duyệt qua mảng action tạo ra 1 object với key là value của action, 
  * giá trị là action đó */ 
  array.forEach((item) => {
    obj[item.value] = item;
  });

  // trả về dạng object
  return obj;
}
</script>
