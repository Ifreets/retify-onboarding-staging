<template>
  <article class="h-full flex flex-col items-center justify-center">
    <header class="flex justify-between items-center w-full px-2">
      <ArrowLeftIcon
        class="size-6"
        @click="back"
      />
      <h3 class="text-2xl font-semibold">Orders #{{ route.params.id }}</h3>
      <div class="w-6"></div>
    </header>
    <main class="w-full h-full px-2 py-3 gap-5 flex flex-col overflow-auto">
      <section class="border py-3 px-4 rounded-lg flex gap-2">
        <CheckBadgeIcon
          class="size-8"
          :class="`${last_status.bg_color?.replace('bg-', 'text-')}`"
        />
        <div class="w-full flex flex-col gap-3">
          <div class="flex justify-between items-center">
            <p
              class="text-lg font-semibold"
              :class="`${last_status.bg_color?.replace('bg-', 'text-')}`"
            >
              {{ ACTION_STATUS_OBJ?.[last_status.action || '']?.name || '' }}
            </p>
            <p class="text-base">
              Order ID:
              <span class="font-medium text-sm"
                >#{{ orderStore.selected_order?.order_id }}</span
              >
            </p>
          </div>
          <div class="w-full h-px bg-slate-200"></div>
          <p class="text-base">
            Order Date:
            <span
              class="font-medium text-sm"
              v-if="orderStore.selected_order?.createdAt"
              >{{
                format(orderStore.selected_order?.createdAt, 'MMMM d, yyyy')
              }}</span
            >
          </p>
          <div class="flex justify-between items-center">
            <p class="text-base">
              Total Items:
              <span class="font-medium text-sm">
                {{ orderStore.selected_order?.products?.length }}
              </span>
            </p>
            <p class="text-xl font-semibold text-blue-700">
              {{ formatCurrency(orderStore.selected_order?.total_money) }}
            </p>
          </div>
        </div>
      </section>

      <section class="border py-3 px-4 rounded-lg flex gap-3">
        <Image
          :url="orderStore.selected_order?.contact_info?.avatar || ''"
          container_class="size-11 rounded-full object-contain flex-shrink-0"
        >
          <div
            class="size-11 flex-shrink-0 rounded-full flex items-center justify-center bg-slate-100"
          >
            <UserIcon class="w-7 h-7 flex-shrink-0 text-slate-700" />
          </div>
        </Image>
        <div class="w-full flex flex-col gap-3">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-base font-semibold">
                {{ orderStore.selected_order?.contact_info?.first_name }}
                {{ orderStore.selected_order?.contact_info?.last_name }}
              </p>
              <p class="text-slate-700">
                {{
                  orderStore.selected_order?.contact_info?.contact_emails?.[0]
                    ?.email
                }}
              </p>
            </div>
            <button
              class="py-1.5 px-3 border rounded font-semibold text-slate-700"
              @click="toCustomer(orderStore.selected_order?.contact_id)"
            >
              View Profile
            </button>
          </div>
          <div class="w-full h-px bg-slate-200"></div>
          <p class="flex gap-2 items-center text-base">
            <PhoneIcon class="size-4 text-slate-700 flex-shrink-0" />
            {{
              orderStore.selected_order?.contact_info?.contact_phones?.[0]
                ?.phone_number
            }}
          </p>
          <p
            class="flex gap-2 items-center text-base"
            v-if="
              orderStore.selected_order?.contact_info?.contact_address?.[0]
                ?.address
            "
          >
            <MapPinIcon class="size-4 text-slate-700 flex-shrink-0" />
            {{
              orderStore.selected_order?.contact_info?.contact_address?.[0]
                ?.address
            }}
          </p>
          <div class="font-semibold flex gap-2.5 text-base">
            <button
              v-if="orderStore.selected_order?.contact_info?.contact_phones?.length"
              class="flex items-center gap-2 py-2 px-5 rounded-lg border text-slate-700"
              @click="openCallPhone('page.order', orderStore.selected_order?.contact_info)"
            >
              <SolidPhoneIcon class="size-4 text-black flex-shrink-0" />
              Call
            </button>
            <button
              v-if="orderStore.selected_order?.contact_info?.contact_sources?.length"
              class="flex items-center gap-2 py-2 px-5 text-white bg-blue-700 rounded-lg"
              @click="toChat('page.order', orderStore.selected_order?.contact_info)"
            >
              <ChatBubbleOvalLeftEllipsisIcon class="size-4" />
              Message
            </button>
          </div>
        </div>
      </section>

      <ProductList
        title="Ordered Items"
        :products="orderStore.selected_order?.products || []"
      />

      <section class="border py-3 px-4 rounded-lg flex gap-2">
        <DollarSignIcon class="size-8 flex-shrink-0" />
        <div class="flex flex-col gap-3 w-full">
          <p class="font-semibold">Payment Summary</p>
          <div class="h-px w-full bg-slate-200"></div>
          <p class="flex justify-between font-medium">
            Subtotal
            <span class="font-semibold text-lg">
              {{ formatCurrency(orderStore.selected_order?.price) }}
            </span>
          </p>
          <p class="flex justify-between font-medium text-red-500">
            Discount
            <span class="font-semibold text-lg">
              {{ formatCurrency(orderStore.selected_order?.discount) }}
            </span>
          </p>
          <div class="h-px w-full bg-slate-200"></div>
          <p class="flex justify-between font-semibold text-lg">
            Total
            <span class="text-xl text-blue-700">
              {{ formatCurrency(orderStore.selected_order?.total_money) }}
            </span>
          </p>
        </div>
      </section>
    </main>
  </article>
</template>

<script setup lang="ts">
import { $order } from '@/api'
import { useNavigationHandler } from '@/composables/useNavigationHandler'
import { formatCurrency } from '@/services/format'
import { useOrderStore } from '@/stores/order'
import { useOrder } from '@/views/HomeView/order/composables/order'
import { format } from 'date-fns'
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ProductList from '@/components/common/ProductList.vue'
import Image from '@/components/ui/Image.vue'

import DollarSignIcon from '@/components/icons/DollarSignIcon.vue'
import { ArrowLeftIcon, MapPinIcon, PhoneIcon } from '@heroicons/vue/24/outline'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  CheckBadgeIcon,
  PhoneIcon as SolidPhoneIcon,
  UserIcon,
} from '@heroicons/vue/24/solid'

import type { ActionStep, Order } from '@/interfaces'

// store
const orderStore = useOrderStore()

// router
const router = useRouter()
const route = useRoute()

// composable
const { ACTION_STATUS_OBJ } = useOrder()
const { toChat, toCustomer, openCallPhone } = useNavigationHandler()

/** trạng thái đang kích hoạt */
const last_status = computed(() => {
  return getLastStatus(orderStore.selected_order)
})

onMounted(() => {
  // nếu chưa có dữ liệu id thì thôi
  if (orderStore.selected_order.order_id) return
  // call api lấy dữ liệu cửa đơn hàng trên url
  getOrderOnUrl()
})

onUnmounted(() => {
  orderStore.selected_order = {}
})

/** lấy dữ liệu cửa đơn hàng trên url */
async function getOrderOnUrl() {
  try {
    // nếu không có id trên url
    if (!route.params.id) return

    // call api lấy dữ liệu cửa đơn hàng
    const RES = await $order.getOrder({
      order_id: route.params.id as string,
    })

    // lưu lại dữ liệu cửa đơn hàng
    orderStore.selected_order = RES
  } catch (e) {
    console.log(e)
  }
}

/** hàm trở lại màn danh sách đơn hàng */
function back() {
  router.push('/home/order')
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
