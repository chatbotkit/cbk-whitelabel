import { type NextRequest } from 'next/server'

import chatbotkit from '@/lib/chatbotkit'
import { captureException } from '@/lib/error'
import stripe from '@/lib/stripe'

import { auth, clerkClient } from '@clerk/nextjs/server'

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()

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

    await clerkClient.users.updateUser(userId as string, {
      privateMetadata: {
        stripeCustomerId: user?.privateMetadata.stripeCustomerId,
        chatbotkitUserId,
      },
    })

    return Response.json({
      status: session.status,
    })
  } catch (e) {
    await captureException(e)

    return new Response('Something went wrong', {
      status: 500,
    })
  }
}

export const runtime = 'edge'
