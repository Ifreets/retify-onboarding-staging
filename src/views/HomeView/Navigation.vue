<template>
  <nav class="p-2 text-2xs text-slate-700 flex shadow-[0_-2px_20px_rgba(0,0,0,0.1)]">
    <RouterLink
      v-for="item in NAVS"
      :key="item.name"
      :to="{ path: item.path }"
      class="flex-grow flex flex-col items-center gap-0.5"
      :class="{
        'text-blue-700 font-semibold': isActive(item.path),
      }"
    >
      <component :is="isActive(item.path) ? item.active_icon : item.icon" class="w-6 h-6" />
      <span>{{ item.name }}</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import {
  ChartPieIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Cog6ToothIcon,
  ShoppingBagIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'
import {
  ChatBubbleOvalLeftEllipsisIcon as ActiveChatBubbleOvalLeftEllipsisIcon,
  ShoppingBagIcon as ActiveShoppingBagIcon,
  UsersIcon as ActiveUsersIcon,
  ChartPieIcon as ActiveChartPieIcon,
  Cog6ToothIcon as ActiveCog6ToothIcon,
} from '@heroicons/vue/24/solid'

/** danh sách các danh mục */
const NAVS = [
  {
    name: 'Orders',
    path: '/home/order',
    icon: ShoppingBagIcon,
    active_icon: ActiveShoppingBagIcon,
  },
  {
    name: 'Customers',
    path: '/home/customer',
    icon: UsersIcon,
    active_icon: ActiveUsersIcon,
  },
  {
    name: 'Conversations',
    path: '/home/conversation',
    icon: ChatBubbleOvalLeftEllipsisIcon,
    active_icon: ActiveChatBubbleOvalLeftEllipsisIcon,
  },
  {
    name: 'Reports',
    path: '/home/report',
    icon: ChartPieIcon,
    active_icon: ActiveChartPieIcon,
  },
  {
    name: 'Settings',
    path: '/home/setting',
    icon: Cog6ToothIcon,
    active_icon: ActiveCog6ToothIcon,
  },
]

// route
const route = useRoute()

/** kiểm tra có phải tab đang được chọn không */
function isActive(path: string) {
  return route.path?.includes(path)
}
</script>
