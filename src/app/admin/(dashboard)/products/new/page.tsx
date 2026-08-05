import { supabaseAdmin } from "@/lib/supabase/server";
import NewProductForm from "@/components/admin/products/NewProductForm";
import type { Collection } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const { data: collections } = await supabaseAdmin()
    .from("collections")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="flex max-w-lg flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Nuevo producto</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Después de crearlo podrás agregar fotos, tallas y colores.
        </p>
      </div>

      <NewProductForm collections={(collections ?? []) as Collection[]} />
    </div>
  );
}
