'use client'

import Link from 'next/link'

import { UserButton, useUser } from '@clerk/nextjs'

export default function SiteNavbar() {
  const { isSignedIn } = useUser()

  return (
    <nav className="fixed top-0 w-full left-0 bg-white z-[100] border-b border-main flex flex-col justify-between">
      <div className="flex items-center justify-between h-16 container">
        <div className="flex items-center space-x-6 h-full">
          <Link href="/" className="hover:opacity-70 transition duration-150">
            <svg
              width="39"
              height="39"
              viewBox="0 0 39 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
            >
              <path
                d="M0 16.8235C0 7.53215 7.58171 0 16.9342 0H38.7434C38.8851 0 39 0.114123 39 0.254902V22.1765C39 31.4678 31.4183 39 22.0658 39H16.9342C7.58171 39 0 31.4678 0 22.1765V16.8235Z"
                fill="url(#paint0_linear_416_2)"
              />
              <path
                d="M9.49342 19.6275H19.5V29.0588H13.3421C11.2165 29.0588 9.49342 27.347 9.49342 25.2353V19.6275Z"
                fill="white"
                fillOpacity="0.6"
              />
              <path
                d="M19.5 19.6275H29.5066V25.2353C29.5066 27.347 27.7835 29.0588 25.6579 29.0588H19.5V19.6275Z"
                fill="white"
              />
              <path
                d="M9.49342 14.0196C9.49342 11.9079 11.2165 10.1961 13.3421 10.1961H19.5V19.6275H9.49342V14.0196Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M19.5 10.1961H25.6579C27.7835 10.1961 29.5066 11.9079 29.5066 14.0196V19.6275H19.5V10.1961Z"
                fill="white"
                fillOpacity="0.2"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_416_2"
                  x1="19.5"
                  y1="0"
                  x2="19.5"
                  y2="39"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop />
                  <stop offset="1" stopColor="#242424" />
                </linearGradient>
              </defs>
            </svg>
          </Link>
          <div className="h-[1.5rem] w-[1px] -skew-x-12 bg-zinc-200 dark:bg-smoke-600" />
          <div className="flex items-center h-full space-x-6">
            <Link
              href="/dashboard"
              className="h-full text-sm flex items-center opacity-100 hover:opacity-50 transition duration-150"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/checkout"
            className="h-full text-sm flex items-center opacity-100 hover:opacity-50 transition duration-150"
          >
            Checkout
          </Link>
          <div className="h-[1.5rem] w-[1px] bg-zinc-200 dark:bg-smoke-600" />
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link
              href="/sign-in"
              className="h-full text-sm flex items-center opacity-100 hover:opacity-50 transition duration-150"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
