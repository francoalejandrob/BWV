import Image from "next/image";
import { ArrowUpRight, InstagramIcon } from "./Icons";

const STATS = [
  { value: "2026", label: "Fundada en Salinas, Ecuador" },
  { value: "100%", label: "Algodón peruano" },
  { value: "220g", label: "Gramaje premium" },
];

export default function AboutSection() {
  return (
    <section id="nosotros" className="scroll-mt-24 border-t border-border py-14 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface lg:order-1">
            <Image
              src="/brand/sobre-nosotros.png"
              alt="Clienta BWV con camiseta oversize de print trasero"
              fill
              sizes="(max-width: 1024px) 92vw, 45vw"
              className="object-cover object-[62%_center]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16">
              <Image
                src="/brand/logo-wordmark.png"
                alt="Born With Vision"
                width={398}
                height={38}
                className="h-3.5 w-auto opacity-90"
              />
            </div>
          </div>

          <div className="lg:order-2">
            <p className="mb-3 flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint">
              <span>04</span>
              <span className="h-px w-8 bg-ink-faint" />
              Sobre nosotros
            </p>
            <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink text-balance sm:text-5xl">
              Nacimos en Ecuador.
              <br />
              Vestimos con propósito.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:mt-6">
              BWV™ nació en Salinas, Ecuador, en 2026, de la idea de que la
              ropa debería sentirse tan personal como quien la usa. Diseñamos
              cada pieza nosotros mismos y trabajamos también camisetas
              personalizadas, cortadas y confeccionadas en algodón 100%
              peruano de 220 gramos — pesado, duradero, con la caída que un
              buen oversize necesita. Nada de producción masiva: cada tanda
              se hace pensando en quien la va a llevar puesta.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-7 sm:mt-10 sm:gap-6 sm:pt-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-xl font-black text-ink sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-ink-faint">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="https://www.instagram.com/born.with.vision/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex cursor-pointer items-center gap-2 py-2 font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted transition-colors duration-200 hover:text-ink sm:mt-10"
            >
              <InstagramIcon className="h-4 w-4" />
              Síguenos @born.with.vision
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
