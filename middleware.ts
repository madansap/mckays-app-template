import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/login", "/sign-up", "/sign-in", "/api"];
const protectedPaths = ["/dashboard", "/settings", "/profile"];
const authPaths = ["/login", "/sign-in", "/sign-up"];

const isPublic = (path: string) => publicPaths.some((x) => path.startsWith(x));
const isProtected = (path: string) =>
  protectedPaths.some((x) => path.startsWith(x));

const handler = (auth: any, request: NextRequest) => {
  const path = request.nextUrl.pathname;

  console.log("Auth state:", {
    path,
    userId: auth.userId,
    isAuthPath: authPaths.includes(path),
    afterSignInUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    afterSignUpUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
  })

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
    return NextResponse.next();
  }

  if (isProtected(path) && !auth.userId) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect_url", encodeURIComponent(path));
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export default clerkMiddleware(handler);

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/dashboard/:path*",
    "/settings/:path*",
    "/profile/:path*",
  ],
};
