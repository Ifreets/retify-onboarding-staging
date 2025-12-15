import { toast, type ToastPosition, type ToastType } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

/** cấu hình của thông báo */
interface NotifySetup {
  type?: ToastType
  duration?: number
  position?: ToastPosition
}

/** các giá trị cấu hình mặc định */
const DEFAULT: NotifySetup = {
  type: 'info',
  duration: 2000,
  position: 'top-center',
}

export function useToast() {
  /** Gọi toast thông báo */
  function notify(text: string, data: NotifySetup = {}) {
    /** Cấu hình thông báo */
    const options = { ...DEFAULT, ...data }
    /** Gọi toast thông báo */
    toast(text, {
      autoClose: options.duration,
      type: options.type,
      position: options.position,
    })
  }

  return {
    notify,
  }
}
