import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

import { getUserAuth } from '@/lib/auth'
import ChatBox from '@/components/ChatBox'
import { ChatBotKit } from '@/lib/chatbotkit'
import { Button } from '@/components/ui/Button'

async function getChatbot(id: string) {
  const { chatbotkitUserToken } = await getUserAuth()

  if (!chatbotkitUserToken) {
    return redirect('/')
  }

  return await new ChatBotKit({ secret: chatbotkitUserToken }).bot.fetch(id)
}

const tabs = ['playground', 'settings']

export default async function Page({
  params,
  searchParams,
}: {
  params: { botId: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const currentTab = searchParams?.tab || tabs[0]
  const bot = await getChatbot(params.botId)

  return (
    <main>
      <section className="pt-10 border-b border-main bg-white">
        <div className="container flex flex-col gap-4 md:flex-row items-start md:items-center justify-between">
          <div>
            <Link
              className="flex items-center mb-4 text-sm hover:opacity-50 transition duration-150"
              href="/dashboard/bots"
            >
              <ArrowLeftIcon className="h-3 w-3 mr-2" /> Back
            </Link>
            <h1 className="text-black text-2xl font-medium">{bot.name}</h1>
            <p className="text-zinc-500 text-sm">{bot.backstory}</p>
          </div>
          <Button variant="default">Start a Conversation</Button>
        </div>
        <div className="flex items-center h-full space-x-6 container mt-6">
          {tabs.map((item) => (
            <div key={item} className="relative h-full pb-4">
              <Link
                href={`?tab=${item}`}
                className={`${
                  currentTab === item
                    ? ''
                    : 'opacity-50 hover:opacity-100 transition duration-150'
                } h-full text-sm flex items-center capitalize`}
              >
                {item}
              </Link>
              {currentTab === item && (
                <div className="absolute w-full bottom-0 bg-black h-[2px]" />
              )}
            </div>
          ))}
        </div>
      </section>
      {/* Conversations */}
      <section className="container mt-10">
        {currentTab === 'playground' && (
          <>
            <h2 className="mb-5 text-lg font-medium">Playground</h2>
            <ChatBox />
          </>
        )}
        {currentTab === 'settings' && (
          <h2 className="mb-5 text-lg font-medium">Settings</h2>
        )}
      </section>
    </main>
  )
}
