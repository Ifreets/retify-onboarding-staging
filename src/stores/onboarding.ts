import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOnBoardingStore = defineStore('onboarding', () => {
  /** thông tin công ty */
  const business_info = ref({
    type: '',
    name: '',
    web_url: '',
    menu_url: '',
  })

  /** dữ liệu đã chọn */
  const selected_data = ref({
    org_id: '',
    page_id: '',
    user_id: '',
  })

  /** các cờ check đã thực hiện thao tác chưa */
  const is_setup = ref({
    ai_agent: false,
    page: false,
    product: false,
    auto_assign_staff: false,
  })

  return { business_info, selected_data, is_setup }
})
