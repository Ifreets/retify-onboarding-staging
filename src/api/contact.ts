import { ENV } from '@/env'
import { Request } from '@/api/axios'
import { useAppStore } from '@/stores'

import type { Contact, IEnv } from '@/interfaces'

/** dữ liệu lấy thông tin ẩn */
interface QueryHiddenData {
  /** id của liên hệ */
  identifier_id: string
  /** hành động để lấy loại dữ liệu ẩn cần lấy */
  action?:
    | 'GET_PHONE'
    | 'GET_EMAIL'
    | 'GET_ADDRESS'
    | 'GET_SOURCE'
    | 'GET_CALL'
    | 'GET_CONVERSATION'
    | 'DELETE_PHONE'

  /** id của dữ liệu ẩn */
  object_id?: string

  /** số điện thoại cần thêm mới hoặc cập nhật */
  phone_number?: string

  /** email cần thêm mới hoặc cập nhật */
  email?: string
}

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
  getContact(data: {
    skip?: number
    limit?: number
    search?: string
    identifier_id?: string
  }) {
    return this.#postV2('contact/get_contact', {
      ...data,
      sort: { createdAt: 'desc' },
    })
  }

  /**
   * Cập nhật contact
   */
  update(data: Required<Pick<Contact, 'id' | 'identifier_id'>> & Contact) {
    return this.#postV2('contact/update_contact', data)
  }

  /** thêm mới số điện thoại */
  createPhone(data: QueryHiddenData) {
    return this.#postV2('contact/update_contact', {
      ...data,
      action: 'ADD_PHONE',
    })
  }

  /** cập nhật số điện thoại */
  updatePhone(data: QueryHiddenData) {
    return this.#postV2('contact/update_contact', {
      ...data,
      action: 'UPDATE_PHONE',
    })
  }

  /** thêm mới email */
  createEmail(data: QueryHiddenData) {
    return this.#postV2('contact/update_contact', {
      ...data,
      action: 'ADD_EMAIL',
    })
  }

  /** cập nhật email */
  updateEmail(data: QueryHiddenData) {
    return this.#postV2('contact/update_contact', {
      ...data,
      action: 'UPDATE_EMAIL',
    })
  }

  /** thêm mới địa chỉ */
  createAddress(data: QueryHiddenData) {
    return this.#postV2('contact/update_contact', {
      ...data,
      address: '',
      location: {},
      action: 'ADD_ADDRESS',
    })
  }

  /** cập nhật địa chỉ */
  updateAddress(data: QueryHiddenData) {
    return this.#postV2('contact/update_contact', {
      ...data,
      action: 'UPDATE_ADDRESS',
    })
  }

  /** lấy danh sách nhãn */
  getLabel() {
    return this.#post('label/get_label', {})
  }

  /** lấy dữ liệu ẩn */
  showHiddenData(data: {
    identifier_id: string
    action: 'GET_SOURCE' | 'GET_PHONE' | 'GET_EMAIL' | 'GET_ADDRESS'
    object_id: string
  }) {
    return this.#postV2('contact/get_contact', data)
  }

  /** lấy danh sách ghi chú */
  getNote(data: { contact_id?: string, skip: number, limit: number }) {
    return this.#post('note/get_note', data)
  }
  /** tạo mới ghi chú */
  createNote(data: {
    contact_id?: string
    content: string
    is_nested?: boolean
    parent_id?: string
  }) {
    return this.#post('note/create_note', {
      ...data,
      is_template: false,
    })
  }

  /** cập nhật ghi chú */
  updateNote(data: {
    id: string
    content: string
  }) {
    return this.#post('note/update_note', data)
  }
}

/** instance api order */
export const $contact = new ContactServiceAPI()
