import { whatsappLink } from "@/data/products";
import { SparkleIcon, ArrowUpRight } from "./Icons";

const MESSAGE =
  "Hola BWV! Tengo una idea para una camiseta personalizada, ¿me ayudan a hacerla realidad?";

export default function CustomDesignSection() {
  return (
    <section className="border-t border-border py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-ink/25 bg-surface px-5 py-11 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--color-ink) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink sm:h-12 sm:w-12">
              <SparkleIcon className="h-5 w-5" />
            </span>

            <p className="mt-4 font-display text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint sm:mt-5">
              Personalización
            </p>
            <h2 className="mt-3 font-display text-[1.75rem] font-black uppercase leading-[1.05] tracking-tight text-ink text-balance sm:text-5xl">
              ¿Tienes una idea? La hacemos realidad.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted sm:mt-5">
              Un diseño, una frase, una foto — lo que tengas en mente.
              Dinos tu idea y nosotros nos encargamos del arte, la
              impresión y la tela, en el mismo algodón peruano de 220g
              de cada colección.
            </p>

            <a
              href={whatsappLink(MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-bg transition-transform duration-200 hover:scale-[1.03] sm:mt-8 sm:px-7"
            >
              Cuéntanos tu idea
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
