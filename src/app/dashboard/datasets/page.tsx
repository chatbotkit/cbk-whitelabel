import { getUserAuth } from "@/lib/auth";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CircleStackIcon } from "@heroicons/react/20/solid";
import Heading from "@/components/Heading";

async function getChatbots() {
  const { token } = await getUserAuth();

  const res = await fetch(`${process.env.CHATBOTKIT_API}/dataset/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.items;
}

export default async function DatasetsPage() {
  const datasets: BotType[] = await getChatbots();

  return (
    <main>
      <Heading
        title="Datasets"
        description="Find all you chat conversations..."
      >
        <Button variant="default">Create Dataset</Button>
      </Heading>

      {/* Datasets */}
      <section className="container mt-10">
        <h2 className="mb-5 text-lg font-medium">Your chatbots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {datasets?.map((item) => (
            <Link key={item.id} href={`/dashboard/datasets/${item.id}`}>
              <Card className="h-full">
                <CardHeader>
                  <div className="border border-main h-8 w-8 rounded-md flex items-center justify-center shadow mb-2">
                    <CircleStackIcon className="h-4 w-4" />
                  </div>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
