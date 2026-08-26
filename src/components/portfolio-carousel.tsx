"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { portfolioAlt } from "@/lib/portfolio-alt";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const RAW_SLIDES = [
  { src: "/work/sakura-island-4.png", title: "Сакура-остров, крыши", category: "build" as const },
  { src: "/work/medieval-town-1.png", title: "Средневековый город", category: "map" as const },
  { src: "/work/duckworld.png", title: "DuckWorld", category: "server" as const },
  { src: "/work/tropical-island-1.png", title: "Тропический остров", category: "map" as const },
  { src: "/work/floating-treehouse.png", title: "Парящий остров", category: "map" as const },
  { src: "/work/sakura-island-1.png", title: "Сакура-остров, павильоны", category: "build" as const },
  { src: "/work/medieval-town-2.png", title: "Средневековый город, площадь", category: "map" as const },
  { src: "/work/tropical-island-2.png", title: "Тропический остров, бухта", category: "map" as const },
  { src: "/work/sakura-island-3.png", title: "Сакура-остров, вид сверху", category: "build" as const },
  { src: "/work/sakura-island-2.png", title: "Сакура-остров, спавн", category: "build" as const },
];

const N = RAW_SLIDES.length;

function shortestOffset(i: number, index: number) {
  let delta = i - index;
  if (delta > N / 2) delta -= N;
  if (delta < -N / 2) delta += N;
  return delta;
}

const SCALE_STEPS = [1, 0.82, 0.68, 0.55];
const OPACITY_STEPS = [1, 0.75, 0.45, 0];
const BRIGHTNESS_STEPS = [1, 0.6, 0.35, 0.35];

function getCardStyle(offset: number): React.CSSProperties {
  const abs = Math.min(Math.abs(offset), 3);
  const sign = Math.sign(offset);

  if (offset === 0) {
    return {
      transform: "none",
      opacity: 1,
      filter: "brightness(1)",
      zIndex: 10,
      pointerEvents: "auto",
    };
  }

  const translateX = sign * abs * 178.25;
  const translateZ = -abs * 103.5;
  const rotateY = sign * abs * 16;
  const scale = SCALE_STEPS[abs];
  const opacity = Math.abs(offset) > 3 ? 0 : OPACITY_STEPS[abs];
  const brightness = BRIGHTNESS_STEPS[abs];

  return {
    transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
    opacity,
    filter: `brightness(${brightness})`,
    zIndex: 10 - abs,
    pointerEvents: Math.abs(offset) <= 1 ? "auto" : "none",
  };
}

export function PortfolioCarousel({ locale = "ru" }: { locale?: Locale }) {
  const [index, setIndex] = useState(Math.floor(N / 2));
  const pausedRef = useRef(false);
  const t = HOME_COPY[locale].carousel;
  const categoryLabels = HOME_COPY[locale].categoryLabels;
  const SLIDES = RAW_SLIDES.map((s) => ({ ...s, categoryLabel: categoryLabels[s.category] }));

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setIndex((i) => (i + 1) % N);
      }
    }, 10000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + N) % N);
  const next = () => setIndex((i) => (i + 1) % N);

  return (
    <section
      className="relative overflow-hidden bg-background px-6 py-28"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="mx-auto mb-16 max-w-5xl">
        <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
          {t.eyebrow}
        </div>
        <h2 className="font-display text-4xl font-medium sm:text-[44px]">
          {t.title}
        </h2>
      </div>

      <div
        style={{
          background: "rgba(0,0,0,0)",
          width: "100%",
          minHeight: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 0 32px",
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            flex: "1 1 0%",
            minHeight: 420,
            perspective: 1380,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            aria-label="Previous"
            onClick={prev}
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 100,
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.07)",
              color: "#fff",
              fontSize: 15,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            ←
          </button>
          <button
            aria-label="Next"
            onClick={next}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 100,
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.07)",
              color: "#fff",
              fontSize: 15,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            →
          </button>

          {SLIDES.map((slide, i) => {
            const offset = shortestOffset(i, index);
            const style = getCardStyle(offset);
            return (
              <div
                key={slide.src}
                role="button"
                aria-label={slide.title}
                tabIndex={0}
                onClick={() => setIndex(i)}
                style={{
                  position: "absolute",
                  width: "min(483px, 86vw)",
                  height: "100%",
                  borderRadius: 18,
                  overflow: "hidden",
                  cursor: "pointer",
                  transformStyle: "preserve-3d",
                  outline: "none",
                  willChange: "transform",
                  transition:
                    "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease, filter 0.6s ease",
                  ...style,
                }}
              >
                <Image
                  src={slide.src}
                  alt={portfolioAlt(slide.title, slide.categoryLabel, locale)}
                  fill
                  sizes="483px"
                  className="object-cover"
                  priority={offset === 0}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 22,
                    left: 16,
                    right: 16,
                    color: "#fff",
                    lineHeight: "1.28em",
                    letterSpacing: "-0.01em",
                    fontFamily: "var(--font-sans)",
                    textAlign: "left",
                  }}
                >
                  <div className="mb-1 font-mono text-[11px] tracking-widest text-accent uppercase">
                    {slide.categoryLabel}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>
                    {slide.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 28 }}>
          {SLIDES.map((_, i) => (
            <div
              key={i}
              role="button"
              aria-label={`Go to slide ${i + 1}`}
              tabIndex={0}
              onClick={() => setIndex(i)}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background:
                  i === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                transform: i === index ? "scale(1.4)" : "scale(1)",
                transition: "0.3s",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
