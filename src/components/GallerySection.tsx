import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import Reveal from "./motion/Reveal";

const SLIDES: CoverflowSlide[] = Array.from({ length: 15 }, (_, i) => ({
  src: `/gallery/design-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Diseño anterior BWV número ${i + 1}`,
}));

export default function GallerySection() {
  return (
    <section id="galeria" className="scroll-mt-24 border-t border-border py-14 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
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
        </Reveal>
      </div>

      <CoverflowCarousel
        slides={SLIDES}
        cardWidth="clamp(180px, 26vw, 340px)"
        cardAspect={4 / 5}
        cardClassName="border border-border bg-surface"
        showNavigation
        showPagination
        label="Galería de diseños anteriores BWV"
      />
    </section>
  );
}
