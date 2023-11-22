import LoadingSpinner from '@/components/LoadingSpinner'

export default function DashboardLoadingPage() {
  return (
    <main>
      <section className="py-14 border-b border-main bg-white">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-black text-2xl font-medium">Chatbots</h1>
            <p className="text-zinc-500 text-sm">
              Find all you chatbots and create new ones...
            </p>
          </div>
        </div>
      </section>
      <section className="container mt-10">
        <div className="w-full h-[16rem] flex flex-col items-center justify-center border border-zinc-300 rounded-lg border-dashed">
          <LoadingSpinner />
        </div>
      </section>
    </main>
  )
}
