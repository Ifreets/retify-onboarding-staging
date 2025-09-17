<template>
  <article class="h-full flex flex-col items-center justify-center">
    <header class="flex justify-between items-center w-full px-2 border-b pb-2">
      <div class="min-w-14">
        <button
          v-if="view !== 'home'"
          @click="view = 'home'"
          class="flex gap-2 items-center font-medium"
        >
          <ArrowLeftIcon class="size-5" />
          Back
        </button>
      </div>
      <h3 class="text-2xl font-semibold">
        {{ VIEWS[view]?.title || 'Settings' }}
      </h3>
      <div class="w-14"></div>
    </header>
    <main class="h-full w-full relative overflow-hidden py-3">
      <Transition
        :name="transition_name"
        mode="out-in"
      >
        <SettingsHome
          v-if="view === 'home'"
          @open-view="openView"
        />
        <component
          v-else
          :is="VIEWS[view]?.template"
        />
      </Transition>
    </main>
    <LoadingFullScreen :loading="appStore.loading" />
  </article>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import { useRouter } from 'vue-router'
import { computed, ref, type Component } from 'vue'

import PosSystem from '@/views/HomeView/setting/PosSystem.vue'
import ProductList from '@/views/HomeView/setting/product/ProductList.vue'
import QrLink from '@/views/HomeView/setting/QrLink.vue'
import SettingsHome from '@/views/HomeView/setting/SettingsHome.vue'
import LoadingFullScreen from '@/components/ui/LoadingFullScreen.vue'

import { ArrowLeftIcon } from '@heroicons/vue/24/solid'

const VIEWS: Record<string, { title: string; template: Component }> = {
  qr_link: {
    title: 'QR code & Link',
    template: QrLink,
  },
  product: {
    title: 'Products',
    template: ProductList,
  },
  pos_system: {
    title: 'POS System',
    template: PosSystem,
  },
}

// store
const appStore = useAppStore()

// router
const route = useRouter()

/** màn hình hiện tại */
const view = ref(getView())

function getView() {
  const VIEW_URL = route.currentRoute.value.query.view as string
  if (VIEW_URL) return VIEW_URL
  return 'home'
}

/** loại animation */
const transition_name = computed(() => {
  return view.value === 'home' ? 'slide-right' : 'slide-left'
})

/** tiêu đề ở header */
const title = computed(() => {
  switch (view.value) {
    case 'home':
      return 'Settings'
    case 'qr_link':
      return 'QR code & Link'
  }
})

/** hàm mở view */
function openView(data: string) {
  view.value = data
}
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s ease-in-out;
  position: absolute;
  width: 100%;
  top: 12px;
  left: 12px;
  height: calc(100% - 24px);
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
