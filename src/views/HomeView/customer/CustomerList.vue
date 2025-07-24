<template>
  <section class="overflow-auto px-2">
    <ul 
      v-for="item in ['A','B', 'C', 'D']" class="flex flex-col gap-2 pb-5 cursor-pointer"
      @click="openCustomer()"
    >
      <div class="sticky top-0 bg-white">
        <p
          class="flex justify-between text-semibold py-0.5 px-2 rounded bg-slate-100 font-semibold text-slate-700"
        >
          {{ item }}
        </p>
      </div>
      <CustomerItem v-for="item in 2" />
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import CustomerItem from '@/views/HomeView/customer/CustomerItem.vue'

const router = useRouter()

/** mở chi tiết đơn hàng */
function openCustomer() {
  router.push('/home/customer/103429')
}

</script>