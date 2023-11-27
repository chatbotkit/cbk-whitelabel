'use server'

import { getUserAuth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ChatBotKit } from '@chatbotkit/sdk'

export async function createChatbot(formData: FormData) {
  let botId
  const { chatbotkitUserToken } = await getUserAuth()

  const cbk = new ChatBotKit({
    secret: chatbotkitUserToken!,
  })

  const name = formData.get('name')
  const backstory = formData.get('backstory')
  const model = formData.get('model')

  try {
    const bot = await cbk.bot.create({
      name: name as string,
      backstory: backstory as string,
      model: model as string,
      // description: description,
      // datasetId: datasetId,
      // skillsetId: skillsetId,
      // visibility: "public",
    })
    botId = bot.id
  } catch (error) {
    console.error(error)
    return {
      error: {
        message: 'Something went wrong. Please try again!',
      },
    }
  }

  redirect(`/dashboard/bots/${botId}`)
}

export async function deleteChatbot(id: string) {
  const { chatbotkitUserToken } = await getUserAuth()

  const cbk = new ChatBotKit({
    secret: chatbotkitUserToken!,
  })

  try {
    const bot = await cbk.bot.delete(id)
  } catch (error) {
    console.error(error)
    return {
      error: {
        message: 'Something went wrong. Please try again!',
      },
    }
  }

  revalidatePath('/dashboard')
}

export async function updateChatbotBackstory(
  formData: FormData,
  botId: string
) {
  const { chatbotkitUserToken } = await getUserAuth()
  const backstory = formData.get('backstory')

  const cbk = new ChatBotKit({
    secret: chatbotkitUserToken!,
  })

  try {
    await cbk.bot.update(botId, {
      backstory: backstory as string,
    })
  } catch (error) {
    console.error(error)
    return {
      error: {
        message: 'Something went wrong. Please try again!',
      },
    }
  }
  revalidatePath(`/dashboard/bots`)
}
