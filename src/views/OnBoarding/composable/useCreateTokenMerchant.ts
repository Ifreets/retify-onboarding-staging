import { $chatbot } from '@/api/chatbot'
import { $merchant } from '@/api/merchant'
import { useAppStore } from '@/stores'
import { find, get, has, keys } from 'lodash'

export function useCreateTokenMerchant() {
  // store
  const appStore = useAppStore()

  /** hàm lấy partner token */
  async function getPartnerToken() {
    try {
      // nếu không có id tổ chức hoặc id page thì thôi
      if (!appStore.org_id || !appStore.page_id) {
        console.log('chưa có id tổ chức hoặc id page')
        return
      }

      // lấy token partner
      const DATA: any = await $chatbot.getPartnerToken({
        org_id: appStore.org_id,
        list_page_id: [appStore.page_id],
      })

      /** Lấy danh sách các key trong `data` */
      const DATA_KEYS = keys(DATA)

      /**Tìm key nào chứa `partner_token` */
      const KEY_WITH_PARTNER_TOKEN = find(DATA_KEYS, (key) =>
        has(DATA[key], 'partner_token'),
      )

      /** Nếu tìm thấy `partner_token`, lấy giá trị của nó */
      const PARTNER_TOKEN = KEY_WITH_PARTNER_TOKEN
        ? get(DATA, `${KEY_WITH_PARTNER_TOKEN}.partner_token`, null)
        : null

      /** lưu lại partner token vào store */
      appStore.partner_token = PARTNER_TOKEN
    } catch (e) {
      console.error(e)
    }
  }

  /** lấy id client */
  async function getClientID() {
    try {
      // nếu không có id tổ chức hoặc id page thì thôi
      if (!appStore.org_id || !appStore.page_id) {
        console.log('chưa có id tổ chức hoặc id page')
        return
      }

      // lấy client id
      const DATA_READ: any = await $chatbot.getClientID({
        org_id: appStore.org_id,
        page_id: appStore.page_id,
      })

      /** Kiểm tra đã có hội thoại chưa */
      const IS_EXIST_CONVERSATION = (DATA_READ?.result?.length || 0) > 0

      /** Nếu có thì gửi 1 tin nhắn từ page cho hội thoại 1 */
      if (IS_EXIST_CONVERSATION) {
        await $chatbot.sendMessage({
          org_id: appStore.org_id,
          client_id: DATA_READ?.result?.[0]?.fb_client_id,
          page_id: appStore.page_id,
          text: `Welcome to Retify!
              To start experiencing automated ordering:
              • Step 1: Click the link https://retify.ai/c/${appStore.page_id} . You can embed this link into Facebook, WhatsApp, or QR codes for customers to access.
              
              • Step 2: Pretend to be a customer and chat with the virtual assistant to place an order.
              • Step 3: A new order will appear, and you can proceed to process it.
              
              Additionally, you can train the virtual assistant to be smarter by following this guide: https://docs.retify.ai/training-ai
              
              If you need further assistance, visit https://retify.ai to get free support from the Retify Team.`,
        })

        // lưu lại id của client vào store
        appStore.client_id = DATA_READ?.result?.[0]?.fb_client_id
      }
    } catch (e) {
      console.error(e)
    }
  }

  /** hàm tạo token merchant */
  async function createTokenMerchant() {
    try {
      // lấy partner token và lấy client id
      await Promise.all([getPartnerToken(), getClientID()])

      // nếu chưa có token partner hoặc client id thì thôi
      if (!appStore.partner_token || !appStore.client_id) {
        console.log('chưa có token partner hoặc client id')
        return
      }

      /** dữ liệu token trả về */
      const RES: any = await $merchant.createToken({
        access_token: appStore.partner_token,
        client_id: appStore.client_id,
      })

      // trả về token
      appStore.merchant_token = RES?.access_token

      // lưu lại token vào service api
      $merchant.setMerchantToken()
    } catch (e) {
      console.error(e)
    }
  }

  return { getPartnerToken, getClientID, createTokenMerchant }
}
