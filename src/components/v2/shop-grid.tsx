"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { IsoCube } from "@/components/v2/iso-cube";
import { HOME_COPY } from "@/lib/home-copy";
import { SHOP_PAGE } from "@/lib/page-copy";
import type { Locale } from "@/lib/i18n";

// Цвет блока по типу: зелёный — как трава на острове, фиолетовый — как Kotlin
// в верстаке. Общий язык с остальными секциями сайта.
const KIND_COLOR: Record<"plugin" | "build", string> = {
  plugin: "#7F52FF",
  build: "#6CB33F",
};

// Порядок совпадает с services.items в home-copy.
const SERVICE_COLORS = ["#6CB33F", "#3178C6", "#1BA0E0", "#E76F00", "#7F52FF"];

type Tab = "products" | "services";
type Filter = "all" | "plugin" | "build";

function Pills<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (key: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          onClick={() => onChange(o.key)}
          className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
            value === o.key
              ? "border-accent bg-accent/10 text-accent"
              : "border-white/10 text-text-muted hover:border-white/25 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function ShopGrid({ locale = "ru" }: { locale?: Locale }) {
  const products = HOME_COPY[locale].products;
  const services = HOME_COPY[locale].services;
  const t = SHOP_PAGE[locale];

  const [tab, setTab] = useState<Tab>("products");
  const [filter, setFilter] = useState<Filter>("all");

  const items = filter === "all" ? products.items : products.items.filter((p) => p.kind === filter);

  return (
    <section className="relative bg-background px-5 pb-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Крупный переключатель: товар можно купить сразу, услугу — заказать */}
        <div
          className="mb-8 inline-flex rounded-full border border-white/10 bg-surface p-1"
          role="tablist"
        >
          {(
            [
              { key: "products" as const, label: t.tabProducts },
              { key: "services" as const, label: t.tabServices },
            ]
          ).map((o) => (
            <button
              key={o.key}
              type="button"
              role="tab"
              aria-selected={tab === o.key}
              onClick={() => setTab(o.key)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                tab === o.key
                  ? "bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] text-white shadow-[0_4px_14px_rgba(23,151,255,0.35)]"
                  : "text-text-muted hover:text-white"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        {tab === "products" ? (
          <>
            <div className="mb-10">
              <Pills
                value={filter}
                onChange={setFilter}
                options={[
                  { key: "all" as const, label: t.allLabel },
                  { key: "plugin" as const, label: products.typeLabels.plugin },
                  { key: "build" as const, label: products.typeLabels.build },
                ]}
              />
            </div>

            {items.length === 0 ? (
              <p className="py-16 text-center text-sm text-text-muted">{t.emptyLabel}</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/home/shop/${p.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-accent/40"
                  >
                    <div>
                      <div className="mb-5 flex h-12 items-center">
                        <div className="transition-transform duration-300 group-hover:scale-110">
                          <IsoCube color={KIND_COLOR[p.kind]} size={26} />
                        </div>
                      </div>
                      <div
                        className="mb-3 font-mono text-[10px] tracking-widest uppercase"
                        style={{ color: KIND_COLOR[p.kind] }}
                      >
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
                  </Link>
                ))}
              </div>
            )}

            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-text-muted">{t.note}</p>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.items.map((s, i) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-accent/40"
                >
                  <div>
                    <div className="mb-5 flex h-12 items-center">
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        <IsoCube color={SERVICE_COLORS[i] ?? "#1797FF"} size={26} />
                      </div>
                    </div>
                    <h3 className="mb-2 font-display text-lg font-medium">{s.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-text-muted">{s.description}</p>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {s.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-display text-lg font-medium">{s.priceLabel}</span>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                      {services.moreLabel}
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-text-muted">{t.servicesNote}</p>
          </>
        )}
      </div>
    </section>
  );
}
