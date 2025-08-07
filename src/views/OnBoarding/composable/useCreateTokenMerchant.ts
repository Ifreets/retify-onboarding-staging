import { $chatbot, $merchant } from '@/api'
import { useAppStore, useOnBoardingStore } from '@/stores'
import { get, keys, values } from 'lodash'

export function useCreateTokenMerchant() {
  // store
  const appStore = useAppStore()
  const onBoardingStore = useOnBoardingStore()

  /** hàm lấy partner token */
  async function getPageInfo() {
    try {
      // nếu không có id tổ chức hoặc id page thì thôi
      if (!onBoardingStore.selected_data.org_id || !onBoardingStore.selected_data.page_id) {
        console.log('chưa có id tổ chức hoặc id page')
        return
      }

      // lấy thông tin của trang
      const DATA: any = await $chatbot.getPageInfo({
        org_id: onBoardingStore.selected_data.org_id,
        list_page_id: [onBoardingStore.selected_data.page_id],
      })

      /** key của nhân sự đầu tiên */
      const DATA_KEY = keys(DATA)?.[0]

      /** danh sách nhân sự */
      const USER_LIST = DATA_KEY ? get(DATA, `${DATA_KEY}.staff_list`, {}) : {}

      /** id của nhân sự đầu tiên */
      const FIRST_USER_ID = values(USER_LIST)?.[0]?._id

      /** lưu lại id của nhân sự đầu tiên vào store */
      onBoardingStore.selected_data.user_id = FIRST_USER_ID || ''
    } catch (e) {
      console.error(e)
    }
  }

  /** hàm tạo token merchant */
  async function createTokenMerchant() {
    try {
      // nếu chưa có chatbot_token và page_id thì thôi
      if (!appStore.chatbot_token || !onBoardingStore.selected_data.page_id) {
        console.log('chưa có chatbot_token')
        return
      }

      /** dữ liệu token trả về */
      const RES: any = await $merchant.createToken({
        access_token: appStore.chatbot_token,
      })

      // trả về token
      appStore.merchant_token = RES?.branch?.token_business

      // lưu lại token vào service api
      $merchant.setMerchantToken()
    } catch (e) {
      console.error(e)
    }
  }

  return { getPageInfo, createTokenMerchant }
}
