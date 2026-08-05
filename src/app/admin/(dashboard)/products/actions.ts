"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/dal";
import { supabaseAdmin } from "@/lib/supabase/server";

export type ProductFormState = { error?: string } | undefined;

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseProductFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const collectionId = String(formData.get("collection_id") ?? "");
  const active = formData.get("active") === "on";

  return { name, slug: slugify(slugInput || name), tagline, price, collectionId, active };
}

export async function createProduct(
  _prev: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await verifyAdminSession();
  const { name, slug, tagline, price, collectionId, active } = parseProductFields(formData);

  if (!name) return { error: "El nombre es obligatorio." };
  if (!collectionId) return { error: "Selecciona una colección." };
  if (!Number.isFinite(price) || price < 0) return { error: "El precio no es válido." };

  const { data, error } = await supabaseAdmin()
    .from("products")
    .insert({ name, slug, tagline, price, collection_id: collectionId, active })
    .select("id")
    .single();

  if (error) {
    return {
      error: error.code === "23505" ? "Ya existe un producto con ese slug." : error.message,
    };
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect(`/admin/products/${data.id}`);
}

export async function updateProduct(
  _prev: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await verifyAdminSession();
  const id = String(formData.get("id") ?? "");
  const { name, slug, tagline, price, collectionId, active } = parseProductFields(formData);

  if (!id) return { error: "Falta el identificador del producto." };
  if (!name) return { error: "El nombre es obligatorio." };
  if (!collectionId) return { error: "Selecciona una colección." };
  if (!Number.isFinite(price) || price < 0) return { error: "El precio no es válido." };

  const { error } = await supabaseAdmin()
    .from("products")
    .update({ name, slug, tagline, price, collection_id: collectionId, active })
    .eq("id", id);

  if (error) {
    return {
      error: error.code === "23505" ? "Ya existe un producto con ese slug." : error.message,
    };
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
  revalidatePath("/");
}

export async function deleteProduct(id: string): Promise<{ error?: string }> {
  await verifyAdminSession();

  const { data: images } = await supabaseAdmin()
    .from("product_images")
    .select("url")
    .eq("product_id", id);

  const storagePaths = (images ?? [])
    .map((img) => storagePathFromUrl(img.url))
    .filter((p): p is string => Boolean(p));

  if (storagePaths.length > 0) {
    await supabaseAdmin().storage.from("product-images").remove(storagePaths);
  }

  const { error } = await supabaseAdmin().from("products").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/");
  return {};
}

export async function toggleProductActive(id: string, active: boolean) {
  await verifyAdminSession();
  await supabaseAdmin().from("products").update({ active }).eq("id", id);
  revalidatePath("/admin/products");
  revalidatePath("/");
}

// --- Variants ---

export async function addVariant(productId: string, formData: FormData) {
  await verifyAdminSession();
  const size = String(formData.get("size") ?? "").trim();
  const color = String(formData.get("color") ?? "").trim();
  const stock = Number(formData.get("stock") ?? 0);

  if (!size) return { error: "La talla es obligatoria." };

  const { error } = await supabaseAdmin().from("product_variants").insert({
    product_id: productId,
    size,
    color,
    stock: Number.isFinite(stock) ? stock : 0,
  });

  if (error) return { error: error.message };

  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/");
  return {};
}

export async function updateVariant(
  variantId: string,
  productId: string,
  fields: { size?: string; color?: string; stock?: number }
) {
  await verifyAdminSession();
  const { error } = await supabaseAdmin()
    .from("product_variants")
    .update(fields)
    .eq("id", variantId);

  if (error) return { error: error.message };

  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/");
  return {};
}

export async function deleteVariant(variantId: string, productId: string) {
  await verifyAdminSession();
  await supabaseAdmin().from("product_variants").delete().eq("id", variantId);
  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/");
}

// --- Images ---

function storagePathFromUrl(url: string): string | null {
  const marker = "/product-images/";
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

export async function uploadProductImage(productId: string, formData: FormData) {
  await verifyAdminSession();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Selecciona una imagen." };
  }

  const supabase = supabaseAdmin();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${productId}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(path, file, { contentType: file.type || "image/jpeg" });

  if (uploadError) return { error: uploadError.message };

  const { data: publicUrl } = supabase.storage.from("product-images").getPublicUrl(path);

  const { count } = await supabase
    .from("product_images")
    .select("*", { count: "exact", head: true })
    .eq("product_id", productId);

  const { error: insertError } = await supabase.from("product_images").insert({
    product_id: productId,
    url: publicUrl.publicUrl,
    sort_order: count ?? 0,
  });

  if (insertError) return { error: insertError.message };

  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/");
  return {};
}

export async function deleteProductImage(imageId: string, productId: string) {
  await verifyAdminSession();
  const supabase = supabaseAdmin();

  const { data: image } = await supabase
    .from("product_images")
    .select("url")
    .eq("id", imageId)
    .single();

  if (image) {
    const path = storagePathFromUrl(image.url);
    if (path) {
      await supabase.storage.from("product-images").remove([path]);
    }
  }

  await supabase.from("product_images").delete().eq("id", imageId);
  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/");
}

export async function reorderProductImage(
  imageId: string,
  productId: string,
  direction: "up" | "down"
) {
  await verifyAdminSession();
  const supabase = supabaseAdmin();

  const { data: images } = await supabase
    .from("product_images")
    .select("id, sort_order")
    .eq("product_id", productId)
    .order("sort_order", { ascending: true });

  if (!images) return;

  const index = images.findIndex((img) => img.id === imageId);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= images.length) return;

  const current = images[index];
  const swap = images[swapIndex];

  await Promise.all([
    supabase.from("product_images").update({ sort_order: swap.sort_order }).eq("id", current.id),
    supabase.from("product_images").update({ sort_order: current.sort_order }).eq("id", swap.id),
  ]);

  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/");
}
