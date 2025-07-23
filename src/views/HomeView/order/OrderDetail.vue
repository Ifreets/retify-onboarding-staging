<template>
  <article class="h-full flex flex-col items-center justify-center">
    <header class="flex justify-between items-center w-full px-2">
      <ArrowLeftIcon class="size-6" @click="back" />
      <h3 class="text-2xl font-semibold">Orders #{{ route.params.id }}</h3>
      <div class="w-6"></div>
    </header>
    <main class="w-full h-full px-2 py-3 gap-5 flex flex-col overflow-auto">
      <section class="border py-3 px-4 rounded-lg flex gap-2">
        <CheckBadgeIcon class="size-8 text-blue-700" />
        <div class="w-full flex flex-col gap-3">
          <div class="flex justify-between items-center">
            <p class="text-lg font-semibold text-blue-700">Confirmed</p>
            <p class="text-base">Order ID: <span class="font-medium text-sm">#103428</span></p>
          </div>
          <div class="w-full h-px bg-slate-200"></div>
          <p class="text-base">
            Order Date: <span class="font-medium text-sm">November 23, 2025</span>
          </p>
          <div class="flex justify-between items-center">
            <p class="text-base">Total Items: <span class="font-medium text-sm">7</span></p>
            <p class="text-xl font-semibold text-blue-700">$60.00</p>
          </div>
        </div>
      </section>

      <section class="border py-3 px-4 rounded-lg flex gap-3">
        <img src="@/assets/image/avatar.png" class="w-11 h-11 rounded-full" />
        <div class="w-full flex flex-col gap-3">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-base font-semibold">Sophia Chen</p>
              <p class="text-slate-700">sophia.chen@example.com</p>
            </div>
            <button class="py-1.5 px-3 border rounded font-semibold text-slate-700">
              View Profile
            </button>
          </div>
          <div class="w-full h-px bg-slate-200"></div>
          <p class="flex gap-2 items-center text-base">
            <PhoneIcon class="size-4 text-slate-700 flex-shrink-0" /> +1 (555) 123-4567
          </p>
          <p class="flex gap-2 items-center text-base">
            <MapPinIcon class="size-4 text-slate-700 flex-shrink-0" /> 123 Maple Street, Anytown, CA 90210
          </p>
          <div class="font-semibold flex gap-2.5 text-base">
            <button class="flex items-center gap-2 py-2 px-5 rounded-lg border text-slate-700">
              <SolidPhoneIcon class="size-4 text-black flex-shrink-0" />
              Call
            </button>
            <button class="flex items-center gap-2 py-2 px-5 text-white bg-blue-700 rounded-lg">
              <ChatBubbleOvalLeftEllipsisIcon class="size-4"/>
              Message
            </button>
          </div>
        </div>
      </section>

      <ProductList title="Ordered Items" />
    </main>
  </article>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import ProductItem from '@/components/common/ProductItem.vue';

import { ArrowLeftIcon, MapPinIcon, PhoneIcon } from '@heroicons/vue/24/outline';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  CheckBadgeIcon,
  PhoneIcon as SolidPhoneIcon
} from '@heroicons/vue/24/solid';
import ProductList from '@/components/common/ProductList.vue';

// router
const router = useRouter()
const route = useRoute()

/** hàm trở lại màn danh sách đơn hàng */
function back() {
  router.push('/home/order')
}
</script>
