// src/middleware.ts
import { NextResponse } from "next/server";

export function middleware(req: { nextUrl: { pathname: any; }; }) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // Hanya jalan untuk rute "/api/*"
};
