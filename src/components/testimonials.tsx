import { Star } from "lucide-react";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

type Review = { name: string; role: string; text: string };

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-white/10 bg-surface p-6">
      <div className="mb-4 flex gap-0.5 text-accent">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="fill-current" />
        ))}
      </div>
      <p className="mb-5 text-sm leading-relaxed text-text-muted">
        {review.text}
      </p>
      <div className="mt-auto">
        <div className="text-sm font-medium">{review.name}</div>
        <div className="text-xs text-text-dim">{review.role}</div>
      </div>
    </div>
  );
}

export function Testimonials({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].testimonials;
  const loop = [...t.reviews, ...t.reviews];

  return (
    <section id="reviews" className="relative overflow-hidden bg-background py-28">
      <div className="mx-auto mb-12 max-w-5xl px-6">
        <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
          {t.eyebrow}
        </div>
        <h2 className="font-display text-4xl font-medium sm:text-[44px]">
          {t.title}
        </h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {loop.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
