<template>
  <section class="flex flex-col gap-4 text-base overflow-auto h-full">
    <header class="flex flex-col gap-1 bg-white">
      <p
        class="rounded-full font-semibold bg-blue-700 w-8 h-8 flex items-center justify-center text-white"
      >
        2
      </p>
      <p class="font-semibold">Business Information</p>
      <p class="text-slate-700">Tell us a bit about your establishment.</p>
    </header>

    <section class="flex flex-col gap-1">
      <p class="text-base font-semibold">Business Name</p>
      <input
        type="text"
        class="w-full border rounded-md px-3 py-2 outline-none placeholder:text-slate-400"
        :class="{
          'border-red-500': !business_info.name?.trim() && is_check,
          'border-slate-200': business_info.name?.trim() || !is_check,
        }"
        placeholder="e.g., The Cozy Corner Cafe"
        v-model="business_info.name"
      />
      <p class="text-slate-700">This will appear on your Retify ordering page.</p>
    </section>

    <section class="flex flex-col gap-1">
      <div>
        <p class="text-base font-semibold">Menu Details</p>
        <p class="text-slate-700">Help us create your online ordering page.</p>
      </div>
      <div class="flex flex-col gap-1">
        <p class="font-medium">Menu Website URL (Optional)</p>
        <div class="relative">
          <input
            type="text"
            class="w-full border rounded-md px-3 py-2 pr-10 outline-none placeholder:text-slate-400"
            placeholder="https://www.yourcafe.com/menu"
            v-model="business_info.web_url"
            :class="{
              'border-red-500': !(valid_web_url || valid_menu_url) && is_check,
              'border-slate-200': valid_web_url || valid_menu_url || !is_check,
              'bg-slate-200 opacity-75 pointer-events-none': business_info.menu_url,
            }"
          />
          <XCircleIcon
            v-if="business_info.web_url"
            @click="business_info.web_url = ''"
            class="text-red-500 size-5 absolute right-3 top-0 bottom-0 my-auto cursor-pointer"
          />
        </div>
        <p class="text-slate-700">
          We'll fetch your menu from this link, or you can upload photos.
        </p>
      </div>
    </section>

    <section
      class="py-3 px-6 border rounded-xl flex flex-col gap-1"
      :class="{
        'border-red-500': !(business_info.web_url || valid_menu_url) && is_check,
        'border-slate-200': business_info.web_url || valid_menu_url || !is_check,
        'bg-slate-200 opacity-75 pointer-events-none': business_info.web_url,
      }"
    >
      <p class="font-semibold text-base">Upload Menu Photos</p>
      <p>Upload images of your menu pages. Supported formats: JPG, PNG, PDF.</p>
      <label
        v-if="!business_info.menu_url"
        class="cursor-pointer flex flex-col items-center w-full text-slate-700"
      >
        <CameraIcon class="w-14 h-14" />
        <p class="">Choose file or take picture</p>
        <input type="file" class="hidden" accept="image/*" @change="handleImageUpload" />
      </label>
      <template v-else class="flex flex-col gap-1 items-center">
        <img :src="business_info.menu_url" alt="Preview" class="w-full rounded-xl shadow" />
        <button
          class="text-base font-medium flex mx-auto text-slate-700"
          @click="business_info.menu_url = ''"
        >
          <TrashIcon class="w-6 h-6" />
          Remove picture
        </button>
      </template>
    </section>

    <footer class="flex justify-between font-semibold">
      <button @click="back" class="py-1.5 px-10 rounded-md bg-slate-200 text-slate-700">
        Back
      </button>
      <button
        @click="next"
        class="py-1.5 px-10 rounded-md"
        :class="{
          'bg-blue-200 text-blue-700': !valid_to_next,
          'bg-blue-700 text-white': valid_to_next,
        }"
      >
        Next
      </button>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { $chatbot } from '@/api/chatbot'
import { $merchant } from '@/api/merchant'
import { useAppStore, useOnBoardingStore } from '@/stores'
import { toRenderDomain } from '@/utils'
import { useCreateTokenMerchant } from '@/views/OnBoarding/composable/useCreateTokenMerchant'
import { computed, ref } from 'vue'

import CameraIcon from '@/components/icons/CameraIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import { XCircleIcon } from '@heroicons/vue/24/solid'

const $emit = defineEmits(['next', 'back'])

// store
const appStore = useAppStore()
const onBoardingStore = useOnBoardingStore()

// composable
const { createTokenMerchant } = useCreateTokenMerchant()

/** thông tin công ty */
const business_info = computed({
  get: () => onBoardingStore.business_info,
  set: (value) => {
    onBoardingStore.business_info = value
  },
})

/** cờ check dữ liệu để hiển thị ui */
const is_check = ref(false)

/** đủ điều kiện để sang bước tiếp */
const valid_to_next = computed(() => {
  return business_info.value.name.trim() && (valid_menu_url.value || valid_web_url.value)
})

