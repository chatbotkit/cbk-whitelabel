import { ChatBotKit } from '@chatbotkit/sdk'

import { z } from 'zod'

export { ChatBotKit }

const env = z
  .object({
    CHATBOTKIT_API_KEY: z.string(),
  })
  .parse(process.env)

export const client = new ChatBotKit({
  secret: env.CHATBOTKIT_API_KEY,
})

export function getUserClient(userId: string) {
  return new ChatBotKit({
    secret: env.CHATBOTKIT_API_KEY,
    runAsUserId: userId,
  })
}

export default client
