import SiteNavbar from '@/components/SiteNavbar'

export default async function HomePage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex flex-col items-center justify-center h-screen text-center space-y-2">
        <h1 className="text-4xl font-medium">ChatBotKit Whitelabel</h1>
        <p>Open-source white-label solution on top of ChatBotKit</p>
        <p className="font-bold">Extend and Customize</p>
      </main>
    </>
  )
}
