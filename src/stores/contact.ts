import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Contact, Label } from '@/interfaces'

export const useContactStore = defineStore('contact', () => {
  /** đơn hàng được chọn */
  const selected_contact = ref<Contact>({})
  /** danh sách nhãn */
  const labels_obj = ref<{ [key: string]: Label }>({})
  return {
    labels_obj,
    selected_contact,
  }
})
