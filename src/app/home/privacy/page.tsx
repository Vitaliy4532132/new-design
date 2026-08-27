import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import PrivacyContent from "@/components/v2/privacy-content";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Политика конфиденциальности — TheFurryDev",
    description: "Политика обработки и защиты персональных данных пользователей сайта TheFurryDev.",
    path: "/home/privacy",
  }),
  robots: { index: false, follow: false },
};

export default function PrivacyDraftPage() {
  return <PrivacyContent />;
}
