import { Zap } from "lucide-react";
import { TELEGRAM_URL, DISCORD_URL } from "@/lib/links";
import { HOME_COPY } from "@/lib/home-copy";
import { BASE_PATH } from "@/lib/base-path";
import type { Locale } from "@/lib/i18n";

export function Cta({ locale = "ru" }: { locale?: Locale }) {
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
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(79,142,255,0.9) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
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
      <div
        className="pointer-events-none absolute right-[8%] bottom-0 z-[1] h-[280px] w-[420px] opacity-30 blur-[80px]"
        style={{
          background: "radial-gradient(circle, #1797FF, transparent 70%)",
        }}
      />
      <div className="relative z-[2] mx-auto max-w-2xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <Zap size={14} className="fill-accent text-accent" />
          <span className="font-mono text-xs text-text-muted">TheFurryDev</span>
        </div>
        <h2 className="mb-5 font-display text-4xl font-medium sm:text-5xl">
          {t.title}
        </h2>
        <p className="mb-10 text-lg text-text-muted">{t.subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener"
            className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-8 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(79,142,255,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(79,142,255,0.55)]"
          >
            {t.ctaLabel}
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener"
            className="rounded-[10px] border border-white/15 bg-white/5 px-8 py-4 text-sm font-medium text-white transition-colors hover:border-white/25"
          >
            {t.secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
