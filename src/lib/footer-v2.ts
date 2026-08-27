import type { Locale } from "@/lib/i18n";

// Футер нового дизайна. Отдельно от FOOTER_COPY: тот используют 18 страниц
// старого сайта, правка там поехала бы по всему живому сайту.
//
// Ссылки здесь не дублируются — футер берёт их из NAV_V2, чтобы меню в шапке
// и в подвале не разъехались со временем.
//
// Реквизиты — публичные данные продавца, их обязательно показывать при приёме
// платежей. Ссылки на политику и условия ведут на страницы, которых пока нет.

export type FooterLink = { href: string; label: string };

export type FooterV2Copy = {
  description: string;
  servicesTitle: string;
  navTitle: string;
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
    servicesTitle: "Услуги",
    navTitle: "Навигация",
    ctaTitle: "Готовы начать?",
    ctaText: "Опишите задачу — обсудим идею, посчитаем стоимость и сроки.",
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
    servicesTitle: "Services",
    navTitle: "Navigation",
    ctaTitle: "Ready to start?",
    ctaText: "Tell us what you need — we will work out the scope, cost and timeline.",
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
    servicesTitle: "Послуги",
    navTitle: "Навігація",
    ctaTitle: "Готові почати?",
    ctaText: "Опишіть задачу — обговоримо ідею, порахуємо вартість і терміни.",
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
