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
import { BUILDS_FAQ_EN } from "@/lib/faq-data-en";

export const metadata = buildMetadata({
  title: "Custom Minecraft Server Builds — TheFurryDev",
  description:
    "Minecraft server builds: SkyBlock, Survival, Anarchy, BoxPvP. From $39 (≈3000₽), ready in 7 days. Versions 1.16–1.21.x.",
  path: "/en/builds",
  locale: "en",
  alternatePaths: { ru: "/builds", en: "/en/builds", uk: "/uk/builds" },
});

const TYPES = [
  {
    title: "Mini",
    tag: "from $39",
    description:
      "One game mode (SkyBlock, Survival, BoxPvP and others), a basic set of plugins, a ready map without a custom design.",
  },
  {
    title: "Standard",
    tag: "from $65",
    description:
      "An expanded plugin set, custom economy and balance, map reworked to match your style.",
  },
  {
    title: "Large",
    tag: "from $195",
    description:
      "Custom mechanics built to order, individual map design, a donation system and in-depth configuration for your project.",
  },
];

export default function BuildsPageEn() {
  return (
    <main>
      <SetHtmlLang locale="en" />
      <FaqJsonLd items={BUILDS_FAQ_EN} />
      <SiteNav locale="en" />
      <PageHero
        eyebrow="Services / Server Builds"
        title="Custom Minecraft"
        highlight="server builds"
        lead="A full server pack with plugins, worlds and configured economy — from $39 (≈3000₽), ready in 7 days depending on scope. We support versions from 1.16 to the current 1.21.x."
        hook="Want a server like FunTime, HolyWorld or AresMine? Message us — we'll make it just as good."
        stats={[
          { value: "from 7 days", label: "turnaround" },
          { value: "1.16–1.21.x", label: "versions" },
          { value: "from $39", label: "price" },
        ]}
      />
      <InfoGrid
        eyebrow="pack size"
        title="Pick a tier that fits your project."
        lead="SkyBlock, Survival, Anarchy, BoxPvP, RPG, MiniGames — any mode can be built in any of the three tiers."
        items={TYPES}
      />
      <PortfolioCarousel locale="en" />
      <FaqAccordion items={BUILDS_FAQ_EN} eyebrow="faq" title="Questions about server builds." />
      <CtaSection locale="en" />
      <SiteFooter locale="en" />
    </main>
  );
}
