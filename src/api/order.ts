import { Request } from '@/api/axios'
import { ENV } from '@/env'
import { useAppStore } from '@/stores'

import type { IEnv } from '@/interfaces'

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
  getOrder(data: { skip?: number; limit?: number, search?: string, order_id?: string }) {
    return this.#post('order/get_order', {
      ...data,
      sort: { created_date: 'desc' },
    })
  }

  /** api lấy danh sách đơn hàng bằng id contact */
  getOrderByContact(data: { contact_id?: string }) {
    return this.#post('order/get_order_by_contact_id', {
      ...data,
      limit: 1,
      sort: { created_date: 'desc' },
    })
  }
}

/** instance api order */
export const $order = new OrderServiceAPI()
