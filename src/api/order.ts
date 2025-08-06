import { ENV } from '@/env'
import { Request } from '@/api/axios'

import type { IEnv } from '@/interfaces'
import { useAppStore } from '@/stores'

/** Đường dẫn host của merchant */
const $HOST: IEnv = ENV[import.meta.env.VITE_APP_ENV || 'development']

/** service api order */
export class OrderServiceAPI {
  constructor(
    /** Khởi tạo request */
    private readonly REQUEST = new Request(),
    /** DI store vào để lấy token */
    private readonly APP_STORE = useAppStore(),
    /** API HOST */
    private HOST = $HOST.merchant_product,
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

  /** api lấy danh sách đơn hàng */
  getOrder(data: { skip: number; limit: number }) {
    return this.#post('order/get_order', {
      ...data,
      sort: { created_date: 'desc' },
    })
  }
}

/** instance api order */
export const $order = new OrderServiceAPI()
