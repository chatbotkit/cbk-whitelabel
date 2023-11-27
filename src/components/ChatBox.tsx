'use client'

import { useConversationManager } from '@chatbotkit/react'
import { Button } from './ui/Button'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { Slider } from './ui/Slider'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { SparklesIcon } from '@heroicons/react/24/solid'

export default function ChatBox({
  datasetId,
  backstory,
  botName,
  model,
}: {
  datasetId: string
  backstory: string
  botName: string
  model: string
}) {
  const { user } = useUser()
  const [temp, setTemp] = useState<number>(0.7)
  const [responseLength, setResponseLength] = useState<number>(256)

  const { thinking, text, setText, messages, submit } = useConversationManager({
    endpoint: '/api/complete',
    backstory: backstory,
    datasetId: datasetId,
    // model: `${model}/temprature=${temp}`,
  })

  return (
    <div className="grid grid-cols-4 gap-6">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="border bg-white border-zinc-200 rounded-xl shadow-md col-span-3"
      >
        <div className="h-[25rem] overflow-y-scroll">
          {messages.map(({ id, type, text }) => {
            switch (type) {
              case 'user':
                return (
                  <div
                    key={id}
                    className="whitespace-pre-wrap border-b border-zinc-200 py-5 hover:bg-zinc-50 px-6"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="relative flex h-[20px] w-[20px] overflow-hidden rounded-full text-sm transition duration-150 hover:opacity-70 focus:outline-none">
                        <Image
                          className="absolute object-cover"
                          src={user ? user.imageUrl : ''}
                          alt="profile picture"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <p className="text-sm font-medium">You</p>
                    </div>

                    <p className={`text-sm dark:opacity-80 font-light`}>
                      {text}
                    </p>
                  </div>
                )

              case 'bot':
                return (
                  <div
                    key={id}
                    className="whitespace-pre-wrap border-b border-zinc-200 py-5 hover:bg-zinc-50 px-6"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="relative h-[20px] w-[20px] overflow-hidden rounded-full text-sm transition duration-150 hover:opacity-70 border border-zinc-200 focus:outline-none flex items-center justify-center bg-black">
                        <SparklesIcon className="h-3 w-3 text-white" />
                      </div>
                      <p className="text-sm font-medium">{botName}</p>
                    </div>

                    <p className={`text-sm dark:opacity-80 font-light`}>
                      {text}
                    </p>
                  </div>
                )
            }
          })}
          {thinking ? (
            <div
              key="thinking"
              className="whitespace-pre-wrap border-b border-zinc-200 py-5 hover:bg-zinc-50 px-6"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="relative h-[20px] w-[20px] overflow-hidden rounded-full text-sm transition duration-150 hover:opacity-70 border border-zinc-200 focus:outline-none flex items-center justify-center bg-black">
                  <SparklesIcon className="h-3 w-3 text-white" />
                </div>
                <p className="text-sm font-medium">{botName}</p>
              </div>

              <p className={`text-sm dark:opacity-80 font-light`}>
                Thinking...
              </p>
            </div>
          ) : null}
        </div>
        <div className="relative p-6">
          <input
            value={text}
            className="flex h-12 w-full rounded-lg border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 border-zinc-200 shadow transition duration-150"
            placeholder="Say something..."
            onChange={(e: any) => setText(e.target.value)}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!text}
            className="h-8 w-8 absolute right-8 top-1/2 transform -translate-y-1/2"
          >
            <PaperAirplaneIcon className="h-3 w-3" />
          </Button>
        </div>
      </form>
      <div className="w-full">
        <h2>Parameters</h2>
        <p className="text-zinc-500 text-sm">Adjust your model paramaters</p>
        <div className="h-[1px] w-full bg-zinc-200 my-6" />
        <div className="flex flex-col gap-4">
          <div className="mb-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm">Temperature</h2>
              <div className="text-sm border border-zinc-200 px-2 py-1 rounded-md shadow">
                {temp}
              </div>
            </div>
            <Slider
              max={2}
              defaultValue={[temp]}
              step={0.01}
              onValueChange={(value) => setTemp(value[0])}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm">Response Length</h2>
              <div className="text-sm border border-zinc-200 px-2 py-1 rounded-md shadow">
                {responseLength}
              </div>
            </div>
            <Slider
              max={2048}
              defaultValue={[responseLength]}
              step={1}
              onValueChange={(value) => setResponseLength(value[0])}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
