import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/portal", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  //   if (pathname.startsWith("/login") && token) {
  //     return NextResponse.redirect(new URL("/portal", request.url));
  //   }

  //   if (pathname.startsWith("/portal") && !token) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }

  return NextResponse.next();
}

// Tentukan halaman mana saja yang akan diproses oleh middleware ini
export const config = {
  matcher: ["/", "/login", "/portal/:path*"],
};
