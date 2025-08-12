import { onMounted, onUnmounted } from 'vue'

/** hook xử lý post message với mobile */
export function useMessagePost(callback: Function) {
  onMounted(() => {
    // lắng nghe post message
    window.addEventListener('message', handleMessage)
  })

  onUnmounted(() => {
    // huy lắng nghe post message
    window.removeEventListener('message', handleMessage)
  })

  /** Nhận Message từ Mobile */
  function handleMessage(event: MessageEvent) {
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

    // gọi hàm call back với dữ liệu nhận được
    callback(data)
  }

  return {}
}
