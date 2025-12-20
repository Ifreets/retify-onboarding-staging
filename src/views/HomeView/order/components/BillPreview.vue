<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      @click="$emit('close')"
    >
      <div
        class="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden no-print"
        @click.stop
      >
        <!-- Header -->
        <div
          class="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
        >
          <h2 class="text-xl font-bold text-gray-800">Preview Bill</h2>
          <button
            @click="$emit('close')"
            class="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              class="w-6 h-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Scrollable Receipt Area -->
        <div class="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-200 print-area">
          <div class="max-w-[320px] mx-auto space-y-1 shadow-lg">
            <!-- PART 1: Top Summary -->
            <ReceiptSection>
              <h1 class="text-2xl font-bold mb-4">
                {{ order.contact_info?.first_name || 'Customer' }}
              </h1>
              <div class="w-full h-[1px] bg-black mb-4"></div>
              <div class="flex justify-between text-xs leading-tight">
                <div class="space-y-1">
                  <p>
                    {{ format(order.createdAt || new Date(), 'MMMM d, yyyy') }}
                  </p>
                  <p>
                    {{ format(order.createdAt || new Date(), 'h:mm:ss a') }}
                  </p>
                </div>
                <div class="text-right space-y-1">
                  <p>{{ merchant_info.name || 'Store Name' }}</p>
                  <p>{{ order.cashier || 'Staff' }}</p>
                </div>
              </div>
            </ReceiptSection>

            <!-- PART 2: Order Detail -->
            <ReceiptSection>
              <h1 class="text-2xl font-bold mb-4">
                {{ order.contact_info?.first_name || 'Customer' }}
              </h1>
              <div class="w-full h-[1px] bg-black mb-4"></div>
              <div class="flex justify-between text-xs mb-4">
                <div class="space-y-1">
                  <p>
                    {{ format(order.createdAt || new Date(), 'MMMM d, yyyy') }}
                  </p>
                  <p>
                    {{ format(order.createdAt || new Date(), 'h:mm:ss a') }}
                  </p>
                </div>
                <div class="text-right">
                  <p>{{ order.cashier || 'Staff' }}</p>
                </div>
              </div>
              <div
                class="border-t border-black pt-2 pb-2 text-center text-sm font-bold tracking-widest"
              >
                TO GO
              </div>
              <div class="border-t border-black pt-4 mb-8">
                <div
                  v-for="item in order.products"
                  :key="item.id"
                  class="text-lg font-medium"
                >
                  {{ item.quantity || 1 }} &times; {{ item.product_name }}
                </div>
              </div>
              <div
                class="text-[10px] leading-relaxed mt-4 pt-4 border-t border-gray-300"
              >
                <p>
                  {{ merchant_info.name || 'Store Name' }} -
                  {{ merchant_info.category || 'Store' }}
                </p>
                <p>{{ merchant_info.address || '' }}</p>
                <p>Square Register 0219</p>
              </div>
            </ReceiptSection>

            <!-- PART 3: Full Transaction -->
            <ReceiptSection :isLast="true">
              <div class="mb-4">
                <p class="font-bold text-lg mb-1">
                  {{ merchant_info.name || 'Store Name' }}
                </p>
                <div
                  class="flex justify-between text-[11px] leading-tight mb-4"
                >
                  <div class="max-w-[120px]">
                    <p class="whitespace-pre-wrap">
                      {{ merchant_info.address || '' }}
                    </p>
                    <p>{{ merchant_info.phone || '' }}</p>
                    <p>{{ merchant_info.website || '' }}</p>
                  </div>
                  <div class="text-right">
                    <p>
                      {{
                        format(order.createdAt || new Date(), 'MMMM d, yyyy')
                      }}
                    </p>
                    <p>
                      {{ format(order.createdAt || new Date(), 'h:mm:ss a') }}
                    </p>
                    <p>{{ order.cashier || 'Staff' }}</p>
                  </div>
                </div>
              </div>

              <div class="w-full h-[1px] bg-black mb-4"></div>

              <div class="text-[11px] mb-4 space-y-1">
                <p>Ticket: {{ order.contact_info?.first_name || 'Guest' }}</p>
                <p>Receipt: {{ order.order_id }}</p>
                <p>Authorization: {{ order.id?.slice(0, 6).toUpperCase() }}</p>
              </div>

              <div
                class="text-[11px] mb-4 space-y-1 border-t border-gray-300 pt-3"
              >
                <p>{{ order.payment_method || 'Visa CREDIT' }}</p>
                <p>AID A0 00 00 00 03 10 10</p>
                <p>Verified on Device</p>
              </div>

              <div
                class="border-t border-black pt-1 pb-1 text-center text-xs font-bold tracking-widest mb-4"
              >
                TO GO
              </div>

              <div class="space-y-2 mb-4">
                <div
                  v-for="item in order.products"
                  :key="item.id"
                  class="flex justify-between text-sm"
                >
                  <span>{{ item.product_name }}</span>
                  <span>{{ formatCurrency(item.total_price) }}</span>
                </div>
              </div>

              <div class="border-t border-gray-400 pt-3 space-y-1 text-xs mb-4">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span>{{ formatCurrency(order.price) }}</span>
                </div>
                <div
                  class="flex justify-between"
                  v-if="order.vat"
                >
                  <span>Tax</span>
                  <span>{{ formatCurrency(order.vat) }}</span>
                </div>
                <div
                  class="flex justify-between"
                  v-if="order.discount"
                >
                  <span>Discount</span>
                  <span>-{{ formatCurrency(order.discount) }}</span>
                </div>
                <div
                  class="flex justify-between"
                  v-if="order.tip"
                >
                  <span>Tip</span>
                  <span>{{ formatCurrency(order.tip) }}</span>
                </div>
              </div>

              <div class="border-t border-black pt-2 mb-1">
                <div class="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{{ formatCurrency(order.total_money) }}</span>
                </div>
              </div>

              <div class="flex justify-between text-xs pb-4">
                <span
                  >{{ order.payment_method || 'Visa' }} 5812 (Contactless)</span
                >
                <span>{{ formatCurrency(order.total_money) }}</span>
              </div>
            </ReceiptSection>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="px-6 py-4 bg-gray-50 flex gap-3">
          <button
            @click="$emit('print')"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Receipt
          </button>
          <button
            @click="$emit('close')"
            class="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { $merchant } from '@/api'
