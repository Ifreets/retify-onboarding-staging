<template>
  <article class="h-full flex flex-col items-center justify-center">
    <header class="relative flex justify-between items-center w-full px-2">
      <!-- Nút back bên trái -->
      <ArrowLeftIcon
        class="size-6 cursor-pointer z-10"
        @click="back"
      />
      <!-- Tiêu đề căn giữa absolute -->
      <h3
        class="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold"
      >
        Orders #{{ route.params.id }}
      </h3>
      <!-- Nút Pay và Print bên phải -->
      <div class="relative top-6 right-4 flex gap-1.5 z-10">
        <!-- Nút Pay -->
        <button
          class="flex items-center gap-1 py-1 px-2 bg-blue-600 text-white rounded-md font-medium text-xs hover:bg-blue-700 transition-colors"
          @click="handlePay"
        >
          <CreditCardIcon class="size-3.5" />
          Pay
        </button>
        <!-- Nút Print -->
        <button
          class="flex items-center gap-1 py-1 px-2 bg-blue-600 text-white rounded-md font-medium text-xs hover:bg-blue-700 transition-colors"
          @click="handlePrint"
        >
          <PrinterIcon class="size-3.5" />
          Print
        </button>
      </div>
    </header>
    <main class="w-full h-full px-2 py-3 gap-5 flex flex-col overflow-auto">
      <!-- Thông tin đơn hàng -->
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
              {{ last_status.title || '' }}
            </p>
            <p class="text-base">
              Order ID:
              <span class="font-medium text-sm">
                #{{ orderStore.selected_order?.order_id }}
              </span>
            </p>
          </div>
          <div class="w-full h-px bg-slate-200"></div>
          <p class="">
            <span v-if="orderStore.selected_order?.payment_platform">
              {{ orderStore.selected_order?.payment_platform }} :
            </span>
            <span>
              {{ orderStore.selected_order?.payment_transaction_id }}
            </span>
          </p>
          <p class="text-base">
            Order Date:
            <span
              class="font-medium text-sm"
              v-if="orderStore.selected_order?.createdAt"
            >
              {{ format(orderStore.selected_order?.createdAt, 'MMMM d, yyyy') }}
            </span>
          </p>
          <p
            class="text-base"
            v-if="orderStore.selected_order?.schedule_time"
          >
            Pickup Time:
            <span class="font-medium text-sm">
              {{
                format(
                  orderStore.selected_order?.schedule_time,
                  'HH:mm - MMMM d, yyyy',
                )
              }}
            </span>
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

      <!-- Thông tin khách hàng -->
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
              @click="
                toCustomer(
                  orderStore.selected_order?.contact_id,
                  orderStore.selected_order?.order_id,
                )
              "
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

      <!-- sản phẩm -->
      <ProductList
        title="Ordered Items"
        :products="orderStore.selected_order?.products || []"
        :note="orderStore.selected_order?.note"
      />
      <!-- Thông tin thanh toán -->
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
          <p class="flex justify-between font-medium">
            Tax(13%)
            <span class="font-semibold text-lg">
              {{ formatCurrency(orderStore.selected_order?.vat) }}
            </span>
          </p>
          <p class="flex justify-between font-medium text-red-500">
            Discount
            <span class="font-semibold text-lg">
              {{ formatCurrency(orderStore.selected_order?.discount) }}
            </span>
          </p>
          <p class="flex justify-between font-medium">
            Tip
            <span class="font-semibold text-lg">
              {{ formatCurrency(orderStore.selected_order?.tip) }}
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
    <!-- Các action -->
    <footer
      v-for="(step, step_index) in orderStore.selected_order?.order_journey"
      v-show="check_step_active === step_index"
      class="w-full flex flex-nowrap gap-1 p-2 text-base"
    >
      <template v-for="(status, status_index) in step">
        <div
          v-if="
            STATUS?.includes(orderStore.selected_order.status || '') ||
            status.action === 'CANCEL_ORDER' ||
            status.action === 'PAID_ORDER'
          "
          class="flex-1 rounded-md flex items-center justify-center py-3.5 px-5 cursor-pointer font-semibold"
          :class="{
            [`${status.bg_color} ${status.text_color}`]: status,
          }"
          @click="activeStep(step_index, status_index, status)"
        >
          {{ status.title || '' }}
        </div>
      </template>
    </footer>
    <Modal
      v-model:is_open="is_open"
      :container_class="'w-[350px]'"
    >
      <div class="flex flex-col items-center font-medium text-sm">
        <img
          :src="CancelImage"
          class="size-16"
        />
        <p class="text-base font-semibold text-center py-2 w-full">
          Cancel Order
        </p>
        <div class="w-full flex flex-col gap-1.5">
          <p>Reason <span class="text-red-500">*</span></p>
          <input
            type="text"
            placeholder="Enter reason reject order"
            class="w-full border rounded-md py-2.5 px-3 outline-none"
            v-model="orderStore.selected_order.note"
          />
        </div>
        <button
          class="w-full py-3 bg-blue-700 text-white disabled:bg-slate-200 disabled:text-slate-700 rounded-full text-base mt-5"
          @click="
            () => {
              activeStep(
                cancel_data.step_index,
                cancel_data.status_index,
                cancel_data.action,
                true,
              )
              is_open = false
            }
          "
          :disabled="!orderStore.selected_order.note?.trim()"
        >
          Confirm cancellation
        </button>
      </div>
    </Modal>
    <BillPreview
      v-if="orderStore.selected_order"
      :order="orderStore.selected_order"
      :is-open="is_show_bill"
      @close="is_show_bill = false"
      @print="onConfirmPrint"
    />
  </article>
