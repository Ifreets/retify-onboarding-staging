<template>
  <iframe
    ref="iframe_ref"
    v-if="url"
    :src="url"
    className="w-dvw h-dvh"
    title="Embedded Content"
    sandbox="allow-scripts allow-same-origin allow-popups"
  />
</template>

<script setup lang="ts">
import { ENV } from '@/env'
import type { IEnv } from '@/interfaces'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

/** router */
const route = useRoute()

/** link iframe */
const url = ref('')

/** reference tới iframe */
const iframe_ref = ref<HTMLIFrameElement | null>(null)

onMounted(() => {
  /** Đường dẫn host của merchant */
  const $HOST: IEnv = ENV[import.meta.env.VITE_APP_ENV || 'development']

  /** id page */
  const ID = route.params.id as string

  /** Validate ID */
  if (!ID || !/^[a-zA-Z0-9_-]+$/.test(ID)) {
    console.log('ID khong hop le')
  }

  /** Iframe URL */
  const IFRAME_URL = $HOST.iframe_url

  /** IFRAME SOURCE */
  url.value = `${IFRAME_URL}/view-screen?page_id=${encodeURIComponent(ID)}`
  // url.value = `http://192.168.1.19:5174/view-screen?page_id=${encodeURIComponent(
  //   ID,
  // )}`

  /** Xử lý sự kiện message */
  window.addEventListener('message', handleMessageEvent)
})

onUnmounted(() => {
  /** Xóa sự kiện message */
  window.removeEventListener('message', handleMessageEvent)
})

/** hàm xử lý sự kiện message */
function handleMessageEvent(event: MessageEvent) {
  let PAYLOAD: any

  /** Parse payload an toàn */
  try {
    PAYLOAD =
      typeof event.data === 'string' ? JSON.parse(event.data) : event.data
  } catch (e) {
    return
  }
  /** =================================================
   *  🆕 LOGIC BỔ SUNG – Native → forward iframe
   * ================================================= */

  if (PAYLOAD?.from === 'parent-app') {
    console.log('[BRIDGE] Receive from Native:', PAYLOAD)

    iframe_ref.value?.contentWindow?.postMessage(
      PAYLOAD, // 👉 forward nguyên payload
      '*', // production: IFRAME_ORIGIN
    )
    return
  }
  /** =================================================
   *  LOGIC CŨ – GIỮ NGUYÊN (KHÔNG ĐỘNG)
   * ================================================= */

  if (PAYLOAD?.status === 'READY') {
    const SAVED = localStorage.getItem(`${PAYLOAD.key}`)
    console.log('SAVED', SAVED)

    if (SAVED && iframe_ref.value?.contentWindow) {
      iframe_ref.value.contentWindow.postMessage(
        {
          from: 'RETION_EMBED',
          type: 'CLIENT_ID',
          data_embed_chat: SAVED,
        },
        '*', // production thì check domain
      )
    }
  }

  if (PAYLOAD?.from === 'BBH-EMBED-IFRAME' && PAYLOAD.type === 'CLIENT_ID') {
    localStorage.setItem(
      `${PAYLOAD.key}`,
      JSON.stringify(PAYLOAD.data_embed_chat),
    )
    console.log('[SDK] Saved:', PAYLOAD.data_embed_chat)
  }
}
</script>
