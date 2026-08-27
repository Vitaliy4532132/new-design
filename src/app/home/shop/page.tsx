import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { PageHero } from "@/components/v2/page-hero";
import { ShopGrid } from "@/components/v2/shop-grid";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { Cta } from "@/components/v2/cta";
import { Footer } from "@/components/v2/footer";
import { SHOP_PAGE } from "@/lib/page-copy";
import { HOME_COPY } from "@/lib/home-copy";
import { HOME_FAQ } from "@/lib/faq-data";

const LOCALE = "ru" as const;

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Магазин (черновик) — TheFurryDev",
    description: "Черновая версия страницы магазина в новом дизайне.",
    path: "/home/shop",
  }),
  robots: { index: false, follow: false },
};

export default function ShopDraftPage() {
  const t = SHOP_PAGE[LOCALE];
  const products = HOME_COPY[LOCALE].products;

  const plugins = products.items.filter((p) => p.kind === "plugin").length;
  const builds = products.items.filter((p) => p.kind === "build").length;

  return (
    <main>
      <FaqJsonLd items={HOME_FAQ} />
      <Nav locale={LOCALE} />
      <PageHero
        eyebrow={t.eyebrow}
        titleBefore={t.titleBefore}
        titleHighlight={t.titleHighlight}
        titleAfter="."
        lead={t.lead}
        // Цифры считаем из самих товаров, чтобы они не разъехались с каталогом.
        stats={[
          { value: String(plugins), label: products.typeLabels.plugin },
          { value: String(builds), label: products.typeLabels.build },
          { value: "24/7", label: HOME_COPY[LOCALE].stats.support },
        ]}
      />
      <ShopGrid locale={LOCALE} />
      <FaqAccordion items={HOME_FAQ} eyebrow="faq" title={t.faqTitle} />
      <Cta locale={LOCALE} />
      <Footer locale={LOCALE} />
    </main>
  );
}
