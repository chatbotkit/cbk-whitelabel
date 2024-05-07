'use client'

import { useState } from 'react'

import { createCheckoutSession } from '@/actions/stripe'
import SiteNavbar from '@/components/SiteNavbar'
import { FormButton } from '@/components/ui/FormButton'

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { z } from 'zod'

const env = z
  .object({
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
  })
  .parse({
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
  })

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('')

  return (
    <>
      <SiteNavbar />
      <main className="py-20">
        <div className="flex flex-col items-center container">
          <h1 className="pt-20 text-center pb-3 text-5xl font-medium max-w-2xl">
            Simple, no-tricks pricing
          </h1>
          <p className="text-center mb-10 text-zinc-600 max-w-2xl">
            Trusted by some of the world&apos;s foremost brands to craft
            innovative AI solutions that benefit both their customers and
            employees.
          </p>
          {!clientSecret && (
            <form
              action={async () => {
                const clientSecret = await createCheckoutSession()

                setClientSecret(clientSecret)
              }}
            >
              <section className="grid grid-cols-3 gap-4">
                <div className="border border-zinc-200 shadow-md rounded-xl p-6">
                  <h3 className="text-lg mb-1 font-semibold">Starter</h3>
                  <p className="text-sm mb-6">
                    Best option for personal use & for your next project.
                  </p>
                  <h2 className="text-5xl font-semibold mb-6">$29</h2>
                  <FormButton className="button" pendingState="Processing...">
                    Subscribe
                  </FormButton>
                </div>
                {/*  */}
                <div className="border border-zinc-200 shadow-md rounded-xl p-6">
                  <h3 className="text-lg mb-1 font-semibold">Pro</h3>
                  <p className="text-sm mb-6">Relevant for multiple users.</p>
                  <h2 className="text-5xl font-semibold mb-6">$69</h2>
                  <FormButton className="button" pendingState="Processing...">
                    Subscribe
                  </FormButton>
                </div>
                {/*  */}
                <div className="border border-zinc-200 shadow-md rounded-xl p-6">
                  <h3 className="text-lg mb-1 font-semibold">Business</h3>
                  <p className="text-sm mb-6">Best for large scale uses.</p>
                  <h2 className="text-5xl font-semibold mb-6">$99</h2>
                  <FormButton className="button" pendingState="Processing...">
                    Subscribe
                  </FormButton>
                </div>
              </section>
            </form>
          )}
        </div>
        <div className="overflow-hidden">
          {clientSecret && (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </main>
    </>
  )
}
