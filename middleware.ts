// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
  // Apply middleware to ALL routes except API/static files
  matcher: ["/((?!api/|_next/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host");

  // 1. Define your AI content subdomains
  const subdomains = {
    prompts: "/prompts",
    news: "/news",
    tools: "/tools",
  };

  // 2. Extract subdomain (e.g. "prompts" from prompts.futureaidirectory.com)
  const subdomain = host?.split(".")[0];

  // 3. Redirect subdomains to your AI content sections
  if (subdomain && subdomains[subdomain as keyof typeof subdomains]) {
    const path = `${subdomains[subdomain as keyof typeof subdomains]}${url.pathname}`;
    return NextResponse.rewrite(new URL(path, req.url));
  }

  // 4. Default route (futureaidirectory.com)
  return NextResponse.next();
}
