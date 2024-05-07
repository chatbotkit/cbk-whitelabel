'use client'

import { deleteBot } from '@/actions/bot'
import LoadingSpinner from '@/components/LoadingSpinner'
import { FormButton } from '@/components/ui/FormButton'

import { TrashIcon } from '@heroicons/react/24/outline'
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/solid'

import { toast } from 'sonner'

type BotType = {
  id: string
  name?: string
  backstory?: string
  model?: string
}

export default function ChatbotCard({ bot }: { bot: BotType }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="border border-main h-8 w-8 rounded-md flex items-center justify-center mb-6">
          <ChatBubbleBottomCenterIcon className="h-4 w-4" />
        </div>
        <h3 className="card-title">{bot.name}</h3>
        <p className="card-description line-clamp-1">{bot.backstory}</p>
      </div>
      <div className="card-footer flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-sm mr-2">Model:</p>
          <p className="text-xs bg-white shadow border border-zinc-300 rounded-md px-3 py-1">
            {bot.model}
          </p>
        </div>
        <form
          action={async () => {
            try {
              await deleteBot(bot.id)

              toast.success('Chatbot successfully deleted!')
            } catch (e) {
              const error = e as Error

              toast.error(error.message)
            }
          }}
        >
          <FormButton
            onClick={(e) => {
              e.stopPropagation()
            }}
            pendingState={<LoadingSpinner />}
            className="h-8 w-8 button-icon button-outline flex justify-center items-center"
          >
            <TrashIcon className="h-4 w-4 text-rose-500" />
          </FormButton>
        </form>
      </div>
    </div>
  )
}
