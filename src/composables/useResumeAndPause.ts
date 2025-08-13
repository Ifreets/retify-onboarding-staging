import { onMounted, onUnmounted } from 'vue'

export function useResumeAndPause(props: {
  onResume?: Function
  onPaused?: Function
}) {
  onMounted(() => {
    // lắng nghe sự kiện
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onUnmounted(() => {
    // huy lắng nghe sự kiện
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })

  /** hàm xử lý sự kiện visibilitychange */
  function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
      props.onResume?.()
    } else {
      props.onPaused?.()
    }
  }
  return {}
}
