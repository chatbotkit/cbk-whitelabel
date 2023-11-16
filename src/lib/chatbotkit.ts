import { ChatBotKit } from '@chatbotkit/sdk'

export { ChatBotKit }

export const client = new ChatBotKit({
  secret: process.env.CHATBOTKIT_API_KEY as string,
})

export default client
