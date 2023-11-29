'use client'

import { FormButton } from '@/components/ui/FormButton'

export default function GetCheckoutForm({
  createCheckoutSession,
  setClientSecret,
}: any) {
  return (
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

        <div className="border border-zinc-200 shadow-md rounded-xl p-6">
          <h3 className="text-lg mb-1 font-semibold">Pro</h3>
          <p className="text-sm mb-6">Relevant for multiple users.</p>
          <h2 className="text-5xl font-semibold mb-6">$69</h2>
          <FormButton className="button" pendingState="Processing...">
            Subscribe
          </FormButton>
        </div>

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
  )
}
