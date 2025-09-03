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
              v-if="
                orderStore.selected_order?.contact_info?.contact_phones?.length
              "
              class="flex items-center gap-2 py-2 px-5 rounded-lg border text-slate-700"
              @click="
                openCallPhone(
                  'page.order',
                  orderStore.selected_order?.contact_info,
                )
              "
            >
              <SolidPhoneIcon class="size-4 text-black flex-shrink-0" />
              Call
            </button>
            <button
              v-if="
                orderStore.selected_order?.contact_info?.contact_sources?.length
              "
              class="flex items-center gap-2 py-2 px-5 text-white bg-blue-700 rounded-lg"
              @click="
                toChat('page.order', orderStore.selected_order?.contact_info)
              "
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
    <footer
      v-for="(step, step_index) in orderStore.selected_order?.order_journey"
      v-show="check_step_active === step_index"
      class="w-full flex flex-nowrap gap-1 p-2 text-base"
    >
      <!-- mobile -->
      <template v-for="(status, status_index) in step">
        <div
          class="flex-1 rounded-md flex items-center justify-center py-3.5 px-5 cursor-pointer font-semibold"
          :class="{
            [`${status.bg_color} ${status.text_color}`]: status,
          }"
          @click="activeStep(step_index, status_index, status)"
          v-if="
            orderStore.selected_order.status !== 'CANCEL_ORDER' &&
            (orderStore.selected_order.status === 'DRART_ORDER' ||
              status.action === 'CANCEL_ORDER')
          "
        >
          {{ action_status_obj?.[status.action || '']?.name || '' }}
        </div>
      </template>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { $order } from '@/api'
import { useNavigationHandler } from '@/composables/useNavigationHandler'
import { formatCurrency } from '@/services/format'
import { useOrderStore } from '@/stores/order'
import { ACTION_STATUS } from '@/utils/constant'
import { useOrder } from '@/views/HomeView/order/composables/order'
import { format } from 'date-fns'
import { cloneDeep } from 'lodash'
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

import type { ActionStatus, ActionStep, Order } from '@/interfaces'

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

// danh sách action dạng object
const action_status_obj = convert(ACTION_STATUS)

// * Check xem trạng thái đơn hàng nào đang được kích hoạt
const check_step_active = computed(() => {
  /** index của bước tiếp theo */
  let result = -1

  /** hành trình đơn hàng */
  const order_journey = orderStore.selected_order?.order_journey || []

  // lặp qua các bước của hành trình
  order_journey.forEach((step, index_step) => {
    // lặp qua các hành động của bước
    step.forEach(status => {
      // hành động nào đã được kích hoạt thì ghi lại index bước chứa hàng động đó
      if (status.is_active) result = index_step
    })
  })

  // index bước tiếp theo
  return result + 1
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

/** hàm chuyển đổi mảng action sang object */
function convert(array: ActionStatus[]) {
  /** object của action */
  let obj: { [key: string]: ActionStatus } = {}

  /** duyệt qua mảng action tạo ra 1 object với key là value của action,
   * giá trị là action đó */
  array.forEach(item => {
    obj[item.value] = item
  })

  // trả về dạng object
  return obj
}

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

/** Kích hoạt step tiếp theo */
async function activeStep(
  step_index: number,
  status_index: number,
  action: ActionStep,
) {
  /** trạng thái cũ của hàng trình đơn hàng */
  const PRE_ORDER_JOURNEY: ActionStep[][] = cloneDeep(
    orderStore.selected_order.order_journey || [],
  )

  try {
    /** action hành động */
    const ACTION = action.action
    // nếu không có hàng động thì thôi
    if (!ACTION) return
    // kích hoạt trạng thái tiếp theo
    activeStatus(step_index, status_index)
    // call api cập nhật
    await updateAnOrder(ACTION)
  } catch (e) {
    // nếu tạo đơn mới lỗi hoặc cập nhật trạng thái lỗi thì back hành trình đơn hàng về như cũ
    if (
      !orderStore.selected_order.id ||
      action !== orderStore.selected_order.status
    ) {
      orderStore.selected_order.order_journey = PRE_ORDER_JOURNEY
    }
  }
}

/** Kích hoạt 1 bước trong hành trình đơn hàng */
function activeStatus(step_index: number, status_index: number) {
  orderStore.selected_order.order_journey?.forEach((step, index_step) => {
    step.forEach((status, index_status) => {
      if (index_step === step_index && index_status === status_index) {
        status.is_active = true
      } else status.is_active = false
    })
  })
}

/** hàm cập nhật trạng thái của đơn hàng */
async function updateAnOrder(status: string) {
  try {
    await $order.updateOrder({
      id: orderStore.selected_order.id,
      status,
    })
  } catch (e) {
    console.log(e)
  }
}
</script>
