"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ExpandIcon } from "./Icons";

const IMAGES = Array.from(
  { length: 15 },
  (_, i) => `/gallery/design-${String(i + 1).padStart(2, "0")}.jpg`
);

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeIndex !== null && !dialog.open) dialog.showModal();
    if (activeIndex === null && dialog.open) dialog.close();
  }, [activeIndex]);

  function close() {
    setActiveIndex(null);
  }

  function show(delta: number) {
    setActiveIndex((i) => {
      if (i === null) return i;
      return (i + delta + IMAGES.length) % IMAGES.length;
    });
  }

  return (
    <section
      id="galeria"
      className="scroll-mt-24 border-t border-border py-14 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2.5 flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.25em] text-ink-faint sm:mb-3 sm:tracking-[0.3em]">
              <span>03</span>
              <span className="h-px w-8 bg-ink-faint" />
              Nuestro archivo
            </p>
            <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl">
              Galería
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
            Algunos de los diseños que hemos hecho. Si te gusta alguno o
            quieres algo parecido, cuéntanos tu idea.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {IMAGES.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Ver diseño ${i + 1} en grande`}
              className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <Image
                src={src}
                alt={`Diseño anterior BWV número ${i + 1}`}
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 18vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/0 font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink opacity-0 transition-all duration-200 group-hover:bg-black/40 group-hover:opacity-100"
              >
                <ExpandIcon className="h-3.5 w-3.5" />
                Ver
              </span>
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={close}
        onCancel={close}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        aria-label="Diseño en grande"
        className="m-auto w-[min(92vw,34rem)] max-h-[90vh] overflow-hidden rounded-2xl border border-border bg-surface p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {activeIndex !== null && (
          <div className="relative aspect-[4/5] w-full bg-bg">
            <Image
              src={IMAGES[activeIndex]}
              alt={`Diseño anterior BWV número ${activeIndex + 1}`}
              fill
              sizes="34rem"
              className="object-cover"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-3 top-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black/40 text-ink backdrop-blur-sm transition-colors duration-200 hover:bg-black/60"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => show(-1)}
              aria-label="Diseño anterior"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-ink backdrop-blur-sm transition-colors duration-200 hover:bg-black/60"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => show(1)}
              aria-label="Siguiente diseño"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-ink backdrop-blur-sm transition-colors duration-200 hover:bg-black/60"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-display text-[0.65rem] font-semibold text-ink backdrop-blur-sm">
              {activeIndex + 1} / {IMAGES.length}
            </span>
          </div>
        )}
      </dialog>
    </section>
  );
}
