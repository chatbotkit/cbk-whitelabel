import Stripe from 'stripe'
import { z } from 'zod'

export { Stripe }

const env = z
  .object({
    STRIPE_SECRET_KEY: z.string(),
  })
  .parse(process.env)

export const client = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export default client
