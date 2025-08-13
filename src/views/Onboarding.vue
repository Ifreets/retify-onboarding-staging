<template>
  <main class="h-dvh w-dvw max-w-md mx-auto linear-gradient px-3 py-10 text-sm">
    <ul
      v-if="current_step === 0 && organizations?.length > 1"
      class="flex flex-col gap-3"
    >
      <li class="text-2xl font-semibold text-center">Select Organization</li>
      <li
        v-for="organization in organizations"
        @click="selectOrg(organization?.org_id)"
        class="text-base py-2 px-4 rounded-md cursor-pointer border border-transparent hover:border-blue-700"
        :class="{
          'bg-blue-500 text-white':
            organization?.org_id === onBoardingStore.selected_data.org_id,
          'bg-white hover:bg-blue-100':
            organization?.org_id !== onBoardingStore.selected_data.org_id,
        }"
      >
        {{ organization?.org_info?.org_name }}
      </li>
    </ul>
    <article
      v-if="current_step > 0"
      class="bg-white h-full rounded-xl py-5 px-3 flex flex-col gap-3"
    >
      <Tabs
        :current_tab="current_step"
        :total_tabs="3"
      />
      <div class="relative h-full overflow-hidden">
        <Transition
          :name="transition_name"
          mode="out-in"
        >
          <component
            :is="STEPS[current_step - 1]"
            :key="current_step"
            @next="nextStep"
            @back="backStep"
            :is_has_back="current_step === 1 && !!(organizations?.length > 1)"
          />
        </Transition>
      </div>
    </article>
  </main>
</template>
<script setup lang="ts">
import { $chatbot } from '@/api'
import { useAppStore, useOnBoardingStore } from '@/stores'
import { useCreateTokenMerchant } from '@/views/OnBoarding/composable/useCreateTokenMerchant'
import { onMounted, onUnmounted, ref, watch } from 'vue'

import Step1 from '@/views/OnBoarding/Step1.vue'
import Step2 from '@/views/OnBoarding/Step2.vue'
import Step3 from '@/views/OnBoarding/Step3.vue'
import Tabs from '@/views/OnBoarding/Tabs.vue'

/** fake token chat bot để chạy trên pc */
const MOCK_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODk5NzY3MzE1Mzk2MTcxIiwiX2lkIjoiNjg1ZTQ2MDg0ZGM3M2MwYjhkMTQzYTJlIiwiaWF0IjoxNzUxNTk4OTQyLCJleHAiOjMxNTUzNTE1OTg5NDJ9.iUqlmnVACz5uuW-CCgOGshbJr15g8gN5SJSO3Tj7zW8'

// store
const appStore = useAppStore()
const onBoardingStore = useOnBoardingStore()

// composable
const { createTokenMerchant } = useCreateTokenMerchant()

/** danh sách các các bước */
const STEPS = [Step1, Step2, Step3]
/** bước hiện tại */
const current_step = ref(Number(localStorage.getItem('current_step')) || -1)
/** loại animation */
const transition_name = ref('slide-left')
/** danh sách các tổ chức */
const organizations = ref<any[]>([])

onMounted(() => {
  /** Add event listener */
  window.addEventListener('message', handleMessage)

  /** lấy token chatbot */
  getChatbotToken(MOCK_TOKEN)

  // khởi tạo các guias
  initData()
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
})

// lắng nghe chuyển tiếp hay quay lại để thêm hiệu ứng
watch(current_step, (new_val, old_val) => {
  transition_name.value = new_val > old_val ? 'slide-left' : 'slide-right'
  localStorage.setItem('current_step', new_val.toString())
})

// lắng nghe những dữ liệu đã nhập để lưu vào local
watch(
  () => onBoardingStore.selected_data,
  () => {
    // lưu dữ liệu xuống local
    localStorage.setItem(
      'selected_data',
      JSON.stringify(onBoardingStore.selected_data),
    )
  },
  { deep: true },
)

// lắng nghe những dữ liệu về doanh nghiệp đã nhập để lưu vào local
watch(
  () => onBoardingStore.business_info,
  () => {
    // lưu dữ liệu xuống local
    localStorage.setItem(
      'business_info',
      JSON.stringify(onBoardingStore.business_info),
    )
  },
  { deep: true },
)

// lắng nghe các cờ check xem đã thiết lập đến đâu để lưu vào local
watch(
  () => onBoardingStore.is_setup,
  () => {
    // lưu dữ liệu xuống local
    localStorage.setItem('is_setup', JSON.stringify(onBoardingStore.is_setup))
  },
  { deep: true },
)

// lắng nghe token để lưu vào local
watch(
  () => appStore.merchant_token,
  () => {
    localStorage.setItem('merchant_token', appStore.merchant_token)
  },
)

watch(
  () => appStore.chatbot_token,
  () => {
    localStorage.setItem('chatbot_token', appStore.chatbot_token)
  },
)

// lắng nghe link menu và link ảnh
watch(
  () => [
    onBoardingStore.business_info.menu_url,
    onBoardingStore.business_info.web_url,
  ],
  () => {
    onBoardingStore.is_setup.product = false
  },
)

