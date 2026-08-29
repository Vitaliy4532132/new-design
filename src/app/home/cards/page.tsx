import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { Footer } from "@/components/v2/footer";
import {
  CardBlocks,
  CardCover,
  CardPoster,
  CardReveal,
  CardSlot,
  CardSplit,
  type CardProduct,
} from "@/components/v2/product-cards";
import { HOME_COPY } from "@/lib/home-copy";

// Служебная страница для выбора одного варианта карточки. Тексты здесь
// намеренно вписаны прямо в разметку: это рабочий инструмент, а не контент
// сайта, и переводить его незачем.
const LOCALE = "ru" as const;

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Выбор карточки товара — TheFurryDev",
    description: "Служебная страница для сравнения вариантов карточки.",
    path: "/home/cards",
  }),
  robots: { index: false, follow: false },
};

// Настоящих снимков товаров в проекте нет — берём кадры построек из портфолио
// как заглушку, чтобы сравнить композицию. На боевой магазин нужны кадры
// самих продуктов, иначе покупатель увидит не то, что покупает.
const PLACEHOLDER_IMAGES = [
  "/work/duckworld.png",
  "/work/sakura-island-1.png",
  "/work/medieval-town-1.png",
  "/work/tropical-island-1.png",
];

const VARIANTS = [
  {
    n: "01",
    name: "Обложка сверху",
    note: "Самый привычный формат. Картинка не спорит с текстом, читается быстро, хорошо ложится в сетку из четырёх.",
    Card: CardCover,
    grid: "sm:grid-cols-2 lg:grid-cols-3",
  },
  {
    n: "02",
    name: "Во всю карточку",
    note: "Картинка работает фоном, текст лежит поверх. Смотрится дороже всего, но описание читается хуже — нужны хорошие кадры.",
    Card: CardPoster,
    grid: "sm:grid-cols-2 lg:grid-cols-3",
  },
  {
    n: "03",
    name: "Горизонтальная",
    note: "Картинка слева. Экономит высоту и хорошо работает списком, если товаров станет много.",
    Card: CardSplit,
    grid: "sm:grid-cols-1 lg:grid-cols-2",
  },
  {
    n: "04",
    name: "С раскрытием",
    note: "Видно только название, описание выезжает при наведении. Чисто выглядит, но на телефоне ховера нет — там текст показан сразу.",
    Card: CardReveal,
    grid: "sm:grid-cols-2 lg:grid-cols-3",
  },
  {
    n: "05",
    name: "В рамке-слоте",
    note: "Картинка утоплена в слот, как предмет в инвентаре. Сильнее всех держит связь с островом и верстаком.",
    Card: CardSlot,
    grid: "sm:grid-cols-2 lg:grid-cols-3",
  },
  {
    n: "06",
    name: "Сборка из блоков",
    note: "Картинка проявляется из блоков при появлении в экране. Тот же приём, что в портфолио на главной.",
    Card: CardBlocks,
    grid: "sm:grid-cols-2 lg:grid-cols-3",
  },
];

export default function CardsPickerPage() {
  const products = HOME_COPY[LOCALE].products;

  const cards: CardProduct[] = products.items.slice(0, 3).map((p, i) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    price: p.price,
    kind: p.kind,
    typeLabel: products.typeLabels[p.kind],
    buyLabel: products.buyLabel,
    image: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
    alt: `${p.title} — изображение-заглушка`,
    href: `https://www.thefurry.store/shop/${p.slug}?utm_source=landing&utm_medium=cta`,
  }));

  return (
    <main>
      <Nav locale={LOCALE} />

      <section className="px-5 pt-32 pb-12 sm:px-6 sm:pt-40">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 font-mono text-xs tracking-widest text-brand uppercase">выбор</div>
          <h1 className="mb-5 font-display text-[32px] leading-[1.12] font-medium break-words sm:text-5xl">
            Карточка товара — шесть вариантов.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
            Выбери один, и я поставлю его в магазин. Картинки здесь — заглушки из
            портфолио: настоящих снимков товаров в проекте нет, и ставить чужие
            постройки вместо них на боевую страницу нельзя.
          </p>
        </div>
      </section>

      {VARIANTS.map(({ n, name, note, Card, grid }) => (
        <section key={n} className="border-t border-white/10 px-5 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="font-mono text-sm text-brand">{n}</span>
              <h2 className="font-display text-2xl font-medium">{name}</h2>
            </div>
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-text-muted">{note}</p>

            <div className={`grid grid-cols-1 gap-4 ${grid}`}>
              {cards.map((p) => (
                <Card key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer locale={LOCALE} />
    </main>
  );
}
