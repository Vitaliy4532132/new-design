import Image from "next/image";
import { portfolioAlt } from "@/lib/portfolio-alt";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const RAW_WORKS = [
  { src: "/work/sakura-island-1.png", title: "Сакура-остров", category: "build" as const },
  { src: "/work/medieval-town-1.png", title: "Средневековый город", category: "map" as const },
  { src: "/work/duckworld.png", title: "DuckWorld", category: "server" as const },
  { src: "/work/tropical-island-1.png", title: "Тропический остров", category: "map" as const },
  { src: "/work/floating-treehouse.png", title: "Парящий остров", category: "map" as const },
  { src: "/work/sakura-island-3.png", title: "Сакура-остров, вид сверху", category: "build" as const },
];

export function PortfolioGrid({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].portfolioGrid;
  const categoryLabels = HOME_COPY[locale].categoryLabels;
  const works = RAW_WORKS.map((w) => ({ ...w, categoryLabel: categoryLabels[w.category] }));

  return (
    <section id="portfolio" className="relative bg-background px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
            {t.eyebrow}
          </div>
          <h2 className="font-display text-4xl font-medium sm:text-[44px]">
            {t.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <div
              key={work.src}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-surface"
            >
              <Image
                src={work.src}
                alt={portfolioAlt(work.title, work.categoryLabel, locale)}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute right-0 bottom-0 left-0 p-5">
                <div className="mb-1 font-mono text-[10px] tracking-widest text-accent uppercase">
                  {work.categoryLabel}
                </div>
                <h3 className="font-display text-base font-medium">
                  {work.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
