import type { Locale } from "@/lib/i18n";

// Тексты страниц нового дизайна. Держим отдельно от home-copy, чтобы тот не
// разрастался: каждая следующая страница добавляет сюда свой блок.
export type ShopPageCopy = {
  eyebrow: string;
  titleBefore: string;
  titleHighlight: string;
  lead: string;
  allLabel: string;
  note: string;
  emptyLabel: string;
};

export const SHOP_PAGE: Record<Locale, ShopPageCopy> = {
  ru: {
    eyebrow: "магазин",
    titleBefore: "Готовые решения ",
    titleHighlight: "без разработки",
    lead: "Проверенные плагины и сборки, которые можно поставить на сервер уже сегодня. Оплата и выдача — на thefurry.store.",
    allLabel: "Все",
    note: "Нужно что-то под свою задачу? Плагины и сборки делаем на заказ — напишите, обсудим.",
    emptyLabel: "В этой категории пока пусто.",
  },
  en: {
    eyebrow: "shop",
    titleBefore: "Ready-made, ",
    titleHighlight: "no development",
    lead: "Proven plugins and packs you can put on your server today. Payment and delivery run through thefurry.store.",
    allLabel: "All",
    note: "Need something built for your own case? We make custom plugins and packs — just message us.",
    emptyLabel: "Nothing in this category yet.",
  },
  uk: {
    eyebrow: "магазин",
    titleBefore: "Готові рішення ",
    titleHighlight: "без розробки",
    lead: "Перевірені плагіни та збірки, які можна поставити на сервер уже сьогодні. Оплата й видача — на thefurry.store.",
    allLabel: "Всі",
    note: "Потрібно щось під свою задачу? Плагіни та збірки робимо на замовлення — напишіть, обговоримо.",
    emptyLabel: "У цій категорії поки порожньо.",
  },
};
