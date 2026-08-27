import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AuthForm } from "@/components/v2/auth-form";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Вход — TheFurryDev",
    description: "Вход в личный кабинет TheFurryDev.",
    path: "/home/auth/login",
  }),
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return <AuthForm mode="login" />;
}
