<template>
  <article class="h-full flex flex-col items-center justify-center relative">
    <header class="flex justify-between w-full px-2">
      <div class="w-20"></div>
      <h3 class="text-2xl font-semibold">Orders</h3>
      <CreateButton />
    </header>
    <section class="w-full h-full py-2 flex flex-col overflow-hidden">
      <InputSearch
        v-model:search="search"
        placeholder="Search Orders..."
        :call-api-search="getOrder"
      />
      <OrderList
        v-if="orders.length"
        :orders="orders"
      />
      <EmptyState
        v-else
        add_content="New Order"
        empty_content="Not Found Order"
      />
    </section>

    <AskRetionButton />
  </article>
</template>

<script setup lang="ts">
import { $order } from '@/api/order'
import { onMounted, ref } from 'vue'

import AskRetionButton from '@/components/common/AskRetionButton.vue'
import CreateButton from '@/components/common/CreateButton.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import InputSearch from '@/components/common/InputSearch.vue'
import OrderList from '@/views/HomeView/order/OrderList.vue'

import type { Order } from '@/interfaces'

/** danh sách đơn hàng */
const orders = ref<Order[]>([])

const search = ref('')

onMounted(() => {
  // call api lấy danh sách đơn hàng
  getOrder()
})

/** Lấy danh sách đơn hàng */
async function getOrder() {
  try {
    /** danh sách đơn hàng */
    const RES = await $order.getOrder({
      skip: 0,
      limit: 10,
      search: search.value,
    })
    // lưu lại
    orders.value = RES
  } catch (e) {}
}
</script>
