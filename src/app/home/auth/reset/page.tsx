import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AuthForm } from "@/components/v2/auth-form";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Восстановление пароля — TheFurryDev",
    description: "Восстановление доступа к аккаунту TheFurryDev.",
    path: "/home/auth/reset",
  }),
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return <AuthForm mode="reset" />;
}
