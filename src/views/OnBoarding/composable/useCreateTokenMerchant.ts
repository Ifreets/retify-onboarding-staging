import { $chatbot } from '@/api/chatbot'
import { $merchant } from '@/api/merchant'
import { useAppStore } from '@/stores/app'

export function useCreateTokenMerchant() {
  // store
  const appStore = useAppStore()

  /** hàm lấy partner token */
  async function getPartnerToken() {
    try {
      // nếu không có id tổ chức hoặc id page thì thôi
      if(!appStore.org_id || !appStore.page_id) {
        console.log('chưa có id tổ chức hoặc id page');
        return
      }

      // lấy token partner
      const RES = await $chatbot.getPartnerToken({
        org_id: appStore.org_id,
        list_page_id: [appStore.page_id],
      })
    } catch (e) {
      console.error(e)
    }
  }

  /** lấy id client */
  async function getClientID() {
    try {
      // nếu không có id tổ chức hoặc id page thì thôi
      if(!appStore.org_id || !appStore.page_id) {
        console.log('chưa có id tổ chức hoặc id page');
        return
      }

      // lấy client id
      const DATA_READ:any = await $chatbot.getClientID({
        org_id: appStore.org_id,
        page_id: appStore.page_id,
      })

      /** Kiểm tra đã có hội thoại chưa */
      const IS_EXIST_CONVERSATION = DATA_READ?.data?.result.length > 0;

      /** Nếu có thì gửi 1 tin nhắn từ page cho hội thoại 1 */
      if (IS_EXIST_CONVERSATION) {
        
      }
    } catch (e) {
      console.error(e)
    }
  }

  /** hàm tạo token merchant */
  async function createTokenMerchant() {
    try {
      // nếu chưa có token partner hoặc client id thì thôi
      if(!appStore.partner_token || !appStore.client_id) {
        console.log('chưa có id partner hoặc client id');
        return
      }

      /** dữ liệu token trả về */
      const RES: any = await $merchant.createToken({
        access_token: appStore.partner_token,
        client_id: appStore.client_id,
      })

      // trả về token
      appStore.merchant_token = RES?.access_token
    } catch (e) {
      console.error(e)
    }
  }

  return { getPartnerToken, getClientID, createTokenMerchant }
}
