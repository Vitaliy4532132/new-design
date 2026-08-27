// Данные страницы товара. Структура повторяет основной сайт: у товара есть
// категория, галерея, версии со своими ценами, характеристики и отзывы.
//
// НАСТОЯЩЕЕ: названия, описания и цены — из products в home-copy; стек и
// совместимость — из того, что сайт заявляет на страницах услуг; отзывы —
// из testimonials, привязаны по имени автора; поддержка на месяц у плагинов —
// из отзыва Mavier.
//
// ЗАПОЛНИТЬ ПЕРЕД ПУБЛИКАЦИЕЙ:
//   images       — сейчас кадры из портфолио, нужны снимки самих продуктов
//   dependencies — состав придуман как пример; неверный список заставит
//                  покупателя поставить не те плагины
//   changelog    — версии и даты придуманы как пример
//   support      — условия поддержки подтвердить

export type ProductVersion = {
  label: string;
  /** Если версии будут стоить по-разному, цена берётся отсюда и
   *  перекрывает базовую. Сейчас у всех товаров цена одна. */
  price?: string;
  note: string;
};

export type Dependency = {
  name: string;
  required: boolean;
  note: string;
};

export type ChangelogEntry = {
  version: string;
  date: string;
  changes: string[];
};

export type ProductDetail = {
  slug: string;
  images: string[];
  versions: ProductVersion[];
  /** Развёрнутое описание: что умеет товар. Абзацами. */
  about: string[];
  features: string[];
  dependencies: Dependency[];
  changelog: ChangelogEntry[];
  support: { included: boolean; note: string };
  specs: { label: string; value: string }[];
  /** Имена авторов из testimonials, чьи отзывы относятся к этому товару. */
  reviewAuthors: string[];
  /** Скидка. Компонент умеет её показывать вместе с обратным отсчётом,
   *  но выдумывать распродажу на настоящий товар нельзя — включать вручную. */
  discount?: { percent: number; until: string };
};

const MC_VERSIONS: ProductVersion[] = [
  { label: "1.16–1.17", note: "Legacy-сборки на старых ядрах" },
  { label: "1.18–1.20", note: "Самые распространённые версии" },
  { label: "1.21.x", note: "Актуальная ветка" },
];

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  furrynick: {
    slug: "furrynick",
    images: ["/work/duckworld.png", "/work/sakura-island-2.png"],
    versions: MC_VERSIONS,
    about: [
      "Плагин на смену ника: игрок вводит /nick и отображается под другим именем — в чате, в табе и над головой.",
      "Кому разрешено менять ник, а кому нет, настраивается правами. Можно открыть смену только донатерам или отдельной группе.",
      "Формат отображения задаётся в конфиге, поэтому плагин не конфликтует с оформлением чата на сервере.",
    ],
    features: [
      "Команда /nick для смены ника",
      "Ограничения по правам через LuckPerms",
      "Настройка формата отображения",
      "Совместим с чат-плагинами",
    ],
    dependencies: [
      { name: "LuckPerms", required: false, note: "Нужен, если раздавать право на смену ника по группам" },
    ],
    changelog: [
      {
        version: "1.2.0",
        date: "2026-06-14",
        changes: ["Поддержка 1.21.x", "Ник теперь меняется и в табе", "Исправлен сброс ника при перезаходе"],
      },
      {
        version: "1.1.0",
        date: "2026-03-02",
        changes: ["Настройка формата отображения в конфиге", "Права на смену ника по группам"],
      },
      { version: "1.0.0", date: "2026-01-20", changes: ["Первый релиз"] },
    ],
    support: { included: true, note: "Месяц поддержки после покупки" },
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
    versions: MC_VERSIONS,
    about: [
      "Чат для сервера с модерацией на основе ИИ: плагин сам разбирает сообщения и убирает мат, спам и рекламу, не требуя списка запрещённых слов вручную.",
      "Оформление чата настраивается целиком — префиксы, цвета, формат сообщений и разделение по каналам.",
      "Любую функцию можно выключить в конфиге, если она не нужна: плагин не навязывает свой сценарий и не ломает то, что уже настроено на сервере.",
    ],
    features: [
      "AI-модерация мата и спама",
      "Кастомное форматирование чата",
      "Любую функцию можно отключить",
      "Конфигурация понятна новичку",
    ],
    dependencies: [
      { name: "LuckPerms", required: false, note: "Для префиксов и прав по группам" },
      { name: "PlaceholderAPI", required: false, note: "Если нужны плейсхолдеры в формате сообщений" },
    ],
    changelog: [
      {
        version: "2.1.0",
        date: "2026-07-08",
        changes: ["Поддержка 1.21.x", "Ускорена проверка сообщений", "Добавлены каналы чата"],
      },
      {
        version: "2.0.0",
        date: "2026-04-11",
        changes: ["Модерация переведена на ИИ", "Переписан конфиг", "Любой модуль можно отключить"],
      },
      { version: "1.0.0", date: "2025-12-05", changes: ["Первый релиз"] },
    ],
    support: { included: true, note: "Месяц поддержки после покупки" },
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
    about: [
      "Готовая анархическая сборка: сервер запускается сразу, без донастройки плагинов и подбора конфигов.",
      "Выдерживает 100+ игроков одновременно — набор плагинов подобран под нагрузку, а не собран по принципу «поставим всё».",
      "Античит настроен так, чтобы ловить читеров и не банить честных игроков, известные дюпы закрыты. Подключаться можно и с Java, и с Bedrock.",
    ],
    features: [
      "Держит 100+ игроков онлайн",
      "Настроенный античит",
      "Дюпы закрыты",
      "Ставится и на Java, и на Bedrock",
    ],
    dependencies: [
      { name: "Paper", required: true, note: "Сборка рассчитана на это ядро" },
      { name: "MySQL", required: false, note: "Нужен при большом онлайне вместо SQLite" },
    ],
    changelog: [
      {
        version: "2.1",
        date: "2026-05-19",
        changes: ["Закрыты найденные дюпы", "Обновлён античит", "Снижена нагрузка на TPS"],
      },
      { version: "2.0", date: "2026-02-08", changes: ["Пересобрана экономика", "Обновлён набор плагинов"] },
    ],
    support: { included: false, note: "Разовая покупка, доработки обсуждаются отдельно" },
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
    about: [
      "Готовый Box PvP сервер: режим собран целиком, от карты до экономики, и запускается как есть.",
      "Набор плагинов подобран под режим, баланс выдачи и цен уже сведён — не придётся неделю подкручивать цифры после старта.",
    ],
    features: [
      "Готовый Box PvP сервер",
      "Настроен и готов к запуску",
      "Экономика сбалансирована",
      "Набор плагинов подобран",
    ],
    dependencies: [{ name: "Paper", required: true, note: "Сборка рассчитана на это ядро" }],
    changelog: [
      { version: "2.0", date: "2026-04-02", changes: ["Пересобран баланс экономики", "Обновлена карта спавна"] },
    ],
    support: { included: false, note: "Разовая покупка, доработки обсуждаются отдельно" },
    specs: [
      { label: "Тип", value: "Сборка" },
      { label: "Режим", value: "Box PvP" },
      { label: "Версии", value: "1.16 – 1.20" },
      { label: "Состояние", value: "Готов к запуску" },
    ],
    reviewAuthors: [],
  },
};
