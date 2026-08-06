"use client";

import Image from "next/image";
import { InstagramIcon, WhatsAppIcon, RulerIcon } from "./Icons";
import { openSizeGuide } from "./SizeGuideModal";
import { whatsappLink } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-10">
          <div>
            <Image
              src="/brand/logo-wordmark.png"
              alt="Born With Vision"
              width={398}
              height={38}
              className="h-4 w-auto"
            />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              Ropa personalizada, oversize fit. Salinas, Ecuador — desde
              2026.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:flex sm:gap-16">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
                Colecciones
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
                <li>
                  <a href="#originals" className="transition-colors duration-200 hover:text-ink">
                    Originals
                  </a>
                </li>
                <li>
                  <a href="#rebels" className="transition-colors duration-200 hover:text-ink">
                    Rebels
                  </a>
                </li>
                <li>
                  <a href="#galeria" className="transition-colors duration-200 hover:text-ink">
                    Galería
                  </a>
                </li>
                <li>
                  <a href="#nosotros" className="transition-colors duration-200 hover:text-ink">
                    Nosotros
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
                Ayuda
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
                <li>
                  <button
                    type="button"
                    onClick={openSizeGuide}
                    className="-my-1 flex cursor-pointer items-center gap-1.5 py-1 text-left transition-colors duration-200 hover:text-ink"
                  >
                    <RulerIcon className="h-3.5 w-3.5" />
                    Guía de tallas
                  </button>
                </li>
                <li>
                  <a
                    href="/guides/guia-de-cuidado.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-ink"
                  >
                    Guía de cuidado
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink("Hola BWV! Tengo una consulta.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-ink"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Síguenos
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.instagram.com/born.with.vision/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BWV en Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink-muted transition-colors duration-200 hover:border-ink hover:text-ink"
              >
                <InstagramIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href={whatsappLink("Hola BWV! Tengo una consulta.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink-muted transition-colors duration-200 hover:border-ink hover:text-ink"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} BWV™ — Born With Vision. Todos los derechos reservados.</p>
          <p>$25 por prenda + envío · Pagos y envíos se coordinan por WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
