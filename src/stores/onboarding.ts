import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useOnBoardingStore = defineStore('onboarding', () => {
  /** thông tin công ty */
  const business_info = ref({
    type: '',
    name: '',
    web_url: '',
    menu_url: '',
  })

  return { business_info }
})
