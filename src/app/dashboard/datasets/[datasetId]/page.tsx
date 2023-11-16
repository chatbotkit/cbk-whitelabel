import { getUserAuth } from "@/lib/auth";
import AddRecordDialog from "@/components/AddRecordDialog";
import Heading from "@/components/Heading";

type RecordType = {
  id: string;
  text: string;
};

async function getDataset(id: string) {
  const { token } = await getUserAuth();
  const res = await fetch(`${process.env.CHATBOTKIT_API}/dataset/${id}/fetch`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  const recordsRes = await fetch(
    `${process.env.CHATBOTKIT_API}/dataset/${id}/record/list`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const recordsData = await recordsRes.json();

  return { dataset: data, records: recordsData.items as RecordType[] };
}

export default async function DatasetPage({
  params,
}: {
  params: { datasetId: string };
}) {
  const { dataset, records } = await getDataset(params.datasetId);

  return (
    <main>
      <Heading title={dataset.name} description={dataset.description}>
        <AddRecordDialog datasetId={params.datasetId} />
      </Heading>

      {/* Records */}
      <section className="container mt-10">
        <h2 className="mb-5 text-lg font-medium">Dataset Records</h2>
        <div className="flex flex-col gap-4">
          {records.length ? (
            <>
              {records?.map(({ text, id }) => (
                <div
                  key={id}
                  className="border border-zinc-200 rounded-md py-3 px-4"
                >
                  {text}
                </div>
              ))}
            </>
          ) : (
            "No records found"
          )}
        </div>
      </section>
    </main>
  );
}
