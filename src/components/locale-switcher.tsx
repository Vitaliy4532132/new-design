"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";

const PREFIXES: Record<Locale, string> = { ru: "", en: "/en", uk: "/uk" };

function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en" || pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  if (pathname === "/uk" || pathname.startsWith("/uk/")) return pathname.slice(3) || "/";
  return pathname;
}

function targetPathFor(locale: Locale, pathname: string): string {
  const basePath = stripLocalePrefix(pathname);
  // Blog posts don't have 1:1 equivalents across locales (original content per
  // language, not translations) — fall back to that locale's blog index.
  if (/^\/blog\/.+/.test(basePath)) {
    return locale === "ru" ? "/blog" : `${PREFIXES[locale]}/blog`;
  }
  if (basePath === "/") {
    return locale === "ru" ? "/" : PREFIXES[locale];
  }
  return `${PREFIXES[locale]}${basePath}`;
}

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 border-l border-white/10 pl-[18px] font-mono text-xs">
      {LOCALES.map((l) => (
        <Link
          key={l.code}
          href={targetPathFor(l.code, pathname)}
          className={
            l.code === locale
              ? "text-white"
              : "text-text-dim transition-colors hover:text-white"
          }
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
