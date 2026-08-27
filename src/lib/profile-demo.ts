// Демонстрационные данные профиля. Бэкенда в этом проекте нет — всё ниже
// придумано, чтобы показать интерфейс. Пользователь намеренно обезличен:
// выдавать это за чей-то настоящий аккаунт нельзя.
//
// Состав повторяет профиль основного сайта: заказы со статусами и историей,
// покупки с ключами, баланс с историей операций, отзывы со статусом
// модерации и настройки с контактами.

export type OrderStatus = "new" | "progress" | "review" | "done" | "cancelled";

export const ORDER_STATUS: Record<OrderStatus, { label: string; className: string }> = {
  new: { label: "Новый", className: "border-white/20 text-text-muted" },
  progress: { label: "В работе", className: "border-accent/40 text-accent" },
  review: { label: "На согласовании", className: "border-yellow-500/40 text-yellow-400" },
  done: { label: "Готов", className: "border-green-400/40 text-green-400" },
  cancelled: { label: "Отменён", className: "border-red-500/40 text-red-400" },
};

export type ReviewStatus = "pending" | "approved" | "rejected";

export const REVIEW_STATUS: Record<ReviewStatus, { label: string; className: string }> = {
  pending: { label: "На модерации", className: "border-yellow-500/40 text-yellow-400" },
  approved: { label: "Опубликован", className: "border-green-400/40 text-green-400" },
  rejected: { label: "Отклонён", className: "border-red-500/40 text-red-400" },
};

export type DemoOrder = {
  id: string;
  title: string;
  status: OrderStatus;
  date: string;
  price: string;
  log: { date: string; text: string }[];
};

export type DemoDownload = {
  version: string;
  date: string;
  size: string;
  /** Свежая версия помечается и стоит первой. */
  latest: boolean;
};

export type LicenseServer = {
  ip: string;
  lastSeen: string;
};

export type DemoLicense = {
  key: string;
  status: "active" | "blocked";
  /** Серверы, где ключ сейчас активирован. Пусто — ни разу не запускался. */
  servers: LicenseServer[];
  maxActivations: number;
  issued: string;
};

export type DemoPurchase = {
  slug: string;
  title: string;
  date: string;
  price: string;
  version: string;
  licenseKey: string;
  license: DemoLicense;
  downloads: DemoDownload[];
  /** id отзыва из DEMO_REVIEWS, если покупатель уже его оставил. */
  reviewId?: string;
};

export type DemoTransaction = {
  id: string;
  date: string;
  text: string;
  amount: number;
};

export type DemoReview = {
  id: string;
  product: string;
  status: ReviewStatus;
  date: string;
  rating: number;
  text: string;
};

export const DEMO_USER = {
  name: "Игрок",
  username: "player",
  telegram: "@player",
  discord: "player#0000",
  balance: "1 240₽",
  since: "2026-01-14",
};

export const DEMO_ORDERS: DemoOrder[] = [
  {
    id: "1042",
    title: "Сборка SkyBlock под ключ",
    status: "progress",
    date: "2026-08-12",
    price: "5000₽",
    log: [
      { date: "2026-08-20", text: "Настроена экономика и баланс выдачи" },
      { date: "2026-08-16", text: "Собран спавн, идёт расстановка NPC" },
      { date: "2026-08-12", text: "Заказ принят, согласовано ТЗ" },
    ],
  },
  {
    id: "1027",
    title: "Плагин на кланы",
    status: "review",
    date: "2026-07-28",
    price: "1800₽",
    log: [
      { date: "2026-08-18", text: "Отправлен на проверку, ждём правки" },
      { date: "2026-07-28", text: "Заказ принят" },
    ],
  },
  {
    id: "0994",
    title: "Оптимизация сервера",
    status: "done",
    date: "2026-06-03",
    price: "500₽",
    log: [
      { date: "2026-06-05", text: "Работы приняты, TPS стабильно 20" },
      { date: "2026-06-03", text: "Заказ принят" },
    ],
  },
];

export const DEMO_PURCHASES: DemoPurchase[] = [
  {
    slug: "furrychat",
    title: "FurryChat",
    date: "2026-07-02",
    price: "299₽",
    version: "2.1.0",
    licenseKey: "FCHT-0000-0000-0000",
    license: {
      key: "FCHT-0000-0000-0000",
      status: "active",
      // Диапазоны из RFC 5737 — они зарезервированы под примеры и не ведут
      // ни на чей настоящий сервер.
      servers: [
        { ip: "192.0.2.14", lastSeen: "2026-08-25" },
        { ip: "198.51.100.7", lastSeen: "2026-08-19" },
      ],
      maxActivations: 3,
      issued: "2026-07-02",
    },
    downloads: [
      { version: "2.1.0", date: "2026-07-08", size: "1.4 МБ", latest: true },
      { version: "2.0.0", date: "2026-04-11", size: "1.2 МБ", latest: false },
      { version: "1.0.0", date: "2025-12-05", size: "0.9 МБ", latest: false },
    ],
    reviewId: "r3",
  },
  {
    slug: "furrynick",
    title: "FurryNick",
    date: "2026-05-19",
    price: "299₽",
    version: "1.2.0",
    licenseKey: "FNCK-0000-0000-0000",
    license: {
      key: "FNCK-0000-0000-0000",
      status: "active",
      servers: [],
      maxActivations: 3,
      issued: "2026-05-19",
    },
    downloads: [
      { version: "1.2.0", date: "2026-06-14", size: "0.6 МБ", latest: true },
      { version: "1.1.0", date: "2026-03-02", size: "0.5 МБ", latest: false },
      { version: "1.0.0", date: "2026-01-20", size: "0.4 МБ", latest: false },
    ],
  },
];

export const DEMO_TRANSACTIONS: DemoTransaction[] = [
  { id: "t5", date: "2026-08-12", text: "Оплата заказа №1042", amount: -5000 },
  { id: "t4", date: "2026-08-10", text: "Пополнение баланса", amount: 6000 },
  { id: "t3", date: "2026-07-02", text: "Покупка FurryChat", amount: -299 },
  { id: "t2", date: "2026-06-28", text: "Пополнение баланса", amount: 1000 },
  { id: "t1", date: "2026-05-19", text: "Покупка FurryNick", amount: -299 },
];

export const DEMO_REVIEWS: DemoReview[] = [
  {
    id: "r3",
    product: "FurryChat",
    status: "approved",
    date: "2026-07-10",
    rating: 5,
    text: "Конфиг понятный, модерация ловит спам без ложных срабатываний. Поставил за вечер.",
  },
  {
    id: "r2",
    product: "Оптимизация сервера",
    status: "pending",
    date: "2026-08-21",
    rating: 5,
    text: "TPS перестал проседать на вечернем онлайне. Жду, когда опубликуют.",
  },
  {
    id: "r1",
    product: "FurryNick",
    status: "rejected",
    date: "2026-05-25",
    rating: 4,
    text: "Отзыв отклонён модератором — в тексте была ссылка на сторонний ресурс.",
  },
];
