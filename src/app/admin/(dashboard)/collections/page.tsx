import { supabaseAdmin } from "@/lib/supabase/server";
import CollectionsTable from "@/components/admin/collections/CollectionsTable";
import type { Collection } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminCollectionsPage() {
  const supabase = supabaseAdmin();

  const { data: collections } = await supabase
    .from("collections")
    .select("*")
    .order("sort_order", { ascending: true });

  const { data: products } = await supabase.from("products").select("id, collection_id");

  const productCounts = new Map<string, number>();
  for (const p of products ?? []) {
    productCounts.set(p.collection_id, (productCounts.get(p.collection_id) ?? 0) + 1);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Colecciones</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Organiza tus productos en colecciones como Originals o Rebels.
        </p>
      </div>

      <CollectionsTable
        collections={(collections ?? []) as Collection[]}
        productCounts={Object.fromEntries(productCounts)}
      />
    </div>
  );
}
