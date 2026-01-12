<template>
  <iframe
    ref="iframe_ref"
    v-if="url"
    :src="url"
    className="w-dvw h-dvh"
    title="Embedded Content"
    sandbox="allow-scripts allow-same-origin allow-popups"
    @load="OnIframeLoad"
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
  window.addEventListener('message', handleMessageEvent)
})

onUnmounted(() => {
  /** Xóa sự kiện message */
  window.removeEventListener('message', handleMessageEvent)
})

/** xử lý khi iframe load xong */
function OnIframeLoad() {
  console.log('[BRIDGE] Iframe loaded (native @load event)')

  /** đợi thêm 1 giây để JS trong iframe khởi tạo xong */
  setTimeout(() => {
    is_iframe_ready.value = true
  }, 1000)
}

/** forward message vào iframe */
function ForwardToIframe(payload: any) {
  /** đổi from thành 'parent-app' khi forward */
  const FORWARD_PAYLOAD = { ...payload, from: 'parent-app' }

  iframe_ref.value?.contentWindow?.postMessage(
    FORWARD_PAYLOAD,
    '*', // production: IFRAME_ORIGIN
  )
  console.log('[BRIDGE] Forwarded to iframe:', FORWARD_PAYLOAD)
}

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

  /** Nhận postMessage từ mobile app và forward vào iframe */
  /** Bỏ qua các message nội bộ (READY, BBH-EMBED-IFRAME) để tránh loop/xử lý sai */
  const IS_INTERNAL =
    PAYLOAD?.status === 'READY' ||
    (PAYLOAD?.from === 'BBH-EMBED-IFRAME' && PAYLOAD?.type === 'CLIENT_ID')

  if (!IS_INTERNAL) {
    console.log('[BRIDGE] Receive from Native (auto-forward):', PAYLOAD)

    /** chờ 3 giây để iframe load xong rồi mới forward */
    setTimeout(() => {
      console.log('[BRIDGE] Delayed forward after 3s')
      ForwardToIframe(PAYLOAD)
    }, 3000)
    return
  }

  /**
   * LOGIC:
   * 1. Iframe load xong -> gửi postMessage 'READY' kèm 'key'
   * 2. Parent nhận 'READY' -> kiểm tra localStorage theo 'key'
   * 3. Nếu có data -> gửi lại cho Iframe (type: 'CLIENT_ID')
   */
  if (PAYLOAD?.status === 'READY') {
    console.log('[BRIDGE] Iframe is READY')
    /** đánh dấu iframe đã ready */
    is_iframe_ready.value = true

    /** Lấy thông tin cố định từ localStorage theo yêu cầu */
    const DATA_SEND = {
      user_name: localStorage.getItem('user_name'),
      user_phone: localStorage.getItem('user_phone'),
      user_email: localStorage.getItem('user_email'),
      client_id: localStorage.getItem('client_id'),
    }

    console.log('Sending INFO to iframe:', DATA_SEND)

    if (iframe_ref.value?.contentWindow) {
      iframe_ref.value.contentWindow.postMessage(
        {
          from: 'RETION_EMBED',
          type: 'CLIENT_ID',
          data_embed_chat: JSON.stringify(DATA_SEND),
        },
        '*', // production thì check domain
      )
    }
  }

  /** Logic lưu ngược lại từ Iframe vào localStorage (nếu cần) */
  if (PAYLOAD?.from === 'BBH-EMBED-IFRAME' && PAYLOAD.type === 'CLIENT_ID') {
    console.log('[BRIDGE] Iframe confirmed ready via BBH-EMBED-IFRAME')

    /** đánh dấu iframe đã ready */
    is_iframe_ready.value = true

    localStorage.setItem(
      `${PAYLOAD.key}`,
      JSON.stringify(PAYLOAD.data_embed_chat),
    )

    console.log('[SDK] Saved:', PAYLOAD.data_embed_chat)
  }
}
</script>
