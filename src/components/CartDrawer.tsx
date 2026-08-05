"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useCart, type CartItem } from "@/context/CartContext";
import { whatsappLink } from "@/lib/whatsapp";
import { BagIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon, WhatsAppIcon, ArrowUpRight } from "./Icons";

function buildOrderMessage(items: CartItem[], subtotal: number) {
  const lines = items.map(
    (item) => `• ${item.qty}x ${item.name} (Talla ${item.size}) — $${item.price * item.qty}`
  );
  return [
    "Hola BWV! Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `Subtotal: $${subtotal} (+ envío a coordinar)`,
    "",
    "¿Me confirman disponibilidad y coordinamos pago y envío?",
  ].join("\n");
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, setQty, subtotal, clear } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={closeCart}
      onCancel={closeCart}
      onClick={(e) => {
        if (e.target === dialogRef.current) closeCart();
      }}
      aria-labelledby="cart-title"
      className="fixed inset-y-0 right-0 m-0 ml-auto h-full max-h-none w-full max-w-full border-0 bg-surface p-0 text-ink sm:w-[26rem] sm:max-w-[92vw] sm:border-l sm:border-border backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <h2
            id="cart-title"
            className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.15em] text-ink"
          >
            <BagIcon className="h-4 w-4" />
            Tu carrito
            {items.length > 0 && (
              <span className="text-ink-faint">
                ({items.reduce((s, i) => s + i.qty, 0)})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors duration-200 hover:bg-surface-2 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <BagIcon className="h-10 w-10 text-ink-faint" />
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink">
                Tu carrito está vacío
              </p>
              <p className="mt-2 max-w-[22ch] text-sm text-ink-muted">
                Agrega alguna pieza de Originals o Rebels para armar tu pedido.
              </p>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 min-h-11 cursor-pointer rounded-full border border-ink/40 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.1em] text-ink transition-colors duration-200 hover:border-ink hover:bg-ink/5"
            >
              Seguir viendo
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
              {items.map((item) => (
                <li
                  key={item.key}
                  className="flex gap-4 border-b border-border py-4 first:pt-0 last:border-b-0"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-bg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-sm font-bold uppercase tracking-[0.03em] text-ink">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-xs text-ink-faint">
                          Talla {item.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        aria-label={`Quitar ${item.name} del carrito`}
                        className="-mr-2 -mt-1.5 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-faint transition-colors duration-200 hover:text-ink"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          onClick={() => setQty(item.key, item.qty - 1)}
                          aria-label="Reducir cantidad"
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors duration-200 hover:text-ink"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-4 text-center text-sm font-medium text-ink">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(item.key, item.qty + 1)}
                          aria-label="Aumentar cantidad"
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors duration-200 hover:text-ink"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-display text-sm font-bold text-ink">
                        ${item.price * item.qty}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-muted">Subtotal</span>
                <span className="font-display text-base font-bold text-ink">
                  ${subtotal}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-faint">
                + envío, a coordinar por WhatsApp
              </p>

              <a
                href={whatsappLink(buildOrderMessage(items, subtotal))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-whatsapp-ink transition-transform duration-200 hover:scale-[1.02]"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
                Finalizar pedido por WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={clear}
                className="mt-1 w-full cursor-pointer py-2 text-center text-xs font-medium text-ink-faint transition-colors duration-200 hover:text-ink-muted"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
