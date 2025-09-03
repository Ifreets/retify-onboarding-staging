<template>
  <li
    class="flex gap-3 py-2 border-b"
    @click="openOrder(order)"
  >
    <Image
      :url="order.products?.[0]?.images?.[0] || ''"
      container_class="w-21 h-21 object-contain shadow border border-slate-100 rounded-xl flex-shrink-0"
    >
      <div
        class="w-21 h-21 object-contain shadow border border-slate-100 rounded-xl flex-shrink-0 flex items-center justify-center bg-slate-100"
      >
        <CubeIcon class="w-14 h-14 flex-shrink-0 text-slate-700" />
      </div>
    </Image>

    <div class="flex flex-col w-full">
      <div class="flex justify-between font-medium">
        <p class="text-base text-slate-700">
          #{{ order.order_id }} -
          {{ order.created_date && format(order.created_date, 'HH:mm') }}
        </p>
        <div
          :class="`${last_status.bg_color} ${last_status.text_color} rounded-md py-0.5 px-2`"
          class="flex gap-1"
        >
          <p class="w-fit lg:max-w-20 truncate">
            {{ ACTION_STATUS_OBJ?.[last_status.action || '']?.name || '' }}
          </p>
        </div>
      </div>
      <p class="text-lg font-semibold">{{ order.contact_info?.first_name }}</p>
      <p class="text-lg font-semibold text-blue-700">{{ formatCurrency(order.total_money) }}</p>
    </div>
  </li>
</template>

<script setup lang="ts">
import { formatCurrency } from '@/services/format'
import { useOrderStore } from '@/stores/order'
import { useOrder } from '@/views/HomeView/order/composables/order'
import { format } from 'date-fns'
import { computed, type PropType } from 'vue'
import { useRouter } from 'vue-router'

import type { ActionStep, Order } from '@/interfaces'
import Image from '@/components/ui/Image.vue'
import { CubeIcon } from '@heroicons/vue/24/solid'

// props
const $props = defineProps({
  order: {
    type: Object as PropType<Order>,
    required: true,
  },
})

// store
const orderStore = useOrderStore()

// router
const router = useRouter()

// composable
const { ACTION_STATUS_OBJ } = useOrder()

/** trạng thái đang kích hoạt */
const last_status = computed(() => {
  return getLastStatus($props.order)
})

/** mở chi tiết đơn hàng */
function openOrder(order: Order) {
  // lưu đơn hàng được chọn vào store
  orderStore.selected_order = order
  // chuyển router
  router.push('/home/order/' + order.order_id)
}

/** Lấy trạng thái cuối đang được kích hoạt */
function getLastStatus(order: Order) {
  /** hành trình đơn hàng */
  const ORDER_JOURNEY = order.order_journey || []
  /** trạng thái cuối cùng */
  let last_status: ActionStep = {}
  /** lặp qua mảng hành trình đơn hàng */
  ORDER_JOURNEY?.forEach((step, index_step) => {
    /** lặp qua các trạng thái của từng bước */
    step?.forEach((status, index_status) => {
      // nếu không có trạng thái hoạt động thì thôi
      if (!status.is_active) return
      // lưu lại trạng thái được kích hoạt
      last_status = status
    })
  })
  return last_status
}
</script>
