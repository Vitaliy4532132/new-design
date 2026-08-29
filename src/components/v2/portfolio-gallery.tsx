"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";
import { PORTFOLIO_ITEMS, type PortfolioCategory } from "@/lib/portfolio-data";
import { portfolioAlt } from "@/lib/portfolio-alt";
import { CATEGORY_ORDER, PORTFOLIO_PAGE, WORK_DETAILS } from "@/lib/portfolio-page";
import { HOME_COPY } from "@/lib/home-copy";
import { BASE_PATH } from "@/lib/base-path";

const LOCALE = "ru" as const;

type Filter = "all" | PortfolioCategory;

const COLS = 6;
const ROWS = 4;

// Детерминированная задержка: Math.random() дал бы разные значения на сервере
// и в браузере, и React сообщил бы о рассинхроне гидратации.
function blockDelay(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 600;
}

function BlockCover({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div ref={ref} className="absolute inset-0">
      <Image
        src={`${BASE_PATH}${src}`}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className="pointer-events-none absolute inset-0 grid"
        style={{ gridTemplateColumns: `repeat(${COLS},1fr)`, gridTemplateRows: `repeat(${ROWS},1fr)` }}
        aria-hidden
      >
        {Array.from({ length: COLS * ROWS }).map((_, i) => (
          <span
            key={i}
            className="bg-background transition-opacity duration-500 ease-out"
            style={{ opacity: inView ? 0 : 1, transitionDelay: `${blockDelay(i)}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-text-muted">
      {children}
    </span>
  );
}

export function PortfolioGallery() {
  const labels = HOME_COPY[LOCALE].categoryLabels;
  const [filter, setFilter] = useState<Filter>("all");

  const items = filter === "all" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((i) => i.category === filter);
  // Первая избранная работа идёт крупным блоком, остальные — сеткой.
  const featured = items.find((i) => i.featured) ?? items[0];
  const rest = items.filter((i) => i !== featured);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: PORTFOLIO_PAGE.allLabel },
    ...CATEGORY_ORDER.map((c) => ({ key: c as Filter, label: labels[c] })),
  ];

  return (
    <section className="px-5 pb-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                filter === f.key
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-white/10 text-text-muted hover:border-white/25 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {!featured ? (
          <p className="py-16 text-center text-sm text-text-muted">{PORTFOLIO_PAGE.emptyLabel}</p>
        ) : (
          <>
            {/* Главная работа: крупный кадр с описанием поверх */}
            {(() => {
              const detail = WORK_DETAILS[featured.slug];
              const title = featured.title[LOCALE];
              const label = labels[featured.category];

              return (
                <div className="group relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-surface sm:aspect-[2/1]">
                  <BlockCover src={featured.src} alt={portfolioAlt(title, label, LOCALE)} priority />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-8">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-3 py-1 font-mono text-[10px] tracking-wide text-white uppercase">
                        {PORTFOLIO_PAGE.featuredLabel}
                      </span>
                      <span className="font-mono text-[10px] tracking-widest text-brand uppercase">{label}</span>
                    </div>

                    <h2 className="mb-2 font-display text-2xl font-medium sm:text-3xl">{title}</h2>

                    {detail && (
                      <>
                        <p className="mb-4 max-w-xl text-sm leading-relaxed text-text-muted">
                          {detail.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                          {detail.stats.map((s) => (
                            <div key={s.label}>
                              <div className="font-display text-lg font-medium">{s.value}</div>
                              <div className="font-mono text-[10px] tracking-wide text-text-dim uppercase">
                                {s.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Остальные работы */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {rest.map((work) => {
                const detail = WORK_DETAILS[work.slug];
                const title = work.title[LOCALE];
                const label = labels[work.category];

                return (
                  <Link
                    key={work.slug}
                    href={`/home/portfolio/${work.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors hover:border-brand/40"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <BlockCover src={work.src} alt={portfolioAlt(title, label, LOCALE)} />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 font-mono text-[10px] tracking-widest text-brand uppercase">{label}</div>
                      <h3 className="mb-2 font-display text-lg font-medium">{title}</h3>

                      {detail && (
                        <>
                          <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
                            {detail.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {detail.tags.map((t) => (
                              <Tag key={t}>{t}</Tag>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
