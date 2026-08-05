import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import ProductDetailsForm from "@/components/admin/products/ProductDetailsForm";
import VariantsEditor from "@/components/admin/products/VariantsEditor";
import ImagesManager from "@/components/admin/products/ImagesManager";
import type { Collection, Product, ProductImage, ProductVariant } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = supabaseAdmin();

  const [{ data: product }, { data: collections }, { data: images }, { data: variants }] =
    await Promise.all([
      supabase.from("products").select("*").eq("id", id).single(),
      supabase.from("collections").select("*").order("sort_order", { ascending: true }),
      supabase
        .from("product_images")
        .select("*")
        .eq("product_id", id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", id)
        .order("size", { ascending: true }),
    ]);

  if (!product) notFound();

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">{product.name}</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Edita precio, fotos, tallas, colores e inventario.
        </p>
      </div>

      <ProductDetailsForm
        product={product as Product}
        collections={(collections ?? []) as Collection[]}
      />

      <ImagesManager productId={id} images={(images ?? []) as ProductImage[]} />

      <VariantsEditor productId={id} variants={(variants ?? []) as ProductVariant[]} />
    </div>
  );
}
