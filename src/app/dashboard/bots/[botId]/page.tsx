import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getUserAuth } from '@/lib/auth'
import ChatBox from '@/components/ChatBox'
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

const tabs = ['playground', 'sources']

export default async function Page({
  params,
  searchParams,
}: {
  params: { botId: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const currentTab = searchParams?.tab || tabs[0]
  const { bot, files } = await getChatbot(params.botId)

  return (
    <main>
      <Chatbot bot={bot} files={files} />
    </main>
  )
}
