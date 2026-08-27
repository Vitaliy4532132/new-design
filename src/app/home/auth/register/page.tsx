import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AuthForm } from "@/components/v2/auth-form";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Регистрация — TheFurryDev",
    description: "Создание аккаунта TheFurryDev.",
    path: "/home/auth/register",
  }),
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return <AuthForm mode="register" />;
}
