"use client";

import Image from "next/image";
import { useRef } from "react";
import { CloseIcon } from "./Icons";

export const SIZE_GUIDE_DIALOG_ID = "size-guide-modal";

const rows = [
  { talla: "S", a: "70", b: "55", c: "18", d: "25" },
  { talla: "M", a: "73", b: "57", c: "19.5", d: "26" },
  { talla: "L", a: "77", b: "60", c: "21", d: "27" },
];

export default function SizeGuideModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function close() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      id={SIZE_GUIDE_DIALOG_ID}
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className="m-auto w-[min(92vw,42rem)] max-h-[88vh] overflow-y-auto rounded-2xl border border-border bg-surface p-0 text-ink backdrop:bg-black/80 backdrop:backdrop-blur-sm open:animate-in"
      aria-labelledby="size-guide-title"
    >
      <div className="sticky top-0 flex items-center justify-between border-b border-border bg-surface px-5 py-4 sm:px-8">
        <h2
          id="size-guide-title"
          className="font-display text-sm font-bold uppercase tracking-[0.15em] text-ink"
        >
          Guía de tallas
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar guía de tallas"
          className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors duration-200 hover:bg-surface-2 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="px-5 py-6 sm:px-8">
        <p className="mb-5 text-sm leading-relaxed text-ink-muted">
          Todas las prendas BWV™ son{" "}
          <span className="text-ink">oversize fit</span>. Medidas en
          centímetros, prenda extendida sobre superficie plana.
        </p>

        <div className="mb-6 overflow-hidden rounded-xl border border-border">
          <div className="relative aspect-[3/2] w-full bg-surface-2">
            <Image
              src="/guides/size-guide.jpg"
              alt="Diagrama de medidas: A largo total, B ancho de pecho, C largo de hombro, D largo de manga"
              fill
              sizes="(max-width: 640px) 92vw, 42rem"
              className="object-contain"
            />
          </div>
        </div>

        {/* Mobile: stacked cards, no horizontal scroll needed */}
        <div className="grid grid-cols-1 gap-3 sm:hidden">
          {rows.map((row) => (
            <div key={row.talla} className="rounded-xl border border-border p-4">
              <p className="font-display text-sm font-bold text-ink">
                Talla {row.talla}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                <div>
                  <p className="text-xs text-ink-faint">A · Largo</p>
                  <p className="text-ink-muted">{row.a} cm</p>
                </div>
                <div>
                  <p className="text-xs text-ink-faint">B · Pecho</p>
                  <p className="text-ink-muted">{row.b} cm</p>
                </div>
                <div>
                  <p className="text-xs text-ink-faint">C · Hombro</p>
                  <p className="text-ink-muted">{row.c} cm</p>
                </div>
                <div>
                  <p className="text-xs text-ink-faint">D · Manga</p>
                  <p className="text-ink-muted">{row.d} cm</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet and up: full table */}
        <div className="hidden overflow-x-auto rounded-xl border border-border sm:block">
          <table className="w-full min-w-[26rem] border-collapse text-sm">
            <thead>
              <tr className="bg-surface-2 text-left text-xs uppercase tracking-wider text-ink-muted">
                <th scope="col" className="px-4 py-3 font-medium">
                  Talla
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  A · Largo
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  B · Pecho
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  C · Hombro
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  D · Manga
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.talla} className="border-t border-border">
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">
                    {row.talla}
                  </th>
                  <td className="px-4 py-3 text-ink-muted">{row.a} cm</td>
                  <td className="px-4 py-3 text-ink-muted">{row.b} cm</td>
                  <td className="px-4 py-3 text-ink-muted">{row.c} cm</td>
                  <td className="px-4 py-3 text-ink-muted">{row.d} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-ink-faint">
          ¿Dudas sobre qué talla elegir? Escríbenos por WhatsApp y te
          asesoramos antes de comprar.
        </p>
      </div>
    </dialog>
  );
}

export function openSizeGuide() {
  const el = document.getElementById(
    SIZE_GUIDE_DIALOG_ID
  ) as HTMLDialogElement | null;
  el?.showModal();
}
