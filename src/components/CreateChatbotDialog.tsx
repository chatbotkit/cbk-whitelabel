'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/TextArea'
import { Select } from '@/components/ui/Select'
import { buttonVariants } from '@/components/ui/Button'
import FormButton from './ui/FormButton'
import { createChatbot } from '@/server-actions/chatbot-actions'
import { toast } from 'sonner'

export default function CreateChatbotDialog() {
  const [open, setOpen] = useState(false)
  const [botState, setBotState] = useState({
    name: '',
    backstory: '',
    model: 'gpt-3.5-turbo',
    // datasetId: "",
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: 'default' })}>
        Create Chatbot
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a chatbot</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            const error = await createChatbot(formData)
            if (error) {
              toast.error(error.error.message)
            }
          }}
          className="flex flex-col space-y-4"
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium block mb-2">
              Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Give your chatbot a name"
              onChange={(e) =>
                setBotState({ ...botState, name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="model" className="text-sm font-medium block mb-2">
              Model
            </label>
            <Select
              defaultValue={botState.model}
              name="model"
              onChange={(e) =>
                setBotState({ ...botState, model: e.target.value })
              }
            >
              <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
              <option value="gpt-4">gpt-4</option>
              <option value="gpt-4-1106-preview">gpt-4-1106-preview</option>
            </Select>
          </div>

          <div className="h-[1px] w-full bg-zinc-300" />
          <div>
            <label
              htmlFor="backstory"
              className="text-sm font-medium block mb-2"
            >
              Backstory
            </label>
            <Textarea
              id="backstory"
              name="backstory"
              rows={10}
              placeholder="Give your chatbot personality and style.."
              value={botState.backstory}
              onChange={(e) =>
                setBotState({ ...botState, backstory: e.target.value })
              }
            ></Textarea>
          </div>
          <div className="flex items-center justify-end space-x-3 pt-4">
            <DialogClose className={buttonVariants({ variant: 'outline' })}>
              Cancel
            </DialogClose>
            <FormButton
              pendingText="Processing..."
              disabled={!botState.name || !botState.backstory}
              type="submit"
            >
              Create chatbot
            </FormButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
