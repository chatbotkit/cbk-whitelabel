import { ChatBotKit } from '@chatbotkit/sdk'
import { stream } from '@chatbotkit/next/edge'
import { getUserAuth } from '@/lib/auth'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages, backstory, datasetId, model } = await req.json()
  const { chatbotkitUserToken } = await getUserAuth()

  const cbk = new ChatBotKit({
    secret: chatbotkitUserToken!,
  })
  const complete = cbk.conversation.complete(null, {
    model,
    messages,
    backstory,
    datasetId,
  })

  return stream(complete)
}
