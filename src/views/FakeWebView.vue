<template>
  <iframe
    v-if="route.query.url"
    ref="iframe"
    :src="route.query.url as string"
    class="w-dvw h-dvh"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const iframe = ref<HTMLIFrameElement | null>(null)

onMounted(() => {
  iframe.value?.contentWindow?.addEventListener('message', handleMessageEvent)
})


function handleMessageEvent(event: MessageEvent) {
  /** Tạo biến data */
  let data: any
  try {
    /**  Cố gắng parse nếu là JSON */
    data =
      typeof event.data === 'string' ? JSON.parse(event.data) : event.data
  } catch (error) {
    console.warn('Không phải JSON, bỏ qua:', event.data)
    return
  }

  /** Kiem tra event data */
  if (data?.type === 'page.shopify') {
    router.push({
      path: '/home/setting?view=pos_system',
      query: {
        url: data.payload?.url,
      },
    })
  }
}
</script>
