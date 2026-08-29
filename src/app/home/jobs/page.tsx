import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { PageHero } from "@/components/v2/page-hero";
import { JobsPositions } from "@/components/v2/jobs-positions";
import { ApplicationForm } from "@/components/v2/application-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { Footer } from "@/components/v2/footer";
import { JOBS_FAQ, JOBS_PAGE } from "@/lib/jobs-copy";

const LOCALE = "ru" as const;

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Вакансии (черновик) — TheFurryDev",
    description: "Черновая страница вакансий в новом дизайне.",
    path: "/home/jobs",
  }),
  robots: { index: false, follow: false },
};

export default function JobsDraftPage() {
  return (
    <main>
      <Nav locale={LOCALE} />

      <PageHero
        eyebrow={JOBS_PAGE.eyebrow}
        titleBefore={JOBS_PAGE.titleBefore}
        titleHighlight={JOBS_PAGE.titleHighlight}
        titleAfter={JOBS_PAGE.titleAfter}
        lead={JOBS_PAGE.lead}
        stats={JOBS_PAGE.stats}
      />

      <JobsPositions />

      <section className="border-t border-white/10 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <div className="mb-4 font-mono text-xs tracking-widest text-brand uppercase">
              {JOBS_PAGE.formEyebrow}
            </div>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">{JOBS_PAGE.formTitle}</h2>
          </div>

          <ApplicationForm />
        </div>
      </section>

      <FaqAccordion items={JOBS_FAQ} eyebrow="faq" title={JOBS_PAGE.faqTitle} />

      <Footer locale={LOCALE} />
    </main>
  );
}
