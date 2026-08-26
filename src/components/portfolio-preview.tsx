"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO_ITEMS, getFeaturedPortfolio } from "@/lib/portfolio-data";
import { portfolioAlt } from "@/lib/portfolio-alt";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";
import { BASE_PATH } from "@/lib/base-path";

export function PortfolioPreview({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].portfolioGrid;
  const categoryLabels = HOME_COPY[locale].categoryLabels;
  const [expanded, setExpanded] = useState(false);
  const works = expanded ? PORTFOLIO_ITEMS : getFeaturedPortfolio(3);

  return (
    <section id="portfolio" className="relative bg-background px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">{t.eyebrow}</div>
          <h2 className="font-display text-4xl font-medium sm:text-[44px]">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => {
            const title = work.title[locale];
            const categoryLabel = categoryLabels[work.category];
            return (
              <div
                key={work.slug}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-surface"
              >
                <Image
                  src={`${BASE_PATH}${work.src}`}
                  alt={portfolioAlt(title, categoryLabel, locale)}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
                <div className="absolute right-0 bottom-0 left-0 p-5">
                  <div className="mb-1 font-mono text-[10px] tracking-widest text-accent uppercase">{categoryLabel}</div>
                  <h3 className="font-display text-base font-medium">{title}</h3>
                </div>
              </div>
            );
          })}
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
