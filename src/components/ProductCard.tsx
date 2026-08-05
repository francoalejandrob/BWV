"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { whatsappLink } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";
import type { UiProduct } from "@/lib/catalog";
import { ArrowUpRight, BagIcon, CheckIcon } from "./Icons";

export default function ProductCard({ product }: { product: UiProduct }) {
  const [primary, secondary] = product.images;
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  const availableSizes = useMemo(() => {
    const seen = new Map<string, (typeof product.variants)[number]>();
    for (const variant of product.variants) {
      if (!seen.has(variant.size)) seen.set(variant.size, variant);
    }
    return Array.from(seen.values());
  }, [product.variants]);

  const [size, setSize] = useState(
    () => availableSizes.find((v) => v.stock > 0)?.size ?? availableSizes[0]?.size ?? ""
  );

  const selectedVariant = availableSizes.find((v) => v.size === size);
  const isSoldOut = availableSizes.length === 0 || !selectedVariant || selectedVariant.stock <= 0;
  const color = product.variants[0]?.color;

  const message = `Hola BWV! Me interesa la ${product.name} (${product.collectionName}). ¿Está disponible?`;

  function handleAddToCart() {
    if (isSoldOut) return;
    addItem(
      {
        slug: product.slug,
        name: product.name,
        collectionName: product.collectionName,
        price: product.price,
        images: product.images,
      },
      size
    );
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <article className="group">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface">
        {primary && (
          <Image
            src={primary}
            alt={`Camiseta ${product.name} — BWV, print de espalda`}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
          />
        )}
        {secondary && (
          <Image
            src={secondary}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        )}
        {color && (
          <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink backdrop-blur-sm">
            {color}
          </span>
        )}
        {isSoldOut && (
          <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/60 px-3 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink backdrop-blur-sm">
            Agotado
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-bold uppercase tracking-[0.04em] text-ink">
            {product.name}
          </h3>
          <p className="mt-1 max-w-[26ch] text-sm leading-snug text-ink-muted">
            {product.tagline}
          </p>
        </div>
        <p className="shrink-0 font-display text-base font-bold text-ink">
          ${product.price}
        </p>
      </div>

      {availableSizes.length > 0 && (
        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs font-medium text-ink-faint">Talla</span>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((v) => (
              <button
                key={v.size}
                type="button"
                onClick={() => setSize(v.size)}
                disabled={v.stock <= 0}
                aria-pressed={size === v.size}
                aria-label={v.stock <= 0 ? `Talla ${v.size} agotada` : `Talla ${v.size}`}
                className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full font-display text-xs font-bold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                  size === v.size
                    ? "bg-ink text-bg"
                    : "border border-border text-ink-muted hover:border-ink/50 hover:text-ink"
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isSoldOut}
        className={`mt-4 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.1em] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
          justAdded
            ? "bg-whatsapp text-whatsapp-ink"
            : "bg-ink text-bg hover:scale-[1.02] disabled:hover:scale-100"
        }`}
      >
        {isSoldOut ? (
          "Agotado"
        ) : justAdded ? (
          <>
            <CheckIcon className="h-4 w-4" />
            Agregado al carrito
          </>
        ) : (
          <>
            <BagIcon className="h-4 w-4" />
            Agregar al carrito
          </>
        )}
      </button>

      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex cursor-pointer items-center gap-1.5 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted transition-colors duration-200 hover:text-ink"
      >
        Consultar disponibilidad
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </article>
  );
}
