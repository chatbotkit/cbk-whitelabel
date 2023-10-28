import { type NextRequest } from "next/server";

import stripe from "@/lib/stripe";
import { auth, clerkClient } from "@clerk/nextjs";

export async function GET(req: NextRequest) {
  let session;
  try {
    const searchParams = req.nextUrl.searchParams;
    const session_id: string | null = searchParams.get("session_id");

    const { userId } = auth();
    const user = userId ? await clerkClient.users.getUser(userId) : null;

    if (!user?.privateMetadata.stripeCustomerId) {
      throw new Error();
    }

    session = await stripe.checkout.sessions.retrieve(session_id as string);

    if (!user?.privateMetadata.cbkId) {
      // Create ChatBotKit User
      const cbkRes = await fetch(
        `${process.env.CHATBOTKIT_PARTNER_API}/user/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CHATBOTKIT_API_KEY}`,
          },
          body: JSON.stringify({ name: user?.firstName }),
        }
      );

      if (cbkRes.ok) {
        const cbkData = await cbkRes.json();

        const cbkTokenRes = await fetch(
          `${process.env.CHATBOTKIT_PARTNER_API}/user/${cbkData.id}/token/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.CHATBOTKIT_API_KEY}`,
            },
          }
        );
        const cbkTokenData = await cbkTokenRes.json();

        await clerkClient.users.updateUser(userId as string, {
          privateMetadata: {
            stripeCustomerId: user?.privateMetadata.stripeCustomerId,
            cbkId: cbkData.id,
            token: cbkTokenData.token,
          },
        });
      }
    }
  } catch (err) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return Response.json({
    status: session.status,
    customer_email: session.customer_details?.email,
  });
}
