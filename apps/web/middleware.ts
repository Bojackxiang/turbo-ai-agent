import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/debug-auth",
  "/jwt-test",
]);

export default clerkMiddleware(async (auth, req) => {
  console.log("Middleware running for:", req.nextUrl.pathname);

  if (!isPublicRoute(req)) {
    console.log("Protected route, checking auth...");
    await auth.protect();
  } else {
    console.log("Public route, allowing access");
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
