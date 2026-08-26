"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);

  return (
    <motion.span style={{ opacity }} className="mr-[0.26em] inline-block">
      {children}
    </motion.span>
  );
}

export function Manifesto({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].manifesto;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = t.text.split(" ");

  return (
    <section className="relative overflow-hidden bg-background px-6 py-32">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 hidden h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[130px] md:block"
        style={{ background: "radial-gradient(circle, #0A3FFF, transparent 70%)" }}
      />

      <div ref={ref} className="relative mx-auto max-w-4xl">
        <div className="mb-8 font-mono text-xs tracking-widest text-accent uppercase">{t.eyebrow}</div>
        <p className="flex flex-wrap font-display text-2xl leading-[1.45] font-normal sm:text-3xl lg:text-[38px]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}
