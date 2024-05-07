'use client'

import { useState } from 'react'

import { createBot } from '@/actions/bot'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { FormButton } from '@/components/ui/FormButton'

import { toast } from 'sonner'

export default function CreateChatbotDialog() {
  const [open, setOpen] = useState(false)

  const [botState, setBotState] = useState({
    name: '',
    backstory: '',
    model: 'gpt-3.5-turbo',
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="button">Create Chatbot</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a chatbot</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            try {
              await createBot(formData)
            } catch (e) {
              const error = e as Error

              toast.error(error.message)
            }
          }}
          className="flex flex-col space-y-4"
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium block mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Give your chatbot a name"
              className="input"
              onChange={(e) =>
                setBotState({ ...botState, name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="model" className="text-sm font-medium block mb-2">
              Model
            </label>
            <select
              defaultValue={botState.model}
              className="input"
              name="model"
              onChange={(e) =>
                setBotState({ ...botState, model: e.target.value })
              }
            >
              <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
              <option value="gpt-4">gpt-4</option>
              <option value="gpt-4-turbo">gpt-4-turbo</option>
            </select>
          </div>

          <div className="h-[1px] w-full bg-zinc-300" />
          <div>
            <label
              htmlFor="backstory"
              className="text-sm font-medium block mb-2"
            >
              Backstory
            </label>
            <textarea
              id="backstory"
              name="backstory"
              className="textarea"
              rows={10}
              placeholder="Give your chatbot personality and style.."
              value={botState.backstory}
              onChange={(e) =>
                setBotState({ ...botState, backstory: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-end space-x-3 pt-4">
            <DialogClose className="button button-outline">Cancel</DialogClose>
            <FormButton
              pendingState="Processing..."
              disabled={!botState.name || !botState.backstory}
              type="submit"
              className="button"
            >
              Create chatbot
            </FormButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
