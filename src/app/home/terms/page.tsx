import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import TermsContent from "@/components/v2/terms-content";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Условия использования — TheFurryDev",
    description: "Условия использования сайта, цифровых товаров и услуг TheFurryDev.",
    path: "/home/terms",
  }),
  robots: { index: false, follow: false },
};

export default function TermsDraftPage() {
  return <TermsContent />;
}
