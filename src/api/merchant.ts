import { ENV } from '@/env'
import type { IEnv } from '@/interfaces'
import { Request } from '@/api/axios'
import { get } from 'lodash'
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
  /** Gửi request post */
  #get(url: string, headers?: object) {
    return this.REQUEST.get(`${this.HOST.merchant}/${url}`, headers)
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
      'token-business': this.APP_STORE.merchant_token,
      'token-user': this.APP_STORE.chatbot_token,
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
  /** tạo danh sách sản phẩm từ ảnh
   * @param device_id
   */
  updateEmployeeId(device_id: string) {
    return this.#get(
      `v1/systems/employee/update_employee_id?one_signal_id=${device_id}`,
      {
        'token-business': this.APP_STORE.merchant_token,
      },
    )
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
              title: 'New',
              action: 'NEW_ORDER',
              bg_color: 'bg-black',
              text_color: 'text-white',
            },
          ],
          [
            {
              title: 'Cancel',
              action: 'CANCEL_ORDER',
              bg_color: 'bg-red-500',
              text_color: 'text-white',
            },
            {
              title: 'Paid',
              action: 'PAID_ORDER',
              bg_color: 'bg-green-500',
              text_color: 'text-white',
            },
          ],
          [
            {
              title: 'Cancel',
              action: 'CANCEL_ORDER',
              bg_color: 'bg-red-500',
              text_color: 'text-white',
            },
            {
              title: 'Processing',
              action: 'WAITING_ITEM',
              bg_color: 'bg-blue-500',
              text_color: 'text-white',
            },
          ],
          [
            {
              title: 'Ready',
              action: 'PACKING_ORDER',
              bg_color: 'bg-orange-500',
              text_color: 'text-white',
            },
          ],
          [
            {
              title: 'Delivered',
              action: 'DELIVERY_ORDER',
              bg_color: 'bg-purple-500',
              text_color: 'text-white',
            },
          ],
        ],
        offline_status: [
          [
            {
              title: 'Đơn nháp',
              action: 'NEW_ORDER',
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
  /** lấy thông tin doanh nghiệp */
  getBusinessInfo(data: { business_id: string }) {
    return this.#post('v1/business/get_business_info', data, {
      'token-user': this.APP_STORE.merchant_token, // Tạm thời dùng merchant_token, cần verify lại với user sau nếu sai
    })
  }

  /** lấy cài đặt doanh nghiệp */
  getBusinessSetting(data: { business_id: string }) {
    return this.#post('v1/business/get_setting', data, {
      'token-user': this.APP_STORE.merchant_token,
    })
  }

  /** cập nhật thông tin doanh nghiệp */
  updateBusiness(data: any) {
    return this.#post('v1/business/update_business', data, {
      'token-user': this.APP_STORE.merchant_token,
    })
  }

  /** lưu cài đặt doanh nghiệp */
  saveSetting(data: {
    business_id: string
    setting_type: string
    setting_data: any
  }) {
    return this.#post('v1/business/save_setting', data, {
      'token-user': this.APP_STORE.merchant_token,
    })
  }
}

/** instance api merchant */
export const $merchant = new MerchantServiceAPI()
