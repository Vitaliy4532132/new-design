import { ShoppingBag } from "lucide-react";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

// TODO: проверить точные URL карточек FurryNick/FurryChat на thefurry.store

export function ProductsShelf({
  filter,
  title,
  locale = "ru",
}: {
  filter?: "plugin" | "build";
  title?: string;
  locale?: Locale;
}) {
  const t = HOME_COPY[locale].products;
  const products = filter ? t.items.filter((p) => p.kind === filter) : t.items;
  const heading = title ?? t.defaultTitle;

  return (
    <section className="relative bg-background px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-lg">
            <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
              {t.eyebrow}
            </div>
            <h2 className="font-display text-4xl font-medium sm:text-[44px]">
              {heading}
            </h2>
          </div>
          <p className="max-w-xs text-sm text-text-muted">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <a
              key={p.title}
              href={`https://www.thefurry.store/shop/${p.slug}?utm_source=landing&utm_medium=cta`}
              target="_blank"
              rel="noopener"
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <div>
                <div className="mb-4 font-mono text-[10px] tracking-widest text-green-400 uppercase">
                  {t.typeLabels[p.kind]}
                </div>
                <h3 className="mb-2 font-display text-lg font-medium">
                  {p.title}
                </h3>
                <p className="mb-6 min-h-10 text-sm leading-relaxed text-text-muted">
                  {p.description}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-display text-lg font-medium">
                  {p.price}
                </span>
                <span className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 font-sans text-[13px] font-bold text-background transition-transform group-hover:scale-105">
                  <ShoppingBag size={14} />
                  {t.buyLabel}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
