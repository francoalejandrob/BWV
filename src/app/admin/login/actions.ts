"use server";

import { redirect } from "next/navigation";
import { createAdminSession } from "@/lib/session";

export type LoginState = { error?: string } | undefined;

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length === 0) {
    return { error: "Ingresa la contraseña." };
  }

  if (!process.env.ADMIN_PASSWORD) {
    return { error: "El panel no está configurado (falta ADMIN_PASSWORD)." };
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Contraseña incorrecta." };
  }

  await createAdminSession();
  redirect("/admin");
}
