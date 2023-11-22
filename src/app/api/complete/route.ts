import { getUserAuth } from '@/lib/auth'
import { ChatBotKit } from '@chatbotkit/sdk'

export async function POST(req: Request) {
  const { chatbotkitUserToken } = await getUserAuth()
  const cbk = new ChatBotKit({
    secret: chatbotkitUserToken!,
  })
  const messages: any = []
  const data = cbk.conversation.complete(null, { model: 'gpt-4', messages })

  return Response.json({ message: 'hello' })
}
