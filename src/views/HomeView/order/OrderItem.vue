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
        <p class="text-base text-slate-700 flex items-center gap-1">
          <span class="truncate"> #{{ order.order_id }} - </span>
          <span class="flex-shrink-0">
            {{ order.created_date && format(order.created_date, 'HH:mm') }}
          </span>
          <component
            :is="SOURCE_ICON"
            class="size-5 flex-shrink-0"
          />
        </p>
        <div
          :class="`${last_status.bg_color} ${last_status.text_color} rounded-md py-0.5 px-2`"
          class="flex gap-1"
        >
          <p class="w-fit lg:max-w-28 truncate">
            {{ last_status.title }}
          </p>
        </div>
      </div>
      <p class="text-lg font-semibold">{{ order.contact_info?.first_name }}</p>
      <p class="text-lg font-semibold text-blue-700">
        {{ formatCurrency(order.total_money) }}
      </p>
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
import FacebookIcon from '@/components/icons/FacebookIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import WebsiteIcon from '@/components/icons/WebsiteIcon.vue'
import ZaloIcon from '@/components/icons/ZaloIcon.vue'

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

/** Icon nguồn đơn hàng */
const SOURCE_ICON = computed(() => {
  /** danh sách nguồn */
  const SOURCES = $props.order.contact_info?.contact_sources || []

  /** Nếu không có source nào thì mặc định là website */
  if (!SOURCES.length) return WebsiteIcon

  /** Lấy source đầu tiên */
  const SOURCE_TYPE = SOURCES[0].source

  switch (SOURCE_TYPE) {
    case 'FB_MESS':
    case 'FB_POST':
      return FacebookIcon
    case 'FB_INSTAGRAM':
      return InstagramIcon
    case 'ZALO_OA':
    case 'ZALO_PERSONAL':
      return ZaloIcon
    case 'WEBSITE':
    default:
      return WebsiteIcon
  }
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
  return order.last_order_journey || {}
}
</script>
