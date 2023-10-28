import { CircleStackIcon } from "@heroicons/react/20/solid";
import { getUserAuth } from "@/lib/auth";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import CreateChatbotDialog from "@/components/CreateChatbotDialog";
import CreateDatasetDialog from "@/components/CreateDatasetDialog";
import { createChatbotAction } from "@/server-actions/chatbot-actions";

async function getChatbots() {
  const { token } = await getUserAuth();

  const res = await fetch(`${process.env.CHATBOTKIT_API}/bot/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.items;
}

export default async function DashbaordPage() {
  const bots = await getChatbots();
  console.log(bots);

  return (
    <main>
      <section className="py-14 border-b border-main bg-zinc-50">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-black text-2xl font-medium">Overview</h1>
            <p className="text-zinc-500 text-sm">
              Find all your datasets, conversations and more...
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <CreateChatbotDialog createChatbotAction={createChatbotAction} />
            <CreateDatasetDialog />
          </div>
        </div>
      </section>

      {/* Datasets */}
      <section className="container mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="col-span-2">
            <CardHeader>
              <div className="border border-main h-8 w-8 rounded-md flex items-center justify-center shadow mb-2">
                <CircleStackIcon className="h-4 w-4" />
              </div>
              <CardTitle>Dataset title</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi,
                repellat!
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="col-span-1 grid grid-rows-2 gap-4">
            <Card>
              <CardHeader>
                <div className="border border-main h-8 w-8 rounded-md flex items-center justify-center shadow mb-2">
                  <CircleStackIcon className="h-4 w-4" />
                </div>
                <CardTitle>Dataset title</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Modi, repellat!
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <div className="border border-main h-8 w-8 rounded-md flex items-center justify-center shadow mb-2">
                  <CircleStackIcon className="h-4 w-4" />
                </div>
                <CardTitle>Dataset title</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Modi, repellat!
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
