import { Clock, Code2, FileCheck, Headset } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const ICONS = [Clock, Code2, FileCheck, Headset];
const ACCENTS = ["primary", "accent", "primary", "accent"] as const;

export function AboutSection({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].whyUs;
  const cards = t.reasons.map((r, i) => ({ ...r, icon: ICONS[i], accent: ACCENTS[i] }));

  return (
    <section className="relative bg-background px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">{t.eyebrow}</div>
          <h2 className="font-display text-4xl font-medium sm:text-[44px]">{t.title}</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const isAccent = card.accent === "accent";
            return (
              <Reveal key={card.title} delay={i * 90}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-white/20">
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div
                    className={`relative mb-5 flex size-12 items-center justify-center rounded-xl border transition-shadow duration-300 ${
                      isAccent
                        ? "border-blue-bright/30 group-hover:shadow-[0_0_20px_rgba(23,151,255,0.35)]"
                        : "border-blue-deep/30 group-hover:shadow-[0_0_20px_rgba(10,63,255,0.35)]"
                    }`}
                  >
                    <Icon size={20} className="text-accent" />
                  </div>
                  <h3 className="relative mb-2 font-display text-lg font-medium">{card.title}</h3>
                  <p className="relative text-sm leading-relaxed text-text-muted">{card.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
