'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getChatBotKitUserClient } from '@/lib/auth'
import { captureException } from '@/lib/error'

import { BotListResponse } from '@chatbotkit/sdk/bot/v1'

export async function listBots(): Promise<BotListResponse> {
  const cbk = await getChatBotKitUserClient()

  return await cbk.bot.list()
}

export async function createBot(formData: FormData) {
  const cbk = await getChatBotKitUserClient()

  const name = formData.get('name')
  const model = formData.get('model')
  const backstory = formData.get('backstory')

  let botId

  try {
    const bot = await cbk.bot.create({
      name: name as string,
      model: model as string,
      backstory: backstory as string,
    })

    botId = bot.id
  } catch (e) {
    await captureException(e)

    throw new Error(`Something went wrong. Please try again!`)
  }

  redirect(`/dashboard/bots/${botId}`)
}

export async function updateBot(formData: FormData, botId: string) {
  const cbk = await getChatBotKitUserClient()

  const backstory = formData.get('backstory')

  try {
    await cbk.bot.update(botId, {
      backstory: backstory as string,
    })
  } catch (e) {
    await captureException(e)

    throw new Error(`Something went wrong. Please try again!`)
  }

  revalidatePath(`/dashboard/bots`)
}

export async function deleteBot(id: string) {
  const cbk = await getChatBotKitUserClient()

  try {
    const bot = await cbk.bot.fetch(id)

    await cbk.bot.delete(id)
    if (bot.datasetId) {
      await cbk.dataset.delete(bot.datasetId as string)
    }
  } catch (e) {
    await captureException(e)

    throw new Error(`Something went wrong. Please try again!`)
  }

  revalidatePath('/dashboard')
}
