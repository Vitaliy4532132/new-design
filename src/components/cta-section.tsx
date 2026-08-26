import { TELEGRAM_URL } from "@/lib/links";
import { HOME_COPY } from "@/lib/home-copy";
import { BASE_PATH } from "@/lib/base-path";
import type { Locale } from "@/lib/i18n";

export function CtaSection({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].cta;

  return (
    <section className="relative overflow-hidden bg-background px-6 py-28 text-center">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-50"
        src={`${BASE_PATH}/video/cta-bg.mp4`}
        autoPlay
        muted
        loop
        playsInline
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, var(--background) 85%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-[1] h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 opacity-40 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #0A3FFF, transparent 70%)",
        }}
      />
      <div className="relative z-[2] mx-auto max-w-2xl">
        <h2 className="mb-5 font-display text-4xl font-medium sm:text-5xl">
          {t.title}
        </h2>
        <p className="mb-10 text-lg text-text-muted">{t.subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener"
            className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-8 py-4 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
          >
            {t.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
