"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { IsoCube } from "@/components/v2/iso-cube";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

// Названия технологий — имена собственные, а категории у разработчиков и в
// русском, и в украинском звучат по-английски. Поэтому не переводим.
const TECH = {
  java: { name: "Java", tag: "backend", color: "#E76F00" },
  kotlin: { name: "Kotlin", tag: "backend", color: "#7F52FF" },
  spigot: { name: "Spigot API", tag: "api", color: "#D3A625" },
  paper: { name: "Paper API", tag: "api", color: "#EAE6DC" },
  velocity: { name: "Velocity", tag: "proxy", color: "#1BA0E0" },
  bungee: { name: "BungeeCord", tag: "proxy", color: "#4A7FC1" },
  mysql: { name: "MySQL", tag: "database", color: "#0E7C99" },
  mongo: { name: "MongoDB", tag: "database", color: "#4DB33D" },
  redis: { name: "Redis", tag: "cache", color: "#D82C20" },
  docker: { name: "Docker", tag: "infra", color: "#2496ED" },
  gradle: { name: "Gradle", tag: "build", color: "#3A7D8C" },
  maven: { name: "Maven", tag: "build", color: "#C71A36" },
  next: { name: "Next.js", tag: "frontend", color: "#E8E8E8" },
  ts: { name: "TypeScript", tag: "frontend", color: "#3178C6" },
} as const;

type TechKey = keyof typeof TECH;

// service — индекс услуги в HOME_COPY.services.items, оттуда берём
// локализованное название и настоящую цену, чтобы они не разъезжались.
const RECIPES: { service: number; color: string; items: TechKey[] }[] = [
  { service: 3, color: "#E76F00", items: ["java", "kotlin", "spigot", "paper", "gradle", "maven", "mysql"] },
  { service: 0, color: "#6CB33F", items: ["paper", "spigot", "mysql", "redis", "docker"] },
  { service: 1, color: "#3178C6", items: ["next", "ts", "mysql", "docker"] },
  { service: 2, color: "#1BA0E0", items: ["velocity", "bungee", "docker", "redis", "mongo", "mysql"] },
];

const SLOT_BEVEL = "inset 2px 2px 0 rgba(0,0,0,0.55), inset -2px -2px 0 rgba(255,255,255,0.07)";
const PANEL_BEVEL = "inset 2px 2px 0 rgba(255,255,255,0.06), inset -2px -2px 0 rgba(0,0,0,0.6)";

export function CraftingTable({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].stack;
  const services = HOME_COPY[locale].services;

  const [active, setActive] = useState(0);
  const [placed, setPlaced] = useState(0);
  // На телефоне ховера нет, поэтому подсказка открывается тапом по блоку.
  const [picked, setPicked] = useState<TechKey | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  const recipe = RECIPES[active];
  const total = recipe.items.length;
  const crafted = placed >= total;

  // Ингредиенты выкладываются по одному, затем появляется результат.
  useEffect(() => {
    if (!inView || placed >= total) return;
    const id = setTimeout(() => setPlaced((n) => n + 1), placed === 0 ? 220 : 90);
    return () => clearTimeout(id);
  }, [inView, placed, total]);

  function pick(i: number) {
    if (i === active) return;
    setActive(i);
    setPlaced(0);
    setPicked(null);
  }

  return (
    <section className="relative border-y border-white/10 bg-background px-6 py-24">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-brand uppercase">{t.eyebrow}</div>
          <h2 className="font-display text-4xl font-medium sm:text-[44px]">{t.title}</h2>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {RECIPES.map((r, i) => (
            <button
              key={r.service}
              type="button"
              onClick={() => pick(i)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                i === active
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-white/10 text-text-muted hover:border-white/25 hover:text-white"
              }`}
            >
              {services.items[r.service].title}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12">
          {/* Сетка ингредиентов */}
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-lg bg-[#15151a] p-3" style={{ boxShadow: PANEL_BEVEL }}>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => {
                  const key = recipe.items[i];
                  const tech = key ? TECH[key] : null;
                  const visible = key !== undefined && i < placed;
                  const isPicked = key !== undefined && key === picked;

                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={!visible}
                      onClick={() => key && setPicked(isPicked ? null : key)}
                      className={`group relative flex h-14 w-14 items-center justify-center rounded-[3px] bg-[#0d0d11] transition-colors sm:h-16 sm:w-16 ${
                        visible ? "cursor-pointer hover:bg-[#191922]" : "cursor-default"
                      }`}
                      style={{
                        boxShadow: isPicked ? `${SLOT_BEVEL}, 0 0 0 2px var(--accent-text)` : SLOT_BEVEL,
                      }}
                    >
                      {tech && (
                        <div
                          className="transition-all duration-300 ease-out"
                          style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.7)",
                          }}
                        >
                          <IsoCube color={tech.color} size={22} />
                        </div>
                      )}

                      {/* Подсказка по наведению — для мыши. На тач-экране ту же
                          информацию даёт подпись под сеткой. */}
                      {tech && visible && (
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:opacity-100 md:block">
                          <div
                            className="rounded-[2px] bg-[#100010]/95 px-3 py-1.5 whitespace-nowrap"
                            style={{ boxShadow: "0 0 0 1px #4B2A9E, 0 0 0 3px #16062E" }}
                          >
                            <div className="font-mono text-xs text-white">{tech.name}</div>
                            <div className="font-mono text-[10px] text-[#A98BFF]">{tech.tag}</div>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-h-[18px] text-center font-mono text-xs">
              {picked ? (
                <span className="text-brand">
                  {TECH[picked].name} <span className="text-text-dim">· {TECH[picked].tag}</span>
                </span>
              ) : (
                <span className="text-text-dim">{t.pickHint}</span>
              )}
            </div>
          </div>

          <ArrowRight
            size={26}
            className={`rotate-90 text-text-dim transition-colors duration-500 md:rotate-0 ${
              crafted ? "text-brand" : ""
            }`}
          />

          {/* Результат */}
          <div className="flex flex-col items-center">
            <div className="rounded-lg bg-[#15151a] p-3" style={{ boxShadow: PANEL_BEVEL }}>
              <div
                className="relative flex h-24 w-24 items-center justify-center rounded-[3px] bg-[#0d0d11]"
                style={{ boxShadow: SLOT_BEVEL }}
              >
                <div
                  className="pointer-events-none absolute h-16 w-16 rounded-full blur-2xl transition-opacity duration-700"
                  style={{ background: recipe.color, opacity: crafted ? 0.45 : 0 }}
                />
                <div
                  className="relative transition-all duration-500 ease-out"
                  style={{ opacity: crafted ? 1 : 0, transform: crafted ? "scale(1)" : "scale(0.5)" }}
                >
                  <IsoCube color={recipe.color} size={34} spin />
                </div>
              </div>
            </div>

            <div
              className="mt-4 text-center transition-opacity duration-500"
              style={{ opacity: crafted ? 1 : 0 }}
            >
              <div className="font-display text-lg font-medium">{services.items[recipe.service].title}</div>
              <div className="font-mono text-xs text-brand">{services.items[recipe.service].priceLabel}</div>
              <p className="mx-auto mt-3 max-w-[220px] text-xs leading-relaxed text-text-muted">
                {t.craftedNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
