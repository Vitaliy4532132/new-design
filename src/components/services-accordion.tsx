"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

type Tier = { label: string; price: string; description: string };

function TierPicker({
  tiers,
  configureLabel,
  estimateLabel,
}: {
  tiers: Tier[];
  configureLabel: string;
  estimateLabel: string;
}) {
  const [active, setActive] = useState(0);
  const tier = tiers[active];

  return (
    <div className="rounded-2xl border border-white/10 bg-background/60 p-5">
      <div className="mb-3 font-mono text-[11px] tracking-widest text-text-dim uppercase">{configureLabel}</div>
      <div className="mb-5 flex flex-wrap gap-2">
        {tiers.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              i === active
                ? "border-accent bg-accent/10 text-accent"
                : "border-white/10 text-text-muted hover:border-white/25 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mb-1 font-mono text-[11px] tracking-widest text-text-dim uppercase">{estimateLabel}</div>
      <div className="mb-3 font-display text-2xl font-medium text-accent">{tier.price}</div>
      <p className="text-sm leading-relaxed text-text-muted">{tier.description}</p>
    </div>
  );
}

function PriceBadge({ priceLabel, estimateLabel }: { priceLabel: string; estimateLabel: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-background/60 p-5">
      <div className="mb-1 font-mono text-[11px] tracking-widest text-text-dim uppercase">{estimateLabel}</div>
      <div className="font-display text-2xl font-medium text-accent">{priceLabel}</div>
    </div>
  );
}

export function ServicesAccordion({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].services;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="services" className="relative bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">{t.eyebrow}</div>
          <h2 className="font-display text-4xl font-medium sm:text-[44px]">{t.title}</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-surface">
          {t.items.map((service, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={service.title} className={i > 0 ? "border-t border-white/10" : ""}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 px-6 py-6 text-left sm:gap-6 sm:px-8"
                >
                  <span className="font-mono text-sm text-text-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display text-lg font-medium sm:text-xl">{service.title}</span>
                  <span className="hidden max-w-xs flex-1 text-sm text-text-muted md:block">{service.description}</span>
                  <span className="hidden font-mono text-xs text-accent sm:block">{service.priceLabel}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-text-dim transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 px-6 pb-8 sm:px-8 md:grid-cols-[1fr_280px] md:gap-8">
                      <div>
                        <p className="mb-5 text-sm leading-relaxed text-text-muted md:hidden">{service.description}</p>
                        <ul className="mb-6 flex flex-col gap-2.5">
                          {service.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-text-muted">
                              <Check size={14} className="mt-0.5 shrink-0 text-accent" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <Link href={service.href} className="flex items-center gap-1.5 text-sm font-medium text-accent">
                          {t.moreLabel}
                          <ArrowRight size={15} />
                        </Link>
                      </div>

                      {service.tiers ? (
                        <TierPicker tiers={service.tiers} configureLabel={t.configureLabel} estimateLabel={t.estimateLabel} />
                      ) : (
                        <PriceBadge priceLabel={service.priceLabel} estimateLabel={t.estimateLabel} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-text-muted">{t.note}</p>
      </div>
    </section>
  );
}
