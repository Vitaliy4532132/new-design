import type { Locale } from "@/lib/i18n";

// Футер нового дизайна. Отдельно от FOOTER_COPY: тот используют 18 страниц
// старого сайта, правка там поехала бы по всему живому сайту.
//
// Реквизиты — публичные данные продавца, их обязательно показывать при приёме
// платежей. Ссылки на политику и условия ведут на страницы, которых пока нет.

export type FooterLink = { href: string; label: string };

export type FooterV2Copy = {
  description: string;
  navTitle: string;
  navLinks: FooterLink[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  legalName: string;
  legalId: string;
  paymentLabel: string;
  copyright: string;
  policyLinks: FooterLink[];
  mojangDisclaimer: string;
};

const LEGAL_NAME = "Разинкин Артём Сергеевич";
const LEGAL_ID = "ИИН 542407365488";

export const FOOTER_V2: Record<Locale, FooterV2Copy> = {
  ru: {
    description:
      "Профессиональная разработка для майнкрафт-серверов. Плагины, сборки, настройка и консультации.",
    navTitle: "Навигация",
    navLinks: [
      { href: "/home", label: "Главная" },
      { href: "/home/shop", label: "Магазин" },
      { href: "/home/jobs", label: "Вакансии" },
      { href: "/home/plans", label: "Планы" },
      { href: "/home#portfolio", label: "Портфолио" },
      { href: "/blog", label: "Блог" },
    ],
    ctaTitle: "Готовы начать?",
    ctaText: "Свяжитесь с нами — поможем реализовать ваш проект.",
    ctaLabel: "Сделать заказ",
    legalName: LEGAL_NAME,
    legalId: LEGAL_ID,
    paymentLabel: "Принимает к оплате",
    copyright: "TheFurryDev. Все права защищены.",
    policyLinks: [
      { href: "/home/privacy", label: "Политика конфиденциальности" },
      { href: "/home/terms", label: "Условия использования" },
    ],
    mojangDisclaimer:
      "TheFurryDev не связан с Mojang AB и не является официальным партнёром Minecraft.",
  },
  en: {
    description:
      "Professional development for Minecraft servers. Plugins, server builds, setup and consulting.",
    navTitle: "Navigation",
    navLinks: [
      { href: "/home", label: "Home" },
      { href: "/home/shop", label: "Shop" },
      { href: "/home/jobs", label: "Jobs" },
      { href: "/home/plans", label: "Plans" },
      { href: "/home#portfolio", label: "Portfolio" },
      { href: "/en/blog", label: "Blog" },
    ],
    ctaTitle: "Ready to start?",
    ctaText: "Get in touch — we will help you build your project.",
    ctaLabel: "Get a quote",
    legalName: LEGAL_NAME,
    legalId: LEGAL_ID,
    paymentLabel: "Payments accepted",
    copyright: "TheFurryDev. All rights reserved.",
    policyLinks: [
      { href: "/home/privacy", label: "Privacy policy" },
      { href: "/home/terms", label: "Terms of use" },
    ],
    mojangDisclaimer:
      "TheFurryDev is not affiliated with Mojang AB and is not an official Minecraft partner.",
  },
  uk: {
    description:
      "Професійна розробка для майнкрафт-серверів. Плагіни, збірки, налаштування та консультації.",
    navTitle: "Навігація",
    navLinks: [
      { href: "/home", label: "Головна" },
      { href: "/home/shop", label: "Магазин" },
      { href: "/home/jobs", label: "Вакансії" },
      { href: "/home/plans", label: "Плани" },
      { href: "/home#portfolio", label: "Портфоліо" },
      { href: "/uk/blog", label: "Блог" },
    ],
    ctaTitle: "Готові почати?",
    ctaText: "Зв'яжіться з нами — допоможемо реалізувати ваш проєкт.",
    ctaLabel: "Залишити заявку",
    legalName: LEGAL_NAME,
    legalId: LEGAL_ID,
    paymentLabel: "Приймає до оплати",
    copyright: "TheFurryDev. Усі права захищені.",
    policyLinks: [
      { href: "/home/privacy", label: "Політика конфіденційності" },
      { href: "/home/terms", label: "Умови використання" },
    ],
    mojangDisclaimer:
      "TheFurryDev не пов'язаний з Mojang AB і не є офіційним партнером Minecraft.",
  },
};
