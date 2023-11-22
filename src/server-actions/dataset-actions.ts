'use server'

import { getUserAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { ChatBotKit } from '@/lib/chatbotkit'

export async function createDataset(formData: FormData) {
  const { chatbotkitUserToken } = await getUserAuth()

  const file = formData.get('file') as File
  const buffer = await file?.arrayBuffer()

  const cbk = new ChatBotKit({
    secret: chatbotkitUserToken!,
  })

  if (!chatbotkitUserToken) {
    return redirect('/')
  }

  try {
    // 1. Create a file
    const createdFile = await cbk.file.create({
      name: file.name,
    })
    // 2. Upload the specified file
    await cbk.file.upload(createdFile.id, {
      data: buffer,
      name: file.name,
      type: file.type,
    })
    // 3. Create a dataset
    const dataset = await cbk.dataset.create({
      name: file.name,
      store: 'ada-loom',
    })
    // 4. Attach file to the dataset
    await cbk.dataset.file.attach(dataset.id, createdFile.id, {
      type: 'source',
    })
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
