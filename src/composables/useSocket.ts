import { size } from "lodash"
import { ref } from "vue"

export function useSocket() {
  /** dữ liệu socket */
  const ws = ref<WebSocket | null>(null)

  /** cờ check có kết nối lại không */
  const is_reconnect = ref(false)

  /** timeout */
let timeout: ReturnType<typeof setTimeout> | null = null;

  /** khởi tạo socket */
  function initSocket(employee_id:string, branch_id:string, cb: Function) {
    // tạo mới socket
    ws.value = new WebSocket('wss://v3-socket.merchant.vn')

    // mở kết nối
    ws.value.onopen = function () {
      ws.value?.send(
        JSON.stringify({
          employee_id,
          branch_id
        })
      )
    }

    // nhận dữ liệu
    ws.value.onmessage = function ({data}) {
      /** dữ liệu socket */
      let socket_data:any = {}

      // cố gắng giải mã dữ liệu
      try {
        socket_data = JSON.parse(data)
      } catch (e) {}

      // nếu không có thì thôi
      if (!size(socket_data)) return
      // gọi hàm xử lý
      cb(socket_data)
    }

    // socket bị đóng
    ws.value.onclose = function (e) {
      console.log(
        'Socket is closed. Reconnect will be attempted in 1 second.',
        e.reason
      )

      // nếu tắt thì thôi
      if(!is_reconnect.value) return

      // tự động kết nối lại socket
      timeout = setTimeout(function () {
        initSocket(employee_id, branch_id, cb)
      }, 1000)
    }

    // lỗi socket
    ws.value.onerror = function (err: any) {
      // nếu có lỗi tự đóng socket
      ws.value?.close()
    }
  }

  /** đóng socket */
  function closeSocket() {
    // tắt cờ kết nối lại
    is_reconnect.value = false
    // xóa timeout
    if (timeout) clearTimeout(timeout)
    // đóng socket
    ws.value?.close()
  }

  return { initSocket, closeSocket }
}