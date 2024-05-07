'use client'

import { useState } from 'react'

import ChatBox from '@/components/ChatBox'
import UploadFileInput from '@/components/UploadFileInput'

import { BotInstance } from '@chatbotkit/sdk/bot/v1'
import { FileInstance } from '@chatbotkit/sdk/file/v1'

const tabs = ['playground', 'sources']

export default function Chatbot({
  bot,
  files,
}: {
  bot: BotInstance
  files: FileInstance[]
}) {
  const [currentTab, setCurrentTab] = useState(tabs[0])

  return (
    <>
      <section className="pt-[3.3rem] border-b border-main bg-white">
        <div className="container flex flex-col gap-4 md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-black text-2xl font-medium">{bot.name}</h1>
            <p className="text-zinc-500 text-sm line-clamp-1 max-w-[20rem] overflow-ellipsis">
              {bot.backstory}
            </p>
          </div>
        </div>
        <div className="flex items-center h-full space-x-6 container mt-6">
          {tabs.map((item) => (
            <div key={item} className="relative h-full pb-4">
              <button
                onClick={() => setCurrentTab(item)}
                className={`${
                  currentTab === item
                    ? ''
                    : 'opacity-50 hover:opacity-100 transition duration-150'
                } h-full text-sm flex items-center capitalize`}
              >
                {item}
              </button>
              {currentTab === item && (
                <div className="absolute w-full bottom-0 bg-black h-[2px]" />
              )}
            </div>
          ))}
        </div>
      </section>
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
            <UploadFileInput files={files} />
          </>
        )}
      </section>
    </>
  )
}
