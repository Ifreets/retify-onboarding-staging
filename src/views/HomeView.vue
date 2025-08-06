<template>
  <main
    class="h-dvh w-dvw flex bg-white flex-col max-w-md mx-auto text-sm pt-2"
  >
    <div class="h-full overflow-hidden" v-if="appStore.merchant_token">
      <RouterView />
    </div>
    <!-- <Navigation /> -->
  </main>
</template>

<script setup lang="ts">
import { $order } from '@/api/order'
import { useAppStore } from '@/stores'
import { onMounted } from 'vue'

// store
const appStore = useAppStore()

onMounted(() => {
  /** token business lưu ở local */
  const BUSINESS_TOKEN = localStorage.getItem('merchant_token')
  // nếu có thì lưu vào store và set token vào service api order
  if (BUSINESS_TOKEN) {
    appStore.merchant_token = BUSINESS_TOKEN
    $order.setTokenBusiness()
  }
})
</script>
