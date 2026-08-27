"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const SIZE = 26; // ребро блока, px
const DROP = 45; // с какой высоты блок «падает» на место

// Палитра под настоящие блоки майнкрафта: у травы верх зелёный, а бока
// землистые — как в игре. sideA — грани по оси Y, sideB — по оси X, они
// чуть темнее, за счёт этого куб читается объёмным.
const MATERIALS = {
  grass: { top: "#6CB33F", sideA: "#7C5A38", sideB: "#63472B" },
  dirt: { top: "#7C5A38", sideA: "#6E4F31", sideB: "#5A4028" },
  stone: { top: "#8E8E8E", sideA: "#7A7A7A", sideB: "#636363" },
  log: { top: "#B08E5E", sideA: "#6F5336", sideB: "#5A432B" },
  leaf: { top: "#5CAB3A", sideA: "#4A8F2E", sideB: "#3D7726" },
  chest: { top: "#C6913F", sideA: "#9C6C2E", sideB: "#7F5724" },
} as const;

type Material = keyof typeof MATERIALS;
type Cell = [number, number];
type Block = { x: number; y: number; z: number; mat: Material; stage: number };

// Остров 5×5 без углов — так он выглядит скруглённым, а не квадратным.
const GRASS: Cell[] = [
  [1, 0], [2, 0], [3, 0],
  [0, 1], [1, 1], [2, 1], [3, 1], [4, 1],
  [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
  [0, 3], [1, 3], [2, 3], [3, 3], [4, 3],
  [1, 4], [2, 4], [3, 4],
];

// Ниже остров сужается к точке — классический парящий скайблок.
const DIRT: Cell[] = [
  [1, 1], [2, 1], [3, 1],
  [1, 2], [2, 2], [3, 2],
  [1, 3], [2, 3], [3, 3],
];
const CORE: Cell[] = [[2, 1], [1, 2], [2, 2], [3, 2], [2, 3]];
const TIP: Cell[] = [[2, 2]];

const TREE: Cell = [1, 1]; // ствол стоит не по центру — так живее
const CHEST: Cell = [3, 3];

// Крона: нижний ярус кольцом вокруг ствола, верхний — крестом.
const CANOPY_LOWER: Cell[] = [
  [0, 0], [1, 0], [2, 0],
  [0, 1], [2, 1],
  [0, 2], [1, 2], [2, 2],
];
const CANOPY_TOP: Cell[] = [[1, 1], [0, 1], [2, 1], [1, 0], [1, 2]];

function buildIsland(): Block[] {
  const blocks: Block[] = [];
  const add = (cells: Cell[], z: number, mat: Material, stage: number) => {
    for (const [x, y] of cells) blocks.push({ x, y, z, mat, stage });
  };

  // Порядок в массиве = порядок сборки: снизу вверх, как строят по-настоящему.
  add(TIP, -3, "stone", 0);
  add(CORE, -2, "stone", 0);
  add(DIRT, -1, "dirt", 0);
  add(GRASS, 0, "grass", 1);

  for (const z of [1, 2, 3]) add([TREE], z, "log", 2);
  add(CANOPY_LOWER, 3, "leaf", 2);
  add(CANOPY_TOP, 4, "leaf", 3);
  add([CHEST], 1, "chest", 3);

  return blocks;
}

const BLOCKS = buildIsland();
const TOTAL = BLOCKS.length;

// Пять видимых граней: верх и четыре бока. Низ не рисуем — при взгляде
// сверху в изометрии он не виден ни у одного блока.
const FACES = [
  { transform: `translateZ(${SIZE / 2}px)`, shade: "top" },
  { transform: `rotateX(90deg) translateZ(${SIZE / 2}px)`, shade: "sideA" },
  { transform: `rotateX(-90deg) translateZ(${SIZE / 2}px)`, shade: "sideA" },
  { transform: `rotateY(90deg) translateZ(${SIZE / 2}px)`, shade: "sideB" },
  { transform: `rotateY(-90deg) translateZ(${SIZE / 2}px)`, shade: "sideB" },
] as const;

function IsoIsland({
  placed,
  interactive = false,
  materials,
  dragHint,
}: {
  placed: number;
  interactive?: boolean;
  materials: Record<Material, string>;
  dragHint: string;
}) {
  const center = 2 * SIZE; // сетка 0..4, центр в 2
  const complete = placed >= TOTAL;

  const [rot, setRot] = useState({ x: 56, z: 45 });
  const [hovered, setHovered] = useState<Material | null>(null);
  const [dragging, setDragging] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  function handlePointerDown(e: React.PointerEvent) {
    // Только мышь: на тач-устройстве перетаскивание отняло бы у пальца
    // скролл, и страницу нельзя было бы пролистать мимо острова.
    if (!interactive || e.pointerType !== "mouse") return;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
    boxRef.current?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    const last = lastPoint.current;
    if (!last) return;
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    setRot((r) => ({
      x: Math.min(85, Math.max(20, r.x - dy * 0.4)),
      z: r.z + dx * 0.4,
    }));
  }

  function endDrag(e: React.PointerEvent) {
    if (!lastPoint.current) return;
    lastPoint.current = null;
    setDragging(false);
    boxRef.current?.releasePointerCapture(e.pointerId);
  }

  // Блоки пересобираются только при изменении числа поставленных. Иначе
  // каждый кадр перетаскивания перерисовывал бы все 265 граней и заметно лагал.
  const blocks = useMemo(
    () =>
      BLOCKS.map((b, i) => {
        const isPlaced = i < placed;
        const palette = MATERIALS[b.mat];
        const x = b.x * SIZE - center;
        const y = b.y * SIZE - center;
        // -0.5 приподнимает остров так, чтобы он сел по центру контейнера
        const z = (b.z - 0.5) * SIZE + (isPlaced ? 0 : DROP);

        return (
          <div
            key={i}
            className="absolute transition-all duration-500 ease-out"
            onMouseEnter={interactive ? () => setHovered(b.mat) : undefined}
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
                  background: palette[f.shade],
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.28)",
                }}
              />
            ))}
          </div>
        );
      }),
    [placed, center, interactive],
  );

  return (
    <div>
      <div
        ref={boxRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseLeave={() => setHovered(null)}
        className={`relative flex h-[320px] items-center justify-center select-none sm:h-[440px] lg:h-[500px] ${
          interactive ? (dragging ? "cursor-grabbing" : "cursor-grab") : ""
        }`}
      >
        <div
          className={`pointer-events-none absolute h-64 w-64 rounded-full blur-[90px] transition-opacity duration-1000 ${
            complete ? "opacity-60" : "opacity-25"
          }`}
          style={{ background: "radial-gradient(circle, #1797FF, transparent 70%)" }}
        />

        <div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rot.x}deg) rotateZ(${rot.z}deg)`,
          }}
        >
          {blocks}
        </div>
      </div>

      {interactive && (
        <div className="mt-1 text-center font-mono text-xs text-text-dim">
          {hovered ? <span className="text-accent">{materials[hovered]}</span> : dragHint}
        </div>
      )}
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
  const island = HOME_COPY[locale].island;

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

  const stageOf = (placed: number) => (placed <= 0 ? 0 : BLOCKS[Math.min(placed, TOTAL) - 1].stage);

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
              <IsoIsland
                placed={scrollPlaced}
                interactive
                materials={island.materials}
                dragHint={island.dragHint}
              />
              <div className="mt-2 text-center font-mono text-xs text-text-dim">
                {String(Math.min(stageOf(scrollPlaced) + 1, t.steps.length)).padStart(2, "0")} /{" "}
                {String(t.steps.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильный: обычная вертикальная секция. overflow-hidden только здесь —
          на секцию его вешать нельзя, он сломал бы sticky в десктопной ветке. */}
      <div ref={mobileRef} className="overflow-hidden px-6 py-20 md:hidden">
        <div className="mx-auto max-w-5xl">
          {header}
          <IsoIsland placed={autoPlaced} materials={island.materials} dragHint={island.dragHint} />
          <div className="mt-8">
            <StepList steps={t.steps} activeStage={stageOf(autoPlaced)} />
          </div>
        </div>
      </div>
    </section>
  );
}
