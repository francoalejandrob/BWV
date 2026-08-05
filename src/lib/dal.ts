import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "./session";

/**
 * Secure check — call this in every admin Server Component and Server
 * Action before reading/writing data. The proxy only does an optimistic
 * cookie check for fast redirects; this is the real gate.
 */
export const verifyAdminSession = cache(async () => {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
});
