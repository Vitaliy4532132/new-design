import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { ProjectView } from "@/components/v2/project-view";
import { Cta } from "@/components/v2/cta";
import { Footer } from "@/components/v2/footer";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio-data";
import { WORK_DETAILS } from "@/lib/portfolio-page";

const LOCALE = "ru" as const;

export function generateStaticParams() {
  return PORTFOLIO_ITEMS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = PORTFOLIO_ITEMS.find((i) => i.slug === slug);
  const detail = WORK_DETAILS[slug];

  return {
    ...buildMetadata({
      title: work ? `${work.title[LOCALE]} (черновик) — TheFurryDev` : "Проект — TheFurryDev",
      description: detail?.description ?? "Черновая страница проекта.",
      path: `/home/portfolio/${slug}`,
    }),
    robots: { index: false, follow: false },
  };
}

export default async function ProjectDraftPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const work = PORTFOLIO_ITEMS.find((i) => i.slug === slug);
  const detail = WORK_DETAILS[slug];

  if (!work || !detail) notFound();

  return (
    <main>
      <Nav locale={LOCALE} />
      <ProjectView work={work} detail={detail} />
      <Cta locale={LOCALE} />
      <Footer locale={LOCALE} />
    </main>
  );
}
