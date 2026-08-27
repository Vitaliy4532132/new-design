"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { IsoCube } from "@/components/v2/iso-cube";
import { HOME_COPY } from "@/lib/home-copy";
import { SHOP_PAGE } from "@/lib/page-copy";
import type { Locale } from "@/lib/i18n";

// Цвет блока по типу товара: зелёный — как трава на острове, фиолетовый —
// как Kotlin в верстаке. Общий язык с остальными секциями.
const KIND_COLOR: Record<"plugin" | "build", string> = {
  plugin: "#7F52FF",
  build: "#6CB33F",
};

type Filter = "all" | "plugin" | "build";

export function ShopGrid({ locale = "ru" }: { locale?: Locale }) {
  const products = HOME_COPY[locale].products;
  const t = SHOP_PAGE[locale];
  const [filter, setFilter] = useState<Filter>("all");

  const items = filter === "all" ? products.items : products.items.filter((p) => p.kind === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.allLabel },
    { key: "plugin", label: products.typeLabels.plugin },
    { key: "build", label: products.typeLabels.build },
  ];

  return (
    <section className="relative bg-background px-5 pb-28 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                filter === f.key
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-white/10 text-text-muted hover:border-white/25 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="py-16 text-center text-sm text-text-muted">{t.emptyLabel}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
              <a
                key={p.slug}
                href={`https://www.thefurry.store/shop/${p.slug}?utm_source=landing&utm_medium=cta`}
                target="_blank"
                rel="noopener"
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <div>
                  <div className="mb-5 flex h-12 items-center">
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      <IsoCube color={KIND_COLOR[p.kind]} size={26} />
                    </div>
                  </div>

                  <div className="mb-3 font-mono text-[10px] tracking-widest uppercase" style={{ color: KIND_COLOR[p.kind] }}>
                    {products.typeLabels[p.kind]}
                  </div>
                  <h3 className="mb-2 font-display text-lg font-medium">{p.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-text-muted">{p.description}</p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-display text-lg font-medium">{p.price}</span>
                  <span className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 font-sans text-[13px] font-bold text-background transition-transform group-hover:scale-105">
                    <ShoppingBag size={14} />
                    {products.buyLabel}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-text-muted">{t.note}</p>
      </div>
    </section>
  );
}
