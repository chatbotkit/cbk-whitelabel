import { redirect } from 'next/navigation'

import cbk, { ChatBotKit, getUserClient } from '@/lib/chatbotkit'

import { auth, clerkClient } from '@clerk/nextjs/server'

type UserAuthType = {
  userId: string
  stripeCustomerId?: string | null
  chatbotkitUserId?: string | null
}

export async function getUserAuth(): Promise<UserAuthType> {
  const { userId } = auth()

  if (!userId) {
    return redirect('/') // @todo redirect to specific page
  }

  const user = await clerkClient.users.getUser(userId)

  if (!user) {
    return redirect('/') // @todo redirect to specific page
  }

  const stripeCustomerId = user.privateMetadata.stripeCustomerId as string
  const chatbotkitUserId = user.privateMetadata.chatbotkitUserId as string

  return { userId, stripeCustomerId, chatbotkitUserId }
}

export async function ensureChatBotKitUserId(): Promise<string> {
  const { userId, chatbotkitUserId } = await getUserAuth()

  if (chatbotkitUserId) {
    return chatbotkitUserId
  }

  const { id } = await cbk.partner.user.create({})

  await clerkClient.users.updateUser(userId, {
    privateMetadata: {
      chatbotkitUserId: id,
    },
  })

  return id
}

export async function getChatBotKitUserClient(): Promise<ChatBotKit> {
  const chatbotkitUserId = await ensureChatBotKitUserId()

  return getUserClient(chatbotkitUserId)
}
