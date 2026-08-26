import { buildMetadata } from "@/lib/seo";
import { SiteNav } from "@/components/site-nav";
import { PageHero } from "@/components/page-hero";
import { InfoGrid } from "@/components/info-grid";
import { PortfolioCarousel } from "@/components/portfolio-carousel";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { MAP_BUILDING_FAQ } from "@/lib/faq-data";

export const metadata = buildMetadata({
  title: "Построение карты для майнкрафт сервера на заказ — TheFurryDev",
  description:
    "Построение карты для сервера майнкрафт на заказ: лобби, PvP-арены, данжи, города в любом стиле и масштабе. От 1500₽, по референсам или с нуля.",
  path: "/map-building",
  alternatePaths: { ru: "/map-building", en: "/en/map-building", uk: "/uk/map-building" },
});

const TYPES = [
  { title: "Лобби и спавн", description: "Первое, что видит игрок — детализированный хаб с порталами на режимы." },
  { title: "PvP-арены", description: "Сбалансированные арены под честные бои, с укрытиями и тактическими точками." },
  { title: "Данжи", description: "Многоуровневые подземелья с ловушками и боссами под RPG-режимы." },
  { title: "Города", description: "Полноценные NPC-города с архитектурой под выбранный стиль." },
];

export default function MapBuildingPage() {
  return (
    <main>
      <FaqJsonLd items={MAP_BUILDING_FAQ} />
      <SiteNav />
      <PageHero
        eyebrow="Услуги / Построение карты"
        title="Постройка карты для вашего"
        highlight="майнкрафт-сервера"
        lead="Лобби, арены, данжи, города — в любом стиле и масштабе. От 1500₽, с возможностью передать готовую схему для самостоятельной установки."
        stats={[
          { value: "от 1500₽", label: "стоимость" },
          { value: "любой стиль", label: "под референс" },
          { value: "3-21 день", label: "срок" },
        ]}
      />
      <InfoGrid
        eyebrow="что строим"
        title="Под любой формат."
        items={TYPES}
        columns={2}
      />
      <PortfolioCarousel />
      <FaqAccordion
        items={MAP_BUILDING_FAQ}
        eyebrow="faq"
        title="Вопросы про постройки."
      />
      <CtaSection />
      <SiteFooter />
    </main>
  );
}
