import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";
import { ADMIN_SESSION_COOKIE } from "@/lib/session";

// Optimistic check only (cookie read + JWT verify, no DB call) so it stays
// fast on every request. The real gate is `verifyAdminSession()` in
// src/lib/dal.ts, called from every admin Server Component/Action.
export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const session = await decrypt(token);
  const isAuthed = Boolean(session?.admin);

  if (pathname === "/admin/login") {
    if (isAuthed) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && !isAuthed) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
