import { buildMetadata } from "@/lib/seo";
import { SiteNav } from "@/components/site-nav";
import { PageHero } from "@/components/page-hero";
import { InfoGrid } from "@/components/info-grid";
import { ComparisonTable } from "@/components/comparison-table";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { SITES_FAQ } from "@/lib/faq-data";

export const metadata = buildMetadata({
  title: "Сайт для майнкрафт сервера на заказ — TheFurryDev",
  description:
    "Сайты для серверов майнкрафт: донат-магазин, голосование, личный кабинет игрока, интеграция с базой сервера. От 1000₽, готов от 3 дней.",
  path: "/sites",
  alternatePaths: { ru: "/sites", en: "/en/sites", uk: "/uk/sites" },
});

const FEATURES = [
  {
    title: "Лендинг сервера",
    description: "Презентация проекта: правила, новости, описание режимов и команда.",
  },
  {
    title: "Донат-магазин",
    description: "Каталог привилегий с оплатой картой, автоматическая выдача после покупки.",
  },
  {
    title: "Личный кабинет игрока",
    description: "Статистика, инвентарь, баланс — привязка к базе данных вашего сервера.",
  },
  {
    title: "Голосование",
    description: "Интеграция с топ-листами серверов и система наград за голос.",
  },
];

export default function SitesPage() {
  return (
    <main>
      <FaqJsonLd items={SITES_FAQ} />
      <SiteNav />
      <PageHero
        eyebrow="Услуги / Сайты"
        title="Сайт для"
        highlight="вашего майнкрафт-сервера"
        lead="Индивидуальный сайт под существующий сервер: донат-магазин, голосование, личный кабинет игрока. От 1000₽, с интеграцией платежей и базы данных."
        stats={[
          { value: "от 1000₽", label: "стоимость" },
          { value: "Next.js", label: "технология" },
          { value: "от 3 дней", label: "срок" },
        ]}
      />
      <InfoGrid
        eyebrow="что входит"
        title="Не просто лендинг."
        lead="Сайт интегрируется с реальными данными вашего сервера, а не просто красиво выглядит."
        items={FEATURES}
        columns={2}
      />
      <ComparisonTable
        eyebrow="сравнение"
        title="Бесплатный шаблон vs индивидуальный сайт."
        lead="Бесплатные CMS вроде NamelessMC решают базовую задачу, но выглядят одинаково у сотен серверов."
        columnA="Бесплатный шаблон"
        columnB="Сайт от FurryDev"
        rows={[
          { label: "Уникальный дизайн", a: false, b: true },
          { label: "Интеграция с базой сервера", a: "ограниченно", b: true },
          { label: "SEO-оптимизация", a: false, b: true },
          { label: "Поддержка и доработки", a: false, b: true },
          { label: "Скорость загрузки", a: "средняя", b: "высокая" },
        ]}
      />
      <FaqAccordion items={SITES_FAQ} eyebrow="faq" title="Вопросы про сайты." />
      <CtaSection />
      <SiteFooter />
    </main>
  );
}
