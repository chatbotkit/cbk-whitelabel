import { authMiddleware } from '@clerk/nextjs'

// This protects all routes including api/trpc routes
export default authMiddleware({
  publicRoutes: ['/'],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
