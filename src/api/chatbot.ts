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
    private HOST = $HOST.chatbot_billing,
  ) {}

  /** Gửi request post */
  #post(url: string, data: any, headers?: object) {
    return this.REQUEST.post(`${this.HOST}/${url}`, data, headers)
  }

  /** set chatbot token vào header */
  public setChatbotToken() {
    this.REQUEST.setHeaders({
      Authorization: this.APP_STORE.chatbot_token,
    })
  }

  /** api lấy danh sách tổ chức chatbot */
  public async getOrganizations() {
    return await this.#post('app/organization/read_org', {})
  }

  /** api lấy danh sách các trang của một tổ chức */
  public async getPages(org_id: string) {
    return await this.#post('app/owner_ship/read_page', { org_id })
  }

  /** api tạo page chatbot */
  public async createPage(data: { org_id: string; name: string }) {
    return await this.#post('app/page/create_website_page', data)
  }
}

export const $chatbot = new ChatbotServiceAPI()
