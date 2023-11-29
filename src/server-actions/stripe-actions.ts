'use server'

import stripe from '@/lib/stripe'
import { auth, clerkClient } from '@clerk/nextjs'

const YOUR_DOMAIN = process.env.DOMAIN_URL || 'http://localhost:3000'

export async function createCheckoutSession() {
  const { userId }: { userId: string | null } = auth()

  const user = await clerkClient.users.getUser(userId as string)

  let stripeCustomer

  if (!user.privateMetadata.stripeCustomerId) {
    stripeCustomer = await stripe.customers.create({
      name: user.firstName as string,
      email: user.emailAddresses[0].emailAddress,
    })

    if (!stripeCustomer) {
      return {
        error: {
          message: 'Something went wrong. Please try again!',
        },
      }
    }

    await clerkClient.users.updateUser(userId as string, {
      privateMetadata: {
        stripeCustomerId: stripeCustomer.id,
      },
    })
  }

  const session = await stripe.checkout.sessions.create({
    customer:
      stripeCustomer?.id || (user?.privateMetadata.stripeCustomerId as string),
    ui_mode: 'embedded',
    line_items: [
      {
        price: 'price_1NuHPNFmWYcV6uRLsdm3YQpy',
        quantity: 1,
      },
    ],
    mode: 'subscription',
    return_url: `${YOUR_DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  })

  return session.client_secret as string
}
