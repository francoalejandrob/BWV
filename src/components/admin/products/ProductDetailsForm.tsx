"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProduct, type ProductFormState } from "@/app/admin/(dashboard)/products/actions";
import type { Collection, Product } from "@/lib/supabase/types";

export default function ProductDetailsForm({
  product,
  collections,
}: {
  product: Product;
  collections: Collection[];
}) {
  const [state, formAction, pending] = useActionState<ProductFormState, FormData>(
    updateProduct,
    undefined
  );

  return (
    <Card className="border-border bg-surface">
      <CardHeader>
        <CardTitle className="text-ink">Detalles</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={product.id} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" required defaultValue={product.name} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={product.slug} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tagline">Descripción corta</Label>
            <Textarea id="tagline" name="tagline" rows={2} defaultValue={product.tagline} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Precio (USD)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                defaultValue={product.price}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="collection_id">Colección</Label>
              <select
                id="collection_id"
                name="collection_id"
                required
                defaultValue={product.collection_id}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-ink outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {collections.map((c) => (
                  <option key={c.id} value={c.id} className="bg-surface">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-ink-muted">
            <input
              type="checkbox"
              name="active"
              defaultChecked={product.active}
              className="h-4 w-4"
            />
            Visible en el sitio
          </label>

          {state?.error && (
            <p role="alert" className="text-sm text-destructive">
              {state.error}
            </p>
          )}

          <div>
            <Button type="submit" disabled={pending}>
              {pending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
