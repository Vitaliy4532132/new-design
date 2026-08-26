"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const SIZE = 28; // ребро блока, px
const GRID = 4; // основание GRID × GRID
const DROP = 90; // с какой высоты блок «падает» на место

type Block = { x: number; y: number; z: number; stage: number };

// Постройка собирается слоями, по одному слою на каждый этап работы:
// пол → две стены → крыша.
function buildBlocks(): Block[] {
  const blocks: Block[] = [];
  const isEdge = (x: number, y: number) => x === 0 || y === 0 || x === GRID - 1 || y === GRID - 1;

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) blocks.push({ x, y, z: 0, stage: 0 });
  }
  for (const z of [1, 2]) {
    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        if (isEdge(x, y)) blocks.push({ x, y, z, stage: z });
      }
    }
  }
  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) blocks.push({ x, y, z: 3, stage: 3 });
  }

  return blocks;
}

const BLOCKS = buildBlocks();
const TOTAL = BLOCKS.length;

// Грани куба. Рендерим все пять видимых сторон, а не две: так постройка
// выглядит цельной при любом развороте изометрии. Противоположные грани
// красим одинаково — тогда освещение читается одинаково с любого угла.
const FACES = [
  { transform: `translateZ(${SIZE / 2}px)`, bg: "#2AA0FF" },
  { transform: `rotateX(90deg) translateZ(${SIZE / 2}px)`, bg: "#0A3FFF" },
  { transform: `rotateX(-90deg) translateZ(${SIZE / 2}px)`, bg: "#0A3FFF" },
  { transform: `rotateY(90deg) translateZ(${SIZE / 2}px)`, bg: "#07268f" },
  { transform: `rotateY(-90deg) translateZ(${SIZE / 2}px)`, bg: "#07268f" },
];

function IsoStructure({ placed }: { placed: number }) {
  const center = ((GRID - 1) * SIZE) / 2;
  const complete = placed >= TOTAL;

  return (
    <div className="relative flex h-[360px] items-center justify-center sm:h-[440px]">
      <div
        className={`pointer-events-none absolute h-56 w-56 rounded-full blur-[80px] transition-opacity duration-1000 ${
          complete ? "opacity-60" : "opacity-20"
        }`}
        style={{ background: "radial-gradient(circle, #1797FF, transparent 70%)" }}
      />

      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(56deg) rotateZ(45deg)",
        }}
      >
        {BLOCKS.map((b, i) => {
          const isPlaced = i < placed;
          const x = b.x * SIZE - center;
          const y = b.y * SIZE - center;
          const z = b.z * SIZE + (isPlaced ? 0 : DROP);

          return (
            <div
              key={i}
              className="absolute transition-all duration-500 ease-out"
              style={{
                width: SIZE,
                height: SIZE,
                marginLeft: -SIZE / 2,
                marginTop: -SIZE / 2,
                transformStyle: "preserve-3d",
                transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                opacity: isPlaced ? 1 : 0,
              }}
            >
              {FACES.map((f, fi) => (
                <div
                  key={fi}
                  className="absolute inset-0"
                  style={{
                    transform: f.transform,
                    background: f.bg,
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.35)",
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepList({
  steps,
  activeStage,
}: {
  steps: { n: string; title: string; text: string }[];
  activeStage: number;
}) {
  return (
    <ul className="flex flex-col gap-5">
      {steps.map((step, i) => {
        const active = i === activeStage;
        const done = i < activeStage;

        return (
          <li
            key={step.n}
            className={`flex gap-4 transition-opacity duration-500 ${active || done ? "opacity-100" : "opacity-35"}`}
          >
            <span
              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border font-mono text-[11px] transition-all duration-500 ${
                active
                  ? "border-transparent bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] text-white shadow-[0_0_18px_rgba(23,151,255,0.5)]"
                  : done
                    ? "border-accent/40 text-accent"
                    : "border-white/15 text-text-dim"
              }`}
            >
              {step.n}
            </span>
            <div className="min-w-0">
              <h3
                className={`mb-1 font-display text-lg font-medium transition-colors duration-500 ${
                  active ? "text-white" : "text-text-muted"
                }`}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">{step.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function BuildSequence({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].process;

  // Десктоп: сборка привязана к скроллу внутри залипающего блока.
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const [scrollPlaced, setScrollPlaced] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = Math.round(Math.min(Math.max(v, 0), 1) * TOTAL);
    setScrollPlaced((prev) => (prev === n ? prev : n));
  });

  // Мобильный: без перехвата скролла — собираем по таймеру, когда блок виден.
  const { ref: mobileRef, inView } = useInView<HTMLDivElement>(0.25);
  const [autoPlaced, setAutoPlaced] = useState(0);

  useEffect(() => {
    if (!inView || autoPlaced >= TOTAL) return;
    const id = setTimeout(() => setAutoPlaced((n) => n + 1), autoPlaced === 0 ? 250 : 45);
    return () => clearTimeout(id);
  }, [inView, autoPlaced]);

  const stageOf = (placed: number) =>
    placed <= 0 ? 0 : BLOCKS[Math.min(placed, TOTAL) - 1].stage;

  const header = (
    <div className="mb-10 max-w-lg">
      <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">{t.eyebrow}</div>
      <h2 className="font-display text-4xl font-medium sm:text-[44px]">{t.title}</h2>
    </div>
  );

  return (
    <section className="relative bg-background">
      {/* Десктоп: залипающая сборка по скроллу */}
      <div ref={scrollRef} className="relative hidden h-[300vh] md:block">
        <div className="sticky top-0 flex h-screen items-center px-6">
          <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
            <div>
              {header}
              <StepList steps={t.steps} activeStage={stageOf(scrollPlaced)} />
            </div>
            <div className="relative">
              <IsoStructure placed={scrollPlaced} />
              <div className="mt-2 text-center font-mono text-xs text-text-dim">
                {String(Math.min(stageOf(scrollPlaced) + 1, t.steps.length)).padStart(2, "0")} / {String(t.steps.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильный: обычная вертикальная секция */}
      <div ref={mobileRef} className="px-6 py-24 md:hidden">
        <div className="mx-auto max-w-5xl">
          {header}
          <IsoStructure placed={autoPlaced} />
          <div className="mt-8">
            <StepList steps={t.steps} activeStage={stageOf(autoPlaced)} />
          </div>
        </div>
      </div>
    </section>
  );
}
