"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { HOME_COPY } from "@/lib/home-copy";
import { BASE_PATH } from "@/lib/base-path";
import type { Locale } from "@/lib/i18n";

function Counter({ target, inView }: { target: number; inView: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <>{value}</>;
}

export function StatsBand({ locale = "ru" }: { locale?: Locale }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const t = HOME_COPY[locale].stats;

  const stats = [
    { kind: "count" as const, value: 100, suffix: "+", label: t.projects },
    { kind: "count" as const, value: 120, suffix: "+", label: t.plugins },
    { kind: "count" as const, value: 87, suffix: "+", label: t.clients },
    { kind: "text" as const, display: "24/7", label: t.support },
  ];

  return (
    <section className="relative bg-background py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 75%)",
        }}
      />

      <Image
        src={`${BASE_PATH}/logo.svg`}
        alt=""
        width={661}
        height={849}
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[6%] h-[420px] w-auto -translate-y-1/2 opacity-[0.04]"
      />

      <div
        ref={ref}
        className="relative mx-auto grid max-w-5xl grid-cols-2 divide-x divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-4 sm:divide-y-0"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center gap-2 px-6 py-10 text-center"
          >
            <div className="font-display text-4xl font-medium sm:text-5xl">
              {stat.kind === "text" ? (
                stat.display
              ) : (
                <>
                  <Counter target={stat.value} inView={inView} />
                  {stat.suffix}
                </>
              )}
            </div>
            <div className="text-sm text-text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
