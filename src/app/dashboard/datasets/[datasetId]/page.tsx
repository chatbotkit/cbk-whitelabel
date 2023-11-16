import { getUserAuth } from '@/lib/auth'
import AddRecordDialog from '@/components/AddRecordDialog'

type RecordType = {
  id: string
  text: string
}

async function getDataset(id: string) {
  const { token } = await getUserAuth()
  const res = await fetch(`${process.env.CHATBOTKIT_API}/dataset/${id}/fetch`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await res.json()

  const recordsRes = await fetch(
    `${process.env.CHATBOTKIT_API}/dataset/${id}/record/list`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const recordsData = await recordsRes.json()

  return { dataset: data, records: recordsData as RecordType[] }
}

export default async function Page({
  params,
}: {
  params: { datasetId: string }
}) {
  const { dataset, records } = await getDataset(params.datasetId)

  return (
    <main>
      <section className="py-14 border-b border-main bg-zinc-50">
        <div className="container flex flex-col gap-4 md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-black text-2xl font-medium">{dataset.name}</h1>
            <p className="text-zinc-500 text-sm">{dataset.description}</p>
          </div>
          <AddRecordDialog datasetId={params.datasetId} />
        </div>
      </section>

      {/* Records */}
      <section className="container mt-10">
        <h2 className="mb-5 text-lg font-medium">Dataset Records</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {records.length ? (
            <>{records?.map(({ text, id }) => <div key={id}>{text}</div>)}</>
          ) : (
            'No records found'
          )}
        </div>
      </section>
    </main>
  )
}
