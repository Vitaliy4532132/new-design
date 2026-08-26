import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { HomeNav } from "@/components/home/nav";
import { HomeHero } from "@/components/home/hero";
import { HomeCta } from "@/components/home/cta";
import { HomeFooter } from "@/components/home/footer";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { OrganizationJsonLd } from "@/components/organization-jsonld";
import { StatsBand } from "@/components/stats-band";
import { TechMarquee } from "@/components/tech-marquee";
import { AboutSection } from "@/components/about-section";
import { ServicesAccordion } from "@/components/services-accordion";
import { PortfolioPreview } from "@/components/portfolio-preview";
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
      <HomeNav />
      <HomeHero />
      <StatsBand />
      <TechMarquee />
      <AboutSection />
      <ServicesAccordion />
      <PortfolioPreview />
      <ReviewsCarousel />
      <FaqAccordion items={HOME_FAQ} eyebrow="faq" title="Частые вопросы." />
      <HomeCta />
      <HomeFooter />
    </main>
  );
}
