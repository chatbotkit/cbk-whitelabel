import Link from 'next/link'
import {
  ChatBubbleBottomCenterIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'

import { getUserAuth } from '@/lib/auth'
import { ChatBotKit } from '@/lib/chatbotkit'
import { Button } from '@/components/ui/Button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'

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

export default async function Page() {
  const bots = await getChatbots()

  return (
    <main>
      <section className="py-14 border-b border-main bg-zinc-50">
        <div className="container flex flex-col gap-4 md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-black text-2xl font-medium">Chatbots</h1>
            <p className="text-zinc-500 text-sm">
              Find all you chat conversations...
            </p>
          </div>
          <Button variant="default">Create Chatbot</Button>
        </div>
      </section>
      {/* Chatbots */}
      <section className="container mt-10">
        <h2 className="mb-5 text-lg font-medium">Your chatbots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {bots?.map((item) => (
            <Link key={item.id} href={`/dashboard/bots/${item.id}`}>
              <Card className="h-full">
                <CardHeader>
                  <div className="border border-main h-8 w-8 rounded-md flex items-center justify-center shadow mb-2">
                    <ChatBubbleBottomCenterIcon className="h-4 w-4" />
                  </div>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.backstory}</CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm mr-2">Model:</p>
                    <p className="text-xs bg-white shadow border border-zinc-300 rounded-md px-3 py-1">
                      {item.model}
                    </p>
                  </div>
                  <Button size="icon" className="h-9 w-9" variant="outline">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
