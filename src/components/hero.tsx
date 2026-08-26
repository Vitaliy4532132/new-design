import { TELEGRAM_URL } from "@/lib/links";
import { HOME_COPY } from "@/lib/home-copy";
import { BASE_PATH } from "@/lib/base-path";
import type { Locale } from "@/lib/i18n";

export function Hero({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].hero;

  return (
    <section className="relative flex h-screen min-h-[680px] flex-col items-center justify-center overflow-hidden text-center">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={`${BASE_PATH}/video/hero-bg.mp4`}
        autoPlay
        muted
        loop
        playsInline
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, var(--background) 85%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-[1] h-[55%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--background) 92%)",
        }}
      />

      <div className="relative z-[2] px-6">
        <h1 className="max-w-4xl font-display text-5xl leading-[1.04] font-normal sm:text-6xl lg:text-[76px]">
          {t.before}
          <span className="font-medium text-accent">{t.word}</span>
          {t.after}
        </h1>
        <p className="mt-5 text-sm text-text-muted sm:text-base">{t.hook}</p>
        <div className="mt-8 flex justify-center gap-3">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener"
            className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
          >
            {t.ctaLabel}
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-[2] flex -translate-x-1/2 items-center gap-[18px] text-[13px] text-text-dim">
        <span>{t.scrollBefore}</span>
        <div className="flex h-8 w-[22px] justify-center rounded-full border border-text-dim pt-1.5">
          <i className="h-1.5 w-[3px] animate-scroll-dot rounded-full bg-text-dim" />
        </div>
        <span>{t.scrollAfter}</span>
      </div>
    </section>
  );
}
