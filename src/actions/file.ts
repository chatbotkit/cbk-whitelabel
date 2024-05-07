'use server'

import { revalidatePath } from 'next/cache'

import { getChatBotKitUserClient } from '@/lib/auth'
import { captureException } from '@/lib/error'

export async function addFile(formData: FormData, botId: string) {
  const cbk = await getChatBotKitUserClient()

  const file = formData.get('file') as File
  const buffer = await file?.arrayBuffer()

  try {
    let dataset

    const bot = await cbk.bot.fetch(botId)

    if (!bot.datasetId) {
      dataset = await cbk.dataset.create({
        name: file.name,
        store: 'ada-loom',
      })
      await cbk.bot.update(botId, {
        datasetId: dataset.id,
      })
    } else {
      dataset = await cbk.dataset.fetch(bot.datasetId)
    }

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

    // 3. Attach file to the dataset
    await cbk.dataset.file.attach(dataset.id, createdFile.id, {
      type: 'source',
    })

    // 4. Sync with the dataset
    await cbk.dataset.file.sync(dataset.id, createdFile.id, {})
  } catch (e) {
    await captureException(e)

    return {
      error: {
        message: 'Something went wrong. Please try again!',
      },
    }
  }

  revalidatePath('/dashboard/bots')
}

export async function deleteFile(id: string) {
  const cbk = await getChatBotKitUserClient()

  try {
    await cbk.file.delete(id)
  } catch (e) {
    await captureException(e)

    return {
      error: {
        message: 'Something went wrong. Please try again!',
      },
    }
  }

  revalidatePath('/dashboard/bots')
}
