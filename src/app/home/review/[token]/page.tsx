import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ReviewLinkForm } from "@/components/v2/review-link-form";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Оставить отзыв — TheFurryDev",
    description: "Страница для отзыва по персональной ссылке.",
    path: "/home/review",
  }),
  robots: { index: false, follow: false },
};

export default async function ReviewLinkPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <ReviewLinkForm token={token} />;
}
