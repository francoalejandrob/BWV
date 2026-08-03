import Image from "next/image";
import { whatsappLink } from "@/data/products";
import { ShieldCheckIcon } from "./Icons";

export default function ShippingTrustSection() {
  return (
    <section
      id="contacto"
      className="relative scroll-mt-24 overflow-hidden border-t border-border py-20 sm:py-28"
    >
      <Image
        src="/products/rebel/vision-2.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-top opacity-30 blur-2xl scale-110"
      />
      <div aria-hidden className="absolute inset-0 bg-bg/80" />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-5 text-center sm:px-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 bg-surface text-ink">
          <ShieldCheckIcon className="h-5 w-5" />
        </span>

        <p className="mt-5 font-display text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint">
          Compra con confianza
        </p>
        <h2 className="mt-3 font-display text-3xl font-black uppercase leading-[1.02] tracking-tight text-ink text-balance sm:text-5xl">
          Envío seguro
        </h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted">
          Cada pedido se confirma por WhatsApp antes de despacharse — talla,
          dirección y forma de pago, todo claro desde el inicio. Te
          compartimos el número de guía y le hacemos seguimiento hasta que
          la prenda llega a tus manos. Si algo no sale como debería, lo
          resolvemos directo contigo, sin vueltas.
        </p>

        <a
          href={whatsappLink("Hola BWV! Tengo una duda sobre el envío de mi pedido.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted underline decoration-ink-faint underline-offset-4 transition-colors duration-200 hover:text-ink"
        >
          ¿Dudas sobre tu envío? Escríbenos
        </a>
      </div>
    </section>
  );
}
