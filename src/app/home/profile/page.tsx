import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { ProfileView } from "@/components/v2/profile-view";
import { Footer } from "@/components/v2/footer";

const LOCALE = "ru" as const;

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Профиль (черновик) — TheFurryDev",
    description: "Черновая версия личного кабинета в новом дизайне.",
    path: "/home/profile",
  }),
  robots: { index: false, follow: false },
};

export default function ProfileDraftPage() {
  return (
    <main>
      <Nav locale={LOCALE} />
      <ProfileView />
      <Footer locale={LOCALE} />
    </main>
  );
}
