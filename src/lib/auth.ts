import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";

type UserAuthType = {
  userId: string | null;
  stripeCustomerId: string | null;
  cbkUserId: string | null;
  token: string | null;
};

export async function getUserAuth(): Promise<UserAuthType> {
  const { userId }: { userId: string | null } = auth();
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  const cbkUserId = user?.privateMetadata.cbkId as string;
  const stripeCustomerId = user?.privateMetadata.stripeCustomerId as string;
  const token = user?.privateMetadata.token as string;

  return { userId, stripeCustomerId, cbkUserId, token };
}
