"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

// Названия технологий — имена собственные, не переводятся.
const TECH = {
  java: { name: "Java", color: "#E76F00" },
  kotlin: { name: "Kotlin", color: "#7F52FF" },
  spigot: { name: "Spigot API", color: "#D3A625" },
  paper: { name: "Paper API", color: "#EAE6DC" },
  velocity: { name: "Velocity", color: "#1BA0E0" },
  bungee: { name: "BungeeCord", color: "#4A7FC1" },
  mysql: { name: "MySQL", color: "#0E7C99" },
  mongo: { name: "MongoDB", color: "#4DB33D" },
  redis: { name: "Redis", color: "#D82C20" },
  docker: { name: "Docker", color: "#2496ED" },
  gradle: { name: "Gradle", color: "#3A7D8C" },
  maven: { name: "Maven", color: "#C71A36" },
  next: { name: "Next.js", color: "#E8E8E8" },
  ts: { name: "TypeScript", color: "#3178C6" },
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

// Затемняем базовый цвет для боковых граней — так любой цвет получает
// одинаковое освещение и куб читается объёмным.
function shade(hex: string, factor: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * factor);
  const g = Math.round(((n >> 8) & 255) * factor);
  const b = Math.round((n & 255) * factor);
  return `rgb(${r},${g},${b})`;
}

function IsoCube({ color, size, spin = false }: { color: string; size: number; spin?: boolean }) {
  // Пять граней, как у блоков острова: низ при взгляде сверху не виден.
  const faces = [
    { transform: `translateZ(${size / 2}px)`, bg: color },
    { transform: `rotateX(90deg) translateZ(${size / 2}px)`, bg: shade(color, 0.72) },
    { transform: `rotateX(-90deg) translateZ(${size / 2}px)`, bg: shade(color, 0.72) },
    { transform: `rotateY(90deg) translateZ(${size / 2}px)`, bg: shade(color, 0.52) },
    { transform: `rotateY(-90deg) translateZ(${size / 2}px)`, bg: shade(color, 0.52) },
  ];

  return (
    <div
      className={`relative ${spin ? "animate-cube-spin" : ""}`}
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
        ...(spin ? {} : { transform: "rotateX(58deg) rotateZ(45deg)" }),
      }}
    >
      {faces.map((f, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            transform: f.transform,
            background: f.bg,
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.3)",
          }}
        />
      ))}
    </div>
  );
}

export function CraftingTable({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].stack;
  const services = HOME_COPY[locale].services;

  const [active, setActive] = useState(0);
  const [placed, setPlaced] = useState(0);
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
  }

  return (
    <section className="relative border-y border-white/10 bg-background px-6 py-24">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">{t.eyebrow}</div>
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
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-white/10 text-text-muted hover:border-white/25 hover:text-white"
              }`}
            >
              {services.items[r.service].title}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12">
          {/* Сетка ингредиентов */}
          <div className="rounded-lg bg-[#15151a] p-3" style={{ boxShadow: PANEL_BEVEL }}>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => {
                const key = recipe.items[i];
                const tech = key ? TECH[key] : null;
                const visible = key !== undefined && i < placed;

                return (
                  <div
                    key={i}
                    className="group relative flex h-14 w-14 items-center justify-center rounded-[3px] bg-[#0d0d11] sm:h-16 sm:w-16"
                    style={{ boxShadow: SLOT_BEVEL }}
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

                    {tech && visible && (
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        <div
                          className="rounded-[2px] bg-[#100010]/95 px-3 py-1.5 whitespace-nowrap"
                          style={{ boxShadow: "0 0 0 1px #4B2A9E, 0 0 0 3px #16062E" }}
                        >
                          <span className="font-mono text-xs text-white">{tech.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <ArrowRight
            size={26}
            className={`rotate-90 text-text-dim transition-colors duration-500 md:rotate-0 ${
              crafted ? "text-accent" : ""
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
              <div className="font-mono text-xs text-accent">{services.items[recipe.service].priceLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
