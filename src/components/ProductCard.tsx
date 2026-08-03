"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";
import { whatsappLink } from "@/data/products";
import { useCart, type Size } from "@/context/CartContext";
import { ArrowUpRight, BagIcon, CheckIcon } from "./Icons";

const SIZES: Size[] = ["S", "M", "L"];

export default function ProductCard({ product }: { product: Product }) {
  const [primary, secondary] = product.images;
  const [size, setSize] = useState<Size>("M");
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  const message = `Hola BWV! Me interesa la ${product.name}${
    product.collection === "originals" ? " (Originals)" : " (Rebels)"
  }. ¿Está disponible?`;

  function handleAddToCart() {
    addItem(product, size);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <article className="group">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface">
        <Image
          src={primary}
          alt={`Camiseta ${product.name} — BWV, print de espalda`}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
        />
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
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink backdrop-blur-sm">
          {product.color}
        </span>
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

      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs font-medium text-ink-faint">Talla</span>
        <div className="flex gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              aria-label={`Talla ${s}`}
              className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full font-display text-xs font-bold transition-colors duration-200 ${
                size === s
                  ? "bg-ink text-bg"
                  : "border border-border text-ink-muted hover:border-ink/50 hover:text-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className={`mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
          justAdded
            ? "bg-whatsapp text-whatsapp-ink"
            : "bg-ink text-bg hover:scale-[1.02]"
        }`}
      >
        {justAdded ? (
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
        className="mt-3 inline-flex cursor-pointer items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted transition-colors duration-200 hover:text-ink"
      >
        Consultar disponibilidad
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </article>
  );
}
