import { ref } from "vue"
import type { Order } from "@/interfaces"
import { defineStore } from "pinia"

/** store của đơn hàng */
export const useOrderStore = defineStore('order', () => {
  /** đơn hàng được chọn */
  const selected_order = ref<Order>({})
  return {
    selected_order,
  }
})