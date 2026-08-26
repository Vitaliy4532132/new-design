import { buildMetadata } from "@/lib/seo";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { OrganizationJsonLd } from "@/components/organization-jsonld";
import { CircleTicker } from "@/components/circle-ticker";
import { StatsBand } from "@/components/stats-band";
import { HorizontalScrollGallery } from "@/components/horizontal-scroll-gallery";
import { ServicesBento } from "@/components/services-bento";
import { ProcessTimeline } from "@/components/process-timeline";
import { ProductsShelf } from "@/components/products-shelf";
import { WhyUsStack } from "@/components/why-us-stack";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { PortfolioCarousel } from "@/components/portfolio-carousel";
import { Testimonials } from "@/components/testimonials";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { SetHtmlLang } from "@/components/set-html-lang";
import { HOME_FAQ_EN } from "@/lib/faq-data-en";

export const metadata = buildMetadata({
  title: "Minecraft Server Development Studio — TheFurryDev",
  description:
    "Server builds, custom plugins, server websites and full servers from scratch. Minecraft server development studio — from $39 (≈3000₽), packs ready in 7 days.",
  path: "/en",
  locale: "en",
  alternatePaths: { ru: "/", en: "/en", uk: "/uk" },
});

export default function HomeEn() {
  return (
    <main>
      <SetHtmlLang locale="en" />
      <FaqJsonLd items={HOME_FAQ_EN} />
      <OrganizationJsonLd locale="en" />
      <SiteNav locale="en" />
      <Hero locale="en" />
      <div className="h-[120px] bg-background" />
      <CircleTicker locale="en" />
      <StatsBand locale="en" />
      <HorizontalScrollGallery locale="en" />
      <ServicesBento locale="en" />
      <ProductsShelf locale="en" />
      <ProcessTimeline locale="en" />
      <WhyUsStack locale="en" />
      <PortfolioGrid locale="en" />
      <PortfolioCarousel locale="en" />
      <Testimonials locale="en" />
      <FaqAccordion items={HOME_FAQ_EN} eyebrow="faq" title="Frequently asked questions." />
      <CtaSection locale="en" />
      <SiteFooter locale="en" />
    </main>
  );
}
