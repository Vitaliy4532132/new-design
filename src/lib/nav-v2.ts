import type { Locale } from "@/lib/i18n";

// Меню нового дизайна. Держим отдельно от NAV_COPY: тот используют 18 страниц
// старого сайта, и правка ссылок там сломала бы им шапку.
//
// Пути пока черновичные (/home/...). При переносе дизайна на боевые адреса
// достаточно поправить их здесь — шапка и футер общие.

export type NavLink = { href: string; label: string };

export type NavV2Copy = {
  homeHref: string;
  servicesLabel: string;
  serviceLinks: NavLink[];
  links: NavLink[];
  ctaLabel: string;
  loginLabel: string;
  registerLabel: string;
  profileLabel: string;
  adminLabel: string;
  logoutLabel: string;
};

export const NAV_V2: Record<Locale, NavV2Copy> = {
  ru: {
    homeHref: "/home",
    servicesLabel: "Услуги",
    serviceLinks: [
      { href: "/builds", label: "Сборки" },
      { href: "/plugins", label: "Плагины" },
      { href: "/sites", label: "Сайты для серверов" },
      { href: "/server-setup", label: "Сервер с нуля" },
      { href: "/map-building", label: "Построение карты" },
    ],
    links: [
      { href: "/home/shop", label: "Магазин" },
      { href: "/home/plans", label: "Планы" },
      { href: "/home/jobs", label: "Вакансии" },
      { href: "/home/portfolio", label: "Портфолио" },
      { href: "/blog", label: "Блог" },
    ],
    ctaLabel: "Сделать заказ",
    loginLabel: "Войти",
    registerLabel: "Регистрация",
    profileLabel: "Мой профиль",
    adminLabel: "Админ-панель",
    logoutLabel: "Выйти",
  },
  en: {
    homeHref: "/home",
    servicesLabel: "Services",
    serviceLinks: [
      { href: "/en/builds", label: "Server Builds" },
      { href: "/en/plugins", label: "Plugins" },
      { href: "/en/sites", label: "Server Websites" },
      { href: "/en/server-setup", label: "Server From Scratch" },
      { href: "/en/map-building", label: "Map Building" },
    ],
    links: [
      { href: "/home/shop", label: "Shop" },
      { href: "/home/plans", label: "Plans" },
      { href: "/home/jobs", label: "Jobs" },
      { href: "/home/portfolio", label: "Portfolio" },
      { href: "/en/blog", label: "Blog" },
    ],
    ctaLabel: "Get a quote",
    loginLabel: "Sign in",
    registerLabel: "Sign up",
    profileLabel: "My profile",
    adminLabel: "Admin panel",
    logoutLabel: "Sign out",
  },
  uk: {
    homeHref: "/home",
    servicesLabel: "Послуги",
    serviceLinks: [
      { href: "/uk/builds", label: "Збірки" },
      { href: "/uk/plugins", label: "Плагіни" },
      { href: "/uk/sites", label: "Сайти для серверів" },
      { href: "/uk/server-setup", label: "Сервер з нуля" },
      { href: "/uk/map-building", label: "Побудова карти" },
    ],
    links: [
      { href: "/home/shop", label: "Магазин" },
      { href: "/home/plans", label: "Плани" },
      { href: "/home/jobs", label: "Вакансії" },
      { href: "/home/portfolio", label: "Портфоліо" },
      { href: "/uk/blog", label: "Блог" },
    ],
    ctaLabel: "Залишити заявку",
    loginLabel: "Увійти",
    registerLabel: "Реєстрація",
    profileLabel: "Мій профіль",
    adminLabel: "Адмін-панель",
    logoutLabel: "Вийти",
  },
};
