import { whatsappLink } from "@/data/products";
import { WhatsAppIcon, ArrowUpRight } from "./Icons";

const MESSAGE =
  "Hola BWV! No vi lo que quería en la página — ¿me pasas el catálogo completo y opciones de personalización?";

export default function WhatsAppSection() {
  return (
    <section
      id="contacto"
      className="scroll-mt-24 border-t border-border bg-surface py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint">
          ¿No encontraste lo que buscas?
        </p>
        <h2 className="font-display text-3xl font-black uppercase leading-[1.05] tracking-tight text-ink text-balance sm:text-5xl">
          Escríbenos al WhatsApp
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-muted">
          Te pasamos el catálogo completo, opciones de personalización y
          resolvemos cualquier duda de precios o tallas. Este es el canal
          para todo lo que no sea un producto ya listo en la página.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href={whatsappLink(MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-whatsapp-ink transition-transform duration-200 hover:scale-[1.03]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chatear con BWV™
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint">
            +593 97 865 1914
          </p>
        </div>
      </div>
    </section>
  );
}
