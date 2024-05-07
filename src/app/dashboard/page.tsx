import Link from 'next/link'

import ChatbotCard from '@/components/ChatbotCard'
import CreateChatbotDialog from '@/components/CreateChatbotDialog'
import Heading from '@/components/Heading'
import { getUserAuth } from '@/lib/auth'
import { ChatBotKit } from '@/lib/chatbotkit'

async function getChatbots(): Promise<
  {
    id: string
    name?: string
    description?: string
    backstory?: string
    model?: string
  }[]
> {
  let { chatbotkitUserToken } = await getUserAuth()

  if (!chatbotkitUserToken) {
    return []
  }

  const { items } = await new ChatBotKit({
    secret: chatbotkitUserToken,
  }).bot.list()

  return items
}

export default async function DashboardPage() {
  const bots = await getChatbots()

  return (
    <main>
      <Heading
        title="Chatbots"
        description="Find all you chatbots and create new ones..."
      >
        <CreateChatbotDialog />
      </Heading>
      {/* Chatbots */}
      <section className="container mt-10">
        <h2 className="mb-5 text-lg font-medium">Recently created</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {bots?.map((item) => (
            <Link key={item.id} href={`/dashboard/bots/${item.id}`}>
              <ChatbotCard bot={item} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
