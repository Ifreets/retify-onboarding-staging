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

  /** lấy danh sách nhân sự */
  getEmployees() {
    return this.#post('v1/systems/employee/get_employee', {})
  }

  /** thiết lập order merchant */
  settingMerchant() {
    return this.#postProduct('setting/save_setting', {
      type: 'order',
      value: {
        online_staff: [],
        trigger_capi: false,
        offline_staff: [],
        online_status: [
          [
            {
              title: 'New Order',
              action: 'DRART_ORDER',
              bg_color: 'bg-black',
              text_color: 'text-white',
            },
          ],
          [
            {
              title: 'Cancel Order',
              action: 'CANCEL_ORDER',
              bg_color: 'bg-red-500',
              text_color: 'text-white',
            },
            {
              title: 'Confirm Order',
              action: 'CONFIRM_ORDER',
              bg_color: 'bg-blue-500',
              text_color: 'text-white',
            },
          ],
          [
            {
              title: 'Cancel Order',
              action: 'CANCEL_ORDER',
              bg_color: 'bg-red-500',
              text_color: 'text-white',
            },
            {
              title: 'Waiting payment',
              action: 'CONFIRM_METHOD_PAY',
              bg_color: 'bg-orange-500',
              text_color: 'text-white',
            },
          ],
          [
            {
              title: 'Order Paid',
              action: 'PAID_ORDER',
              bg_color: 'bg-green-500',
              text_color: 'text-white',
            },
          ],
        ],
        offline_status: [
          [
            {
              title: 'Đơn nháp',
              action: 'DRART_ORDER',
              bg_color: 'bg-black',
              text_color: 'text-white',
            },
          ],
          [
            {
              title: 'Đã thanh toán',
              action: 'ORDER_SUCESS',
              bg_color: 'bg-green-500',
              text_color: 'text-white',
            },
            {
              title: 'Huỷ đơn',
              action: 'CANCEL_ORDER',
              bg_color: 'bg-red-500',
              text_color: 'text-white',
            },
          ],
        ],
        business_period: {
          year: {
            end_time: '2024-12-20T17:00:00.000Z',
            start_time: '2023-12-20T17:00:00.000Z',
          },
          month: {
            end_date: 20,
            start_date: 21,
          },
        },
        send_telegram_notification: false,
      },
    })
  }
}

/** instance api merchant */
export const $merchant = new MerchantServiceAPI()
