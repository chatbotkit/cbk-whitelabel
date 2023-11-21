import { CircleStackIcon } from '@heroicons/react/20/solid'

import { getUserAuth } from '@/lib/auth'
import Heading from '@/components/Heading'
import { ChatBotKit } from '@/lib/chatbotkit'
import { createChatbot } from '@/server-actions/chatbot-actions'
import CreateChatbotDialog from '@/components/CreateChatbotDialog'
import CreateDatasetDialog from '@/components/CreateDatasetDialog'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'

async function getChatbots(): Promise<
  { id: string; name?: string; description?: string }[]
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
        title="Overview"
        description="Find all your bots, datasets, and more..."
      >
        <div className="flex items-center space-x-2">
          <CreateChatbotDialog createChatbotAction={createChatbot} />
        </div>
      </Heading>
      {/* Datasets */}
      <section className="container mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="col-span-2">
            <CardHeader>
              <div className="border border-main h-8 w-8 rounded-md flex items-center justify-center shadow mb-2">
                <CircleStackIcon className="h-4 w-4" />
              </div>
              <CardTitle>Dataset title</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi,
                repellat!
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="col-span-1 grid grid-rows-2 gap-4">
            <Card>
              <CardHeader>
                <div className="border border-main h-8 w-8 rounded-md flex items-center justify-center shadow mb-2">
                  <CircleStackIcon className="h-4 w-4" />
                </div>
                <CardTitle>Dataset title</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Modi, repellat!
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <div className="border border-main h-8 w-8 rounded-md flex items-center justify-center shadow mb-2">
                  <CircleStackIcon className="h-4 w-4" />
                </div>
                <CardTitle>Dataset title</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Modi, repellat!
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
