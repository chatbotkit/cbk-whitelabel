"use client";

import FormButton from "./ui/FormButton";

export default function GetCheckoutForm({
  createCheckoutSession,
  setClientSecret,
}: any) {
  return (
    <form
      action={async () => {
        const clientSecret = await createCheckoutSession();
        setClientSecret(clientSecret);
      }}
    >
      <FormButton pendingText="Processing...">Get Checkout</FormButton>
    </form>
  );
}
