import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { EmployeeData } from '@/interfaces'

export const useAppStore = defineStore('app', () => {
  /** token chatbot */
  const chatbot_token = ref('')

  /** token merchant */
  const merchant_token = ref('')

  /** dữ liệu merchant */
  const merchant_data = ref({
    employee_id: '',
    branch_id: '',
    org_id: '',
    business_id: '',
  })

  /** loading */
  const loading = ref(false)

  /** danh sách nhân sự dạng object */
  const employees_obj = ref<{ [key: string]: EmployeeData }>({})
  return {
    chatbot_token,
    merchant_token,
    merchant_data,
    loading,
    employees_obj,
  }
})
