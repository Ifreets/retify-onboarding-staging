<template>
  <main class="h-dvh w-dvw max-w-md mx-auto linear-gradient px-3 py-10 text-sm">
    <ul
      v-if="organizations.length >= 2 && !appStore.org_id"
      class="flex flex-col gap-3"
    >
      <li class="text-2xl font-semibold text-center">Select Organization</li>
      <li
        v-for="organization in organizations"
        @click="selectOrg(organization?.org_id)"
        class="text-base py-2 px-4 rounded-md cursor-pointer bg-white hover:bg-blue-100 border border-transparent hover:border-blue-500"
      >
        {{ organization?.org_info?.org_name }}
      </li>
    </ul>
    <article
      v-if="appStore.org_id"
      class="bg-white h-full rounded-xl py-5 px-3 flex flex-col gap-3"
    >
      <Tabs :current_tab="current_step" :total_tabs="3" />
      <div class="relative h-full overflow-hidden">
        <Transition :name="transition_name" mode="out-in">
          <component
            :is="STEPS[current_step - 1]"
            :key="current_step"
            @next="nextStep"
            @back="backStep"
          />
        </Transition>
      </div>
    </article>
  </main>
</template>
<script setup lang="ts">
import { $chatbot } from '@/api/chatbot'
import { useAppStore } from '@/stores'
import { onMounted, onUnmounted, ref, watch } from 'vue'

import Tabs from '@/views/OnBoarding/Tabs.vue'
import Step1 from '@/views/OnBoarding/Step1.vue'
import Step2 from '@/views/OnBoarding/Step2.vue'
import Step3 from '@/views/OnBoarding/Step3.vue'
import { useCreateTokenMerchant } from './OnBoarding/composable/useCreateTokenMerchant'

/** fake token chat bot để chạy trên pc */
const MOCK_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTEzOTM3MTZiYzE1NDUxNDk3ZTZjOGIwNjQzYmY1MjIiLCJmYl9zdGFmZl9pZCI6IjEyMjEyMTczMDYzNDMzMjQ0MiIsIl9pZCI6IjY2ZjdhYzE2MjE0Mzg4MTFiNjVjZTI5OCIsImlhdCI6MTc1MDk5OTg2MSwiZXhwIjozMTU1MzUwOTk5ODYxfQ.A4jHrb4Mviyr1UQ_P0O62f_QBnW1Qih0h6Z05_8bluQ'

// store
const appStore = useAppStore()

// composable
const { getPartnerToken, createTokenMerchant, getClientID } = useCreateTokenMerchant()

/** danh sách các các bước */
const STEPS = [Step1, Step2, Step3]
/** bước hiện tại */
const current_step = ref(1)
/** loại animation */
const transition_name = ref('slide-left')
/** danh sách các tổ chức */
const organizations = ref<any[]>([])

onMounted(() => {
  /** lấy token chatbot */
  getChatbotToken()
  /** lấy danh sách các tổ chức */
  getOrganizations()
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
})

// lắng nghe chuyển tiếp hay quay lại để thêm hiệu ứng
watch(current_step, (new_val, old_val) => {
  transition_name.value = new_val > old_val ? 'slide-left' : 'slide-right'
})

/** lấy token chatbot */
function getChatbotToken() {
  // lấy token fake
  appStore.chatbot_token = MOCK_TOKEN
  /** Add event listener */
  window.addEventListener('message', handleMessage)
  /** lưu lại token vào service api */
  $chatbot.setChatbotToken()
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
    appStore.chatbot_token = data.payload?.token
  }
}

/** lấy danh sách các tổ chức */
async function getOrganizations() {
  try {
    /** danh sách các tổ chức */
    const RES = await $chatbot.getOrganizations()

    /** lưu lại danh sách */
    organizations.value = RES as any[]

    /** nếu chỉ có 1 tổ chức thì chọn id tổ chức đó luôn */
    if (organizations.value?.length === 1) {
      selectOrg(organizations.value[0].org_id)
    }
  } catch (e) {
    console.error(e)
  }
}

/** chọn tổ chức */
async function selectOrg(org_id: string) {
  appStore.org_id = org_id
  // lấy page retify
  await getPageRetify()

  // tạo token merchant
  createTokenMerchant()
}

/** tạo page chatbot của retify */
async function getPageRetify() {
  try {
    /** id page retify */
    let page_id: string | undefined = await getExistingPageID()

    /** kiểm tra xem đã tạo page nào trước đó chưa */
    if (page_id) {
      /** lưu vào store */
      appStore.page_id = page_id || ''
    }
  } catch (e) {
    console.error(e)
  }
}

/** lấy id page retify đã tạo */
async function getExistingPageID() {
  try {
    // nếu không có id tổ chức thì thôi
    if (!appStore.org_id) return

    /** danh sách các page */
    const RES: any = await $chatbot.getPages(appStore.org_id)

    /** lọc ra page retify */
    const RETIFY_PAGES = RES?.filter((item: any) => item?.page_info?.name.includes('.retify.ai'))

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
  if (current_step.value > 1) {
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
