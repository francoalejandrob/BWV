"use server";

import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/dal";
import { supabaseAdmin } from "@/lib/supabase/server";

export type CollectionFormState = { error?: string } | undefined;

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createCollection(
  _prev: CollectionFormState,
  formData: FormData
): Promise<CollectionFormState> {
  await verifyAdminSession();

  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  if (!name) return { error: "El nombre es obligatorio." };

  const slug = slugify(slugInput || name);
  if (!slug) return { error: "El slug no es válido." };

  const { error } = await supabaseAdmin().from("collections").insert({
    name,
    slug,
    description,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
  });

  if (error) {
    return {
      error: error.code === "23505" ? "Ya existe una colección con ese slug." : error.message,
    };
  }

  revalidatePath("/admin/collections");
  revalidatePath("/");
}

export async function updateCollection(
  _prev: CollectionFormState,
  formData: FormData
): Promise<CollectionFormState> {
  await verifyAdminSession();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  if (!id) return { error: "Falta el identificador de la colección." };
  if (!name) return { error: "El nombre es obligatorio." };

  const slug = slugify(slugInput || name);
  if (!slug) return { error: "El slug no es válido." };

  const { error } = await supabaseAdmin()
    .from("collections")
    .update({
      name,
      slug,
      description,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    })
    .eq("id", id);

  if (error) {
    return {
      error: error.code === "23505" ? "Ya existe una colección con ese slug." : error.message,
    };
  }

  revalidatePath("/admin/collections");
  revalidatePath("/");
}

export async function deleteCollection(
  id: string
): Promise<{ error?: string }> {
  await verifyAdminSession();

  const { count } = await supabaseAdmin()
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("collection_id", id);

  if (count && count > 0) {
    return {
      error: `No se puede eliminar: esta colección tiene ${count} producto(s). Muévelos o elimínalos primero.`,
    };
  }

  const { error } = await supabaseAdmin().from("collections").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/collections");
  revalidatePath("/");
  return {};
}
