<template>
  <article class="h-full flex flex-col items-center justify-center relative">
    <header class="flex justify-between w-full px-2">
      <div class="w-20"></div>
      <h3 class="text-2xl font-semibold">Orders</h3>
      <button
        class="flex gap-1 items-center bg-black text-white rounded-xl py-2.5 px-4 font-medium"
      >
        <PlusIcon class="size-4" />
        <span>New</span>
      </button>
    </header>
    <section class="w-full h-full p-2 flex flex-col overflow-hidden">
      <div class="relative border rounded-lg bg-slate-50 border-slate-200 mb-3">
        <MagnifyingGlassIcon
          class="text-slate-500 size-5 absolute left-4 top-0 bottom-0 my-auto pointer-events-none"
        />
        <input
          class="py-2 px-4 pl-11 w-full bg-transparent outline-none text-black placeholder:text-slate-500"
          type="text"
          placeholder="Search Orders..."
        />
      </div>
      <OrderList />
      <!-- <EmptyOrder /> -->
    </section>

    <button class="absolute bottom-5 right-5 rounded-full bg-blue-700 text-white py-3 px-4 flex gap-2 text-xs font-semibold">
      <RetionAgentIcon />
      Ask Retify
    </button>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import EmptyOrder from '@/views/HomeView/order/EmptyOrder.vue'
import OrderList from '@/views/HomeView/order/OrderList.vue';

import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/vue/24/outline'
import RetionAgentIcon from '@/components/icons/RetionAgentIcon.vue';

/** danh sách các order */
const ORDERS = [
  [
    { id: 18001, name: 'Sophia Chen', date: 1753181577, price: 60, status: 'new' },
    { id: 18002, name: 'Liam Nguyen', date: 1753181677, price: 55, status: 'paid' },
    { id: 18003, name: 'Olivia Tran', date: 1753181777, price: 62, status: 'new' },
    { id: 18004, name: 'Noah Le', date: 1753181877, price: 58, status: 'new' },
    { id: 18005, name: 'Emma Pham', date: 1753181977, price: 61, status: 'paid' },
    { id: 18006, name: 'Mason Vo', date: 1753182077, price: 59, status: 'paid' },
    { id: 18007, name: 'Ava Doan', date: 1753182177, price: 63, status: 'new' },
    { id: 18008, name: 'Lucas Hoang', date: 1753182277, price: 57, status: 'new' },
    { id: 18009, name: 'Mia Dang', date: 1753182377, price: 60, status: 'paid' },
    { id: 18010, name: 'Ethan Bui', date: 1753182477, price: 64, status: 'new' },
  ],
]

const show_orders = computed(() => {
  ORDERS?.forEach((order) => {})
})
</script>
