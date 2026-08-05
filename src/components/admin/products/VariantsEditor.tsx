"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  addVariant,
  updateVariant,
  deleteVariant,
} from "@/app/admin/(dashboard)/products/actions";
import type { ProductVariant } from "@/lib/supabase/types";

export default function VariantsEditor({
  productId,
  variants,
}: {
  productId: string;
  variants: ProductVariant[];
}) {
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(formData: FormData) {
    const result = await addVariant(productId, formData);
    setError(result?.error ?? null);
  }

  async function handleStockChange(variantId: string, stock: number) {
    await updateVariant(variantId, productId, { stock });
  }

  return (
    <Card className="border-border bg-surface">
      <CardHeader>
        <CardTitle className="text-ink">Tallas, colores e inventario</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {variants.length > 0 && (
          <div className="flex flex-col gap-2">
            {variants.map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-3 rounded-lg border border-border px-3 py-2"
              >
                <span className="w-14 font-medium text-ink">{v.size}</span>
                <span className="flex-1 text-sm text-ink-muted">{v.color || "—"}</span>
                <Input
                  key={`${v.id}-${v.stock}`}
                  type="number"
                  min="0"
                  defaultValue={v.stock}
                  className="h-8 w-20"
                  onBlur={(e) => {
                    const value = Number(e.target.value);
                    if (Number.isFinite(value) && value !== v.stock) {
                      handleStockChange(v.id, value);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => deleteVariant(v.id, productId)}
                  className="cursor-pointer p-1.5 text-ink-faint transition-colors hover:text-destructive"
                  aria-label={`Eliminar talla ${v.size}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <form
          action={handleAdd}
          className="flex flex-wrap items-end gap-2 border-t border-border pt-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="size" className="text-xs text-ink-faint">
              Talla
            </label>
            <Input id="size" name="size" placeholder="M" required className="h-8 w-20" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="color" className="text-xs text-ink-faint">
              Color
            </label>
            <Input id="color" name="color" placeholder="Negro" className="h-8 w-28" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="stock" className="text-xs text-ink-faint">
              Stock
            </label>
            <Input id="stock" name="stock" type="number" min="0" defaultValue={10} className="h-8 w-20" />
          </div>
          <Button type="submit" size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Agregar
          </Button>
        </form>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardContent>
    </Card>
  );
}
