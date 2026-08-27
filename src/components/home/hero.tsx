"use client";

import { useEffect, useState } from "react";
import { TELEGRAM_URL } from "@/lib/links";
import { HOME_COPY } from "@/lib/home-copy";
import { BASE_PATH } from "@/lib/base-path";
import type { Locale } from "@/lib/i18n";

const TYPING_SPEED = 38;
const DELETING_SPEED = 20;
const HOLD_MS = 2200;

const PARTICLES = [
  { top: "22%", left: "12%", delay: "0s", size: 5 },
  { top: "68%", left: "8%", delay: "1.2s", size: 4 },
  { top: "16%", left: "88%", delay: "0.6s", size: 4 },
  { top: "78%", left: "90%", delay: "2s", size: 6 },
  { top: "42%", left: "4%", delay: "3.1s", size: 3 },
  { top: "35%", left: "94%", delay: "1.8s", size: 3 },
];

function useTypewriter(lines: string[]) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIndex % lines.length];
    const atFullLine = !deleting && text === current;
    const atEmpty = deleting && text === "";
    const delay = atFullLine ? HOLD_MS : deleting ? DELETING_SPEED : TYPING_SPEED;

    const timeout = setTimeout(() => {
      if (atFullLine) {
        setDeleting(true);
        return;
      }
      if (atEmpty) {
        setDeleting(false);
        setLineIndex((i) => (i + 1) % lines.length);
        return;
      }
      setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)));
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, lineIndex, lines]);

  return text;
}

export function HomeHero({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].hero;
  const typed = useTypewriter(t.subtitles);

  return (
    <section className="relative flex h-dvh min-h-[560px] flex-col items-center justify-center overflow-hidden text-center">
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

      <div className="pointer-events-none absolute inset-0 z-[1] hidden md:block">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute animate-particle-float rounded-full bg-accent/70 shadow-[0_0_10px_rgba(23,151,255,0.8)]"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size, animationDelay: p.delay }}
          />
        ))}
      </div>

      <div className="relative z-[2] px-6">
        <h1 className="max-w-4xl font-display text-[32px] leading-[1.08] font-normal min-[420px]:text-[40px] sm:text-6xl sm:leading-[1.04] lg:text-[76px]">
          {t.before}
          <span
            className="animate-gradient-text bg-[linear-gradient(135deg,#0A3FFF,#1797FF,#5db4ff,#1797FF,#0A3FFF)] bg-[length:200%_auto] bg-clip-text font-medium text-transparent"
            style={{ backgroundSize: "200% auto" }}
          >
            {t.word}
          </span>
          {t.after}
        </h1>

        <div className="mt-5 flex min-h-[3.5rem] items-center justify-center px-4">
          <p className="max-w-xl text-sm text-text-muted sm:text-base">
            {typed}
            <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-caret-blink bg-accent align-middle" />
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener"
            className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
          >
            {t.ctaLabel}
          </a>
          <a
            href="#services"
            className="rounded-[10px] border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/25"
          >
            {t.secondaryCtaLabel}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-[2] flex w-full -translate-x-1/2 items-center justify-center gap-3 px-4 text-[12px] text-text-dim sm:bottom-10 sm:gap-[18px] sm:text-[13px]">
        <span>{t.scrollBefore}</span>
        <div className="flex h-8 w-[22px] shrink-0 justify-center rounded-full border border-text-dim pt-1.5">
          <i className="h-1.5 w-[3px] animate-scroll-dot rounded-full bg-text-dim" />
        </div>
        {/* На узких экранах вторая половина подписи не помещается рядом с иконкой */}
        <span className="hidden sm:inline">{t.scrollAfter}</span>
      </div>
    </section>
  );
}
