"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, Code2, FileCheck, Headset } from "lucide-react";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const ICONS = [Clock, Code2, FileCheck, Headset];

type Reason = { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; text: string };

function StackCard({
  reason,
  index,
  total,
  progress,
}: {
  reason: Reason;
  index: number;
  total: number;
  progress: import("framer-motion").MotionValue<number>;
}) {
  const Icon = reason.icon;
  const isLast = index === total - 1;
  const start = index / total;
  const enterEnd = start + 0.12;
  const coverStart = (index + 1) / total;
  const coverEnd = coverStart + 0.12;

  const y = useTransform(progress, [start, enterEnd], [80, 0]);
  const opacity = useTransform(progress, [start, enterEnd], [0, 1]);
  const scale = useTransform(
    progress,
    isLast ? [0, 1] : [coverStart, coverEnd],
    isLast ? [1, 1] : [1, 0.93],
  );
  const dim = useTransform(
    progress,
    isLast ? [0, 1] : [coverStart, coverEnd],
    isLast ? [1, 1] : [1, 0.55],
  );

  return (
    <motion.div
      style={{ y, opacity, scale, zIndex: index }}
      className="absolute inset-x-0 top-0 mx-auto w-full max-w-xl"
    >
      <motion.div
        style={{ opacity: dim }}
        className="flex items-start gap-6 rounded-3xl border border-white/10 bg-surface p-8 shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,63,255,0.15),rgba(23,151,255,0.05))]">
          <Icon size={24} className="text-accent" />
        </div>
        <div>
          <h3 className="mb-2 font-display text-xl font-medium">
            {reason.title}
          </h3>
          <p className="text-sm leading-relaxed text-text-muted">
            {reason.text}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function WhyUsStack({ locale = "ru" }: { locale?: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const t = HOME_COPY[locale].whyUs;
  const reasons: Reason[] = t.reasons.map((r, i) => ({ ...r, icon: ICONS[i] }));

  return (
    <section className="relative bg-background px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
            {t.eyebrow}
          </div>
          <h2 className="font-display text-4xl font-medium sm:text-[44px]">
            {t.title}
          </h2>
        </div>
      </div>

      <div ref={containerRef} className="relative h-[280vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center px-6">
          <div className="relative h-[220px] w-full max-w-xl">
            {reasons.map((reason, i) => (
              <StackCard
                key={reason.title}
                reason={reason}
                index={i}
                total={reasons.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
