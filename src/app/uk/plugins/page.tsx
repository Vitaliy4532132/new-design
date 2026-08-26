import { buildMetadata } from "@/lib/seo";
import { SiteNav } from "@/components/site-nav";
import { PageHero } from "@/components/page-hero";
import { InfoGrid } from "@/components/info-grid";
import { ProductsShelf } from "@/components/products-shelf";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { SetHtmlLang } from "@/components/set-html-lang";
import { PLUGINS_FAQ_UK } from "@/lib/faq-data-uk";

export const metadata = buildMetadata({
  title: "Розробка плагінів майнкрафт на замовлення — TheFurryDev",
  description:
    "Розробка плагінів для майнкрафт сервера на Java і Kotlin: економіка, античит, чат-модерація, клани. Від ₴116 (≈200₽), готовий від 3 днів.",
  path: "/uk/plugins",
  locale: "uk",
  alternatePaths: { ru: "/plugins", en: "/en/plugins", uk: "/uk/plugins" },
});

const TYPES = [
  { title: "Економіка", tag: "Java", description: "Кастомна валюта, магазини, банківська система." },
  { title: "Античит", tag: "Java", description: "Захист від читерів без хибних банів чесних гравців." },
  { title: "Мініігри", tag: "Kotlin", description: "Логіка для bedwars, скайварс, паркур-режимів." },
  { title: "Плагін-скупник", tag: "Java", description: "NPC, що скуповує предмети у гравців для економічних серверів." },
  { title: "Чат і AI-модерація", tag: "Kotlin", description: "Фільтрація мату та спаму, кастомне форматування чату." },
  { title: "Клани та гільдії", tag: "Java", description: "Система кланів з територіями, рейтингом і війнами." },
];

export default function PluginsPageUk() {
  return (
    <main>
      <SetHtmlLang locale="uk" />
      <FaqJsonLd items={PLUGINS_FAQ_UK} />
      <SiteNav locale="uk" />
      <PageHero
        eyebrow="Послуги / Плагіни"
        title="Плагіни на замовлення для"
        highlight="майнкрафт сервера"
        lead="Кастомні механіки на Java і Kotlin під Spigot, Paper і Velocity — від простої утиліти за ₴116 (≈200₽) до складної системи з економікою і базою даних за ₴1047 (≈1800₽)."
        stats={[
          { value: "від ₴116", label: "вартість" },
          { value: "Java / Kotlin", label: "стек" },
          { value: "Spigot / Paper", label: "ядра" },
        ]}
      />
      <InfoGrid
        eyebrow="типи плагінів"
        title="Будь-яка механіка під задачу."
        items={TYPES}
      />
      <ProductsShelf
        locale="uk"
        filter="plugin"
        title="Готові плагіни — без очікування розробки."
      />
      <FaqAccordion items={PLUGINS_FAQ_UK} eyebrow="faq" title="Питання про плагіни." />
      <CtaSection locale="uk" />
      <SiteFooter locale="uk" />
    </main>
  );
}
