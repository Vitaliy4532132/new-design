import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { PurchaseView } from "@/components/v2/purchase-view";
import { Footer } from "@/components/v2/footer";
import { DEMO_PURCHASES } from "@/lib/profile-demo";

const LOCALE = "ru" as const;

export function generateStaticParams() {
  return DEMO_PURCHASES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const purchase = DEMO_PURCHASES.find((p) => p.slug === slug);

  return {
    ...buildMetadata({
      title: purchase ? `${purchase.title} — покупка (черновик)` : "Покупка — TheFurryDev",
      description: "Черновая страница покупки в личном кабинете.",
      path: `/home/profile/purchases/${slug}`,
    }),
    robots: { index: false, follow: false },
  };
}

export default async function PurchaseDraftPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const purchase = DEMO_PURCHASES.find((p) => p.slug === slug);

  if (!purchase) notFound();

  return (
    <main>
      <Nav locale={LOCALE} />
      <PurchaseView purchase={purchase} />
      <Footer locale={LOCALE} />
    </main>
  );
}
