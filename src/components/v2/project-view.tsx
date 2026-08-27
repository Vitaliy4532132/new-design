"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Copy, Terminal } from "lucide-react";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/portfolio-data";
import { portfolioAlt } from "@/lib/portfolio-alt";
import type { WorkDetail } from "@/lib/portfolio-page";
import { HOME_COPY } from "@/lib/home-copy";
import { BASE_PATH } from "@/lib/base-path";

const LOCALE = "ru" as const;
const CARD = "rounded-2xl border border-white/10 bg-surface";

type Tab = "info" | "config";

function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  function go(next: number) {
    setIndex((next + images.length) % images.length);
  }

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-surface sm:aspect-[2/1]">
        <Image
          src={`${BASE_PATH}${images[index]}`}
          alt={`${alt} — кадр ${index + 1}`}
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover"
          priority
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Предыдущий кадр"
              className="absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/75"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Следующий кадр"
              className="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/75"
            >
              <ChevronRight size={18} />
            </button>

            <span className="absolute right-4 bottom-4 rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Кадр ${i + 1}`}
              className={`relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                i === index ? "border-accent" : "border-white/10 hover:border-white/25"
              }`}
            >
              <Image
                src={`${BASE_PATH}${src}`}
                alt=""
                fill
                sizes="96px"
                className={`object-cover transition-opacity ${i === index ? "opacity-100" : "opacity-60"}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ConfigBlock({ config }: { config: NonNullable<WorkDetail["config"]> }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(config.content);
      setCopied(true);
    } catch {
      // Буфер доступен только по защищённому соединению. Текст и так на
      // экране целиком, так что выделить его можно руками.
    }
  }

  return (
    <div>
      <p className="mb-4 text-sm leading-relaxed text-text-muted">{config.description}</p>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#08080a]">
        <div className="flex items-center gap-2.5 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <Terminal size={14} className="text-text-dim" />
          <span className="font-mono text-[11px] text-text-dim">config</span>
          <button
            type="button"
            onClick={copy}
            className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-white/25"
          >
            {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
            {copied ? "Скопировано" : "Копировать"}
          </button>
        </div>

        {/* Конфиг не переносим, а скроллим — так он читается как файл
            и не растягивает страницу на узком экране. */}
        <pre className="overflow-x-auto px-4 py-4 font-mono text-[11px] leading-relaxed text-text-muted sm:text-xs">
          <code>{config.content}</code>
        </pre>
      </div>
    </div>
  );
}

export function ProjectView({ work, detail }: { work: PortfolioItem; detail: WorkDetail }) {
  const labels = HOME_COPY[LOCALE].categoryLabels;
  const [tab, setTab] = useState<Tab>("info");

  const title = work.title[LOCALE];
  const label = labels[work.category];
  const images = detail.gallery ?? [work.src];
  const hasConfig = Boolean(detail.config);

  const similar = PORTFOLIO_ITEMS.filter(
    (i) => i.slug !== work.slug && i.category === work.category,
  ).slice(0, 3);

  return (
    <section className="px-5 pt-28 pb-20 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/home/portfolio"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-white"
        >
          <ArrowLeft size={15} />
          Все работы
        </Link>

        <div className="mb-3 font-mono text-[10px] tracking-widest text-accent uppercase">{label}</div>
        <h1 className="mb-4 font-display text-3xl font-medium break-words sm:text-4xl">{title}</h1>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
          {detail.description}
        </p>

        <div className="mb-8">
          <Gallery images={images} alt={portfolioAlt(title, label, LOCALE)} />
        </div>

        {/* Цифры проекта */}
        <div className="mb-8 grid grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10">
          {detail.stats.map((s) => (
            <div key={s.label} className="px-4 py-5 text-center">
              <div className="font-display text-xl font-medium sm:text-2xl">{s.value}</div>
              <div className="mt-1 font-mono text-[10px] tracking-wide text-text-dim uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {hasConfig && (
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-surface p-1">
            {(
              [
                { key: "info" as const, label: "О проекте" },
                { key: "config" as const, label: "Конфиг" },
              ]
            ).map((o) => (
              <button
                key={o.key}
                type="button"
                onClick={() => setTab(o.key)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  tab === o.key
                    ? "bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] text-white"
                    : "text-text-muted hover:text-white"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}

        {tab === "config" && detail.config ? (
          <ConfigBlock config={detail.config} />
        ) : (
          <div className="flex flex-col gap-6">
            {detail.full && (
              <div className={`${CARD} p-6`}>
                <div className="flex flex-col gap-4">
                  {detail.full.map((p) => (
                    <p key={p} className="text-sm leading-relaxed text-text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {detail.features && detail.features.length > 0 && (
              <div className={`${CARD} p-6`}>
                <h2 className="mb-5 font-display text-lg font-medium">Что сделали</h2>
                <ul className="flex flex-col gap-2.5">
                  {detail.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <Check size={14} className="mt-0.5 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {detail.results && detail.results.length > 0 && (
              <div className="rounded-2xl border border-accent/25 bg-[linear-gradient(180deg,rgba(10,63,255,0.08),transparent)] p-6">
                <h2 className="mb-5 font-display text-lg font-medium">Результат</h2>
                <ul className="flex flex-col gap-2.5">
                  {detail.results.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {detail.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Похожие работы */}
        {similar.length > 0 && (
          <div className="mt-16 border-t border-white/10 pt-10">
            <h2 className="mb-6 font-display text-xl font-medium">Похожие работы</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {similar.map((s) => (
                <Link
                  key={s.slug}
                  href={`/home/portfolio/${s.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors hover:border-accent/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={`${BASE_PATH}${s.src}`}
                      alt={s.title[LOCALE]}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm font-medium">{s.title[LOCALE]}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
