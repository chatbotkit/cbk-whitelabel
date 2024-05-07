import { redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs'
import { clerkClient } from '@clerk/nextjs/server'

type UserAuthType = {
  userId: string
  stripeCustomerId?: string | null
  chatbotkitUserId?: string | null
  chatbotkitUserToken?: string | null
}

export async function getUserAuth(): Promise<UserAuthType> {
  const { userId }: { userId: string | null } = auth()

  if (!userId) {
    return redirect('/')
  }

  const user = await clerkClient.users.getUser(userId)

  if (!user) {
    return redirect('/')
  }

  const stripeCustomerId = user.privateMetadata.stripeCustomerId as string
  const chatbotkitUserId = user.privateMetadata.chatbotkitUserId as string
  const chatbotkitUserToken = user.privateMetadata.chatbotkitUserToken as string

  return { userId, stripeCustomerId, chatbotkitUserId, chatbotkitUserToken }
}
