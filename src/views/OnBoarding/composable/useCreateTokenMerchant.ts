import { $merchant } from '@/api/merchant'
import { useAppStore } from '@/stores/app'

export function useCreateTokenMerchant() {
  // store
  const appStore = useAppStore()

  /** hàm tạo token merchant */
  async function createTokenMerchant() {
    try {
      // nếu chưa có id partner hoặc client id thì thôi
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

  return { createTokenMerchant }
}
