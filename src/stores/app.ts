import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  /** token chatbot */
  const chatbot_token = ref('')

  /** token merchant */
  const merchant_token = ref('')

  return {
    chatbot_token,
    merchant_token,
  }
})
