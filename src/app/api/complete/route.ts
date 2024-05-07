import { getUserAuth } from '@/lib/auth'

import { stream } from '@chatbotkit/next/edge'
import { ChatBotKit } from '@chatbotkit/sdk'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { chatbotkitUserToken } = await getUserAuth()

  const { messages, backstory, datasetId, model } = await req.json()

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
