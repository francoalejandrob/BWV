"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createProduct, type ProductFormState } from "@/app/admin/(dashboard)/products/actions";
import type { Collection } from "@/lib/supabase/types";

export default function NewProductForm({ collections }: { collections: Collection[] }) {
  const [state, formAction, pending] = useActionState<ProductFormState, FormData>(
    createProduct,
    undefined
  );

  return (
    <Card className="border-border bg-surface">
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" required placeholder="Originals" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" placeholder="se genera solo si lo dejas vacío" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tagline">Descripción corta</Label>
            <Textarea id="tagline" name="tagline" rows={2} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Precio (USD)</Label>
            <Input id="price" name="price" type="number" step="0.01" min="0" defaultValue={25} required />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="collection_id">Colección</Label>
            <select
              id="collection_id"
              name="collection_id"
              required
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-ink outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="" className="bg-surface">
                Selecciona una colección
              </option>
              {collections.map((c) => (
                <option key={c.id} value={c.id} className="bg-surface">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-ink-muted">
            <input type="checkbox" name="active" defaultChecked className="h-4 w-4" />
            Visible en el sitio
          </label>

          {state?.error && (
            <p role="alert" className="text-sm text-destructive">
              {state.error}
            </p>
          )}

          <Button type="submit" disabled={pending} className="mt-2">
            {pending ? "Creando..." : "Crear y continuar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
