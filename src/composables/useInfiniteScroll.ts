import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue'

interface UseInfiniteScrollOptions {
  element: Ref<HTMLElement | null> // container hoặc không truyền (window)
  offset: number
  onLoadMore: Function
}

export function useInfiniteScroll({
  element,
  offset = 200,
  onLoadMore,
}: UseInfiniteScrollOptions) {
  const is_fetching = ref(false)
  onMounted(() => {
    // nếu không có phần tử container nào thì thôi
    if (!element.value) return

    // lắng nghe với phần tử container
    watch(
      element,
      (el, _, onCleanup) => {
        if (el) {
          addListener(el)
          onCleanup(() => removeListener(el))
        }
      },
      { immediate: true },
    )
  })

  onUnmounted(() => {
    if (element.value) removeListener(element.value)
  })

  /** lắng nghe sự kiện scroll với phần tử container */
  function addListener(target: HTMLElement) {
    target.addEventListener('scroll', handleScroll)
  }

  /** hàm huy lắng nghe sự kiện scroll với phần tử container */
  function removeListener(target: HTMLElement) {
    target.removeEventListener('scroll', handleScroll)
  }

  /** hàm xử lý khi container scroll */
  async function handleScroll() {
    try {
      /** phần từ container */
      const TARGET = element.value
      // nếu không có thì thôi
      if(!TARGET) return

      // nếu đang fetching hoặc chưa scroll đến cuối thì thôi
      if (!is_fetching.value && checkScroll(TARGET)) {
        // bật cờ đang load dữ liệu
        is_fetching.value = true
        // load thêm dữ liệu
        await onLoadMore()
        // tắt cờ khi load xong
        is_fetching.value = false
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  /** hàm kiểm tra xem container đang scroll đến cuối chưa */
  function checkScroll(target: HTMLElement) {
    const { scrollTop, scrollHeight, clientHeight } = target
    return scrollTop + clientHeight >= scrollHeight - offset
  }
}
