import "server-only";
import { supabaseAdmin } from "@/lib/supabase/server";

export type UiVariant = {
  size: string;
  color: string;
  stock: number;
};

export type UiProduct = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  collectionName: string;
  images: string[];
  variants: UiVariant[];
};

export type UiCollection = {
  id: string;
  slug: string;
  name: string;
  description: string;
  products: UiProduct[];
};

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  price: number | string;
  collection_id: string;
  product_images: { url: string; sort_order: number }[] | null;
  product_variants: { size: string; color: string; stock: number }[] | null;
};

export async function getCollectionsWithProducts(): Promise<UiCollection[]> {
  const supabase = supabaseAdmin();

  const { data: collections } = await supabase
    .from("collections")
    .select("id, slug, name, description")
    .order("sort_order", { ascending: true });

  const { data: products } = await supabase
    .from("products")
    .select(
      "id, slug, name, tagline, price, collection_id, product_images(url, sort_order), product_variants(size, color, stock)"
    )
    .eq("active", true)
    .order("sort_order", { ascending: true });

  const productsByCollectionId = new Map<string, UiProduct[]>();

  for (const row of (products ?? []) as ProductRow[]) {
    const images = [...(row.product_images ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((img) => img.url);

    const product: UiProduct = {
      id: row.id,
      slug: row.slug,
      name: row.name,
      tagline: row.tagline ?? "",
      price: Number(row.price),
      collectionName: "",
      images,
      variants: row.product_variants ?? [],
    };

    const list = productsByCollectionId.get(row.collection_id) ?? [];
    list.push(product);
    productsByCollectionId.set(row.collection_id, list);
  }

  return (collections ?? []).map((collection) => {
    const products = productsByCollectionId.get(collection.id) ?? [];
    for (const product of products) {
      product.collectionName = collection.name;
    }
    return {
      id: collection.id,
      slug: collection.slug,
      name: collection.name,
      description: collection.description,
      products,
    };
  });
}

export async function getCollectionBySlug(slug: string) {
  const collections = await getCollectionsWithProducts();
  return collections.find((c) => c.slug === slug) ?? null;
}