/** khởi tạo các giá trị lấy từ local */
function initData() {
  try {
    /** dữ liệu đã chọn ở local */
    const LOCAL_SELECTED_DATA = localStorage.getItem('selected_data')
    // nếu có thì lưu vào store
    if (LOCAL_SELECTED_DATA) {
      onBoardingStore.selected_data = JSON.parse(LOCAL_SELECTED_DATA)
    }

    /** dữ liệu của doanh nghiệp lưu ở local */
    const LOCAL_BUSINESS_INFO = localStorage.getItem('business_info')
    // nếu có thì lưu vào store
    if (LOCAL_BUSINESS_INFO) {
      onBoardingStore.business_info = JSON.parse(LOCAL_BUSINESS_INFO)
    }

    /** dữ liệu các cờ check ở local */
    const LOCAL_IS_SETUP = localStorage.getItem('is_setup')
    // nếu có thì lưu vào store
    if (LOCAL_IS_SETUP) {
      onBoardingStore.is_setup = JSON.parse(LOCAL_IS_SETUP)
    }

    // nếu đã có token merchant => onboarding xog rồi onboarding lại
    if (localStorage.getItem('merchant_token')) {
      localStorage.clear()
      reset()
      current_step.value = -1
    }
  } catch (e) {
    console.error(e)
  }
}

/** lấy token chatbot */
function getChatbotToken(token: string) {
  // lấy token fake
  appStore.chatbot_token = token
  // nếu không có chatbot token thì dừng lại
  if (!appStore.chatbot_token) return
  /** lưu lại token vào service api */
  $chatbot.setChatbotToken()
  /** lấy danh sách các tổ chức */
  getOrganizations()
}

/** Nhận Message từ Mobile */
function handleMessage(event: MessageEvent) {
  /** Tạo biến data */
  let data: any
  try {
    /**  Cố gắng parse nếu là JSON */
    data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
  } catch (error) {
    console.warn('Không phải JSON, bỏ qua:', event.data)
    return
  }

  /** Kiem tra event data */
  if (data?.type === 'page.token_chatbox') {
    console.log(data, 'event data')
    getChatbotToken(data.payload?.token)
  }
}

/** lấy danh sách các tổ chức */
async function getOrganizations() {
  try {
    /** danh sách các tổ chức */
    const RES = await $chatbot.getOrganizations()

    /** lưu lại danh sách */
    organizations.value = RES as any[]

    // nếu chưa có bước lưu ở local
    if (current_step.value !== -1) return

    /** cờ check có nhiều tổ chức hay không */
    const IS_MUTI_ORG = organizations.value?.length > 1

    /** nếu chỉ có 1 tổ chức thì chọn id tổ chức đó luôn */
    if (!IS_MUTI_ORG) {
      selectOrg(organizations.value[0].org_id)
    }

    // nếu là nhiều tổ chức và chưa chọn tổ chức nào
    if (IS_MUTI_ORG && !onBoardingStore.selected_data.org_id) {
      current_step.value = 0
    } else {
      current_step.value = 1
    }
  } catch (e) {
    console.error(e)
  }
}

/** chọn tổ chức */
async function selectOrg(org_id: string) {
  // nếu khác tổ chức đang chọn thì reset lại toàn bộ data
  if (org_id !== onBoardingStore.selected_data.org_id) reset()

  // chuyển sang step 1
  current_step.value = 1

  // lưu lại id mới vào store
  onBoardingStore.selected_data.org_id = org_id

  // lấy page retify
  await getPageRetify()

  // tạo token merchant
  createTokenMerchant()
}

/** reset data */
function reset() {
  // reset data đã nhập
    onBoardingStore.selected_data = {
      org_id: '',
      page_id: '',
      user_id: '',
    }

    // reset data doanh nghiệp
    onBoardingStore.business_info = {
      name: '',
      web_url: '',
      menu_url: '',
      type: '',
    }

    // reset data các cờ
    onBoardingStore.is_setup = {
      page: false,
      product: false,
      ai_agent: false,
      auto_assign_staff: false,
    }

    // reset merchant token
    appStore.merchant_token = ''
}

/** tạo page chatbot của retify */
async function getPageRetify() {
  try {
    // nếu đã có page id thì thôi
    if (onBoardingStore.selected_data.page_id) return

    /** id page retify */
    let page_id: string | undefined = await getExistingPageID()

    /** kiểm tra xem đã tạo page nào trước đó chưa */
    if (page_id) {
      /** lưu vào store */
      onBoardingStore.selected_data.page_id = page_id || ''
    }
  } catch (e) {
    console.error(e)
  }
}

/** lấy id page retify đã tạo */
async function getExistingPageID() {
  try {
    // nếu không có id tổ chức thì thôi
    if (!onBoardingStore.selected_data.org_id) return

    /** danh sách các page */
    const RES: any = await $chatbot.getPages(
      onBoardingStore.selected_data.org_id,
    )

    /** lọc ra page retify */
    const RETIFY_PAGES = RES?.filter((item: any) =>
      item?.page_info?.name.includes('.retify.ai'),
    )

    // trả về id của page retify
    return RETIFY_PAGES?.[0]?.page_id
  } catch (e) {
    console.error(e)
  }
}

/** tăng bước */
function nextStep() {
  if (current_step.value < STEPS.length) {
    current_step.value++
  }
}

/** giảm bước */
function backStep() {
  if (current_step.value > 0) {
    current_step.value--
  }
}
</script>
<style scoped>
.linear-gradient {
  background: linear-gradient(to right, #fdefe3, #f3f4f3, #dce5ff);
}

.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-in-out;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

/* Slide left */
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.slide-left-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Slide right */
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.slide-right-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
