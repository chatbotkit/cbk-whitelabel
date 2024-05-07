'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import LoadingSpinner from '@/components/LoadingSpinner'

export default function Page() {
  const router = useRouter()

  const [status, setStatus] = useState(null)

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sessionId = urlParams.get('session_id')

    if (sessionId === null) {
      router.push('/')
    }

    async function getSession() {
      const res = await fetch(
        `/api/stripe/session/retrieve?sessionId=${sessionId}`
      )

      if (res.ok) {
        const data = await res.json()

        setStatus(data.status)
      }
    }

    getSession()
  }, [router])

  if (status === 'open') {
    return router.push('/pricing')
  }

  if (status === 'complete') {
    return (
      <section className="flex flex-col items-center justify-center h-screen max-w-3xl mx-auto">
        <p className="text-center">Thank you fot subscribing!</p>
        <Link className="button mt-2" href="/dashboard">
          Go to dashboard
        </Link>
      </section>
    )
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen max-w-3xl mx-auto">
      <LoadingSpinner />
      <p className="text-center mt-4">
        We are setting up your account. <br /> Please, don&apos;t refresh this
        page
      </p>
    </section>
  )
}
