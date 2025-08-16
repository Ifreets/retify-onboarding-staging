<template>
  <iframe
    v-if="url"
    :src="url"
    className="w-dvw h-dvh"
    title="Embedded Content"
    sandbox="allow-scripts allow-same-origin"
    @load="onIframeLoad"
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

  /** Xử lý sự kiện message */
  window.addEventListener('message', handleMessageEvent)
})

onUnmounted(() => {
  /** Xóa sự kiện message */
  window.removeEventListener('message', handleMessageEvent)
})

/** hàm xử lý sự kiện message */
function handleMessageEvent(event: MessageEvent) {
  /** dữ liệu nhận được */
  const DATA = event?.data
  /** nguồn dữ liệu */
  const FROM = DATA?.from
  /** nội dung dữ liệu */
  const PAYLOAD = DATA?.payload

  /** nếu không phải từ iframe gửi tới thì thôi */
  if (FROM !== 'BBH-EMBED-IFRAME') return
  /** Cập nhật lại embed data */
  if (PAYLOAD.type === 'CLIENT_ID' && PAYLOAD.data_embed_chat) {
    localStorage.setItem(
      `data_embed_chat`,
      JSON.stringify(PAYLOAD.data_embed_chat),
    )
    console.log('[SDK] Saved data_embed_chat:', PAYLOAD.data_embed_chat)
  }
}

/** hàm xử lý sự kiện iframe load */
function onIframeLoad() {
  /** Khi iframe load, gửi lại client_id đã lưu (nếu có) */
  const SAVED_DATA_EMBED_CHAT = localStorage.getItem('data_embed_chat')
  /** Nếu trang parent có client id */
  if (SAVED_DATA_EMBED_CHAT) {
    /**
     *  Gửi thông điệp cho iframe cập nhật value
     */
    iframe_ref.value?.contentWindow?.postMessage(
      {
        from: 'RETION_EMBED',
        type: 'CLIENT_ID',
        data_embed_chat: SAVED_DATA_EMBED_CHAT,
      },
      '*', // Có thể thay bằng origin chính xác của embed
    )
    console.log('[SDK] Sent client_id to embed:', SAVED_DATA_EMBED_CHAT)
  }
}
</script>
