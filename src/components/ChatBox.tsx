'use client'

import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import { updateBot } from '@/actions/bot'
import { FormButton } from '@/components/ui/FormButton'

import { useConversationManager } from '@chatbotkit/react'
import { useUser } from '@clerk/nextjs'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { SparklesIcon } from '@heroicons/react/24/solid'

import { toast } from 'sonner'

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
  const params: { botId: string } = useParams()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { user } = useUser()

  const [updatedBackstory, setUpdatedBackstory] = useState(backstory)

  const { thinking, text, setText, messages, submit } = useConversationManager({
    endpoint: '/api/complete',
    backstory,
    datasetId,
    model: {
      name: model,
      config: {
        temperature: 0.7,
      },
    },
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="grid grid-cols-3 gap-6">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="border bg-white border-zinc-200 rounded-xl shadow-md col-span-2"
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
          <div ref={messagesEndRef} />
        </div>
        <div className="relative p-6">
          <input
            value={text}
            className="flex h-12 w-full rounded-lg border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 border-zinc-200 shadow transition duration-150"
            placeholder="Say something..."
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            disabled={!text}
            className="h-8 w-8 absolute right-8 top-1/2 transform -translate-y-1/2 button button-ouline button-icon"
          >
            <PaperAirplaneIcon className="min-h-[0.75rem] min-w-[0.75rem]" />
          </button>
        </div>
      </form>
      <form
        action={async (formData) => {
          try {
            await updateBot(formData, params.botId)
          } catch (e) {
            const error = e as Error

            toast.error(error.message)
          }
        }}
        className="w-full"
      >
        <h2>Backstory</h2>
        <p className="text-zinc-500 text-sm mb-3">
          Adjust your model backstory
        </p>
        <textarea
          id="backstory"
          name="backstory"
          className="textarea mb-4"
          rows={10}
          placeholder="Give your chatbot personality and style.."
          value={updatedBackstory}
          onChange={(e) => setUpdatedBackstory(e.target.value)}
        ></textarea>
        <FormButton
          pendingState="Processing"
          className="button w-full"
          disabled={backstory === updatedBackstory}
        >
          Update Backstory
        </FormButton>
      </form>
    </div>
  )
}
