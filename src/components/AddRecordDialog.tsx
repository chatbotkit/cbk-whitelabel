'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { createDatasetRecord } from '@/server-actions/dataset-actions'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Textarea } from '@/components/ui/TextArea'
import { buttonVariants } from '@/components/ui/Button'
import FormButton from '@/components/ui/FormButton'

export default function AddRecordDialog({ datasetId }: { datasetId: string }) {
  const [text, setText] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: 'default' })}>
        Add Record
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a record</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            const error = await createDatasetRecord(formData, datasetId)
            if (error) {
              toast.error("We couldn't create the record. Please try again!")
              setOpen(false)
            } else {
              toast.success('You record was created!')
              setOpen(false)
            }
          }}
          className="flex flex-col space-y-4"
        >
          <div>
            <label htmlFor="text" className="text-sm font-medium block mb-2">
              Text
            </label>
            <Textarea
              id="text"
              name="text"
              rows={5}
              placeholder="Define the contents for the record"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></Textarea>
          </div>
          <div className="flex items-center justify-end space-x-3 pt-4">
            <DialogClose className={buttonVariants({ variant: 'outline' })}>
              Cancel
            </DialogClose>
            <FormButton
              pendingText="Processing..."
              disabled={!text}
              type="submit"
            >
              Create record
            </FormButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
