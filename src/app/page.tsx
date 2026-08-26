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
import { HOME_FAQ } from "@/lib/faq-data";

export const metadata = buildMetadata({
  title: "Студия разработки майнкрафт-серверов под ключ — TheFurryDev",
  description:
    "Крутые сборки, плагины на заказ, сайты для серверов и проекты с нуля под ключ. Студия майнкрафт-серверов — от 3000₽, сборка готова от 7 дней.",
  path: "/",
  alternatePaths: { ru: "/", en: "/en", uk: "/uk" },
});

export default function Home() {
  return (
    <main>
      <FaqJsonLd items={HOME_FAQ} />
      <OrganizationJsonLd locale="ru" />
      <SiteNav />
      <Hero />
      <div className="h-[120px] bg-background" />
      <CircleTicker />
      <StatsBand />
      <HorizontalScrollGallery />
      <ServicesBento />
      <ProductsShelf />
      <ProcessTimeline />
      <WhyUsStack />
      <PortfolioGrid />
      <PortfolioCarousel />
      <Testimonials />
      <FaqAccordion items={HOME_FAQ} eyebrow="faq" title="Частые вопросы." />
      <CtaSection />
      <SiteFooter />
    </main>
  );
}
