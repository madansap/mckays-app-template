/*
<ai_context>
Contains middleware for protecting routes, checking user authentication, and redirecting as needed.
</ai_context>
*/

import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicPaths = ["/", "/login*", "/sign-up*", "/sign-in*"]
const protectedPaths = ["/dashboard*", "/settings*", "/profile*"]
const authPaths = ["/login", "/sign-in", "/sign-up"]

const isPublic = (path: string) => {
  return publicPaths.find(x => 
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  )
}

const isProtected = (path: string) => {
  return protectedPaths.find(x => 
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  )
}

const handler = (auth: any, request: NextRequest) => {
  const path = request.nextUrl.pathname

  // Debug log
  console.log("Auth state:", {
    path,
    userId: auth.userId,
    isAuthPath: authPaths.includes(path),
    afterSignInUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    afterSignUpUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
  })

  // Allow access to the dashboard regardless of auth state
  if (path === "/dashboard") {
    return NextResponse.next()
  }

  // Block /todo redirects
  if (path.startsWith("/todo")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Handle sign-up specifically
  if (path.startsWith("/sign-up")) {
    console.log("Sign-up path detected")
    if (auth.userId) {
      console.log("User is already authenticated, redirecting to dashboard")
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    console.log("Proceeding with sign-up")
    return NextResponse.next() // Allow the sign-up process to continue
  }

  // Redirect authenticated users to dashboard from auth pages or root
  if (auth.userId && (path === "/" || authPaths.includes(path))) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Handle public routes
  if (isPublic(path)) {
    return NextResponse.next()
  }

  // Protect dashboard routes
  if (isProtected(path) && !auth.userId) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect_url', '/dashboard')
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export default clerkMiddleware(handler)

// Only run middleware on specific paths
export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/todo/:path*',
    '/dashboard/:path*',
    '/settings/:path*',
    '/profile/:path*'
  ]
}
