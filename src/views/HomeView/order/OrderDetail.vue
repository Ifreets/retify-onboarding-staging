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
        <CheckBadgeIcon class="size-8 text-blue-700" />
        <div class="w-full flex flex-col gap-3">
          <div class="flex justify-between items-center">
            <p class="text-lg font-semibold text-blue-700">Confirmed</p>
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
              <span class="font-medium text-sm">{{
                orderStore.selected_order?.products?.length
              }}</span>
            </p>
            <p class="text-xl font-semibold text-blue-700">
              {{ orderStore.selected_order?.total_money }}
            </p>
          </div>
        </div>
      </section>

      <section class="border py-3 px-4 rounded-lg flex gap-3">
        <img
          src="@/assets/image/avatar.png"
          class="w-11 h-11 rounded-full"
        />
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
              class="flex items-center gap-2 py-2 px-5 rounded-lg border text-slate-700"
            >
              <SolidPhoneIcon class="size-4 text-black flex-shrink-0" />
              Call
            </button>
            <button
              class="flex items-center gap-2 py-2 px-5 text-white bg-blue-700 rounded-lg"
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
    </main>
  </article>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import ProductList from '@/components/common/ProductList.vue'

import { ArrowLeftIcon, MapPinIcon, PhoneIcon } from '@heroicons/vue/24/outline'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  CheckBadgeIcon,
  PhoneIcon as SolidPhoneIcon,
} from '@heroicons/vue/24/solid'
import { useOrderStore } from '@/stores/order'
import { format } from 'date-fns'

// store
const orderStore = useOrderStore()

// router
const router = useRouter()
const route = useRoute()

/** hàm trở lại màn danh sách đơn hàng */
function back() {
  router.push('/home/order')
}
</script>
