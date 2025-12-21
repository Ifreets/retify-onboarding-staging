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

/** cờ check iframe đã ready chưa */
const is_iframe_ready = ref(false)

/** queue lưu các message từ mobile khi iframe chưa ready */
const pending_messages = ref<any[]>([])

/** timer ID để cancel nếu READY đến sớm */
let fallback_timer: ReturnType<typeof setTimeout> | null = null

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

  /** Xử lý sự kiện message */
  window.addEventListener('message', HandleMessageEvent)
})

onUnmounted(() => {
  /** Xóa sự kiện message */
  window.removeEventListener('message', HandleMessageEvent)
  /** Clear timer nếu còn */
  if (fallback_timer) clearTimeout(fallback_timer)
})

/** forward message vào iframe */
function ForwardToIframe(payload: any) {
  /** đổi from thành 'parent-app' khi forward */
  const FORWARD_PAYLOAD = { ...payload, from: 'parent-app' }

  /** gửi message vào iframe */
  iframe_ref.value?.contentWindow?.postMessage(FORWARD_PAYLOAD, '*')

  console.log('[BRIDGE] Forwarded to iframe:', FORWARD_PAYLOAD)
}

/** flush tất cả pending messages vào iframe */
function FlushPendingMessages() {
  /** nếu không có message thì return */
  if (pending_messages.value.length === 0) return

  console.log(
    `[BRIDGE] Flushing ${pending_messages.value.length} pending messages`,
  )

  /** forward từng message trong queue */
  pending_messages.value.forEach(payload => ForwardToIframe(payload))

  /** clear queue sau khi flush */
  pending_messages.value = []
}

/** hàm xử lý sự kiện message */
function HandleMessageEvent(event: MessageEvent) {
  let PAYLOAD: any

  /** Parse payload an toàn */
  try {
    PAYLOAD =
      typeof event.data === 'string' ? JSON.parse(event.data) : event.data
  } catch (e) {
    return
  }

  /** =================================================
   *  NHẬN MESSAGE TỪ MOBILE APP → FORWARD VÀO IFRAME
   * ================================================= */
  if (PAYLOAD?.from === 'parent-app-check') {
    console.log('[BRIDGE] Receive from Native:', PAYLOAD)

    /** nếu iframe đã ready → forward ngay (với buffer 1s) */
    if (is_iframe_ready.value) {
      console.log('[BRIDGE] Iframe already ready, forwarding with 1s buffer')
      setTimeout(() => ForwardToIframe(PAYLOAD), 1000)
    } else {
      /** lưu vào queue */
      pending_messages.value.push(PAYLOAD)
      console.log('[BRIDGE] Queued message, waiting for READY or fallback 3s')

      /** set fallback timer 3s - phòng trường hợp READY không đến */
      if (!fallback_timer) {
        fallback_timer = setTimeout(() => {
          console.log('[BRIDGE] Fallback 3s triggered')
          is_iframe_ready.value = true
          FlushPendingMessages()
          fallback_timer = null
        }, 3000)
      }
    }
    return
  }

  /** =================================================
   *  NHẬN SIGNAL READY TỪ IFRAME → FLUSH PENDING MESSAGES
   * ================================================= */
  if (PAYLOAD?.status === 'READY') {
    console.log('[BRIDGE] Iframe is READY')

    /** cancel fallback timer nếu có */
    if (fallback_timer) {
      clearTimeout(fallback_timer)
      fallback_timer = null
      console.log('[BRIDGE] Cancelled fallback timer')
    }

    /** đánh dấu iframe đã ready */
    is_iframe_ready.value = true

    /** delay 1s buffer rồi flush */
    setTimeout(() => {
      console.log('[BRIDGE] Flushing after 1s buffer')
      FlushPendingMessages()
    }, 1000)

    /** xử lý data embed chat từ localStorage */
    const SAVED = localStorage.getItem(`${PAYLOAD.key}`)
    if (SAVED && iframe_ref.value?.contentWindow) {
      iframe_ref.value.contentWindow.postMessage(
        {
          from: 'RETION_EMBED',
          type: 'CLIENT_ID',
          data_embed_chat: SAVED,
        },
        '*',
      )
    }
    return
  }

  /** =================================================
   *  NHẬN DATA TỪ IFRAME → LƯU VÀO LOCALSTORAGE
   * ================================================= */
  if (PAYLOAD?.from === 'BBH-EMBED-IFRAME' && PAYLOAD.type === 'CLIENT_ID') {
    console.log('[BRIDGE] Received data from iframe')

    /** cancel fallback timer nếu có */
    if (fallback_timer) {
      clearTimeout(fallback_timer)
      fallback_timer = null
    }

    /** đánh dấu iframe đã ready nếu chưa */
    if (!is_iframe_ready.value) {
      is_iframe_ready.value = true
      /** delay 1s buffer rồi flush */
      setTimeout(() => FlushPendingMessages(), 1000)
    }

    /** lưu data vào localStorage */
    localStorage.setItem(
      `${PAYLOAD.key}`,
      JSON.stringify(PAYLOAD.data_embed_chat),
    )
    console.log('[SDK] Saved:', PAYLOAD.data_embed_chat)
  }
}
</script>
