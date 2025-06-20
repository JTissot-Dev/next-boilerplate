import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const guestRoutes = ["/", "/login", "/signup", "/reset-password"];
const authRoutes = [
  "/",
  "/dashboard",
  // add more authenticated routes here
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const truncatePath = "/" + pathname.split("/")[1];

  const sessionCookie = getSessionCookie(request);

  if (guestRoutes.includes(truncatePath)) {
    if (sessionCookie)
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (authRoutes.includes(truncatePath)) {
    if (!sessionCookie)
      return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...guestRoutes, ...authRoutes],
};