import type { Order } from '@/interfaces'
import { formatCurrency } from '@/services/format'
import { useAppStore } from '@/stores'
import { format } from 'date-fns'
import { onMounted, ref } from 'vue'
import ReceiptSection from './ReceiptSection.vue'

/** Định nghĩa props cho component */
const props = defineProps<{
  /** Thông tin đơn hàng */
  order: Order
  /** Trạng thái hiển thị modal */
  isOpen: boolean
}>()

/** Định nghĩa các events phát ra từ component */
defineEmits(['print', 'close'])

/** Store chứa thông tin ứng dụng */
const appStore = useAppStore()

/** Thông tin merchant lấy từ API */
const merchant_info = ref<any>({})

/**
 * Hook chạy khi component mounted
 * Lấy thông tin business từ API
 */
onMounted(async () => {
  /** Lấy business_id từ merchant_data, ưu tiên business_id, fallback sang org_id */
  const BUSINESS_ID =
    appStore.merchant_data.business_id || appStore.merchant_data.org_id

  /** Chỉ gọi API khi có business_id */
  if (BUSINESS_ID) {
    try {
      /** Gọi API lấy thông tin business */
      const RES = await $merchant.getBusinessInfo({ business_id: BUSINESS_ID })

      /** Cập nhật merchant_info nếu có dữ liệu trả về */
      if (RES?.business) merchant_info.value = RES.business
    } catch (error) {
      /** Log lỗi khi gọi API thất bại */
      console.error('Failed to fetch business info:', error)
    }
  }
})
</script>
