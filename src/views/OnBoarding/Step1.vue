<template>
  <section class="flex flex-col gap-3 text-base">
    <header class="flex flex-col gap-1">
      <p
        class="rounded-full font-semibold bg-blue-700 w-8 h-8 flex items-center justify-center text-white"
      >
        1
      </p>
      <p class="font-semibold">What type of business best describes you?</p>
      <p class="text-slate-700">This helps us tailor your Retify experience.</p>
    </header>
    <ul class="grid grid-cols-2 gap-3">
      <li
        v-for="item in BUSINESS_TYPES"
        :key="item.name"
        class="flex flex-col items-center gap-1 py-3 border border-slate-200 rounded-lg cursor-pointer"
        :class="{
          'bg-blue-700 text-white': business_type === item.id,
          'hover:bg-blue-50': business_type !== item.id,
        }"
        @click="business_type = item.id"
      >
        <component
          :is="item.icon"
          class="w-8 h-8"
        />
        <span>{{ item.name }}</span>
      </li>
    </ul>
    <footer class="flex justify-between font-semibold">
      <div>
        <button
          v-if="is_has_back"
          @click="back"
          class="py-1.5 px-10 rounded-md bg-slate-200 text-slate-700"
        >
          Back
        </button>
      </div>
      <button
        @click="next"
        class="py-1.5 px-10 rounded-md bg-blue-700 text-white disabled:bg-blue-200 disabled:text-blue-700"
        :disabled="!business_type"
      >
        Next
      </button>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { useOnBoardingStore } from '@/stores'
import { computed } from 'vue'

import BakeryPatisserieIcon from '@/components/icons/BakeryPatisserieIcon.vue'
import CafeBarIcon from '@/components/icons/CafeBarIcon.vue'
import CateringServiceIcon from '@/components/icons/CateringServiceIcon.vue'
import FoodTruckIcon from '@/components/icons/FoodTruckIcon.vue'
import PizzeriaIcon from '@/components/icons/PizzeriaIcon.vue'
import RestaurantIcon from '@/components/icons/RestaurantIcon.vue'

/** các loại doanh nghiệp */
const BUSINESS_TYPES = [
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: RestaurantIcon,
  },
  {
    id: 'cafe-bar',
    name: 'Cafe & Bar',
    icon: CafeBarIcon,
  },
  {
    id: 'bakery-patisserie',
    name: 'Bakery & Patisserie',
    icon: BakeryPatisserieIcon,
  },
  {
    id: 'food-truck',
    name: 'Food Truck',
    icon: FoodTruckIcon,
  },
  {
    id: 'catering-service',
    name: 'Catering Service',
    icon: CateringServiceIcon,
  },
  {
    id: 'pizzeria',
    name: 'Pizzeria',
    icon: PizzeriaIcon,
  },
]

const $emit = defineEmits(['next', 'back'])

const $props = defineProps({
  /** cờ check có hiển thị nút back hay không */
  is_has_back: {
    type: Boolean,
    required: true,
  },
  /** cờ check đang chạy trên app native hay không */
  is_native_app: {
    type: Boolean,
    default: false,
  },
  /** cờ check có nhiều tổ chức hay không */
  is_multi_org: {
    type: Boolean,
    default: false,
  },
})

// store
const onBoardingStore = useOnBoardingStore()

const business_type = computed({
  get: () => onBoardingStore.business_info.type,
  set: value => {
    onBoardingStore.business_info.type = value
  },
})

/** tiến trước */
function next() {
  $emit('next')
}

/** lùi lại */
function back() {
  /** Case 1: Có select org -> back về select org */
  if ($props.is_multi_org) {
    $emit('back')
    return
  }

  /** Case 2: Không có select org -> post message back -> login */
  /** nếu là app native thì gửi postMessage về mobile app để back về màn login */
  if ($props.is_native_app) {
    const message = { action: 'back_to_login' }
    // Check if running in React Native WebView
    if ((window as any).ReactNativeWebView) {
      ;(window as any).ReactNativeWebView.postMessage(JSON.stringify(message))
    } else {
      window.parent.postMessage(message, '*')
    }
    return
  }

  /** nếu là PC thì emit back */
  $emit('back')
}
</script>
