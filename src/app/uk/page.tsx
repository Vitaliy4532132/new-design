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
import { HOME_FAQ_UK } from "@/lib/faq-data-uk";

export const metadata = buildMetadata({
  title: "Студія розробки майнкрафт-серверів під ключ — TheFurryDev",
  description:
    "Круті збірки, плагіни на замовлення, сайти для серверів і проєкти з нуля під ключ. Студія майнкрафт-серверів — від ₴1744 (≈3000₽), збірка готова від 7 днів.",
  path: "/uk",
  locale: "uk",
  alternatePaths: { ru: "/", en: "/en", uk: "/uk" },
});

export default function HomeUk() {
  return (
    <main>
      <SetHtmlLang locale="uk" />
      <FaqJsonLd items={HOME_FAQ_UK} />
      <OrganizationJsonLd locale="uk" />
      <SiteNav locale="uk" />
      <Hero locale="uk" />
      <div className="h-[120px] bg-background" />
      <CircleTicker locale="uk" />
      <StatsBand locale="uk" />
      <HorizontalScrollGallery locale="uk" />
      <ServicesBento locale="uk" />
      <ProductsShelf locale="uk" />
      <ProcessTimeline locale="uk" />
      <WhyUsStack locale="uk" />
      <PortfolioGrid locale="uk" />
      <PortfolioCarousel locale="uk" />
      <Testimonials locale="uk" />
      <FaqAccordion items={HOME_FAQ_UK} eyebrow="faq" title="Часті питання." />
      <CtaSection locale="uk" />
      <SiteFooter locale="uk" />
    </main>
  );
}
