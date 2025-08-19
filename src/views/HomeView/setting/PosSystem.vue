<template>
  <section class="relative h-full">
    <ul class="p-2">
      <template v-for="item in integrations">
        <li
          class="flex gap-3 shadow-md rounded-md py-2 px-3"
          v-if="item.platform && INTEGRATIONS[item.platform]"
        >
          <component
            :is="INTEGRATIONS[item.platform].icon"
            class="w-8 h-8"
          />
          <div class="font-medium flex-1">
            <p class="text-base">{{ INTEGRATIONS[item.platform].name }}</p>
            <p class="text-green-600">Connected</p>
          </div>
          <div class="flex flex-col items-end">
            <p
              class="text-slate-500"
              v-if="item.created_at"
            >
              {{ format(item.created_at, 'MMMM d, yyyy') }}
            </p>
            <button
              class="text-red-500"
              @click="
                () => {
                  integration = item
                  is_open = true
                }
              "
            >
              Remove
            </button>
          </div>
        </li>
      </template>
    </ul>
    <Modal v-model:is_open="is_open">
      <div class="flex flex-col gap-3 items-center font-medium">
        <QuestionMarkCircleIcon class="size-20" />
        <p class="text-2xl text-center">Are you sure you want to remove?</p>
        <div class="flex justify-between gap-2 w-full pt-4">
          <button
            class="px-7 py-2 bg-red-100 text-red-500 rounded-md"
            @click="is_open = false"
          >
            Cancel
          </button>
          <button
            class="px-7 py-2 bg-blue-100 text-blue-700 rounded-md"
            @click="deleteIntegration(integration.id)"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { $order } from '@/api'
import { useAppStore } from '@/stores'
import { onBeforeMount, onMounted, ref, type Component } from 'vue'
import { useRouter } from 'vue-router'

import type { Integration } from '@/interfaces'
import SquareIcon from '@/components/icons/SquareIcon.vue'
import { format } from 'date-fns'
import Modal from '@/components/ui/Modal.vue'

const INTEGRATIONS: Record<string, { name: string; icon: Component }> = {
  SQUARE: {
    name: 'Square',
    icon: SquareIcon,
  },
}

// store
const appStore = useAppStore()

// router
const router = useRouter()

/** danh sách tích hợp */
const integrations = ref<Integration[]>([])

/** danh sách tích hợp hien tại */
const integration = ref<Integration>({})

/** ẩn hiệm modal xác nhận */
const is_open = ref(false)

onBeforeMount(() => {
  appStore.loading = true
})

onMounted(() => {
  getIntegration()
})

/** hàm lấy danh sách tích hợp */
async function getIntegration() {
  try {
    /** danh sách được kết nối */
    const RES = await $order.getIntegration()
    // nếu có thì lưu lại và hiển thị ra
    if (RES?.length) {
      // lưu lại
      integrations.value = RES
      // tắt loading
      appStore.loading = false
      return
    }
    // nếu chưa kết nối thì tao link oauth
    createLinkOauth()
  } catch (e) {
    console.log(e)
  } finally {
    appStore.loading = false
  }
}

/** hàm xóa tích hợp */
async function deleteIntegration(id?: string) {
  try {
    // tắt modal
    is_open.value = false
    // nếu không có id thì return
    if (!id) return
    // bật loading
    appStore.loading = true
    // xóa tích hợp
    await $order.deleteIntegration(id)
    // xóa tích hợp trong danh sách
    integrations.value = integrations.value.filter(item => item.id !== id)
  } catch (e) {
    console.log(e)
  } finally {
    // tắt loading
    appStore.loading = false
  }
}

/** hàm tạo link oauth */
async function createLinkOauth() {
  try {
    /** link oauth */
    const RES = await $order.createOauthLink()
    // nếu có link thì mở webview
    if (RES?.url) {
      /** dữ liệu gửi lên app*/
      const PAYLOAD = {
        type: 'page.OPEN_SHOPIFY_OAUTH',
        url: RES?.url,
      }

      /** Android WebView */
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify(PAYLOAD))
      }

      // fake action
      // openOAuthPopup(RES?.url)
      // router.push('/home')
    }
  } catch (e) {
    console.log(e)
  }
}

function openOAuthPopup(url: string, name = 'SquareOAuth') {
  const width = 500
  const height = 700
  const left = window.screenX + (window.outerWidth - width) / 2
  const top = window.screenY + (window.outerHeight - height) / 2

  const popup = window.open(
    url,
    name,
    `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars=yes,status=1`,
  )

  if (!popup) return

  // Kiểm tra định kỳ xem popup còn mở không
  const timer = setInterval(() => {
    if (popup.closed) {
      router.push('/home/setting?view=pos_system')

      clearInterval(timer)
      console.log('Popup đã đóng')

      // 👉 Bạn có thể trigger logic ở đây (ví dụ: cancel login nếu user đóng sớm)
    }
  }, 500)
}
</script>
