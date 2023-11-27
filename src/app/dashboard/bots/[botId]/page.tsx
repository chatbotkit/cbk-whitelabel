import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getUserAuth } from '@/lib/auth'
import ChatBox from '@/components/ChatBox'
import { ChatBotKit } from '@/lib/chatbotkit'
import SourcesUpload from '@/components/SourcesUpload'

async function getChatbot(id: string) {
  const { chatbotkitUserToken } = await getUserAuth()
  const cbk = new ChatBotKit({ secret: chatbotkitUserToken! })
  let bot
  let dataset
  if (!chatbotkitUserToken) {
    return redirect('/')
  }

  try {
    bot = await cbk.bot.fetch(id)

    // dataset = await cbk.dataset.fetch(bot.datasetId as string)
  } catch (error) {
    redirect('/dashboard')
  }

  return { bot, dataset }
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
  const { bot, dataset } = await getChatbot(params.botId)
  // console.log(dataset)

  return (
    <main>
      <section className="pt-[3.3rem] border-b border-main bg-white">
        <div className="container flex flex-col gap-4 md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-black text-2xl font-medium">{bot.name}</h1>
            <p className="text-zinc-500 text-sm">{bot.backstory}</p>
          </div>
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
            <ChatBox
              botName={bot.name as string}
              model={bot.model as string}
              datasetId={bot.datasetId as string}
              backstory={bot.backstory as string}
            />
          </>
        )}
        {currentTab === 'sources' && (
          <>
            <h2 className="mb-5 text-lg font-medium">Sources</h2>
            <SourcesUpload />
          </>
        )}
      </section>
    </main>
  )
}
