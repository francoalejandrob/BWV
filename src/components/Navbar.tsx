"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { InstagramIcon, MenuIcon, CloseIcon, WhatsAppIcon, RulerIcon } from "./Icons";
import { openSizeGuide } from "./SizeGuideModal";
import { whatsappLink } from "@/data/products";

const NAV_LINKS = [
  { href: "#originals", label: "Originals" },
  { href: "#rebels", label: "Rebels" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-3 mt-3 flex items-center justify-between rounded-full border px-4 py-2.5 transition-colors duration-300 sm:mx-6 sm:mt-4 sm:px-6 ${
          scrolled || open
            ? "border-border bg-bg/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="#top" aria-label="BWV — Born With Vision, inicio" className="shrink-0">
          <Image
            src="/brand/logo-wordmark.png"
            alt="Born With Vision"
            width={398}
            height={38}
            preload
            className="h-3.5 w-auto sm:h-4"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={openSizeGuide}
            className="flex cursor-pointer items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            <RulerIcon className="h-3.5 w-3.5" />
            Tallas
          </button>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://www.instagram.com/born.with.vision/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="BWV en Instagram"
            className="text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href={whatsappLink("Hola BWV! Quiero ver el catálogo completo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.1em] text-whatsapp-ink transition-transform duration-200 hover:scale-[1.03]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="flex cursor-pointer items-center justify-center rounded-full p-2 text-ink md:hidden"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="mx-3 mt-2 rounded-3xl border border-border bg-bg/95 p-6 backdrop-blur-md sm:mx-6 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-base font-semibold uppercase tracking-[0.1em] text-ink"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openSizeGuide();
              }}
              className="flex cursor-pointer items-center gap-2 border-b border-border py-4 text-left font-display text-base font-semibold uppercase tracking-[0.1em] text-ink"
            >
              <RulerIcon className="h-4 w-4" />
              Guía de tallas
            </button>
          </nav>
          <div className="mt-5 flex items-center gap-4">
            <a
              href="https://www.instagram.com/born.with.vision/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BWV en Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={whatsappLink("Hola BWV! Quiero ver el catálogo completo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3 font-display text-sm font-bold uppercase tracking-[0.1em] text-whatsapp-ink"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Escríbenos
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
