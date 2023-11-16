import React from 'react'

export default function Heading({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <section className="py-14 border-b border-main bg-white">
      <div className="container flex flex-col gap-4 md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-black text-2xl font-medium">{title}</h1>
          <p className="text-zinc-500 text-sm">{description}</p>
        </div>
        {children}
      </div>
    </section>
  )
}