/** kiểm tra xem link menu có hợp lệ không */
const valid_menu_url = computed(() => {
  return isValidURL(business_info.value.menu_url.trim())
})

/** kiểm tra xem link website có hợp lệ không */
const valid_web_url = computed(() => {
  return isValidURL(business_info.value.web_url.trim())
})

/** kiểm tra xem link có hợp lệ không */
function isValidURL(url: string) {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}

/** Hàm xử lý khi người dùng chọn ảnh */
function handleImageUpload(event: Event) {
  /** input nhập ảnh */
  const TARGET = event.target as HTMLInputElement
  /** lấy ra ảnh đầu tiên */
  const FILE = TARGET.files?.[0]
  // nếu không có ảnh thì thôi
  if (!FILE) return

  /** các loại ảnh được tải lên */
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
  // nếu không phải là ảnh thì không cho phép
  if (!ALLOWED_TYPES.includes(FILE.type)) {
    alert('Chỉ hỗ trợ ảnh JPG, PNG hoặc WEBP.')
    return
  }

  /** Kích thước tối đa (<= 5MB) */
  const MAX_SIZE = 5 * 1024 * 1024
  // nếu quá 5MB thì không cho phép
  if (FILE.size > MAX_SIZE) {
    alert('Ảnh quá lớn. Dung lượng tối đa là 5MB.')
    return
  }

  /** Bộ đọc file thành base64 */
  const READER = new FileReader()
  // đọc xog thì lưu lại link ảnh
  READER.onload = () => {
    business_info.value.menu_url = READER.result as string
  }
  READER.readAsDataURL(FILE)
}

/** tạo page chatbot */
async function createPageChatbot() {
  try {
    /** dữ liệu của page mới được tạo */
    const RES = await $chatbot.createPage({
      org_id: appStore.org_id,
      name: toRenderDomain(business_info.value.name),
    })
    // lưu lại id page vào store
    appStore.page_id =  RES?.fb_page_id
  } catch (e) {
    console.error(e)
  }
}

/** quay lại */
function back() {
  $emit('back')
}

/** tiến trước */
async function next() {
  try {
    // bật check
    is_check.value = true

    // nếu dữ liệu của hợp lệ thì dừng lại
    if (!valid_to_next.value) return
  
    if(!appStore.page_id) {
      // tạo page mới nếu của có page
      await createPageChatbot()
    }

    // tạo token merchant
    await createTokenMerchant()

    $emit('next')

    // nếu không có token merchant thì thôi
    if(!appStore.merchant_token) {
      console.log('chưa có token merchant')
      return
    }

    // tạo danh sách sản phẩm từ ảnh
    $merchant.createProductFromImage({
      type: 'url',
      url: business_info.value.web_url || business_info.value.menu_url
    })

    // bật tự động assign nhân sự
    $chatbot.autoAssignStaff(appStore.user_id)

    // setup trợ lý ảo bên chat bot
    setupAIAgentChatbot()
  } catch (error) {
    
  }
}

/** bật tự động assign nhân sự */
function autoAssignStaff() {
  $chatbot.autoAssignStaff(appStore.user_id)
}

/** setup trợ lý ảo bên chat bot */
async function setupAIAgentChatbot(){
  try {
    
    /** ID của trợ lý ảo */
    let id_ai_agent = await getFirstAIAgent(appStore.org_id)

    // nếu không có trợ lý ảo thì tạo mới
    if(!id_ai_agent) {
      /** kết quả tạo */
      const RESULT_CREATE = await createAIAgent()

      // nếu tạo thành công thì gọi lại api lấy danh sách để lấy id
      if(RESULT_CREATE) {
        id_ai_agent = await getFirstAIAgent(appStore.org_id)
      }
    }

    // cập nhật cài đặt trang
    await $chatbot.updateSettingPage({
      page_id: appStore.page_id,
      ai_agent_id: id_ai_agent,
    })

    // cập nhật cài đặt trợ lý ảo
    await $chatbot.updateSettingAIAgent({
      page_id: id_ai_agent,
    })

  } catch (e) {
    console.log(e);
    
  }
}

/** tạo mới trợ lý ảo */
async function createAIAgent() {
  try {
    // nếu không có id tổ chức thì thôi
    if(!appStore.org_id) {
      console.log('chưa có id tổ chức')
      return
    }

    // tạo trợ lý ảo
    const RES = await $chatbot.createAIAgent(appStore.org_id)

    /** Nếu code !== 200 thì throw lỗi */
    if (RES?.code !== 200) {
      throw RES?.message;
    }
    return true;
  } catch (e) {
    throw e
  }
}

/** lấy id của agent đầu tiên */
async function getFirstAIAgent(org_id: string) {
  try {
    // lấy danh sách trợ lý ảo
    const RES = await $chatbot.getAIAgents(org_id)

    console.log(RES);
    

    /** ID của trợ lý ảo */
    return RES?.[0]?.fb_page_id
  } catch (error) {
    console.error(error)
  }
}



</script>
