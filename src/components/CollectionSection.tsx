import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

export default function CollectionSection({
  id,
  index,
  eyebrow,
  title,
  description,
  products,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint">
              <span>{index}</span>
              <span className="h-px w-8 bg-ink-faint" />
              {eyebrow}
            </p>
            <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl">
              {title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
