import { TELEGRAM_URL } from "@/lib/links";

type Stat = { value: string; label: string };

// Шапка внутренних страниц нового дизайна. Не на весь экран, в отличие от
// главной: человек уже пришёл за конкретным, незачем заставлять его скроллить.
export function PageHero({
  eyebrow,
  titleBefore,
  titleHighlight,
  titleAfter,
  lead,
  stats,
  ctaLabel,
}: {
  eyebrow: string;
  titleBefore: string;
  titleHighlight?: string;
  titleAfter?: string;
  lead: string;
  stats?: Stat[];
  ctaLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden px-5 pt-32 pb-16 text-center sm:px-6 sm:pt-40 sm:pb-20">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[760px] max-w-[140vw] -translate-x-1/2 opacity-30 blur-[110px]"
        style={{ background: "radial-gradient(circle, #0A3FFF, transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs tracking-widest text-text-muted uppercase">
          {eyebrow}
        </div>

        {/* break-words: Unbounded широкий, длинные слова иначе срежет об
            overflow-hidden секции на узких экранах. */}
        <h1 className="mx-auto mb-5 font-display text-[28px] leading-[1.14] font-medium break-words min-[380px]:text-[32px] min-[480px]:text-[40px] sm:text-5xl sm:leading-[1.1]">
          {titleBefore}
          {titleHighlight && (
            <span className="animate-gradient-text bg-[linear-gradient(135deg,#0A3FFF,#1797FF,#5db4ff,#1797FF,#0A3FFF)] bg-[length:200%_auto] bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          )}
          {titleAfter}
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
          {lead}
        </p>

        {ctaLabel && (
          <div className="mb-12 flex justify-center">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener"
              className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
            >
              {ctaLabel}
            </a>
          </div>
        )}

        {stats && (
          <div className="mx-auto grid max-w-xl grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10">
            {stats.map((s) => (
              <div key={s.label} className="px-3 py-5">
                <div className="font-display text-lg font-medium sm:text-2xl">{s.value}</div>
                <div className="mt-1 text-[11px] text-text-muted sm:text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
