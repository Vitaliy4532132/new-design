import { TELEGRAM_URL } from "@/lib/links";
import { Reveal } from "@/components/reveal";

type Stat = { label: string; value: string };

export function PageHero({
  eyebrow,
  title,
  highlight,
  lead,
  stats,
  hook,
  primaryCta = "Оставить заявку",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  lead: string;
  stats?: Stat[];
  hook?: string;
  primaryCta?: string;
}) {
  return (
    <section className="relative overflow-hidden px-6 pt-44 pb-20 text-center">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[480px] w-[820px] -translate-x-1/2 opacity-35 blur-[110px]"
        style={{
          background: "radial-gradient(circle, #0A3FFF, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-text-muted">
            {eyebrow}
          </div>
          <h1 className="mb-6 font-display text-4xl leading-[1.1] font-medium sm:text-5xl">
            {title} {highlight && <span className="text-accent">{highlight}</span>}
          </h1>
          <p
            className={`mx-auto max-w-xl text-base leading-relaxed text-text-muted ${hook ? "mb-4" : "mb-10"}`}
          >
            {lead}
          </p>
          {hook && (
            <p className="mx-auto mb-10 max-w-xl text-sm text-text-dim">{hook}</p>
          )}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener"
              className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
            >
              {primaryCta}
            </a>
          </div>
        </Reveal>

        {stats && (
          <Reveal delay={150}>
            <div className="mx-auto grid max-w-xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10">
              {stats.map((s) => (
                <div key={s.label} className="px-4 py-5">
                  <div className="font-display text-2xl font-medium">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
