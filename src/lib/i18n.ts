export type Locale = "ru" | "en" | "uk";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "uk", label: "UA" },
];

type ServiceLink = { href: string; label: string };
type NavLink = { href: string; label: string };

type NavCopy = {
  homeHref: string;
  servicesLabel: string;
  servicesHref: string;
  serviceLinks: ServiceLink[];
  navLinks: NavLink[];
};

export const NAV_COPY: Record<Locale, NavCopy> = {
  ru: {
    homeHref: "/",
    servicesLabel: "Услуги",
    servicesHref: "/#services",
    serviceLinks: [
      { href: "/builds", label: "Сборки" },
      { href: "/plugins", label: "Плагины" },
      { href: "/sites", label: "Сайты для серверов" },
      { href: "/server-setup", label: "Сервер с нуля" },
      { href: "/map-building", label: "Построение карты" },
    ],
    navLinks: [
      { href: "/#portfolio", label: "Портфолио" },
      { href: "/#reviews", label: "Отзывы" },
      { href: "/#faq", label: "FAQ" },
      { href: "/blog", label: "Блог" },
    ],
  },
  en: {
    homeHref: "/en",
    servicesLabel: "Services",
    servicesHref: "/en/#services",
    serviceLinks: [
      { href: "/en/builds", label: "Server Builds" },
      { href: "/en/plugins", label: "Plugins" },
      { href: "/en/sites", label: "Server Websites" },
      { href: "/en/server-setup", label: "Server From Scratch" },
      { href: "/en/map-building", label: "Map Building" },
    ],
    navLinks: [
      { href: "/en/#portfolio", label: "Portfolio" },
      { href: "/en/#reviews", label: "Reviews" },
      { href: "/en/#faq", label: "FAQ" },
      { href: "/en/blog", label: "Blog" },
    ],
  },
  uk: {
    homeHref: "/uk",
    servicesLabel: "Послуги",
    servicesHref: "/uk/#services",
    serviceLinks: [
      { href: "/uk/builds", label: "Збірки" },
      { href: "/uk/plugins", label: "Плагіни" },
      { href: "/uk/sites", label: "Сайти для серверів" },
      { href: "/uk/server-setup", label: "Сервер з нуля" },
      { href: "/uk/map-building", label: "Побудова карти" },
    ],
    navLinks: [
      { href: "/uk/#portfolio", label: "Портфоліо" },
      { href: "/uk/#reviews", label: "Відгуки" },
      { href: "/uk/#faq", label: "FAQ" },
      { href: "/uk/blog", label: "Блог" },
    ],
  },
};

type BlogUiCopy = {
  blogBasePath: string;
  allCategoriesLabel: string;
  readMoreLabel: string;
  readLabel: string;
  homeLabel: string;
  blogLabel: string;
  homeHref: string;
  postCtaNote: string;
};

export const BLOG_UI: Record<Locale, BlogUiCopy> = {
  ru: {
    blogBasePath: "/blog",
    allCategoriesLabel: "Все",
    readMoreLabel: "Читать статью",
    readLabel: "Читать",
    homeLabel: "Главная",
    blogLabel: "Блог",
    homeHref: "/",
    postCtaNote: "Не хочешь разбираться сам? Мы сделаем это за тебя.",
  },
  en: {
    blogBasePath: "/en/blog",
    allCategoriesLabel: "All",
    readMoreLabel: "Read article",
    readLabel: "Read",
    homeLabel: "Home",
    blogLabel: "Blog",
    homeHref: "/en",
    postCtaNote: "Don't want to deal with it yourself? We'll handle it for you.",
  },
  uk: {
    blogBasePath: "/uk/blog",
    allCategoriesLabel: "Всі",
    readMoreLabel: "Читати статтю",
    readLabel: "Читати",
    homeLabel: "Головна",
    blogLabel: "Блог",
    homeHref: "/uk",
    postCtaNote: "Не хочеш розбиратися сам? Ми зробимо це за тебе.",
  },
};

type FooterCopy = {
  description: string;
  servicesTitle: string;
  companyTitle: string;
  companyLinks: NavLink[];
  copyrightSuffix: string;
  socialLabels: { telegram: string; discord: string; youtube: string };
};

export const FOOTER_COPY: Record<Locale, FooterCopy> = {
  ru: {
    description:
      "Студия разработки майнкрафт-серверов: сборки, плагины, сайты, ресурс-паки и проекты с нуля под ключ — всё, что связано с майнкрафтом.",
    servicesTitle: "Услуги",
    companyTitle: "Компания",
    companyLinks: [
      { href: "/#portfolio", label: "Портфолио" },
      { href: "/#reviews", label: "Отзывы" },
      { href: "/#faq", label: "FAQ" },
      { href: "/blog", label: "Блог" },
    ],
    copyrightSuffix: "TheFurryDev. Все права защищены.",
    socialLabels: { telegram: "Telegram", discord: "Discord", youtube: "YouTube" },
  },
  en: {
    description:
      "Minecraft server development studio: server builds, plugins, websites, resource packs and full servers from scratch — anything Minecraft-related.",
    servicesTitle: "Services",
    companyTitle: "Company",
    companyLinks: [
      { href: "/en/#portfolio", label: "Portfolio" },
      { href: "/en/#reviews", label: "Reviews" },
      { href: "/en/#faq", label: "FAQ" },
      { href: "/en/blog", label: "Blog" },
    ],
    copyrightSuffix: "TheFurryDev. All rights reserved.",
    socialLabels: { telegram: "Telegram", discord: "Discord", youtube: "YouTube" },
  },
  uk: {
    description:
      "Студія розробки майнкрафт-серверів: збірки, плагіни, сайти, ресурс-паки та проєкти з нуля під ключ — усе, що пов'язано з майнкрафтом.",
    servicesTitle: "Послуги",
    companyTitle: "Компанія",
    companyLinks: [
      { href: "/uk/#portfolio", label: "Портфоліо" },
      { href: "/uk/#reviews", label: "Відгуки" },
      { href: "/uk/#faq", label: "FAQ" },
      { href: "/uk/blog", label: "Блог" },
    ],
    copyrightSuffix: "TheFurryDev. Усі права захищені.",
    socialLabels: { telegram: "Telegram", discord: "Discord", youtube: "YouTube" },
  },
};
