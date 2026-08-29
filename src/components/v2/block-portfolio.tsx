"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { PORTFOLIO_ITEMS, getFeaturedPortfolio } from "@/lib/portfolio-data";
import { portfolioAlt } from "@/lib/portfolio-alt";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";
import { BASE_PATH } from "@/lib/base-path";

const COLS = 6;
const ROWS = 5;
const BLOCKS = COLS * ROWS;
const SPREAD_MS = 700;

// Детерминированный псевдослучайный порядок исчезновения блоков.
// Math.random() здесь нельзя: сервер и клиент дали бы разные значения
// и React сообщил бы о рассинхроне гидратации.
function blockDelay(index: number) {
  const x = Math.sin(index * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * SPREAD_MS;
}

function BlockRevealCard({
  src,
  alt,
  categoryLabel,
  title,
}: {
  src: string;
  alt: string;
  categoryLabel: string;
  title: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <div
      ref={ref}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-surface"
    >
      <Image
        src={`${BASE_PATH}${src}`}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Блоки, из которых «собирается» картинка */}
      <div
        className="pointer-events-none absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
        aria-hidden
      >
        {Array.from({ length: BLOCKS }).map((_, i) => (
          <span
            key={i}
            className="bg-background transition-opacity duration-500 ease-out"
            style={{
              opacity: inView ? 0 : 1,
              transitionDelay: `${blockDelay(i)}ms`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
      <div className="absolute right-0 bottom-0 left-0 p-5">
        <div className="mb-1 font-mono text-[10px] tracking-widest text-brand uppercase">{categoryLabel}</div>
        <h3 className="font-display text-base font-medium">{title}</h3>
      </div>
    </div>
  );
}

export function BlockPortfolio({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].portfolioGrid;
  const categoryLabels = HOME_COPY[locale].categoryLabels;
  const [expanded, setExpanded] = useState(false);
  const works = expanded ? PORTFOLIO_ITEMS : getFeaturedPortfolio(3);

  return (
    <section id="portfolio" className="relative bg-background px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-brand uppercase">{t.eyebrow}</div>
          <h2 className="font-display text-4xl font-medium sm:text-[44px]">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <BlockRevealCard
              key={work.slug}
              src={work.src}
              alt={portfolioAlt(work.title[locale], categoryLabels[work.category], locale)}
              categoryLabel={categoryLabels[work.category]}
              title={work.title[locale]}
            />
          ))}
        </div>

        {!expanded && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="flex items-center gap-1.5 rounded-[10px] border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/25"
            >
              {t.allLabel}
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
