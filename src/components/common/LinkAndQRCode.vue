<template>
  <section class="flex flex-col gap-3 p-3 border rounded-lg w-full">
    <div class="flex gap-2 items-center">
      <img
        :src="GlobalIcon"
        class="size-7"
      />
      <p class="text-base font-semibold">Link connect your Audience</p>
    </div>
    <div class="flex flex-col items-center">
      <div class="flex gap-1 w-full">
        <p class="flex-1 font-medium py-2 px-3 bg-slate-100 rounded truncate">
          {{ `${URL}/c/${$props.page_id}` }}
        </p>
        <button
          class="py-1.5 px-6 border border-blue-700 rounded-md font-semibold text-blue-700 bg-blue-100"
          @click="copyLink()"
        >
          Copy
        </button>
      </div>
      <canvas
        class="w-52 h-52"
        ref="canvas_ref"
      ></canvas>
      <button
        class="py-1.5 px-12 border border-blue-700 rounded-md font-semibold text-blue-700 bg-blue-100"
        @click="downloadQR"
      >
        Save QR Code
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import QRCode from 'qrcode'

import GlobalIcon from '@/assets/icons/global.png'

const URL = 'https://c.retify.ai'

const $props = defineProps({
  page_id: {
    type: String,
    required: true,
  }
})

/** ref tới phần tử hiển thị qr code */
const canvas_ref = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  generateQR()
})

/** tạo qr code */
async function generateQR() {
  try {
    // nếu không có phần tử canvas thì thôi
    if (!canvas_ref.value) return

    // tao qr code
    await QRCode.toCanvas(
      canvas_ref.value,
      `${URL}/c/${$props.page_id}`,
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

/** copy link chat */
async function copyLink() {
  await navigator.clipboard.writeText(
    `${URL}/c/${$props.page_id}`,
  )

  // báo copy thành công
  alert('Copied')
}
</script>
