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
    sessionId: auth.sessionId,
  });

  // Ensure Clerk session is fully established before redirecting
  if (auth.userId) {
    if ((path === "/" || authPaths.includes(path)) && auth.sessionId) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

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
