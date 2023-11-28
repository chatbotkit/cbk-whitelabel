'use client'

import { toast } from 'sonner'
import { TrashIcon } from '@heroicons/react/24/outline'
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/solid'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { deleteChatbot } from '@/server-actions/chatbot-actions'
import FormButton from './ui/FormButton'
import LoadingSpinner from './LoadingSpinner'

type BotType = {
  id: string
  name?: string
  backstory?: string
  model?: string
}

export default function ChatbotCard({ bot }: { bot: BotType }) {
  return (
    <Card className="h-full hover:shadow-lg shadow-none transition duration-150">
      <CardHeader>
        <div className="border border-main h-8 w-8 rounded-md flex items-center justify-center mb-6">
          <ChatBubbleBottomCenterIcon className="h-4 w-4" />
        </div>
        <CardTitle>{bot.name}</CardTitle>
        <CardDescription className="line-clamp-1">
          {bot.backstory}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-sm mr-2">Model:</p>
          <p className="text-xs bg-white shadow border border-zinc-300 rounded-md px-3 py-1">
            {bot.model}
          </p>
        </div>
        <form
          action={async (e) => {
            const error = await deleteChatbot(bot.id)

            if (error) {
              toast.error('Something went wrong')
            } else {
              toast.success('Chatbot successfully deleted!')
            }
          }}
        >
          <FormButton
            onClick={(e) => {
              e.stopPropagation()
            }}
            pendingText={<LoadingSpinner />}
            size="icon"
            variant="outline"
            className="h-8 w-8"
          >
            <TrashIcon className="h-4 w-4 text-rose-500" />
          </FormButton>
        </form>
      </CardFooter>
    </Card>
  )
}