</template>

<script setup lang="ts">
import { $order } from '@/api'
import { useNavigationHandler } from '@/composables/useNavigationHandler'
import { formatCurrency } from '@/services/format'
import { useOrderStore } from '@/stores/order'
import { format } from 'date-fns'
import { cloneDeep } from 'lodash'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ProductList from '@/components/common/ProductList.vue'
import Image from '@/components/ui/Image.vue'
import Modal from '@/components/ui/Modal.vue'
import BillPreview from './components/BillPreview.vue'

import CancelImage from '@/assets/image/cancel_order.png'
import DollarSignIcon from '@/components/icons/DollarSignIcon.vue'
import { ArrowLeftIcon, MapPinIcon, PhoneIcon } from '@heroicons/vue/24/outline'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  CheckBadgeIcon,
  CreditCardIcon,
  PhoneIcon as SolidPhoneIcon,
  PrinterIcon,
  UserIcon,
} from '@heroicons/vue/24/solid'

import type { ActionStatus, ActionStep, Order } from '@/interfaces'

/** trạng thái đơn hàng được phép hiển thị tiếp */
const STATUS = ['PAID_ORDER', 'WAITING_ITEM', 'PACKING_ORDER', 'DELIVERY_ORDER']

// store
const orderStore = useOrderStore()

// router
const router = useRouter()
const route = useRoute()

// composable
const { toChat, toCustomer, openCallPhone } = useNavigationHandler()

/** ẩn hiện modal xác nhận hủy đơn */
/** ẩn hiện modal xác nhận hủy đơn */
const is_open = ref(false)
/** ẩn hiện modal bill */
const is_show_bill = ref(false)

/** cancel data */
const cancel_data = ref<{
  step_index: number
  status_index: number
  action: ActionStep
}>({
  step_index: -1,
  status_index: -1,
  action: {},
})

/** trạng thái đang kích hoạt */
const last_status = computed(() => {
  return getLastStatus(orderStore.selected_order)
})

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
  is_confirm_cancel: boolean = false,
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

    // nếu là hủy đơn thì mở modal xác nhận hủy đơn
    if (ACTION === 'CANCEL_ORDER' && !is_confirm_cancel) {
      // mở modal xác nhận hủy
      is_open.value = true
      // reset nội dung hủy
      orderStore.selected_order.note = ''
      // lưu lại data hủy
      cancel_data.value = {
        step_index,
        status_index,
        action,
      }
      return
    }

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

/**
 * Xử lý khi bấm nút Pay
 * Gửi event cho React Native để xử lý thanh toán
 */
function handlePay() {
  /** Lấy order_id từ store */
  const ORDER_ID = orderStore.selected_order?.order_id
  /** Nếu không có order_id thì thôi */
  if (!ORDER_ID) return

  /** Gửi event cho React Native */
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({
      type: 'page.order',
      payload: {
        action: 'pay',
        order_id: ORDER_ID,
        order: orderStore.selected_order,
      },
    }),
  )
}

/**
 * Xử lý khi bấm nút Print
 * Mở modal preview hóa đơn
 */
function handlePrint() {
  is_show_bill.value = true
}

/**
 * Xử lý xác nhận in
 * Gửi event cho React Native để xử lý in hóa đơn
 */
function onConfirmPrint() {
  /** Lấy order_id từ store */
  const ORDER_ID = orderStore.selected_order?.order_id
  /** Nếu không có order_id thì thôi */
  if (!ORDER_ID) return

  /** Gửi event cho React Native */
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({
      type: 'page.order',
      payload: {
        action: 'print',
        order_id: ORDER_ID,
        order: orderStore.selected_order,
      },
    }),
  )
  /** đóng modal sau khi in */
  is_show_bill.value = false
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

/**
 * Hàm cập nhật trạng thái của đơn hàng
 */
async function updateAnOrder(status: string) {
  try {
    /** Lấy selected order */
    const SELECTED_ORDER = orderStore.selected_order
    /** Lấy data note */
    const NOTE = SELECTED_ORDER.note?.trim() || undefined

    /** Sao lưu hành trình đơn hàng (phòng trường hợp cần khôi phục) */
    const OLD_JOURNEY = [...(SELECTED_ORDER.order_journey || [])]

    /** Xóa tạm hành trình đơn hàng để tránh lỗi khi cập nhật */
    SELECTED_ORDER.order_journey = []

    /** Tạo payload */
    const PAYLOAD: Record<string, any> = {
      id: SELECTED_ORDER.id,
      status,
    }
    if (NOTE) PAYLOAD.note = NOTE

    /** Gọi API cập nhật đơn hàng */
    const UPDATED_ORDER = await $order.updateOrder(PAYLOAD)
    /** reset note */
    orderStore.selected_order.note = ''

    /** Lưu lại dữ liệu mới sau khi cập nhật */
    orderStore.selected_order = UPDATED_ORDER

    console.log('✅ Cập nhật trạng thái đơn hàng thành công:', status)
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật đơn hàng:', error)
  }
}
</script>
