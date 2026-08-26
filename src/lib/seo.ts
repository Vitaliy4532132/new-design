import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { BASE_PATH } from "@/lib/base-path";

// Лендинг живёт под thefurry.store/dev — корень домена занят магазином.
export const SITE_URL = `https://www.thefurry.store${BASE_PATH}`;
export const SITE_NAME = "TheFurryDev";

const OG_LOCALE: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US",
  uk: "uk_UA",
};

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  locale = "ru",
  alternatePaths,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  locale?: Locale;
  /** Paths (without domain) of the equivalent page in other locales, for hreflang. */
  alternatePaths?: Partial<Record<Locale, string>>;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const languages = alternatePaths
    ? Object.fromEntries(
        Object.entries(alternatePaths).map(([loc, p]) => [loc, `${SITE_URL}${p}`]),
      )
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
