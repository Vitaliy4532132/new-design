"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const AUTOPLAY_MS = 4000;
const TEXT_LIMIT = 160;

function Counter({ target, decimals = 0, inView }: { target: number; decimals?: number; inView: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <>{value.toFixed(decimals)}</>;
}

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div className="flex gap-0.5 text-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className="fill-current" />
      ))}
    </div>
  );
}

export function ReviewsCarousel({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].testimonials;
  const supportLabel = HOME_COPY[locale].stats.support;
  const reviews = t.reviews;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openReview, setOpenReview] = useState<number | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused || openReview !== null) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, openReview, reviews.length]);

  useEffect(() => {
    if (openReview === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenReview(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openReview]);

  function goTo(i: number) {
    setIndex((i + reviews.length) % reviews.length);
  }

  return (
    <section id="reviews" className="relative bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">{t.eyebrow}</div>
          <h2 className="font-display text-4xl font-medium sm:text-[44px]">{t.title}</h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {reviews.map((review, i) => {
                const isLong = review.text.length > TEXT_LIMIT;
                return (
                  <div key={review.name + i} className="w-full shrink-0 px-1">
                    <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-white/10 bg-surface p-8 text-center">
                      <Stars size={16} />
                      <p className="mt-5 mb-6 text-base leading-relaxed text-text-muted">
                        {isLong ? `${review.text.slice(0, TEXT_LIMIT).trimEnd()}…` : review.text}
                      </p>
                      {isLong && (
                        <button
                          type="button"
                          onClick={() => setOpenReview(i)}
                          className="mb-4 text-sm font-medium text-accent"
                        >
                          {t.readMoreLabel}
                        </button>
                      )}
                      <div>
                        <div className="text-sm font-medium">{review.name}</div>
                        <div className="text-xs text-text-dim">{review.role}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous"
            className="absolute top-1/2 left-0 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-surface text-text-muted transition-colors hover:text-white sm:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next"
            className="absolute top-1/2 right-0 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-surface text-text-muted transition-colors hover:text-white sm:flex"
          >
            <ChevronRight size={18} />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-accent" : "w-1.5 bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        <div
          ref={ref}
          className="mx-auto mt-14 grid max-w-xl grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10"
        >
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-6 text-center">
            <div className="font-display text-2xl font-medium">
              <Counter target={5} decimals={1} inView={inView} />
            </div>
            <div className="text-xs text-text-muted">{t.ratingLabel}</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-6 text-center">
            <div className="font-display text-2xl font-medium">
              <Counter target={reviews.length} inView={inView} />
            </div>
            <div className="text-xs text-text-muted">{t.countLabel}</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-6 text-center">
            <div className="font-display text-2xl font-medium">24/7</div>
            <div className="text-xs text-text-muted">{supportLabel}</div>
          </div>
        </div>
      </div>

      {openReview !== null && (
        <div
          onClick={() => setOpenReview(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-surface p-7 shadow-[0_24px_80px_rgba(79,142,255,0.18)]"
          >
            <div className="mb-5 flex items-start justify-between">
              <Stars size={16} />
              <button
                type="button"
                onClick={() => setOpenReview(null)}
                className="text-text-dim transition-colors hover:text-white"
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-text-muted">{reviews[openReview].text}</p>
            <div>
              <div className="text-sm font-medium">{reviews[openReview].name}</div>
              <div className="text-xs text-text-dim">{reviews[openReview].role}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
