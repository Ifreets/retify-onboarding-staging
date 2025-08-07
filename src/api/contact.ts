import { ENV } from '@/env'
import { Request } from '@/api/axios'
import { useAppStore } from '@/stores'

import type { IEnv } from '@/interfaces'

/** Đường dẫn host của merchant */
const $HOST: IEnv = ENV[import.meta.env.VITE_APP_ENV || 'development']

/** service api contact */
export class ContactServiceAPI {
  constructor(
    /** Khởi tạo request */
    private readonly REQUEST = new Request(),
    /** DI store vào để lấy token */
    private readonly APP_STORE = useAppStore(),
    /** API HOST */
    private HOST = $HOST.merchant_contact,
  ) {}

  /** set merchant token vào header */
  setTokenBusiness() {
    this.REQUEST.setHeaders({
      'token-business': this.APP_STORE.merchant_token,
    })
  }

  /** gửi request post đến server merchant product */
  #post(url: string, data: any, headers?: object) {
    return this.REQUEST.post(`${this.HOST}/${url}`, data, headers)
  }

  /** gửi request post v2 đến server merchant product */
  #postV2(url: string, data: any, headers?: object) {
    return this.REQUEST.post(`${this.HOST}/v2/${url}`, data, headers)
  }

  /** api lấy danh sách đơn hàng */
  getContact(data: { skip?: number; limit?: number; search?: string }) {
    return this.#postV2('contact/get_contact', {
      ...data,
      sort: { createdAt: 'desc' },
    })
  }
}

/** instance api order */
export const $contact = new ContactServiceAPI()
