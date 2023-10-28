import { getUserAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";

async function getChatbot(id: string) {
  const { token } = await getUserAuth();

  const res = await fetch(`${process.env.CHATBOTKIT_API}/bot/${id}/fetch`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data;
}

export default async function BotPage({ params }: { params: { id: string } }) {
  const bot: BotType = await getChatbot(params.id);

  return (
    <main>
      <section className="py-14 border-b border-main bg-zinc-50">
        <div className="container flex flex-col gap-4 md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-black text-2xl font-medium">{bot.name}</h1>
            <p className="text-zinc-500 text-sm">{bot.backstory}</p>
          </div>
          <Button variant="default">Start a Conversation</Button>
        </div>
      </section>

      {/* Conversations */}
      <section className="container mt-10"></section>
    </main>
  );
}
