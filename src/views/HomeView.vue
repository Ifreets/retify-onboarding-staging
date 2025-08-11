<template>
  <main
    class="h-dvh w-dvw flex bg-white flex-col max-w-md mx-auto text-sm pt-2 relative"
  >
    <div
      class="h-full overflow-hidden"
      v-if="appStore.merchant_token"
    >
      <RouterView />
    </div>

    <div
      v-if="show"
      class="w-90dvw h-fit m-auto absolute top-0 bottom-0 right-0 left-0 overflow-hidden bg-white border shadow p-3"
    >
      <p class="break-all">Merchant_token: {{ appStore.merchant_token }}</p>
      <p>Page_id: {{ onBoardingStore.selected_data.page_id }}</p>
      <p>Chatbot_token: {{ appStore.chatbot_token }}</p>
      <p>Chatbot_token url: {{ show_data.chatbot_token }}</p>
    </div>

    <div
      @click="show = !show"
      class="h-10 w-10 m-auto absolute bottom-0 left-0"
    ></div>
    <!-- <Navigation /> -->
  </main>
</template>

<script setup lang="ts">
import { $contact, $merchant, $order } from '@/api'
import { queryString } from '@/services/queryString'
import { useAppStore, useOnBoardingStore } from '@/stores'
import { onMounted, ref } from 'vue'

// store
const appStore = useAppStore()
const onBoardingStore = useOnBoardingStore()

const show = ref(false)

const show_data = ref({
  chatbot_token: '',
})

onMounted(async () => {
  /** id của trang */
  const PAGE_ID = queryString('page_id')
  /** ngôn ngữ */
  const LOCALE = queryString('locale')
  /** token chatbox */
  const CHATBOX_TOKEN = queryString('access_token')

  show_data.value.chatbot_token = CHATBOX_TOKEN || 'không có'

  /** token business lưu ở local */
  const BUSINESS_TOKEN = localStorage.getItem('merchant_token')
  // nếu có thì lưu vào store và set token vào service api order
  if (BUSINESS_TOKEN) setTokenBusiness(BUSINESS_TOKEN)

  // nếu không có token hoặc page id không giống ở local thì tạo lại token merchant
  if (
    (!BUSINESS_TOKEN || PAGE_ID !== localStorage.getItem('page_id')) &&
    CHATBOX_TOKEN &&
    CHATBOX_TOKEN !== 'null' &&
    PAGE_ID
  ) {
    try {
      const RES: any = await $merchant.createToken({
        access_token: CHATBOX_TOKEN,
        page_id: PAGE_ID,
      })

      // trả về token
      setTokenBusiness(RES?.branch?.token_business)
    } catch (e) {
      console.log(e)
    }
  }

  // lưu các giá trị xuống local
  if (PAGE_ID) onBoardingStore.selected_data.page_id = PAGE_ID
  if (CHATBOX_TOKEN) appStore.chatbot_token = CHATBOX_TOKEN
})

/** hàm set token business */
function setTokenBusiness(business_token: string) {
  appStore.merchant_token = business_token
  $order.setTokenBusiness()
  $contact.setTokenBusiness()
}
</script>
