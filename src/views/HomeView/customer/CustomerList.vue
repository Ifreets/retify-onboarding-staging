<template>
  <section
    class="overflow-auto px-2"
    ref="ref_customer_list"
  >
    <ul
      v-for="(item, date) in show_contact"
      class="flex flex-col px-2 gap-2 last-of-type:pb-0 pb-5 cursor-pointer"
    >
      <div class="sticky top-0 bg-white">
        <p
          class="flex justify-between text-semibold py-0.5 px-2 rounded bg-slate-100 font-semibold text-slate-700"
        >
          {{ date }}
        </p>
      </div>
      <CustomerItem
        v-for="contact in item"
        :contact="contact"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import { formatDate } from '@/services/format'
import { computed, ref, type PropType } from 'vue'
import { useRouter } from 'vue-router'

import CustomerItem from '@/views/HomeView/customer/CustomerItem.vue'

import type { Contact } from '@/interfaces'

// router
const router = useRouter()

// props
const $props = defineProps({
  contacts: {
    type: Array as PropType<Contact[]>,
    required: true,
  },
  getContacts: {
    type: Function,
    required: true,
  }
})

/** danh sách khách hàng */
const ref_customer_list = ref<HTMLElement | null>(null)

/** danh sách danh bạ hiển thị ra màn hình */
const show_contact = computed(() => {
  /** kết quả */
  let result: {
    [key: string]: Contact[]
  } = {}

  // lặp qua danh sách đơn hàng
  $props.contacts?.forEach((order: Contact) => {
    /** ngày hạch toán */
    const DATE = order.createdAt
    // nếu không có ngày hạch toán thì thôi
    if (!DATE) return
    /** định dạng lại ngày hạch toán */
    const FORMATED_DATE = formatDate(DATE)

    // nếu đã có đơn hàng nào với ngày hiện tại thì thêm và mảng và cộng thêm tổng tiền
    if (result[FORMATED_DATE]) {
      result[FORMATED_DATE] = [...result[FORMATED_DATE], order]
    }
    // nếu chưa có thì khởi tạo
    else {
      result[FORMATED_DATE] = [order]
    }
  })
  return result
})

// composable
useInfiniteScroll({
  element: ref_customer_list,
  offset: 100,
  onLoadMore: $props.getContacts,
})
</script>
