// Данные страницы товара. Структура повторяет основной сайт: у товара есть
// категория, галерея, версии со своими ценами, характеристики и отзывы.
//
// Что здесь настоящее: названия, описания и цены — из products в home-copy,
// совместимость и стек — из того, что сайт уже заявляет на страницах услуг,
// отзывы — реальные, из testimonials, привязаны по имени автора.
//
// Что заглушка: images. Настоящих снимков товаров в проекте нет, поэтому
// стоят кадры из портфолио. Перед публикацией заменить на кадры самих
// продуктов, иначе покупатель увидит не то, что покупает.

export type ProductVersion = {
  label: string;
  /** Если версии будут стоить по-разному, цена берётся отсюда и
   *  перекрывает базовую. Сейчас у всех товаров цена одна. */
  price?: string;
  note: string;
};

export type ProductDetail = {
  slug: string;
  images: string[];
  versions: ProductVersion[];
  features: string[];
  specs: { label: string; value: string }[];
  /** Имена авторов из testimonials, чьи отзывы относятся к этому товару. */
  reviewAuthors: string[];
  /** Скидка. Компонент умеет её показывать вместе с обратным отсчётом,
   *  но выдумывать распродажу на настоящий товар нельзя — включать вручную. */
  discount?: { percent: number; until: string };
};

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  furrynick: {
    slug: "furrynick",
    images: ["/work/duckworld.png", "/work/sakura-island-2.png"],
    versions: [
      { label: "1.16–1.17", note: "Legacy-сборки на старых ядрах" },
      { label: "1.18–1.20", note: "Самые распространённые версии" },
      { label: "1.21.x", note: "Актуальная ветка" },
    ],
    features: [
      "Команда /nick для смены ника",
      "Ограничения по правам через LuckPerms",
      "Настройка формата отображения",
      "Совместим с чат-плагинами",
    ],
    specs: [
      { label: "Тип", value: "Плагин" },
      { label: "Язык", value: "Java" },
      { label: "Ядра", value: "Spigot, Paper" },
      { label: "Версии", value: "1.16 – 1.21.x" },
    ],
    reviewAuthors: [],
  },
  furrychat: {
    slug: "furrychat",
    images: ["/work/medieval-town-1.png", "/work/medieval-town-2.png"],
    versions: [
      { label: "1.16–1.17", note: "Legacy-сборки на старых ядрах" },
      { label: "1.18–1.20", note: "Самые распространённые версии" },
      { label: "1.21.x", note: "Актуальная ветка" },
    ],
    features: [
      "AI-модерация мата и спама",
      "Кастомное форматирование чата",
      "Любую функцию можно отключить",
      "Конфигурация понятна новичку",
    ],
    specs: [
      { label: "Тип", value: "Плагин" },
      { label: "Язык", value: "Kotlin" },
      { label: "Ядра", value: "Spigot, Paper" },
      { label: "Версии", value: "1.16 – 1.21.x" },
    ],
    reviewAuthors: ["wanthh1507"],
  },
  "solaranarchy-v2": {
    slug: "solaranarchy-v2",
    images: ["/work/sakura-island-1.png", "/work/sakura-island-3.png", "/work/floating-treehouse.png"],
    versions: [{ label: "1.16.5", note: "Версия, на которой собрана сборка" }],
    features: [
      "Держит 100+ игроков онлайн",
      "Настроенный античит",
      "Дюпы закрыты",
      "Ставится и на Java, и на Bedrock",
    ],
    specs: [
      { label: "Тип", value: "Сборка" },
      { label: "Режим", value: "Анархия" },
      { label: "Версия", value: "1.16.5" },
      { label: "Онлайн", value: "100+" },
    ],
    reviewAuthors: ["Urchxula", "StarCore"],
  },
  "solarbox-v2": {
    slug: "solarbox-v2",
    images: ["/work/tropical-island-1.png", "/work/tropical-island-2.png"],
    versions: [{ label: "1.16–1.20", note: "Проверено на этих версиях" }],
    features: [
      "Готовый Box PvP сервер",
      "Настроен и готов к запуску",
      "Экономика сбалансирована",
      "Набор плагинов подобран",
    ],
    specs: [
      { label: "Тип", value: "Сборка" },
      { label: "Режим", value: "Box PvP" },
      { label: "Версии", value: "1.16 – 1.20" },
      { label: "Состояние", value: "Готов к запуску" },
    ],
    reviewAuthors: [],
  },
};
