"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { login, type LoginState } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    undefined
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-5">
      <Card className="w-full max-w-sm border-border bg-surface p-2">
        <CardHeader className="items-center pb-2 text-center">
          <Image
            src="/brand/logo-wordmark.png"
            alt="Born With Vision"
            width={398}
            height={38}
            className="mb-3 h-4 w-auto"
          />
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-ink-faint">
            Panel de administración
          </p>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-ink-muted">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoFocus
                required
                autoComplete="current-password"
                className="h-11 border-border bg-bg text-ink"
              />
            </div>

            {state?.error && (
              <p role="alert" className="text-sm text-destructive">
                {state.error}
              </p>
            )}

            <Button
              type="submit"
              disabled={pending}
              className="h-11 w-full bg-ink font-display text-sm font-bold uppercase tracking-[0.1em] text-bg hover:bg-ink/90"
            >
              {pending ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
