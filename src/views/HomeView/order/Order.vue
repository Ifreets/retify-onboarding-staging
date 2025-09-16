<template>
  <article class="h-full flex flex-col items-center justify-center relative">
    <header class="flex justify-between w-full px-2">
      <div class="w-20"></div>
      <h3 class="text-2xl font-semibold">Orders</h3>
      <div class="w-20"></div>
      <!-- <CreateButton /> -->
    </header>
    <section class="w-full h-full py-2 flex flex-col overflow-hidden">
      <OrderHeader
        v-model:search="search"
        v-model:filter_param="filter_param"
        :get-orders="getOrders"
      />
      <SkeletonLoading v-if="loading.first" />
      <template v-else>
        <OrderList
          v-if="orders.length"
          :orders="orders"
          :get-orders="getMoreOrder"
        />
        <EmptyState
          v-else
          add_content="New Order"
          empty_content="Not Found Order"
        />
      </template>
      <Loading :loading="loading.more" />
    </section>

    <!-- <AskRetionButton /> -->
  </article>
</template>

<script setup lang="ts">
import { $order } from '@/api'
import { useResumeAndPause } from '@/composables/useResumeAndPause'
import { useSocket } from '@/composables/useSocket'
import { useAppStore } from '@/stores'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import EmptyState from '@/components/common/EmptyState.vue'
import InputSearch from '@/components/common/InputSearch.vue'
import Loading from '@/components/common/Loading.vue'
import SkeletonLoading from '@/components/common/SkeletonLoading.vue'
import OrderList from '@/views/HomeView/order/OrderList.vue'

import type { Order } from '@/interfaces'
import OrderHeader from './OrderHeader.vue'

// route
const router = useRouter()
const route = useRoute()

// store
const appStore = useAppStore()

/** số bản ghi một lần lấy dữ liệu */
const LIMIT = 10

/** danh sách đơn hàng */
const orders = ref<Order[]>([])

/** từ khóa tìm kiếm */
const search = ref('')

/** dữ liệu lọc */
const filter_param = ref({
  status_list: [],
})

/** số bản ghi bắt đầu lấy */
const skip = ref(0)

/** trạng thái loading của đơn hàng */
const loading = ref({
  first: false,
  more: false,
})

/** cờ check xem đã load hết dữ liệu chưa */
const is_load_full = ref(false)

// composable
const { initSocket, closeSocket } = useSocket()
useResumeAndPause({ onResume: getOrdersWithoutSearch, onPaused: closeSocket })

onMounted(() => {
  // nếu có id trên url thì chuyển qua màn chi tiết luôn
  openDetailWithOrderIdUrl()

  // call api lấy danh sách đơn hàng
  getOrders()

  initSocket(
    appStore.merchant_data.employee_id,
    appStore.merchant_data.branch_id,
    handleSocket,
  )
})

onUnmounted(() => {
  closeSocket()
})

/** reset search và lấy danh sách khách hàng */
function getOrdersWithoutSearch() {
  search.value = ''

  getOrders()

  initSocket(
    appStore.merchant_data.employee_id,
    appStore.merchant_data.branch_id,
    handleSocket,
  )
}

/** Lấy danh sách đơn hàng */
async function getOrders() {
  try {
    // bật loading
    loading.value.first = true
    // clear skip
    skip.value = 0
    /** danh sách đơn hàng */
    const RES = await getOrder()
    // lưu lại
    orders.value = RES
  } catch (e) {
    console.log(e)
  } finally {
    // tắt loading
    loading.value.first = false
    // tắt cờ load hết dữ liệu
    is_load_full.value = false
  }
}

/** lấy thêm danh sách đơn hàng */
async function getMoreOrder() {
  try {
    // ngeries cờ load hết dữ liệu
    if (is_load_full.value) return

    // bật loading
    loading.value.more = true
    // tăng skip
    skip.value += LIMIT

    /** dữ liệu danh sách đơn hàng */
    const RES = await getOrder()

    // thêm danh sách vào danh sách đơn hàng hiện tại
    orders.value = [...orders.value, ...RES]

    /** nếu ít hơn số bản ghi cần lấy => đã lấy hết */
    if (RES.length < LIMIT) {
      is_load_full.value = true
    }
  } catch (e) {
    console.log(e)
  } finally {
    // tắt loading
    loading.value.more = false
  }
}

/** call api lấy danh sách đơn hàng */
async function getOrder() {
  /** dữ liệu truyền vào body */
  let body: Record<string, any> = {
    skip: skip.value,
    limit: LIMIT,
  }
  // nếu có search
  if (search.value) {
    body = {
      ...body,
      search: search.value,
    }
  }
  // nếu có trạng thái cần lọc
  if(!search.value && filter_param.value.status_list.length) {
    body = {
      ...body,
      status_list: filter_param.value.status_list,
    }
  }

  return await $order.getOrder(body)
}

/** hàm xử lý socket */
function handleSocket(data: any) {
  if (data.event === 'new_order') {
    orders.value = [data.data, ...orders.value]
  }
}

/** hàm xử lý khi có id order trên url thì chuyển qua màn chi tiết */
function openDetailWithOrderIdUrl() {
  /** id của đơn hàng trên url */
  const ORDER_ID = route.query.order_id

  // nếu có id trên url thì chuyển về màn chi tiết
  if (ORDER_ID) {
    router.push('/home/order/' + ORDER_ID)
  }
}
</script>
