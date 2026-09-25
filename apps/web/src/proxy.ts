import { defaults, nosecone } from "@nosecone/next";
import type { NextRequest } from "next/server";
/**
 * Remove `export const config` to ensures the headers are applied to all requests
 * NOTE: should opt-out of static generation for this to work
 */
const securityOptions = {
  ...defaults,
  // disabled because we depend on iconify, next-themes, etc...
  contentSecurityPolicy: false,
  /**
   * COEP `require-corp` blocks cross-origin subresources that carry no CORP/CORS
   * headers, which breaks local dev tooling injected from another origin.
   * Production keeps the default.
   */
  crossOriginEmbedderPolicy: process.env.NODE_ENV !== "development",
};

const REQUEST_ID_HEADER = "x-request-id";

/**
 * Middleware allows you to run code before a request is completed.
 * Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.
 * Middleware runs before cached content and ANY routes are matched.
 *
 * Make sure middleware runs FAST, try to use it for:
 * - Security headers
 * - Basic redirects based on URL patterns
 * - Geolocation-based routing
 * - Simple request/response modifications
 *
 * Other than that, use RSC to make it SECURE:
 * - Authentication validation
 * - Database queries
 * - Complex business logic
 * - Third-party integrations
 */
const proxy = async (request: NextRequest) => {
  // Generate or reuse request ID
  const existingId = request.headers.get(REQUEST_ID_HEADER);
  const requestId = existingId || crypto.randomUUID();
  // Forward modified headers to the route handler
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(REQUEST_ID_HEADER, requestId);
  requestHeaders.set("x-evlog-start", String(Date.now()));
  const { NextResponse: nextResponse } = await import("next/server");
  const response = nextResponse.next({
    request: { headers: requestHeaders },
  });
  // Also set on response for downstream consumers
  response.headers.set(REQUEST_ID_HEADER, requestId);
  // Apply the security headers to the same response, so the forwarded request
  // headers and the request ID are kept
  for (const [name, value] of nosecone(securityOptions)) {
    response.headers.set(name, value);
  }
  return response;
};
export default proxy;
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico, sitemap.xml, robots.txt (metadata files)
   */
  matcher: [
    "/((?!api|_next/static|_next/image|ingest|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|sitemap.xml|robots.txt).*)",
  ],
};
