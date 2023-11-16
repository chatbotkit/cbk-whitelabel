import Link from 'next/link'
import { CircleStackIcon } from '@heroicons/react/20/solid'

import { getUserAuth } from '@/lib/auth'
import { ChatBotKit } from '@/lib/chatbotkit'
import { Button } from '@/components/ui/Button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'

async function getDatasets(): Promise<
  { id: string; name?: string; description?: string }[]
> {
  const { chatbotkitUserToken } = await getUserAuth()

  if (!chatbotkitUserToken) {
    return []
  }

  const { items } = await new ChatBotKit({
    secret: chatbotkitUserToken,
  }).dataset.list()

  return items
}

export default async function DatasetsPage() {
  const datasets = await getDatasets()

  return (
    <main>
      <section className="py-14 border-b border-main bg-zinc-50">
        <div className="container flex flex-col gap-4 md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-black text-2xl font-medium">Datasets</h1>
            <p className="text-zinc-500 text-sm">
              Find all you chat conversations...
            </p>
          </div>
          <Button variant="default">Create Dataset</Button>
        </div>
      </section>
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
  )
}
