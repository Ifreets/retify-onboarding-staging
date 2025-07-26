import { Request } from '@/api/axios'
import { ENV } from '@/env'
import type { IEnv } from '@/interfaces'
import { useAppStore } from '@/stores/app'

/** Đường dẫn host của merchant */
const $HOST: IEnv = ENV[import.meta.env.VITE_APP_ENV || 'development']

/** service api chatbot */
export class ChatbotServiceAPI {
  constructor(
    /** Khởi tạo request */
    private readonly REQUEST = new Request(),
    /** DI store vào để lấy token */
    private readonly APP_STORE = useAppStore(),
    /** API HOST */
    private HOST = $HOST,
  ) {}

  /** Gửi request đến server chatbot billing */
  #postBilling(url: string, data: any, headers?: object) {
    return this.REQUEST.post(
      `${this.HOST.chatbot_billing}/${url}`,
      data,
      headers,
    )
  }

  /** Gửi request đến server chatbot service */
  #postService(url: string, data: any, headers?: object) {
    return this.REQUEST.post(`${this.HOST.chatbot_service}/${url}`, data, headers)
  }

  /** Gửi request đến server chatbot public */
  #postPublic(url: string, data: any, headers?: object) {
    return this.REQUEST.post(`${this.HOST.chatbot_public}/${url}`, data, headers)
  }

  /** set chatbot token vào header */
  public setChatbotToken() {
    this.REQUEST.setHeaders({
      Authorization: this.APP_STORE.chatbot_token,
    })
  }

  /** api lấy danh sách tổ chức chatbot */
  public async getOrganizations() {
    return await this.#postBilling('app/organization/read_org', {})
  }

  /** api lấy danh sách các trang của một tổ chức */
  public async getPages(org_id: string) {
    return await this.#postBilling('app/owner_ship/read_page', { org_id })
  }

  /** api tạo page chatbot */
  public async createPage(data: { org_id: string; name: string }) {
    return await this.#postBilling('app/page/create_website_page', data)
  }

  /** lấy partner token */
  public async getPartnerToken(data: {
    org_id: string
    list_page_id: string[]
  }) {
    return await this.#postService('app/page/get_page_info_to_chat', data)
  }

  /** lấy client id */
  public async getClientID(data: { org_id: string; page_id: string }) {
    return await this.#postService('app/conversation/read_conversation', data)
  }

  /** gửi tin nhắn */
  public async sendMessage(data: {
    org_id: string
    client_id: string
    text: string
  }) {
    return await this.#postPublic('embed/message/send_message', data)
  }

  /** tạo 1 hội thoại mới */
  public async createConversation(data: {
    page_id: string
  }) {
    return await this.#postPublic('app/conversation/create_conversation', data)
  }
}

export const $chatbot = new ChatbotServiceAPI()
