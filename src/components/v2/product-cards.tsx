"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { IsoCube } from "@/components/v2/iso-cube";
import { BASE_PATH } from "@/lib/base-path";

export type CardProduct = {
  slug: string;
  title: string;
  description: string;
  price: string;
  kind: "plugin" | "build";
  typeLabel: string;
  buyLabel: string;
  image: string;
  alt: string;
  /** Внутренний путь открывается через Link, внешний — в новой вкладке. */
  href: string;
};

const KIND_COLOR: Record<"plugin" | "build", string> = {
  plugin: "#7F52FF",
  build: "#6CB33F",
};

const SHELL =
  "group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors hover:border-accent/40";

// Карточка может вести и на свою страницу товара, и сразу в магазин,
// поэтому тип ссылки выбирается по самому href.
function CardShell({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function TypeLabel({ p }: { p: CardProduct }) {
  return (
    <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: KIND_COLOR[p.kind] }}>
      {p.typeLabel}
    </div>
  );
}

function BuyButton({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 font-sans text-[13px] font-bold text-background transition-transform group-hover:scale-105">
      <ShoppingBag size={14} />
      {label}
    </span>
  );
}

function Body({ p, bordered = true }: { p: CardProduct; bordered?: boolean }) {
  return (
    <div className="flex flex-1 flex-col p-5">
      <div className="mb-2">
        <TypeLabel p={p} />
      </div>
      <h3 className="mb-2 font-display text-lg font-medium">{p.title}</h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-text-muted">{p.description}</p>
      <div className={`flex items-center justify-between ${bordered ? "border-t border-white/10 pt-4" : ""}`}>
        <span className="font-display text-lg font-medium">{p.price}</span>
        <BuyButton label={p.buyLabel} />
      </div>
    </div>
  );
}

/* 1. Обложка сверху — самый привычный формат, картинка не спорит с текстом. */
export function CardCover({ p }: { p: CardProduct }) {
  return (
    <CardShell href={p.href} className={SHELL}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={`${BASE_PATH}${p.image}`}
          alt={p.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <Body p={p} />
    </CardShell>
  );
}

/* 2. Во всю карточку — картинка работает фоном, текст лежит поверх. */
export function CardPoster({ p }: { p: CardProduct }) {
  return (
    <CardShell href={p.href} className={`${SHELL} relative aspect-[4/5]`}>
      <Image
        src={`${BASE_PATH}${p.image}`}
        alt={p.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="relative mt-auto p-5">
        <div className="mb-2">
          <TypeLabel p={p} />
        </div>
        <h3 className="mb-2 font-display text-xl font-medium">{p.title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-text-muted">{p.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-medium">{p.price}</span>
          <BuyButton label={p.buyLabel} />
        </div>
      </div>
    </CardShell>
  );
}

/* 3. Горизонтальная — картинка слева. Хорошо читается в списке. */
export function CardSplit({ p }: { p: CardProduct }) {
  return (
    <CardShell href={p.href} className={`${SHELL} sm:flex-row`}>
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-44">
        <Image
          src={`${BASE_PATH}${p.image}`}
          alt={p.alt}
          fill
          sizes="(min-width: 640px) 176px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <Body p={p} bordered={false} />
    </CardShell>
  );
}

/* 4. С раскрытием — описание выезжает при наведении. На тач-устройствах
   ховера нет, поэтому там текст показан сразу. */
export function CardReveal({ p }: { p: CardProduct }) {
  return (
    <CardShell href={p.href} className={`${SHELL} relative aspect-[4/5]`}>
      <Image
        src={`${BASE_PATH}${p.image}`}
        alt={p.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover brightness-75 transition-all duration-500 group-hover:scale-110 group-hover:brightness-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="relative mt-auto p-5">
        <div className="mb-2">
          <TypeLabel p={p} />
        </div>
        <h3 className="font-display text-xl font-medium">{p.title}</h3>
        <div className="grid grid-rows-[1fr] transition-all duration-500 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-2 text-sm leading-relaxed text-text-muted">{p.description}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-lg font-medium">{p.price}</span>
          <BuyButton label={p.buyLabel} />
        </div>
      </div>
    </CardShell>
  );
}

/* 5. В рамке-слоте — картинка утоплена в слот, как предмет в инвентаре. */
export function CardSlot({ p }: { p: CardProduct }) {
  return (
    <CardShell
      href={p.href}
      className="group flex flex-col rounded-lg bg-[#15151a] p-3 transition-colors hover:bg-[#1b1b22]"
    >
      <div
        className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[3px] bg-[#0d0d11]"
        style={{ boxShadow: "inset 2px 2px 0 rgba(0,0,0,0.55), inset -2px -2px 0 rgba(255,255,255,0.07)" }}
      >
        <Image
          src={`${BASE_PATH}${p.image}`}
          alt={p.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <IsoCube color={KIND_COLOR[p.kind]} size={18} />
        </div>
      </div>
      <div className="px-2 pb-2">
        <div className="mb-2">
          <TypeLabel p={p} />
        </div>
        <h3 className="mb-2 font-display text-lg font-medium">{p.title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-text-muted">{p.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-medium">{p.price}</span>
          <BuyButton label={p.buyLabel} />
        </div>
      </div>
    </CardShell>
  );
}

/* 6. Сборка из блоков — картинка проявляется из блоков, как в портфолио. */
const COLS = 6;
const ROWS = 4;

// Детерминированная задержка: Math.random() дал бы разные значения на сервере
// и в браузере, и React сообщил бы о рассинхроне гидратации.
function blockDelay(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 600;
}

export function CardBlocks({ p }: { p: CardProduct }) {
  // Наблюдаем за самой картинкой, а не за карточкой: так сборка начинается
  // ровно тогда, когда изображение попало в экран.
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <CardShell href={p.href} className={SHELL}>
      <div ref={ref} className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={`${BASE_PATH}${p.image}`}
          alt={p.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${COLS},1fr)`, gridTemplateRows: `repeat(${ROWS},1fr)` }}
          aria-hidden
        >
          {Array.from({ length: COLS * ROWS }).map((_, i) => (
            <span
              key={i}
              className="bg-surface transition-opacity duration-500 ease-out"
              style={{ opacity: inView ? 0 : 1, transitionDelay: `${blockDelay(i)}ms` }}
            />
          ))}
        </div>
      </div>
      <Body p={p} />
    </CardShell>
  );
}
