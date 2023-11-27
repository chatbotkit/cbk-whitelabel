import { redirect } from 'next/navigation'

import { getUserAuth } from '@/lib/auth'
import { ChatBotKit } from '@/lib/chatbotkit'
import Chatbot from '@/components/Chatbot'

async function getChatbot(id: string) {
  const { chatbotkitUserToken } = await getUserAuth()
  const cbk = new ChatBotKit({ secret: chatbotkitUserToken! })
  let bot
  let files
  if (!chatbotkitUserToken) {
    return redirect('/')
  }

  try {
    bot = await cbk.bot.fetch(id)
  } catch (error) {
    redirect('/dashboard')
  }

  try {
    files = await cbk.dataset.file.list(bot.datasetId as string, {})
  } catch (error) {
    files = []
  }

  return { bot, files: files.items }
}

export default async function Page({ params }: { params: { botId: string } }) {
  const { bot, files } = await getChatbot(params.botId)

  return (
    <main>
      <Chatbot bot={bot} files={files} />
    </main>
  )
}
