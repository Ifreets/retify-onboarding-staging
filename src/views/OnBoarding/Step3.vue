<template>
  <section class="flex flex-col gap-3 text-base overflow-auto h-full">
    <header class="flex flex-col gap-1 bg-white">
      <p
        class="rounded-full font-semibold bg-blue-700 w-8 h-8 flex items-center justify-center text-white"
      >
        3
      </p>
      <p class="font-semibold">Connect Your Audience</p>
      <p class="text-slate-700">
        Select the platforms where your customers can easily connect with your
        business.
      </p>
    </header>
    <main class="flex flex-col gap-3 flex-grow">
      <section class="flex flex-col gap-3 p-3 border rounded-lg">
        <div class="flex gap-2 items-center">
          <img :src="GlobalIcon" class="size-7" />
          <p class="text-base font-semibold">Link connect your Audience</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="flex gap-1 w-full">
            <p
              class="flex-1 font-medium py-2 px-3 bg-slate-100 rounded truncate"
            >
              {{
                `${URL}/c/${onBoardingStore.selected_data.page_id}`
              }}
            </p>
            <button
              class="py-1.5 px-6 border border-blue-700 rounded-md font-semibold text-blue-700 bg-blue-100"
              @click="copyLink()"
            >
              Copy
            </button>
          </div>
          <canvas class="w-52 h-52" ref="canvas_ref"></canvas>
          <button
            class="py-1.5 px-12 border border-blue-700 rounded-md font-semibold text-blue-700 bg-blue-100"
            @click="downloadQR"
          >
            Save QR Code
          </button>
        </div>
      </section>
    </main>

    <!-- <section class="flex gap-2 items-center">
      <div class="flex-1 h-px bg-slate-200"></div>
      <p>OR</p>
      <div class="flex-1 h-px bg-slate-200"></div>
    </section> -->

    <!-- <ul class="flex flex-col gap-2">
      <li
        v-for="item in SOCIALS"
        class="py-1 px-3 flex justify-between font-semibold"
      >
        <div class="flex gap-2.5 items-center">
          <div class="p-3 rounded-full bg-gray-100">
            <component :is="item.icon" />
          </div>
          <p>{{ item.name }}</p>
        </div>
        <button class="text-blue-700">Connect</button>
      </li>
    </ul> -->

    <!-- <div class="w-full h-px bg-slate-200 flex-shrink-0"></div> -->

    <footer class="flex justify-between font-semibold">
      <button
        @click="back"
        class="py-1.5 px-10 rounded-md bg-slate-200 text-slate-700"
      >
        Back
      </button>
      <button
        @click="next"
        class="py-1.5 px-10 rounded-md bg-blue-700 text-white disabled:bg-blue-200 disabled:text-blue-700"
        :disabled="
          !onBoardingStore.is_setup.page ||
          !onBoardingStore.is_setup.auto_assign_staff ||
          !onBoardingStore.is_setup.product ||
          !onBoardingStore.is_setup.ai_agent
        "
      >
        Finish
      </button>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { $chatbot } from '@/api'
import { useAppStore, useOnBoardingStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import QRCode from 'qrcode'

import GlobalIcon from '@/assets/icons/global.png'
import FacebookIcon from '@/components/icons/FacebookIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import TiktokIcon from '@/components/icons/TiktokIcon.vue'
import WebsiteIcon from '@/components/icons/WebsiteIcon.vue'
import WhatsappIcon from '@/components/icons/WhatsappIcon.vue'

const SOCIALS = [
  {
    name: 'Whatsapp',
    icon: WhatsappIcon,
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
  },
  {
    name: 'Facebook',
    icon: FacebookIcon,
  },
  {
    name: 'Tiktok',
    icon: TiktokIcon,
  },
  {
    name: 'Your Website',
    icon: WebsiteIcon,
  },
]

const URL = 'https://c.retify.ai/onboarding'

const $emit = defineEmits(['next', 'back'])

// store
const appStore = useAppStore()
const onBoardingStore = useOnBoardingStore()

// router
const router = useRouter()

/** ref tới phần tử hiển thị qr code */
const canvas_ref = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  generateQR()
})

/** copy link chat */
async function copyLink() {
  await navigator.clipboard.writeText(
    `${URL}/c/${onBoardingStore.selected_data.page_id}`,
  )

  // báo copy thành công
  alert('Copied')
}

/** tạo qr code */
async function generateQR() {
  try {
    // nếu không có phần tử canvas thì thôi
    if (!canvas_ref.value) return

    // tao qr code
    await QRCode.toCanvas(
      canvas_ref.value,
      `${URL}/c/${onBoardingStore.selected_data.page_id}`,
      {
        width: 208,
      },
    )
  } catch (e) {
    console.error(e)
  }
}

/** tải xuong qr code */
function downloadQR() {
  // nếu không có phần tử canvas thì thôi
  if (!canvas_ref.value) return

  /** link download */
  const DATA_URL = canvas_ref.value.toDataURL('image/png')

  /** tạo 1 thẻ a */
  const LINK = document.createElement('a')
  // gán cá thuộc tính cho thẻ đó
  LINK.href = DATA_URL
  LINK.download = 'qr-code.png'
  // click để tải xuống
  LINK.click()
}

/** tiến trước */
async function next() {
  try {
    // $emit('next')
    // router.push('/home')

    // Hàm cập nhật trạng thái setup
    await $chatbot.updateSetupStatus()

    // gửi event thành công cho native
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'page.home',
        message: {
          final: true,
          page_id: onBoardingStore.selected_data.page_id,
          org_id: onBoardingStore.selected_data.org_id,
        },
      }),
    )

    // xóa hết local storage
    localStorage.clear()
  } catch (e) {
    console.log(e)
  }
}

/** quay lại */
function back() {
  $emit('back')
}
</script>
