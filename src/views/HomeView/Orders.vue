<template>
  <article class="h-full flex flex-col items-center justify-center">
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
      <div class="relative border rounded-lg bg-slate-50 border-slate-200">
        <MagnifyingGlassIcon
          class="text-slate-500 size-5 absolute left-4 top-0 bottom-0 my-auto pointer-events-none"
        />
        <input
          class="py-2 px-4 pl-11 w-full bg-transparent outline-none text-black placeholder:text-slate-500"
          type="text"
          placeholder="Search Orders..."
        />
      </div>
      <EmptyOrder />
    </section>
  </article>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import EmptyOrder from './EmptyOrder.vue'

const ORDERS = [
  [
    { id: 18001, name: 'Sophia Chen', date: 1753181577, price: 60 },
    { id: 18002, name: 'Liam Nguyen', date: 1753181677, price: 55 },
    { id: 18003, name: 'Olivia Tran', date: 1753181777, price: 62 },
    { id: 18004, name: 'Noah Le', date: 1753181877, price: 58 },
    { id: 18005, name: 'Emma Pham', date: 1753181977, price: 61 },
    { id: 18006, name: 'Mason Vo', date: 1753182077, price: 59 },
    { id: 18007, name: 'Ava Doan', date: 1753182177, price: 63 },
    { id: 18008, name: 'Lucas Hoang', date: 1753182277, price: 57 },
    { id: 18009, name: 'Mia Dang', date: 1753182377, price: 60 },
    { id: 18010, name: 'Ethan Bui', date: 1753182477, price: 64 },
  ],
]

const show_orders = computed(() => {
  ORDERS?.forEach((order) => {})
})
</script>
