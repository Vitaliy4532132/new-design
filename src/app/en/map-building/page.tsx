import { buildMetadata } from "@/lib/seo";
import { SiteNav } from "@/components/site-nav";
import { PageHero } from "@/components/page-hero";
import { InfoGrid } from "@/components/info-grid";
import { PortfolioCarousel } from "@/components/portfolio-carousel";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { SetHtmlLang } from "@/components/set-html-lang";
import { MAP_BUILDING_FAQ_EN } from "@/lib/faq-data-en";

export const metadata = buildMetadata({
  title: "Custom Minecraft Map Building — TheFurryDev",
  description:
    "Map building for a Minecraft server: lobbies, PvP arenas, dungeons, cities, any style and scale. From $19 (≈1500₽), by reference or from scratch.",
  path: "/en/map-building",
  locale: "en",
  alternatePaths: { ru: "/map-building", en: "/en/map-building", uk: "/uk/map-building" },
});

const TYPES = [
  { title: "Lobby and spawn", description: "The first thing a player sees — a detailed hub with portals to each mode." },
  { title: "PvP arenas", description: "Balanced arenas for fair fights, with cover and tactical points." },
  { title: "Dungeons", description: "Multi-level dungeons with traps and bosses for RPG modes." },
  { title: "Cities", description: "Full NPC cities with architecture matching your chosen style." },
];

export default function MapBuildingPageEn() {
  return (
    <main>
      <SetHtmlLang locale="en" />
      <FaqJsonLd items={MAP_BUILDING_FAQ_EN} />
      <SiteNav locale="en" />
      <PageHero
        eyebrow="Services / Map Building"
        title="Map building for your"
        highlight="Minecraft server"
        lead="Lobbies, arenas, dungeons, cities — any style and scale. From $19 (≈1500₽), with the option to hand over a schematic for self-installation."
        stats={[
          { value: "from $19", label: "price" },
          { value: "any style", label: "by reference" },
          { value: "3-21 days", label: "turnaround" },
        ]}
      />
      <InfoGrid
        eyebrow="what we build"
        title="For any format."
        items={TYPES}
        columns={2}
      />
      <PortfolioCarousel locale="en" />
      <FaqAccordion
        items={MAP_BUILDING_FAQ_EN}
        eyebrow="faq"
        title="Questions about map building."
      />
      <CtaSection locale="en" />
      <SiteFooter locale="en" />
    </main>
  );
}
