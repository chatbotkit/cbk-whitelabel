import { getUserAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

async function getDataset(id: string) {
  const { token } = await getUserAuth();
  const res = await fetch(`${process.env.CHATBOTKIT_API}/dataset/${id}/fetch`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}

export default async function DatasetPage({
  params,
}: {
  params: { datasetId: string };
}) {
  const dataset = await getDataset(params.datasetId);

  return (
    <main>
      <section className="py-14 border-b border-main bg-zinc-50">
        <div className="container flex flex-col gap-4 md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-black text-2xl font-medium">{dataset.name}</h1>
            <p className="text-zinc-500 text-sm">{dataset.description}</p>
          </div>
          <Button variant="default">Start a Conversation</Button>
        </div>
      </section>
    </main>
  );
}
