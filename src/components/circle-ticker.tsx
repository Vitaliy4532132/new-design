import Image from "next/image";
import { Zap } from "lucide-react";
import { TELEGRAM_URL } from "@/lib/links";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const WORK_IMAGES = [
  { src: "/work/sakura-island-1.png", alt: "Сакура-остров, павильоны" },
  { src: "/work/medieval-town-1.png", alt: "Средневековый город" },
  { src: "/work/duckworld.png", alt: "Сборка DuckWorld" },
  { src: "/work/tropical-island-1.png", alt: "Тропический остров" },
  { src: "/work/sakura-island-2.png", alt: "Сакура-остров, спавн" },
  { src: "/work/floating-treehouse.png", alt: "Дом на дереве, парящий остров" },
  { src: "/work/medieval-town-2.png", alt: "Средневековый город, площадь" },
  { src: "/work/sakura-island-3.png", alt: "Сакура-остров, вид сверху" },
  { src: "/work/tropical-island-2.png", alt: "Тропический остров, бухта" },
  { src: "/work/sakura-island-4.png", alt: "Сакура-остров, крыши" },
];

const CARD_COUNT = 20;
const RADIUS = 660;

const cards = Array.from({ length: CARD_COUNT }, (_, i) => {
  const angle = (360 / CARD_COUNT) * i;
  return {
    angle,
    image: WORK_IMAGES[i % WORK_IMAGES.length],
  };
});

export function CircleTicker({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].ticker;
  return (
    <section className="relative h-[760px] overflow-hidden">
      <div
        className="absolute top-[740px] left-1/2 h-px w-px animate-wheel-spin"
        style={{ transform: "translateX(-50%)" }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="absolute top-0 left-0 -mt-[50px] -ml-[50px] h-[100px] w-[100px] overflow-hidden rounded-[26px] border border-white/5 bg-[#080808] shadow-[0_16px_30px_rgba(0,0,0,0.5)]"
            style={{
              transform: `rotate(${card.angle}deg) translate(0,-${RADIUS}px)`,
            }}
          >
            <div className="absolute inset-[2px] overflow-hidden rounded-[22px]">
              <Image
                src={card.image.src}
                alt={card.image.alt}
                fill
                sizes="100px"
                className="object-cover"
              />
            </div>
            <div
              className="absolute inset-[2px] rounded-[22px] border-[0.5px] border-white/20 mix-blend-overlay"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.15) 100%)",
              }}
            />
          </div>
        ))}
      </div>

      <div
        className="absolute right-0 bottom-0 left-0 z-[3] h-[360px]"
        style={{
          background:
            "linear-gradient(180deg, transparent, var(--background) 75%)",
        }}
      />

      <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center px-6 text-center">
        <div className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-[40px] border border-white/5 bg-[linear-gradient(0deg,rgba(0,85,255,0.08)_0%,rgba(153,153,153,0.1)_100%)] py-1.5 pr-[18px] pl-1.5">
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.15) 0deg, rgba(255,255,255,0) 72deg, rgba(79,26,214,0.2) 172deg, rgba(255,255,255,0) 270deg, rgba(255,255,255,0.15) 360deg)",
            }}
          />
          <span
            className="relative flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-white/15"
            style={{
              background: "linear-gradient(rgb(26,73,214) 0%, rgb(89,158,227) 100%)",
            }}
          >
            <Zap size={13} className="fill-white text-white" />
          </span>
          <span className="relative text-sm font-medium tracking-[-0.3px] text-white">
            {t.badge}
          </span>
        </div>

        <div
          className="mx-auto my-7 h-px w-[90px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(32,81,227,0) 0%, rgb(26,76,214) 52%, rgba(0,85,255,0) 100%)",
          }}
        />

        <h2 className="max-w-[600px] font-display text-[54px] leading-[50px] font-normal tracking-[-1.9px]">
          <span className="font-medium">{t.h2Bold}</span>
          {t.h2After}
        </h2>

        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener"
          className="mt-[30px] inline-block rounded-[10px] border-[3px] border-white/15 px-7 py-3.5 text-sm font-medium tracking-[-0.3px] text-white"
        >
          {t.cta}
        </a>
      </div>
    </section>
  );
}
