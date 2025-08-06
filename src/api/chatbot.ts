import { Request } from '@/api/axios'
import { ENV } from '@/env'
import type { IEnv } from '@/interfaces'
import { useAppStore } from '@/stores'

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
    return this.REQUEST.post(
      `${this.HOST.chatbot_service}/${url}`,
      data,
      headers,
    )
  }

  /** Gửi request đến server chatbot service v3*/
  #postServiceV3(url: string, data: any, headers?: object) {
    return this.REQUEST.post(
      `${this.HOST.chatbot_service_v3}/${url}`,
      data,
      headers,
    )
  }

  /** Gửi request đến server chatbot public */
  #postPublic(url: string, data: any, headers?: object) {
    return this.REQUEST.post(
      `${this.HOST.chatbot_public}/${url}`,
      data,
      headers,
    )
  }

  /** Gửi request đến server LLM chatbot */
  #postLLM(url: string, data: any, headers?: object) {
    return this.REQUEST.post(`${this.HOST.llm_no_proxy}/${url}`, data, headers)
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
    return await this.#postServiceV3('app/page/create_website_page', data)
  }

  /** lấy partner token */
  public async getPageInfo(data: {
    org_id: string
    list_page_id: string[]
  }) {
    return await this.#postServiceV3('app/page/get_page_info_to_chat', data)
  }

  /** lấy danh sách AI agent */
  public async getAIAgents(org_id: string) {
    return await this.#postLLM('app/agent/get_agent', {
      org_id,
    })
  }

  /** tạo 1 AI agent */
  public async createAIAgent(org_id: string) {
    return await this.#postLLM(`app/agent/create_agent?org_id=${org_id}`, {
      ai_agent_name: 'Agent 1',
      description: 'Agent 1',
    })
  }

  /** cập nhật thiết lập trang */
  public async updateSettingPage(data: {
    page_id: string
    ai_agent_id: string
  }) {
    return await this.#postServiceV3('app/page/update_page_setting', {
      ...data,
      is_active_ai_agent: true,
      ai_agent_working_hour_answer: {
        in_working_hour: {
          type: 'SEND_DIRECTLY',
          time: 900000,
        },
        out_working_hour: {
          type: 'SEND_DIRECTLY',
          time: 0,
        },
      },
      page_language: 'en',
      default_language: 'en',
    })
  }

  /** cập nhật thiết lập trợ lý ảo */
  public async updateSettingAIAgent(data: { page_id: string }) {
    return await this.#postServiceV3('app/page/update_page_setting', {
      ...data,
      ai_agent_use_external_knowledge: { is_active: true },
      ai_agent_typing_wait: 1,
      ai_agent_custom_prompt: `Nếu nội dung câu hỏi mang ý nghĩa đặt lịch hẹn, kiểm tra lịch hẹn, chỉ trả lời "@retion-shedule", không thêm bất cứ nội dung gì khác, để hệ thống của tôi tự xừ lý\nNếu nội dung câu hỏi mang ý nghĩa đặt hàng, mua hàng, chỉ trả lời "@retion-order", không thêm bất cứ nội dung gì khác, để hệ thống của tôi tự xử lý\nNếu nội dung câu hỏi mang ý nghĩa hỏi sản phẩm, kiểm tra sản phẩm, kiểm tra món ăn, quần áo, chỉ trả lời "@retion-product", không thêm bất cứ nội dung gì khác, để hệ thống của tôi tự xử lý\nNếu khách hàng hỏi hoặc nói bằng tiếng anh thì tư vấn và trả lời lại bằng tiếng anh.`,
      ai_agent_is_custom_prompt: true,
    })
  }

  /** tự động assign nhân sự */
  public async autoAssignStaff(_id: string) {
    return await this.#postService('app/staff/update', {
      _id,
      is_auto_assign: true,
    })
  }

  /** cập nhật trạng thái setup thành công */
  public async updateSetupStatus() {
    return await this.#postServiceV3('app/chatbot_user/update_setup_status', {
      is_setup_completed: true,
    })
  }
}

/** instance api chatbot */
export const $chatbot = new ChatbotServiceAPI()
