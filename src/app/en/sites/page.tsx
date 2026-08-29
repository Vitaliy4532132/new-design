import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { PageHero } from "@/components/page-hero";
import { InfoGrid } from "@/components/info-grid";
import { ComparisonTable } from "@/components/comparison-table";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { Cta } from "@/components/v2/cta";
import { Footer } from "@/components/v2/footer";
import { SetHtmlLang } from "@/components/set-html-lang";
import { SITES_FAQ_EN } from "@/lib/faq-data-en";

export const metadata = buildMetadata({
  title: "Custom Minecraft Server Website — TheFurryDev",
  description:
    "Minecraft server websites: donation store, voting, player dashboard, database integration. From $13 (≈1000₽), ready in 3 days.",
  path: "/en/sites",
  locale: "en",
  alternatePaths: { ru: "/sites", en: "/en/sites", uk: "/uk/sites" },
});

const FEATURES = [
  {
    title: "Server landing page",
    description: "Project showcase: rules, news, mode descriptions and team.",
  },
  {
    title: "Donation store",
    description: "A catalog of perks with card payment and automatic delivery after purchase.",
  },
  {
    title: "Player dashboard",
    description: "Stats, inventory, balance — tied directly to your server's database.",
  },
  {
    title: "Voting",
    description: "Integration with server top-lists and a reward system for votes.",
  },
];

export default function SitesPageEn() {
  return (
    <main>
      <SetHtmlLang locale="en" />
      <FaqJsonLd items={SITES_FAQ_EN} />
      <Nav locale="en" />
      <PageHero
        eyebrow="Services / Websites"
        title="A website for"
        highlight="your Minecraft server"
        lead="A custom website for your existing server: donation store, voting, player dashboard. From $13 (≈1000₽), with payment and database integration."
        stats={[
          { value: "from $13", label: "price" },
          { value: "Next.js", label: "stack" },
          { value: "from 3 days", label: "turnaround" },
        ]}
      />
      <InfoGrid
        eyebrow="what's included"
        title="Not just a landing page."
        lead="The website integrates with your server's real data, not just a nice-looking shell."
        items={FEATURES}
        columns={2}
      />
      <ComparisonTable
        eyebrow="comparison"
        title="Free template vs a custom website."
        lead="Free CMS platforms like NamelessMC handle the basics, but they look identical across hundreds of servers."
        columnA="Free template"
        columnB="Site by TheFurryDev"
        rows={[
          { label: "Unique design", a: false, b: true },
          { label: "Server database integration", a: "limited", b: true },
          { label: "SEO optimization", a: false, b: true },
          { label: "Support and updates", a: false, b: true },
          { label: "Load speed", a: "average", b: "fast" },
        ]}
      />
      <FaqAccordion items={SITES_FAQ_EN} eyebrow="faq" title="Questions about websites." />
      <Cta locale="en" />
      <Footer locale="en" />
    </main>
  );
}
