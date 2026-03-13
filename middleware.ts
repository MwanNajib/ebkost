import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "ADMIN";

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isSignInPage = nextUrl.pathname === "/signin";

  // Jika sudah login dan mencoba akses halaman signin, redirect ke home
  if (isLoggedIn && isSignInPage) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // Proteksi route admin - hanya ADMIN yang bisa akses
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/signin", nextUrl));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/unauthorized", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/signin"],
};
