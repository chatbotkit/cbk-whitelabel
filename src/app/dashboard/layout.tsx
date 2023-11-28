import { Metadata } from 'next'
import Toast from '@/components/Toast'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'CBK Whitelabel',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <Toast />
      <main className="pt-16 bg-zinc-50 min-h-screen">{children}</main>
    </>
  )
}
