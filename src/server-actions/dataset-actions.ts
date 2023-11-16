'use server'

import { getUserAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { ChatBotKit } from '@/lib/chatbotkit'

export async function createDataset(formData: FormData) {
  const { chatbotkitUserToken } = await getUserAuth()

  if (!chatbotkitUserToken) {
    return redirect('/')
  }

  const name = formData.get('name')
  const description = formData.get('description')

  try {
    const dataset = await new ChatBotKit({
      secret: chatbotkitUserToken,
    }).dataset.create({
      name: name as string,
      description: description as string,

      store: 'ada-loom',
    })

    redirect(`/dashboard/datasets/${dataset.id}`)
  } catch (error) {
    console.error(error)

    return {
      error: {
        message: 'Something went wrong. Please try again!',
      },
    }
  }
}

export async function createDatasetRecord(
  formData: FormData,
  datasetId: string
) {
  const { chatbotkitUserToken } = await getUserAuth()

  if (!chatbotkitUserToken) {
    return redirect('/')
  }

  const text = formData.get('text')

  try {
    const record = await new ChatBotKit({
      secret: chatbotkitUserToken,
    }).dataset.record.create(datasetId, {
      text: text as string,
    })

    revalidatePath(`/dashboard/datasets/${datasetId}`)
  } catch (error) {
    console.error(error)
    return {
      error: {
        message: 'Something went wrong. Please try again!',
      },
    }
  }
}
