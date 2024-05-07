import { redirect } from 'next/navigation'

import Chatbot from '@/components/Chatbot'
import { getChatBotKitUserClient } from '@/lib/auth'

async function getChatbot(id: string) {
  const cbk = await getChatBotKitUserClient()

  let bot
  let files

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
