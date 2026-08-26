import type { Locale } from "@/lib/i18n";

export type PortfolioCategory = "build" | "map" | "server";

export type PortfolioItem = {
  slug: string;
  src: string;
  category: PortfolioCategory;
  featured: boolean;
  title: Record<Locale, string>;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "sakura-island-1",
    src: "/work/sakura-island-1.png",
    category: "build",
    featured: true,
    title: { ru: "Сакура-остров", en: "Sakura Island", uk: "Сакура-острів" },
  },
  {
    slug: "medieval-town-1",
    src: "/work/medieval-town-1.png",
    category: "map",
    featured: true,
    title: { ru: "Средневековый город", en: "Medieval Town", uk: "Середньовічне місто" },
  },
  {
    slug: "duckworld",
    src: "/work/duckworld.png",
    category: "server",
    featured: true,
    title: { ru: "DuckWorld", en: "DuckWorld", uk: "DuckWorld" },
  },
  {
    slug: "tropical-island-1",
    src: "/work/tropical-island-1.png",
    category: "map",
    featured: false,
    title: { ru: "Тропический остров", en: "Tropical Island", uk: "Тропічний острів" },
  },
  {
    slug: "floating-treehouse",
    src: "/work/floating-treehouse.png",
    category: "map",
    featured: false,
    title: { ru: "Парящий остров", en: "Floating Treehouse", uk: "Плаваючий будиночок на дереві" },
  },
  {
    slug: "sakura-island-3",
    src: "/work/sakura-island-3.png",
    category: "build",
    featured: false,
    title: { ru: "Сакура-остров, вид сверху", en: "Sakura Island, aerial view", uk: "Сакура-острів, вигляд згори" },
  },
  {
    slug: "sakura-island-2",
    src: "/work/sakura-island-2.png",
    category: "build",
    featured: false,
    title: { ru: "Сакура-остров, спавн", en: "Sakura Island, spawn", uk: "Сакура-острів, спавн" },
  },
  {
    slug: "medieval-town-2",
    src: "/work/medieval-town-2.png",
    category: "map",
    featured: false,
    title: { ru: "Средневековый город, площадь", en: "Medieval Town, square", uk: "Середньовічне місто, площа" },
  },
  {
    slug: "tropical-island-2",
    src: "/work/tropical-island-2.png",
    category: "map",
    featured: false,
    title: { ru: "Тропический остров, бухта", en: "Tropical Island, bay", uk: "Тропічний острів, бухта" },
  },
  {
    slug: "sakura-island-4",
    src: "/work/sakura-island-4.png",
    category: "build",
    featured: false,
    title: { ru: "Сакура-остров, крыши", en: "Sakura Island, rooftops", uk: "Сакура-острів, дахи" },
  },
];

export function getFeaturedPortfolio(limit = 3): PortfolioItem[] {
  return PORTFOLIO_ITEMS.filter((item) => item.featured).slice(0, limit);
}
