import type { PortfolioCategory } from "@/lib/portfolio-data";

// Тексты страницы портфолио и подробности по каждой работе.
//
// Настоящее: названия, категории и сами кадры — из portfolio-data.
// Заглушки: описания, теги и цифры (онлайн, срок, версия). Реальные знаете
// только вы — заменить перед публикацией.

export type WorkDetail = {
  description: string;
  tags: string[];
  stats: { value: string; label: string }[];
};

export const WORK_DETAILS: Record<string, WorkDetail> = {
  "sakura-island-1": {
    description:
      "Спавн в японском стиле: павильоны, сады камней и цветущая сакура. Каждое строение собрано вручную, без готовых схем.",
    tags: ["Спавн", "Японский стиль", "1.20"],
    stats: [
      { value: "120+", label: "онлайн" },
      { value: "3 недели", label: "разработка" },
      { value: "1.20.x", label: "версия" },
    ],
  },
  "medieval-town-1": {
    description:
      "Средневековый город с площадью, ремесленными кварталами и крепостной стеной. Планировка рассчитана под RPG-режим.",
    tags: ["Город", "RPG", "1.21"],
    stats: [
      { value: "80+", label: "онлайн" },
      { value: "5 недель", label: "разработка" },
      { value: "1.21.x", label: "версия" },
    ],
  },
  duckworld: {
    description:
      "Сервер под ключ: прокси, лобби, экономика и набор самописных плагинов. От идеи до запуска — одной командой.",
    tags: ["Под ключ", "Velocity", "Экономика"],
    stats: [
      { value: "200+", label: "онлайн" },
      { value: "2 месяца", label: "разработка" },
      { value: "1.21.x", label: "версия" },
    ],
  },
  "tropical-island-1": {
    description: "Тропический остров с бухтой и пляжной зоной — карта под мини-игры и ивенты.",
    tags: ["Карта", "Мини-игры"],
    stats: [
      { value: "2 недели", label: "разработка" },
      { value: "1.20.x", label: "версия" },
    ],
  },
  "floating-treehouse": {
    description: "Парящий остров с домом на дереве — стартовая локация для скайблок-режима.",
    tags: ["SkyBlock", "Спавн"],
    stats: [
      { value: "10 дней", label: "разработка" },
      { value: "1.21.x", label: "версия" },
    ],
  },
  "sakura-island-3": {
    description: "Тот же остров с высоты: видно планировку кварталов и переходы между зонами.",
    tags: ["Спавн", "Японский стиль"],
    stats: [{ value: "1.20.x", label: "версия" }],
  },
  "sakura-island-2": {
    description: "Центральная площадь спавна — точка появления игроков и порталы на режимы.",
    tags: ["Спавн", "Порталы"],
    stats: [{ value: "1.20.x", label: "версия" }],
  },
  "medieval-town-2": {
    description: "Торговая площадь города с рядами лавок и фонтаном в центре.",
    tags: ["Город", "RPG"],
    stats: [{ value: "1.21.x", label: "версия" }],
  },
  "tropical-island-2": {
    description: "Бухта с причалом — зона для водных ивентов и старта заплывов.",
    tags: ["Карта", "Ивенты"],
    stats: [{ value: "1.20.x", label: "версия" }],
  },
  "sakura-island-4": {
    description: "Крыши павильонов вблизи: черепица, резьба и подсветка фонарями.",
    tags: ["Детали", "Японский стиль"],
    stats: [{ value: "1.20.x", label: "версия" }],
  },
};

export const PORTFOLIO_PAGE = {
  eyebrow: "портфолио",
  titleBefore: "Проекты, которые мы ",
  titleHighlight: "построили",
  titleAfter: ".",
  lead: "Сборки, карты и сервера под ключ. Всё сделано с нуля под конкретный проект — не переделки чужих шаблонов.",
  allLabel: "Все",
  stats: [
    { value: "100+", label: "проектов" },
    { value: "87+", label: "клиентов" },
    { value: "24/7", label: "поддержка" },
  ],
  featuredLabel: "Главная работа",
  emptyLabel: "В этой категории пока пусто.",
};

export const CATEGORY_ORDER: PortfolioCategory[] = ["build", "map", "server"];
