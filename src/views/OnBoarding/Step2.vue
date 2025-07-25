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
            class="w-full border rounded-md px-3 py-2 outline-none placeholder:text-slate-400"
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
import { computed, ref } from 'vue'
import { useOnBoardingStore } from '@/stores'

import CameraIcon from '@/components/icons/CameraIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import { XCircleIcon } from '@heroicons/vue/24/solid'

const $emit = defineEmits(['next', 'back'])

// store
const onBoardingStore = useOnBoardingStore()

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

const valid_menu_url = computed(() => {
  return isValidURL(business_info.value.menu_url.trim())
})

const valid_web_url = computed(() => {
  return isValidURL(business_info.value.web_url.trim())
})

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

/** tiến trước */
function next() {
  is_check.value = true
  if (!valid_to_next.value) return
  $emit('next')
}

/** quay lại */
function back() {
  $emit('back')
}
</script>
