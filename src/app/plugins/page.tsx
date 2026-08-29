import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { PageHero } from "@/components/page-hero";
import { InfoGrid } from "@/components/info-grid";
import { ProductsShelf } from "@/components/products-shelf";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { Cta } from "@/components/v2/cta";
import { Footer } from "@/components/v2/footer";
import { PLUGINS_FAQ } from "@/lib/faq-data";

export const metadata = buildMetadata({
  title: "Разработка плагинов майнкрафт на заказ — TheFurryDev",
  description:
    "Разработка плагинов для майнкрафт сервера на Java и Kotlin под Spigot, Paper, Velocity: экономика, античит, чат-модерация, кланы. От 200₽, готов от 3 дней.",
  path: "/plugins",
  alternatePaths: { ru: "/plugins", en: "/en/plugins", uk: "/uk/plugins" },
});

const TYPES = [
  { title: "Экономика", tag: "Java", description: "Кастомная валюта, магазины, банковская система." },
  { title: "Античит", tag: "Java", description: "Защита от читеров без ложных банов честных игроков." },
  { title: "Миниигры", tag: "Kotlin", description: "Логика для bedwars, скайварс, паркур-режимов." },
  { title: "Плагин-скупщик", tag: "Java", description: "NPC, скупающий предметы у игроков для экономических серверов." },
  { title: "Чат и AI-модерация", tag: "Kotlin", description: "Фильтрация мата и спама, кастомное форматирование чата." },
  { title: "Кланы и гильдии", tag: "Java", description: "Система кланов с территориями, рейтингом и войнами." },
];

export default function PluginsPage() {
  return (
    <main>
      <FaqJsonLd items={PLUGINS_FAQ} />
      <Nav />
      <PageHero
        eyebrow="Услуги / Плагины"
        title="Плагины на заказ для"
        highlight="майнкрафт сервера"
        lead="Кастомные механики на Java и Kotlin под Spigot, Paper и Velocity — от простой утилиты за 200₽ до сложной системы с экономикой и базой данных за 1800₽."
        stats={[
          { value: "от 200₽", label: "стоимость" },
          { value: "Java / Kotlin", label: "стек" },
          { value: "Spigot / Paper", label: "ядра" },
        ]}
      />
      <InfoGrid
        eyebrow="типы плагинов"
        title="Любая механика под задачу."
        items={TYPES}
      />
      <ProductsShelf
        filter="plugin"
        title="Готовые плагины — без ожидания разработки."
      />
      <FaqAccordion items={PLUGINS_FAQ} eyebrow="faq" title="Вопросы про плагины." />
      <Cta />
      <Footer />
    </main>
  );
}
