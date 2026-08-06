import Image from "next/image";
import { ArrowUpRight } from "./Icons";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-bg"
    >
      <Image
        src="/brand/banner.png"
        alt="Dos personas de espaldas con camisetas oversize de print trasero en Times Square, de noche"
        fill
        preload
        sizes="100vw"
        className="object-cover object-[56%_55%]"
      />
      <div aria-hidden className="absolute inset-0 bg-black/40" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-transparent"
      />

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 pt-24 sm:pt-20">
        <h1 className="w-full max-w-3xl text-center font-display font-black uppercase leading-tight tracking-tight text-ink text-balance text-[clamp(1.75rem,6.5vw,5rem)]">
          Born With Vision
        </h1>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-6 px-5 pb-10 sm:px-8 sm:pb-14">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted sm:tracking-[0.35em]">
          Salinas, Ecuador
          <br />
          Est. 2026
        </p>
        <a
          href="#originals"
          className="group inline-flex shrink-0 items-center gap-1.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-ink sm:text-base"
        >
          Ver catálogo
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
