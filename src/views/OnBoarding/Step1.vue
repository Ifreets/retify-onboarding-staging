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
        <component :is="item.icon" class="w-8 h-8" />
        <span>{{ item.name }}</span>
      </li>
    </ul>
    <footer class="flex justify-between font-semibold">
      <button @click="back" class="py-1.5 px-10 rounded-md bg-slate-200 text-slate-700">
        Back
      </button>
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
import BakeryPatisserieIcon from '@/components/icons/BakeryPatisserieIcon.vue'
import CafeBarIcon from '@/components/icons/CafeBarIcon.vue'
import CateringServiceIcon from '@/components/icons/CateringServiceIcon.vue'
import FoodTruckIcon from '@/components/icons/FoodTruckIcon.vue'
import PizzeriaIcon from '@/components/icons/PizzeriaIcon.vue'
import RestaurantIcon from '@/components/icons/RestaurantIcon.vue'
import { ref } from 'vue'

const BUSINESS_TYPES = [
  {
    id: 1,
    name: 'Restaurant',
    icon: RestaurantIcon,
  },
  {
    id: 2,
    name: 'Cafe & Bar',
    icon: CafeBarIcon,
  },
  {
    id: 3,
    name: 'Bakery & Patisserie',
    icon: BakeryPatisserieIcon,
  },
  {
    id: 4,
    name: 'Food Truck',
    icon: FoodTruckIcon,
  },
  {
    id: 5,
    name: 'Catering Service',
    icon: CateringServiceIcon,
  },
  {
    id: 6,
    name: 'Pizzeria',
    icon: PizzeriaIcon,
  },
]

const $emit = defineEmits(['next', 'back'])

const business_type = ref<number | undefined>()

/** tiến trước */
function next() {
  $emit('next')
}

/** quay lại */
function back() {
  $emit('back')
}
</script>
