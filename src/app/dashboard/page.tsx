import Link from 'next/link'

import { listBots } from '@/actions/bot'
import ChatbotCard from '@/components/ChatbotCard'
import CreateChatbotDialog from '@/components/CreateChatbotDialog'
import Heading from '@/components/Heading'

export default async function DashboardPage() {
  const bots = await listBots()

  return (
    <main>
      <Heading
        title="Chatbots"
        description="Find all you chatbots and create new ones..."
      >
        <CreateChatbotDialog />
      </Heading>
      <section className="container mt-10">
        <h2 className="mb-5 text-lg font-medium">Recently created</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {bots.items.map((item) => (
            <Link key={item.id} href={`/dashboard/bots/${item.id}`}>
              <ChatbotCard bot={item} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
