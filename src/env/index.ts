import type { IEnv } from '@/interfaces'

export const ENV: {
  [key: string]: IEnv
} = {
  development: {
    chatbot_billing: 'https://chatbox-billing.botbanhang.vn',
    chatbot_service: 'app/page/get_page_info_to_chat',
    chatbot_public: 'https://chatbox-public-v2.botbanhang.vn',
    merchant: 'https://api.merchant.vn',
  },
  production: {
    chatbot_billing: 'https://chatbox-billing.botbanhang.vn',
    chatbot_service: 'app/page/get_page_info_to_chat',
    chatbot_public: 'https://chatbox-public-v2.botbanhang.vn',
    merchant: 'https://api.merchant.vn',
  },
}
