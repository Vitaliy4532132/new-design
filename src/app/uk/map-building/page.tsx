import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { PageHero } from "@/components/page-hero";
import { InfoGrid } from "@/components/info-grid";
import { PortfolioCarousel } from "@/components/portfolio-carousel";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { Cta } from "@/components/v2/cta";
import { Footer } from "@/components/v2/footer";
import { SetHtmlLang } from "@/components/set-html-lang";
import { MAP_BUILDING_FAQ_UK } from "@/lib/faq-data-uk";

export const metadata = buildMetadata({
  title: "Побудова карти для майнкрафт сервера на замовлення — TheFurryDev",
  description:
    "Побудова карти для сервера майнкрафт на замовлення: лобі, PvP-арени, данжі, міста в будь-якому стилі та масштабі. Від ₴872 (≈1500₽), за референсами або з нуля.",
  path: "/uk/map-building",
  locale: "uk",
  alternatePaths: { ru: "/map-building", en: "/en/map-building", uk: "/uk/map-building" },
});

const TYPES = [
  { title: "Лобі та спавн", description: "Перше, що бачить гравець — деталізований хаб з порталами на режими." },
  { title: "PvP-арени", description: "Збалансовані арени під чесні бої, з укриттями та тактичними точками." },
  { title: "Данжі", description: "Багаторівневі підземелля з пастками та боссами під RPG-режими." },
  { title: "Міста", description: "Повноцінні NPC-міста з архітектурою під обраний стиль." },
];

export default function MapBuildingPageUk() {
  return (
    <main>
      <SetHtmlLang locale="uk" />
      <FaqJsonLd items={MAP_BUILDING_FAQ_UK} />
      <Nav locale="uk" />
      <PageHero
        eyebrow="Послуги / Побудова карти"
        title="Побудова карти для вашого"
        highlight="майнкрафт-сервера"
        lead="Лобі, арени, данжі, міста — у будь-якому стилі та масштабі. Від ₴872 (≈1500₽), з можливістю передати готову схему для самостійної установки."
        stats={[
          { value: "від ₴872", label: "вартість" },
          { value: "будь-який стиль", label: "за референсом" },
          { value: "3-21 день", label: "термін" },
        ]}
      />
      <InfoGrid
        eyebrow="що будуємо"
        title="Під будь-який формат."
        items={TYPES}
        columns={2}
      />
      <PortfolioCarousel locale="uk" />
      <FaqAccordion
        items={MAP_BUILDING_FAQ_UK}
        eyebrow="faq"
        title="Питання про побудови."
      />
      <Cta locale="uk" />
      <Footer locale="uk" />
    </main>
  );
}
