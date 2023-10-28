"use client";

import { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import GetCheckoutForm from "@/components/GetCheckoutForm";
import { createCheckoutSession } from "@/server-actions/stripe-actions";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");

  return (
    <div className="pb-20">
      <div className="flex flex-col items-center">
        <h1 className="pt-20 text-center pb-3 text-5xl font-medium">
          Checkout
        </h1>
        <p className="text-center mb-10 text-zinc-600">
          Thank you for choosing us.
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
    </div>
  );
}
