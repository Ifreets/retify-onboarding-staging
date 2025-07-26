import type { IEnv } from '@/interfaces'

export const ENV: {
  [key: string]: IEnv
} = {
  development: {
    chatbot_billing: 'https://chatbox-billing.botbanhang.vn',
    merchant: 'https://api.merchant.vn',
  },
  production: {
    chatbot_billing: 'https://chatbox-billing.botbanhang.vn',
    merchant: 'https://api.merchant.vn',
  },
}
