import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { PageHero } from "@/components/v2/page-hero";
import { PricingCards } from "@/components/v2/pricing-cards";
import { FaqAccordion } from "@/components/faq-accordion";
import { Footer } from "@/components/v2/footer";
import { PLANS_FAQ, PLANS_PAGE } from "@/lib/plans-copy";
import { TELEGRAM_URL } from "@/lib/links";

const LOCALE = "ru" as const;

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Тарифы (черновик) — TheFurryDev",
    description: "Черновая страница тарифов в новом дизайне.",
    path: "/home/plans",
  }),
  robots: { index: false, follow: false },
};

export default function PlansDraftPage() {
  return (
    <main>
      <Nav locale={LOCALE} />

      <PageHero
        eyebrow={PLANS_PAGE.eyebrow}
        titleBefore={PLANS_PAGE.titleBefore}
        titleHighlight={PLANS_PAGE.titleHighlight}
        titleAfter={PLANS_PAGE.titleAfter}
        lead={PLANS_PAGE.lead}
      />

      <PricingCards />

      {/* Подсказка для тех, кто не выбрал: стоит сразу под карточками,
          где сомнение и возникает. */}
      <section className="px-5 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-white/10 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10">
                <MessageCircle size={16} className="text-accent" />
              </span>
              <div>
                <div className="mb-0.5 font-display text-base font-medium">{PLANS_PAGE.choiceTitle}</div>
                <p className="text-sm text-text-muted">{PLANS_PAGE.choiceHint}</p>
              </div>
            </div>

            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener"
              className="shrink-0 rounded-[10px] border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-accent/40"
            >
              {PLANS_PAGE.choiceButton}
            </a>
          </div>
        </div>
      </section>

      <FaqAccordion items={PLANS_FAQ} eyebrow="faq" title={PLANS_PAGE.faqTitle} />

      <Footer locale={LOCALE} />
    </main>
  );
}
