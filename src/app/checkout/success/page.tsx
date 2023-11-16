'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

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
  }, [])

  if (status === 'open') {
    return router.push('/pricing')
  }

  if (status === 'complete') {
    return (
      <section className="flex flex-col items-center justify-center h-screen max-w-3xl mx-auto">
        <p className="text-center">
          We appreciate your business!If you have any questions, please email
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null
}
