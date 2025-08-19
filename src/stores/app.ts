import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  /** token chatbot */
  const chatbot_token = ref('')

  /** token merchant */
  const merchant_token = ref('')

  /** dữ liệu merchant */
  const merchant_data = ref({
    employee_id: '',
    branch_id: '',
  })

  /** loading */
  const loading = ref(false)
  return {
    chatbot_token,
    merchant_token,
    merchant_data,
    loading,
  }
})
