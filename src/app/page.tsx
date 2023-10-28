import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1>ChatBotKit Whitelabel</h1>
      <p>...</p>
      <Link href="/checkout">Got to checkout</Link>
      <UserButton />
    </main>
  );
}
