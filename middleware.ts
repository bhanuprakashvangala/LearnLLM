import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Routes that are fully public (no sign-in required).
 * Everything else on the site requires a signed-in user — if they hit
 * a protected route without a session, we bounce them to /login and
 * carry their original destination in ?callbackUrl so they land back
 * on the page they wanted after authenticating.
 *
 * Legal pages stay public because (a) privacy / terms must be
 * reachable without an account and (b) about / contact are
 * conversion pages that shouldn't be gated.
 */
/**
 * Lesson reading is intentionally public so that the content can be
 * indexed by search engines. The signup nudge happens client-side via
 * ContentGate after hydration. Platform features (dashboard, playground,
 * challenges, profile, settings, quiz, all of /api/*) stay protected.
 */
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/signup",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/learn",
];

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  // Allow nested paths under the marketing / legal trees (e.g. /about/team)
  return PUBLIC_PATHS.some((p) => p !== "/" && pathname.startsWith(p + "/"));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Let NextAuth own its callbacks and signin/signout routes.
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  // Public routes pass through untouched.
  if (isPublic(pathname)) return NextResponse.next();

  // Everything else — including /learn, /challenges, /playground,
  // /dashboard, /settings, /quiz, and every /api/* route we own —
  // requires a signed-in user.
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // For API routes, return JSON instead of redirecting.
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/**
 * Run on everything except Next.js internals, static assets, and the
 * file types we never want middleware running on (images, fonts, etc.).
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf)$).*)",
  ],
};
