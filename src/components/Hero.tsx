import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-bg"
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
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8 sm:pb-20 lg:pb-24">
        <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.35em] text-ink-muted">
          Salinas, Ecuador · Est. 2026
        </p>
        <h1 className="font-display font-black uppercase leading-[0.88] tracking-tight text-ink text-balance text-[clamp(2.8rem,11vw,8.5rem)]">
          Born
          <br />
          With Vision
        </h1>
        <p className="mt-6 max-w-md font-display text-base font-semibold uppercase tracking-[0.08em] text-ink-muted sm:text-lg">
          Made for you<span className="text-ink-faint">,</span> not for
          everyone.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#originals"
            className="rounded-full bg-ink px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-bg transition-transform duration-200 hover:scale-[1.03]"
          >
            Ver Originals
          </a>
          <a
            href="#rebels"
            className="rounded-full border border-ink/40 px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-ink transition-colors duration-200 hover:border-ink hover:bg-ink/5"
          >
            Ver Rebels
          </a>
        </div>
      </div>
    </section>
  );
}
