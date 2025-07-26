import { Request } from '@/api/axios'
import { ENV } from '@/env'
import type { IEnv } from '@/interfaces'
import { useAppStore } from '@/stores/app'

/** Đường dẫn host của merchant */
const $HOST: IEnv = ENV[import.meta.env.VITE_APP_ENV || 'development']

/** service api chatbot */
export class MerchantServiceAPI {
  constructor(
    /** Khởi tạo request */
    private readonly REQUEST = new Request(),
    /** DI store vào để lấy token */
    private readonly APP_STORE = useAppStore(),
    /** API HOST */
    private HOST = $HOST.merchant,
  ) {}

  /** Gửi request post */
  #post(url: string, data: any, headers?: object) {
    return this.REQUEST.post(`${this.HOST}/${url}`, data, headers)
  }

  /** set chatbot token vào header */
  public setMerchantToken() {
    this.REQUEST.setHeaders({
      'business-token': this.APP_STORE.merchant_token,
    })
  }

  /** tạo token merchant */
  createToken(data: { access_token: string; client_id: string }) {
    return this.#post('v1/public/chatbox/get_config', {
      ...data,
      secret_key: '6f8b22eebe1d4d93b2f4a618901df020',
    })
  }
}

export const $merchant = new MerchantServiceAPI()
