"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, ShoppingBag, Star, X } from "lucide-react";
import { TELEGRAM_URL } from "@/lib/links";
import { BASE_PATH } from "@/lib/base-path";
import type { ProductDetail } from "@/lib/product-data";

type Product = {
  slug: string;
  title: string;
  description: string;
  price: string;
  kind: "plugin" | "build";
};

const KIND_COLOR: Record<"plugin" | "build", string> = {
  plugin: "#7F52FF",
  build: "#6CB33F",
};

function Countdown({ until }: { until: string }) {
  const [left, setLeft] = useState<string | null>(null);

  useEffect(() => {
    function tick() {
      const ms = new Date(until).getTime() - Date.now();
      if (ms <= 0) {
        setLeft(null);
        return;
      }
      const h = Math.floor(ms / 3_600_000);
      const m = Math.floor((ms % 3_600_000) / 60_000);
      const s = Math.floor((ms % 60_000) / 1000);
      setLeft(`${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [until]);

  if (!left) return null;
  return <span className="font-mono text-xs text-accent">{left}</span>;
}

function BuyModal({ product, version, onClose }: { product: Product; version: string; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-surface p-7 shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
      >
        <div className="mb-5 flex items-start justify-between">
          <h3 className="font-display text-xl font-medium">Оформление</h3>
          <button onClick={onClose} className="text-text-dim transition-colors hover:text-white" aria-label="Закрыть">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6 space-y-2.5 rounded-2xl border border-white/10 bg-background/60 p-5 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-text-muted">Товар</span>
            <span className="text-right font-medium">{product.title}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-text-muted">Версия</span>
            <span className="text-right font-medium">{version}</span>
          </div>
          <div className="flex justify-between gap-4 border-t border-white/10 pt-2.5">
            <span className="text-text-muted">К оплате</span>
            <span className="font-display text-lg font-medium text-accent">{product.price}</span>
          </div>
        </div>

        <a
          href={`https://www.thefurry.store/shop/${product.slug}?utm_source=landing&utm_medium=cta`}
          target="_blank"
          rel="noopener"
          className="mb-3 block rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-center text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
        >
          Перейти к оплате
        </a>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener"
          className="block rounded-[10px] border border-white/15 bg-white/5 px-7 py-3 text-center text-sm font-medium text-white transition-colors hover:border-white/25"
        >
          Задать вопрос перед покупкой
        </a>
      </div>
    </div>
  );
}

export function ProductDetailView({
  product,
  detail,
  typeLabel,
  buyLabel,
  reviewCount,
}: {
  product: Product;
  detail: ProductDetail;
  typeLabel: string;
  buyLabel: string;
  reviewCount: number;
}) {
  const [image, setImage] = useState(0);
  const [version, setVersion] = useState(0);
  const [buyOpen, setBuyOpen] = useState(false);

  const active = detail.versions[version];
  const price = active.price ?? product.price;
  const color = KIND_COLOR[product.kind];

  return (
    <section className="px-5 pt-28 pb-16 sm:px-6 sm:pt-36">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        {/* Галерея */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-surface">
            <Image
              src={`${BASE_PATH}${detail.images[image]}`}
              alt={`${product.title} — изображение ${image + 1}`}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              priority
            />
          </div>

          {detail.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {detail.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setImage(i)}
                  aria-label={`Изображение ${i + 1}`}
                  className={`relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                    i === image ? "border-accent" : "border-white/10 hover:border-white/25"
                  }`}
                >
                  <Image
                    src={`${BASE_PATH}${src}`}
                    alt=""
                    fill
                    sizes="80px"
                    className={`object-cover transition-opacity ${i === image ? "opacity-100" : "opacity-60"}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Панель покупки */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-3 font-mono text-[10px] tracking-widest uppercase" style={{ color }}>
            {typeLabel}
          </div>
          <h1 className="mb-3 font-display text-[28px] leading-[1.15] font-medium break-words sm:text-4xl">
            {product.title}
          </h1>

          <div className="mb-5 flex items-center gap-2">
            <div className="flex gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-current" />
              ))}
            </div>
            <span className="font-mono text-xs text-text-dim">
              {reviewCount > 0 ? `${reviewCount} отзыв${reviewCount === 1 ? "" : "а"}` : "пока без отзывов"}
            </span>
          </div>

          <p className="mb-7 text-sm leading-relaxed text-text-muted">{product.description}</p>

          {detail.versions.length > 1 && (
            <div className="mb-6">
              <div className="mb-3 font-mono text-[11px] tracking-widest text-text-dim uppercase">
                Версия сервера
              </div>
              <div className="mb-2 flex flex-wrap gap-2">
                {detail.versions.map((v, i) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setVersion(i)}
                    className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                      i === version
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-white/10 text-text-muted hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-text-dim">{active.note}</p>
            </div>
          )}

          <div className="mb-6 rounded-2xl border border-white/10 bg-surface p-5">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="mb-1 font-mono text-[11px] tracking-widest text-text-dim uppercase">Цена</div>
                <div className="font-display text-3xl font-medium">{price}</div>
              </div>
              {detail.discount && (
                <div className="text-right">
                  <div className="font-mono text-xs text-accent">−{detail.discount.percent}%</div>
                  <Countdown until={detail.discount.until} />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setBuyOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
            >
              <ShoppingBag size={16} />
              {buyLabel}
            </button>
          </div>

          <ul className="flex flex-col gap-2.5">
            {detail.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-text-muted">
                <Check size={14} className="mt-0.5 shrink-0 text-accent" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {buyOpen && <BuyModal product={product} version={active.label} onClose={() => setBuyOpen(false)} />}
    </section>
  );
}
