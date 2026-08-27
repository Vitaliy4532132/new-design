"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

type Tone = "info" | "plugin" | "success";
type LogLine = { time: string; text: string; tone: Tone };

// Строки лога — буквальный вывод сервера, не переводятся (как и названия
// технологий в инвентаре). Плагины только реальные: наши + LuckPerms.
const LOG: LogLine[] = [
  { time: "12:04:01", text: "Starting minecraft server version 1.21.4", tone: "info" },
  { time: "12:04:01", text: "Loading libraries, please wait...", tone: "info" },
  { time: "12:04:02", text: 'Preparing level "world"', tone: "info" },
  { time: "12:04:02", text: "[LuckPerms] Loaded 14 permission groups", tone: "plugin" },
  { time: "12:04:03", text: "[FurryChat] AI moderation enabled", tone: "plugin" },
  { time: "12:04:03", text: "[FurryNick] Registered command /nick", tone: "plugin" },
  { time: "12:04:04", text: 'Done (2.847s)! For help, type "help"', tone: "success" },
];

const LINE_DELAY = 280;

const TONE_CLASS: Record<Tone, string> = {
  info: "text-text-muted",
  plugin: "text-accent",
  success: "text-green-400",
};

export function ServerConsole({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].serverConsole;
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || shown >= LOG.length) return;
    const id = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 320 : LINE_DELAY);
    return () => clearTimeout(id);
  }, [inView, shown]);

  const done = shown >= LOG.length;
  // Чек-лист отмечается синхронно с логом: последняя строка лога — запуск.
  const checked = Math.min(shown, t.steps.length);

  return (
    <section className="relative overflow-hidden bg-background px-6 py-28">
      <div
        className="pointer-events-none absolute top-1/2 left-[-10%] hidden h-[420px] w-[520px] -translate-y-1/2 opacity-25 blur-[120px] md:block"
        style={{ background: "radial-gradient(circle, #0A3FFF, transparent 70%)" }}
      />

      <div ref={ref} className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        {/* Терминал */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#08080a] shadow-[0_24px_50px_rgba(0,0,0,0.55)]">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="ml-2 font-mono text-[11px] text-text-dim">server console</span>
          </div>

          {/* Строки не переносим, а скроллим по горизонтали внутри консоли:
              так это выглядит настоящим терминалом и не растягивает страницу. */}
          <div className="min-h-[220px] overflow-x-auto px-4 py-4 sm:min-h-[260px] sm:px-5">
            {LOG.slice(0, shown).map((line, i) => (
              <div
                key={i}
                className="flex gap-2 py-[3px] font-mono text-[11px] leading-relaxed whitespace-nowrap sm:text-xs"
              >
                <span className="shrink-0 text-text-dim">[{line.time}]</span>
                <span className={TONE_CLASS[line.tone]}>{line.text}</span>
              </div>
            ))}
            {!done && (
              <div className="flex gap-2 py-[3px] font-mono text-[11px] sm:text-xs">
                <span className="inline-block h-[1em] w-[7px] animate-caret-blink bg-accent" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 border-t border-white/10 bg-white/[0.03] px-4 py-3">
            <span
              className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                done ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" : "bg-white/15"
              }`}
            />
            <span className="font-mono text-[11px] text-text-dim">
              {done ? `${t.statusLabel} — 2.847s` : "booting…"}
            </span>
          </div>
        </div>

        {/* Текст + чек-лист */}
        <div>
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">{t.eyebrow}</div>
          <h2 className="mb-4 font-display text-3xl font-medium sm:text-4xl">{t.title}</h2>
          <p className="mb-8 text-sm leading-relaxed text-text-muted">{t.lead}</p>

          <ul className="flex flex-col gap-3">
            {t.steps.map((step, i) => {
              const isChecked = i < checked;
              return (
                <li key={step} className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-500 ${
                      isChecked
                        ? "border-transparent bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)]"
                        : "border-white/15 bg-white/5"
                    }`}
                  >
                    <Check
                      size={13}
                      className={`text-white transition-opacity duration-300 ${isChecked ? "opacity-100" : "opacity-0"}`}
                    />
                  </span>
                  <span
                    className={`text-sm transition-colors duration-500 ${
                      isChecked ? "text-white" : "text-text-dim"
                    }`}
                  >
                    {step}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
