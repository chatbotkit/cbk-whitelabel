'use server'

import stripe from '@/lib/stripe'

import { auth, clerkClient } from '@clerk/nextjs/server'

import { z } from 'zod'

const env = z
  .object({
    STRIPE_PRICE_ID: z.string(),
    DOMAIN_URL: z.string(),
  })
  .parse(process.env)

export async function createCheckoutSession() {
  const { userId } = auth()

  const user = await clerkClient.users.getUser(userId as string)

  let stripeCustomer

  if (!user.privateMetadata.stripeCustomerId) {
    stripeCustomer = await stripe.customers.create({
      name: user.firstName as string,
      email: user.emailAddresses[0].emailAddress,
    })

    if (!stripeCustomer) {
      throw new Error(`Something went wrong. Please try again!`)
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
        price: env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    return_url: new URL(
      '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
      env.DOMAIN_URL
    ).toString(),
  })

  return session.client_secret as string
}
