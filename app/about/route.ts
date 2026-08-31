import { NextResponse } from "next/server";

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/background", request.url), 308);
}

export const dynamic = "force-static";
