import { Request } from '@/api/axios'
import { ENV } from '@/env'
import { useAppStore } from '@/stores'

import type { IEnv } from '@/interfaces'

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
    return this.REQUEST.post(
      `${this.HOST.merchant_product}/${url}`,
      data,
      headers,
    )
  }

  /** set chatbot token vào header */
  setMerchantToken() {
    this.REQUEST.setHeaders({
      'token-business': this.APP_STORE.merchant_token,
    })
  }
  
  /** tải hình ảnh lên merchant */
  uploadFile(data: FormData) {
    return this.#post('v1/internals/attachment/upload', data, {
      'Content-Type': 'multipart/form-data',
      'token-business':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzc19pZCI6IjY0MjY1NTQ1N2MzMzlmOTE5NDI4OGRhOSIsImJyYW5jaF9pZCI6IjY0MjY1NTQ1N2MzMzlmOTE5NDI4OGRhYyIsImRlcGFydG1lbnRfaWQiOiI2NDI2NWU5YzNkOGU5MjkxMDMwZTc1ZTgiLCJlbXBsb3llZV9pZCI6IjY2MTNhZjk4ZTdjYjc4M2I5YzdiZGM0OCIsInVzZXJfaWQiOiI2NjEzYWVlOWU3Y2I3ODNiOWM3YmRiOWYiLCJwZXJtaXNzaW9uX2lkIjoiNjQyNjk2ZmExZmZhMzBjNjA5OWIxZjJlIiwieG5vZGUiOiJ0ZW5hbnRfMDIzMzc5NzkiLCJpc19vd25lcl9idXNpbmVzcyI6ZmFsc2UsImlhdCI6MTc1Mzg2NTIyOSwiZXhwIjoxNzYxNjQxMjI5fQ.u2LGKft23NR8AHmSs28gCE-BWVK-3BR1dzBY6V_0iSc',
    })
  }

  /** tạo token merchant */
  createToken(data: { access_token: string; page_id?: string }) {
    return this.#post('v1/auth/chatbox_login', data)
  }

  /** tạo danh sách sản phẩm từ ảnh */
  createProductFromImage(data: { type: string; url: string }) {
    return this.#postProduct('product/import_data_url', data)
  }
}

/** instance api merchant */
export const $merchant = new MerchantServiceAPI()
