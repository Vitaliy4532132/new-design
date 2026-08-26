"use client";

import { useInView } from "@/hooks/use-in-view";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

export function ProcessTimeline({ locale = "ru" }: { locale?: Locale }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const t = HOME_COPY[locale].process;

  return (
    <section className="relative bg-background px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
            {t.eyebrow}
          </div>
          <h2 className="font-display text-4xl font-medium sm:text-[44px]">
            {t.title}
          </h2>
        </div>

        <div ref={ref} className="relative">
          <div className="absolute top-[18px] right-0 left-0 hidden h-px bg-white/10 sm:block" />
          <div
            className="absolute top-[18px] left-0 hidden h-px bg-[linear-gradient(90deg,#0A3FFF,#1797FF)] transition-all duration-[1600ms] ease-out sm:block"
            style={{ width: inView ? "100%" : "0%" }}
          />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-4 sm:gap-6">
            {t.steps.map((step, i) => (
              <div key={step.n} className="relative">
                <div
                  className="mb-5 h-[9px] w-[9px] rounded-full border-2 border-white/20 bg-background transition-all duration-500"
                  style={{
                    transitionDelay: `${i * 350}ms`,
                    background: inView
                      ? "linear-gradient(135deg,#0A3FFF,#1797FF)"
                      : undefined,
                    borderColor: inView ? "transparent" : undefined,
                  }}
                />
                <div className="mb-2 font-mono text-xs text-text-dim">
                  {step.n}
                </div>
                <h3 className="mb-2 font-display text-lg font-medium">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
