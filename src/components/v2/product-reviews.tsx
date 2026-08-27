import { Star } from "lucide-react";
import { TELEGRAM_URL } from "@/lib/links";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

export function ProductReviews({
  authors,
  locale = "ru",
}: {
  authors: string[];
  locale?: Locale;
}) {
  const all = HOME_COPY[locale].testimonials.reviews;
  // Отзывы настоящие, привязаны по имени автора — выдуманных здесь нет.
  const reviews = all.filter((r) => authors.includes(r.name));

  return (
    <section className="border-t border-white/10 px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">отзывы</div>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              {reviews.length > 0 ? "Что говорят покупатели." : "Отзывов пока нет."}
            </h2>
          </div>

          {reviews.length > 0 && (
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-surface px-5 py-4">
              <span className="font-display text-3xl font-medium">5.0</span>
              <div>
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-current" />
                  ))}
                </div>
                <div className="mt-1 font-mono text-[11px] text-text-dim">
                  {reviews.length} {reviews.length === 1 ? "отзыв" : "отзыва"}
                </div>
              </div>
            </div>
          )}
        </div>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <div key={r.name} className="rounded-2xl border border-white/10 bg-surface p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] font-sans text-sm font-bold text-white">
                      {r.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{r.name}</div>
                      <div className="text-xs text-text-dim">{r.role}</div>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className="fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-text-muted">{r.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-surface p-8 text-center">
            <p className="mb-5 text-sm text-text-muted">
              Этот товар ещё никто не оценил. Купили — расскажите, как зашло.
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener"
              className="inline-block rounded-[10px] border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/25"
            >
              Оставить отзыв
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
