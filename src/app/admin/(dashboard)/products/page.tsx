import { supabaseAdmin } from "@/lib/supabase/server";
import ProductsTable, { type ProductRow } from "@/components/admin/products/ProductsTable";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const supabase = supabaseAdmin();

  const { data: products } = await supabase
    .from("products")
    .select(
      "id, name, slug, price, active, collections(name), product_images(url, sort_order), product_variants(stock)"
    )
    .order("sort_order", { ascending: true });

  const rows: ProductRow[] = (products ?? []).map((p) => {
    const images = (p.product_images ?? []) as { url: string; sort_order: number }[];
    const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order);
    const variants = (p.product_variants ?? []) as { stock: number }[];

    return {
      id: p.id as string,
      name: p.name as string,
      slug: p.slug as string,
      price: Number(p.price),
      active: p.active as boolean,
      collectionName: (p.collections as { name: string } | null)?.name ?? "—",
      thumbnail: sortedImages[0]?.url ?? null,
      totalStock: variants.reduce((sum, v) => sum + (v.stock ?? 0), 0),
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Productos</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Gestiona precios, tallas, colores, inventario y fotos.
        </p>
      </div>

      <ProductsTable products={rows} />
    </div>
  );
}
