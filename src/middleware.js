import { NextResponse } from "next/server";

/**
 * Serve /me at the root of me.yashsrivasta7a.in.
 *
 * This lives in middleware rather than as a `has: [{ type: 'host' }]` rule in
 * next.config, because that rule matches against the host Next believes it is
 * serving, and behind Vercel's proxy that is not reliably the host the visitor
 * typed. Reading the header here removes the guesswork: whatever arrives in
 * `host` is what the browser asked for.
 *
 * A rewrite, not a redirect — the address bar keeps the bare subdomain instead
 * of bouncing to /me.
 */
export function middleware(request) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // Port suffix shows up in local dev; strip it before comparing.
  const hostname = host.split(":")[0].toLowerCase();

  if (hostname === "me.yashsrivasta7a.in" && pathname === "/") {
    return NextResponse.rewrite(new URL("/me", request.url));
  }

  return NextResponse.next();
}

export const config = {
  /**
   * Only the root needs inspecting. Skipping Next's internals and static files
   * keeps this off the hot path for every asset request on the whole site.
   */
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
