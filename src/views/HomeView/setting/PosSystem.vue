<template>
  <section class="relative h-full">
    
  </section>
</template>

<script setup lang="ts">
import { $order } from '@/api';
import { useAppStore } from '@/stores';
import { onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// store
const appStore = useAppStore()

// router
const router = useRouter()

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
    if(RES?.length) {

      return
    }
    // nếu chưa kết nối thì tao link oauth
    createLinkOauth()
  } catch (e) {
    console.log(e)
  }
}

/** hàm tạo link oauth */
async function createLinkOauth() {
  try {
    /** link oauth */
    const RES = await $order.createOauthLink()
    // nếu có link thì mở webview
    if(RES?.url) {
      /** dữ liệu gửi lên app*/
      const PAYLOAD = {
        type: "page.OPEN_SHOPIFY_OAUTH",
        url: RES?.url,
      };

      /** Android WebView */
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify(PAYLOAD));
      }

      router.push({
        path:'/web-view',
        query: {
          url: RES?.url
        }
      })
    }
  } catch (e) {
    console.log(e)
  }
}

</script>
