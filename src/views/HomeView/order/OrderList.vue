<template>
  <section class="overflow-auto">
    <ul 
      v-for="item in 5" class="flex flex-col gap-2 pb-5 cursor-pointer"
      @click="openOrder()"
    >
      <div class="sticky top-0 bg-white">
        <p
          class="flex justify-between text-semibold py-0.5 px-2 rounded bg-slate-100 font-semibold text-slate-700"
        >
          <span>TODAY 18/04/2025</span>
          <span>$216.75</span>
        </p>
      </div>
      <OrderItem v-for="item in 2" :index="item" />
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import OrderItem from '@/views/HomeView/order/OrderItem.vue'

const router = useRouter()

/** mở chi tiết đơn hàng */
function openOrder() {
  router.push('/home/order/103429')
}

</script>
