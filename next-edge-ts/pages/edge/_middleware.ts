import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const country = request.geo.country?.toLowerCase() || "us";

  console.log({
    id: request.ip,
    geo: request.geo,
    ua: request.ua,
  });

  // Rewrite to static cashed page for each locale
  return NextResponse.rewrite(`/edge/${country}`);

  // return new Response(`Hello from ${country}`);
}
