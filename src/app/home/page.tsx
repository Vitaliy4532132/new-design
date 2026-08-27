import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { HomeHero } from "@/components/v2/hero";
import { BuildSequence } from "@/components/v2/build-sequence";
import { ServerConsole } from "@/components/v2/server-console";
import { Manifesto } from "@/components/v2/manifesto";
import { BlockPortfolio } from "@/components/v2/block-portfolio";
import { Cta } from "@/components/v2/cta";
import { Footer } from "@/components/v2/footer";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { OrganizationJsonLd } from "@/components/organization-jsonld";
import { StatsBand } from "@/components/stats-band";
import { CraftingTable } from "@/components/v2/crafting";
import { AboutSection } from "@/components/about-section";
import { ServicesAccordion } from "@/components/services-accordion";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { FaqAccordion } from "@/components/faq-accordion";
import { HOME_FAQ } from "@/lib/faq-data";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Редизайн главной (черновик) — TheFurryDev",
    description: "Черновая версия обновлённой главной страницы.",
    path: "/home",
  }),
  robots: { index: false, follow: false },
};

export default function HomeRedesignPage() {
  return (
    <main>
      <FaqJsonLd items={HOME_FAQ} />
      <OrganizationJsonLd locale="ru" />
      <Nav />
      <HomeHero />
      <StatsBand />
      <CraftingTable />
      <AboutSection />
      <ServicesAccordion />
      <BuildSequence />
      <ServerConsole />
      <BlockPortfolio />
      <Manifesto />
      <ReviewsCarousel />
      <FaqAccordion items={HOME_FAQ} eyebrow="faq" title="Частые вопросы." />
      <Cta />
      <Footer />
    </main>
  );
}
