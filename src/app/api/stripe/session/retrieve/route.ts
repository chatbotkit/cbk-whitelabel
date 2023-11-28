import { type NextRequest } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs'

import stripe from '@/lib/stripe'
import chatbotkit from '@/lib/chatbotkit'

export async function GET(req: NextRequest) {
  try {
    const { userId }: { userId: string | null } = auth()

    if (!userId) {
      return new Response('Unauthorized', {
        status: 401,
      })
    }

    const user = await clerkClient.users.getUser(userId)

    if (!user) {
      return new Response('Unauthorized', {
        status: 401,
      })
    }

    const sessionId = req.nextUrl.searchParams.get('sessionId')

    if (!sessionId) {
      return new Response('Missing session id', {
        status: 400,
      })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return new Response('Session not found', {
        status: 404,
      })
    }

    let chatbotkitUserId

    if (!user.privateMetadata.chatbotkitUserId) {
      const { id } = await chatbotkit.partner.user.create({
        name: user?.firstName || '',
      })

      chatbotkitUserId = id
    } else {
      chatbotkitUserId = user.privateMetadata.chatbotkitUserId as string
    }

    let chatbotkitUserToken = null

    if (!user.privateMetadata.chatbotkitUserToken) {
      const { token } = await chatbotkit.partner.user.token.create(
        chatbotkitUserId,
        {}
      )

      chatbotkitUserToken = token as string
    } else {
      chatbotkitUserToken = user.privateMetadata.chatbotkitUserToken
    }

    await clerkClient.users.updateUser(userId as string, {
      privateMetadata: {
        stripeCustomerId: user?.privateMetadata.stripeCustomerId,
        chatbotkitUserId,
        chatbotkitUserToken,
      },
    })

    return Response.json({
      status: session.status,
    })
  } catch (err) {
    if (process.env.DEBUG) {
      console.error(err)
    }

    return new Response('Something went wrong', {
      status: 500,
    })
  }
}
