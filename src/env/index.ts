import type { IEnv } from '@/interfaces'

export const ENV: {
  [key: string]: IEnv
} = {
  development: {
    chatbot_billing: 'https://chatbox-billing.botbanhang.vn',
    chatbot_service: 'https://chatbox-service-v3.botbanhang.vn',
    chatbot_public: 'https://chatbox-public-v2.botbanhang.vn',
    merchant: 'https://api.merchant.vn',
    merchant_product: "https://api-product.merchant.vn",
    llm_no_proxy: "https://chatbox-llm.botbanhang.vn",
  },
  production: {
    chatbot_billing: 'https://chatbox-billing.botbanhang.vn',
    chatbot_service: 'https://chatbox-service-v3.botbanhang.vn',
    chatbot_public: 'https://chatbox-public-v2.botbanhang.vn',
    merchant: 'https://api.merchant.vn',
    merchant_product: "https://api-product.merchant.vn",
    llm_no_proxy: "https://chatbox-llm.botbanhang.vn",
  },
}
