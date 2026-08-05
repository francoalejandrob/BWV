"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUp, ArrowDown, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  uploadProductImage,
  deleteProductImage,
  reorderProductImage,
} from "@/app/admin/(dashboard)/products/actions";
import type { ProductImage } from "@/lib/supabase/types";

export default function ImagesManager({
  productId,
  images,
}: {
  productId: string;
  images: ProductImage[];
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleUpload(formData: FormData) {
    setUploading(true);
    setError(null);
    const result = await uploadProductImage(productId, formData);
    if (result?.error) setError(result.error);
    formRef.current?.reset();
    setUploading(false);
  }

  return (
    <Card className="border-border bg-surface">
      <CardHeader>
        <CardTitle className="text-ink">Fotos</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-bg"
              >
                <Image
                  src={image.url}
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                {index === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-ink px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-bg">
                    Principal
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-black/70 p-1">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => reorderProductImage(image.id, productId, "up")}
                      className="cursor-pointer rounded p-1 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Mover antes"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === images.length - 1}
                      onClick={() => reorderProductImage(image.id, productId, "down")}
                      className="cursor-pointer rounded p-1 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Mover después"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteProductImage(image.id, productId)}
                    className="cursor-pointer rounded p-1 text-white transition-colors hover:bg-white/20"
                    aria-label="Eliminar foto"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <form ref={formRef} action={handleUpload} className="flex flex-wrap items-center gap-3">
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            className="text-sm text-ink-muted file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-surface-2 file:px-3 file:py-1.5 file:text-sm file:text-ink"
          />
          <Button type="submit" disabled={uploading} size="sm" className="gap-1.5">
            <Upload className="h-3.5 w-3.5" />
            {uploading ? "Subiendo..." : "Subir foto"}
          </Button>
        </form>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardContent>
    </Card>
  );
}
