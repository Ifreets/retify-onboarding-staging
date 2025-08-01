import { Request } from '@/api/axios'
import { ENV } from '@/env'
import type { IEnv } from '@/interfaces'
import { useAppStore } from '@/stores'

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
    private HOST = $HOST,
  ) {}

  /** Gửi request post */
  #post(url: string, data: any, headers?: object) {
    return this.REQUEST.post(`${this.HOST.merchant}/${url}`, data, headers)
  }

  /** Gửi request post đến server product merchant */
  #postProduct(url: string, data: any, headers?: object) {
    return this.REQUEST.post(`${this.HOST.merchant_product}/${url}`, data, headers)
  }

  /** set chatbot token vào header */
  public setMerchantToken() {
    this.REQUEST.setHeaders({
      'token-business': this.APP_STORE.merchant_token,
    })
  }

  /** tạo token merchant */
  createToken(data: { access_token: string; page_id?: string }) {
    return this.#post('v1/auth/chatbox_login', data)
  }

  /** tạo danh sách sản phẩm từ ảnh */
  createProductFromImage(data: {
    type:string,
    url: string
  }) {
    return this.#postProduct('product/import_data_url', data)
  }
}

export const $merchant = new MerchantServiceAPI()
