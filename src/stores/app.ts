import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  /** token chatbot */
  const chatbot_token = ref('')

  /** token parner chatbot */
  const partner_token = ref('')

  /** id tổ chức */
  const org_id = ref('')

  /** id trang */
  const page_id = ref('')

  /** client id */
  const client_id = ref('')

  /** id của nhân viên */
  const user_id = ref('')

  /** token merchant */
  const merchant_token = ref('')

  return {
    chatbot_token,
    partner_token,
    org_id,
    page_id,
    client_id,
    user_id,
    merchant_token,
  }
})
