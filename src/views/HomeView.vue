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
      <p>Merchant_token: {{ appStore.merchant_token }}</p>
      <p>Page_id: {{ onBoardingStore.selected_data.page_id }}</p>
      <p>Chatbot_token url: {{ show_data.chatbot_token }}</p>
      <div>
        Message_data:
        <pre>{{ show_data.message_data }}</pre>
      </div>
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
import { useToast } from '@/composables/useToast';
import { queryString } from '@/services/queryString'
import { useAppStore, useOnBoardingStore } from '@/stores'
import { onMounted, onUnmounted, ref } from 'vue'

// store
const appStore = useAppStore()
const onBoardingStore = useOnBoardingStore()

/** ẩn hiện dữ liệu */
const show = ref(false)
/** dữ liệu hiển thị */
const show_data = ref({
  chatbot_token: '',
  message_data: {},
})

// composable
const { notify } = useToast()

onMounted(() => {
  /** id của trang */
  const PAGE_ID = queryString('page_id')
  /** ngôn ngữ */
  const LOCALE = queryString('locale')
  /** token chatbox */
  const CHATBOX_TOKEN = queryString('access_token')

  // xử lý tạo token merchant
  handleCreateTokenMerchant(PAGE_ID, CHATBOX_TOKEN)

  // lưu các giá trị xuống local
  if (PAGE_ID) {
    onBoardingStore.selected_data.page_id = PAGE_ID
    // lưu dữ liệu xuống local
    localStorage.setItem(
      'selected_data',
      JSON.stringify(onBoardingStore.selected_data),
    )
  }
  if (CHATBOX_TOKEN) {
    appStore.chatbot_token = CHATBOX_TOKEN
    localStorage.setItem('chatbot_token', appStore.chatbot_token)
  }

  // lắng nghe post message
  window.addEventListener('message', handlePostMessage)

  // lắng nghe sự kiện
  document.addEventListener('visibilitychange', () => {
    console.log(document.visibilityState);
    
    if (document.visibilityState === 'visible') {
      notify('WebView đang hiển thị');
    } else {
      notify('WebView đang background hoặc bị ẩn');
    }
  });

})

onUnmounted(() => {
  window.removeEventListener('message', handlePostMessage)
})

/** hàm xử lý tạo mới token merchat với dữ liệu từ url */
function handleCreateTokenMerchant(page_id?: string, chatbox_token?: string) {
  try {
    const SELECTED_DATA = localStorage.getItem('selected_data')
    onBoardingStore.selected_data = SELECTED_DATA
      ? JSON.parse(SELECTED_DATA)
      : {}
  } catch (e) {
    console.error(e)
  }

  /** page id bị thay đổi */
  const IS_CHANGE_PAGE_ID = page_id !== onBoardingStore.selected_data.page_id
  /** không có token chatbox */
  const NO_CHATBOX_TOKEN = !!(chatbox_token && chatbox_token !== 'null')

  // lưu lại token để hiển thị
  show_data.value.chatbot_token = chatbox_token || 'không có'

  /** token business lưu ở local */
  const BUSINESS_TOKEN = localStorage.getItem('merchant_token')
  // nếu có thì lưu vào store và set token vào service api order
  if (BUSINESS_TOKEN) setTokenBusiness(BUSINESS_TOKEN)

  // nếu không có token hoặc page id không giống ở local thì tạo lại token merchant
  if ((!BUSINESS_TOKEN || IS_CHANGE_PAGE_ID) && NO_CHATBOX_TOKEN && page_id) {
    createToken(chatbox_token, page_id)
  }
}

/** hàm tạo token */
async function createToken(chatbot_token: string, page_id: string) {
  try {
    const RES: any = await $merchant.createToken({
      access_token: chatbot_token,
      page_id: page_id,
    })
    // trả về token
    setTokenBusiness(RES?.branch?.token_business)
  } catch (e) {
    console.log(e)
  }
}

/** hàm set token business */
function setTokenBusiness(business_token: string) {
  appStore.merchant_token = business_token
  $order.setTokenBusiness()
  $contact.setTokenBusiness()
  localStorage.setItem('merchant_token', appStore.merchant_token)
}

/** hàm xử lý khi có postmessage từ webview */
function handlePostMessage(event: MessageEvent) {
  show_data.value.message_data = event
}
</script>
