import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/debug-auth",
  "/jwt-test",
]);

const isOrgFreeRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/org-select(.*)",
  "/",
  "/debug-auth",
  "/jwt-test",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  // 如果用户已登录且访问根路径，重定向到 dashboard
  if (userId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  if (userId && !orgId && !isOrgFreeRoute(req)) {
    const searchParams = new URLSearchParams({ redirectUrl: req.url });

    const orgSelection = new URL(
      `/org-select?${searchParams.toString()}`,
      req.url
    );

    return NextResponse.redirect(orgSelection);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
