import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { PageHero } from "@/components/v2/page-hero";
import { PortfolioGallery } from "@/components/v2/portfolio-gallery";
import { Cta } from "@/components/v2/cta";
import { Footer } from "@/components/v2/footer";
import { PORTFOLIO_PAGE } from "@/lib/portfolio-page";

const LOCALE = "ru" as const;

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Портфолио (черновик) — TheFurryDev",
    description: "Черновая страница портфолио в новом дизайне.",
    path: "/home/portfolio",
  }),
  robots: { index: false, follow: false },
};

export default function PortfolioDraftPage() {
  return (
    <main>
      <Nav locale={LOCALE} />

      <PageHero
        eyebrow={PORTFOLIO_PAGE.eyebrow}
        titleBefore={PORTFOLIO_PAGE.titleBefore}
        titleHighlight={PORTFOLIO_PAGE.titleHighlight}
        titleAfter={PORTFOLIO_PAGE.titleAfter}
        lead={PORTFOLIO_PAGE.lead}
        stats={PORTFOLIO_PAGE.stats}
      />

      <PortfolioGallery />

      <Cta locale={LOCALE} />
      <Footer locale={LOCALE} />
    </main>
  );
}
