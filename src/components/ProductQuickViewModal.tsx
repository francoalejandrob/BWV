"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useQuickView } from "@/context/QuickViewContext";
import { useCart } from "@/context/CartContext";
import { whatsappLink } from "@/lib/whatsapp";
import {
  ArrowUpRight,
  BagIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "./Icons";

export default function ProductQuickViewModal() {
  const { product, isOpen, close } = useQuickView();
  const { addItem } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setActiveImage(0);
      setJustAdded(false);
    }
  }, [isOpen, product?.id]);

  const availableSizes = useMemo(() => {
    if (!product) return [];
    const seen = new Map<string, (typeof product.variants)[number]>();
    for (const variant of product.variants) {
      if (!seen.has(variant.size)) seen.set(variant.size, variant);
    }
    return Array.from(seen.values());
  }, [product]);

  useEffect(() => {
    if (!product) return;
    setSize(availableSizes.find((v) => v.stock > 0)?.size ?? availableSizes[0]?.size ?? "");
  }, [product, availableSizes]);

  if (!product) {
    return (
      <dialog ref={dialogRef} onClose={close} className="m-auto bg-transparent">
        <span />
      </dialog>
    );
  }

  const selectedVariant = availableSizes.find((v) => v.size === size);
  const isSoldOut = availableSizes.length === 0 || !selectedVariant || selectedVariant.stock <= 0;
  const images = product.images.length > 0 ? product.images : [];
  const message = `Hola BWV! Me interesa la ${product.name} (${product.collectionName}). ¿Está disponible?`;

  function handleAddToCart() {
    if (!product || isSoldOut) return;
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
    <dialog
      ref={dialogRef}
      onClose={close}
      onCancel={close}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      aria-labelledby="quickview-title"
      className="m-auto w-[min(94vw,52rem)] max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-surface p-0 text-ink backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Cerrar vista rápida"
        className="absolute right-3 top-3 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black/40 text-ink backdrop-blur-sm transition-colors duration-200 hover:bg-black/60"
      >
        <CloseIcon className="h-5 w-5" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full bg-bg md:aspect-auto">
          {images[activeImage] && (
            <Image
              src={images[activeImage]}
              alt={`Camiseta ${product.name} — BWV`}
              fill
              sizes="(max-width: 768px) 94vw, 26rem"
              className="object-cover"
            />
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setActiveImage((i) => (i - 1 + images.length) % images.length)}
                aria-label="Foto anterior"
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-ink backdrop-blur-sm transition-colors duration-200 hover:bg-black/60"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveImage((i) => (i + 1) % images.length)}
                aria-label="Foto siguiente"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-ink backdrop-blur-sm transition-colors duration-200 hover:bg-black/60"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
              <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    className={`h-1.5 w-5 cursor-pointer rounded-full transition-colors duration-200 ${
                      i === activeImage ? "bg-ink" : "bg-ink/30"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-ink-faint">
            {product.collectionName}
          </p>
          <h2
            id="quickview-title"
            className="mt-2 font-display text-2xl font-bold uppercase tracking-[0.02em] text-ink"
          >
            {product.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{product.tagline}</p>
          <p className="mt-4 font-display text-2xl font-bold text-ink">${product.price}</p>

          {availableSizes.length > 0 && (
            <div className="mt-6">
              <span className="text-xs font-medium text-ink-faint">Talla</span>
              <div className="mt-2 flex flex-wrap gap-2">
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
            className={`mt-6 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.1em] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
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
            className="mt-3 inline-flex cursor-pointer items-center gap-1.5 self-start py-1.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            Consultar disponibilidad
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </dialog>
  );
}
