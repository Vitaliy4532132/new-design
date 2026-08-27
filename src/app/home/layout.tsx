import { ToastProvider } from "@/components/v2/toast";
import { CookieBanner } from "@/components/v2/cookie-banner";

// Обёртка только для страниц нового дизайна. В корневой layout не выношу:
// его делят 18 страниц старого сайта, и баннер появился бы и там.
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <CookieBanner />
    </ToastProvider>
  );
}
