<template>
  <section
    ref="ref_order_list"
    class="overflow-auto"
  >
    <ul
      v-for="(item, date) in show_order"
      class="flex flex-col px-2 gap-2 last-of-type:pb-0 pb-5 cursor-pointer"
    >
      <div class="sticky top-0 bg-white">
        <p
          class="flex justify-between text-semibold py-0.5 px-2 rounded bg-slate-100 font-semibold text-slate-700"
        >
          <span>{{ date }}</span>
          <span>{{ formatCurrency(item.total) }}</span>
        </p>
      </div>
      <OrderItem
        v-for="order in item.list"
        :order="order"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import { formatCurrency, formatDate, roundMoney } from '@/services/format'
import { computed, ref, type PropType } from 'vue'

import OrderItem from '@/views/HomeView/order/OrderItem.vue'

import type { Order } from '@/interfaces'

/** props */
const $props = defineProps({
  orders: {
    type: Array as PropType<Order[]>,
    required: true,
  },
  getOrders: {
    type: Function,
    required: true,
  },
})

/** danh sách đơn hàng */
const ref_order_list = ref<HTMLElement | null>(null)

/** danh sách đơn hàng hiển thị ra màn hình */
const show_order = computed(() => {
  let result: {
    [key: string]: {
      list: Order[]
      total: number
    }
  } = {}

  /** lặp qua danh sách đơn hàng */
  $props.orders?.forEach((order: Order) => {
    /** ngày hạch toán */
    const DATE = order.created_date
    /** nếu không có ngày hạch toán thì thôi */
    if (!DATE) return
    /** định dạng lại ngày hạch toán */
    const FORMATED_DATE = formatDate(DATE)

    /** nếu đã có đơn hàng nào với ngày hiện tại thì thêm và mảng và cộng thêm tổng tiền */
    if (result[FORMATED_DATE]?.list) {
      /** tổng tiền của các đơn hàng của ngày hiện tại */
      const TOTAL_MONEY = result[FORMATED_DATE].total + (order.total_money || 0)
      result[FORMATED_DATE] = {
        list: [...result[FORMATED_DATE].list, order],
        total: roundMoney(TOTAL_MONEY),
      }
    } else {
      /** nếu chưa có thì khởi tạo */
      result[FORMATED_DATE] = {
        list: [order],
        total: roundMoney(order.total_money || 0),
      }
    }
  })
  /** Trả về danh sách đơn hàng */
  return result
})

/** composable */
useInfiniteScroll({
  element: ref_order_list,
  offset: 100,
  onLoadMore: $props.getOrders,
})
</script>
