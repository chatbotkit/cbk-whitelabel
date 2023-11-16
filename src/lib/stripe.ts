import Stripe from 'stripe'

export { Stripe }

export const client = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
})

export default client
