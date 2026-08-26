"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { portfolioAlt } from "@/lib/portfolio-alt";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const RAW_ITEMS = [
  { src: "/work/sakura-island-2.png", title: "Сакура-остров", category: "build" as const },
  { src: "/work/medieval-town-2.png", title: "Средневековый город", category: "map" as const },
  { src: "/work/duckworld.png", title: "DuckWorld", category: "server" as const },
  { src: "/work/floating-treehouse.png", title: "Парящий остров", category: "map" as const },
  { src: "/work/tropical-island-2.png", title: "Тропический остров", category: "map" as const },
];

const CARD_VW = 60;
const GAP_VW = 4;
const TOTAL_VW = RAW_ITEMS.length * CARD_VW + (RAW_ITEMS.length - 1) * GAP_VW;

export function HorizontalScrollGallery({ locale = "ru" }: { locale?: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${TOTAL_VW - 100}vw`],
  );

  const t = HOME_COPY[locale].gallery;
  const categoryLabels = HOME_COPY[locale].categoryLabels;
  const items = RAW_ITEMS.map((item) => ({
    ...item,
    categoryLabel: categoryLabels[item.category],
  }));

  return (
    <section className="relative bg-background">
      <div className="px-6 pt-28 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
            {t.eyebrow}
          </div>
          <h2 className="max-w-xl font-display text-4xl font-medium sm:text-[44px]">
            {t.title}
          </h2>
        </div>
      </div>

      {/* Desktop: pinned horizontal scroll */}
      <div ref={containerRef} className="relative hidden h-[300vh] md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            style={{ x, gap: `${GAP_VW}vw` }}
            className="flex pl-[8vw]"
          >
            {items.map((item) => (
              <div
                key={item.src}
                style={{ width: `${CARD_VW}vw` }}
                className="relative h-[64vh] shrink-0 overflow-hidden rounded-3xl border border-white/10"
              >
                <Image
                  src={item.src}
                  alt={portfolioAlt(item.title, item.categoryLabel, locale)}
                  fill
                  sizes="60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-7">
                  <div className="mb-1 font-mono text-xs tracking-widest text-accent uppercase">
                    {item.categoryLabel}
                  </div>
                  <h3 className="font-display text-2xl font-medium">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile: regular vertical stack, no scroll-jacking */}
      <div className="flex flex-col gap-4 px-6 pb-20 md:hidden">
        {items.map((item) => (
          <div
            key={item.src}
            className="relative h-[50vh] overflow-hidden rounded-3xl border border-white/10"
          >
            <Image
              src={item.src}
              alt={portfolioAlt(item.title, item.categoryLabel, locale)}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-6">
              <div className="mb-1 font-mono text-xs tracking-widest text-accent uppercase">
                {item.categoryLabel}
              </div>
              <h3 className="font-display text-xl font-medium">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
