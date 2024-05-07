'use client'

import { useState } from 'react'

import GetCheckoutForm from '@/components/GetCheckoutForm'
import SiteNavbar from '@/components/SiteNavbar'
import { createCheckoutSession } from '@/server-actions/stripe-actions'

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

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
            <GetCheckoutForm
              createCheckoutSession={createCheckoutSession}
              setClientSecret={setClientSecret}
            />
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
