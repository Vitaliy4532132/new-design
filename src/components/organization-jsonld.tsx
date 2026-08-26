import { SITE_URL } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

const DESCRIPTION: Record<Locale, string> = {
  ru: "Студия разработки майнкрафт-серверов: сборки, плагины, сайты и проекты с нуля под ключ.",
  en: "Minecraft server development studio: server builds, plugins, websites and full servers from scratch.",
  uk: "Студія розробки майнкрафт-серверів: збірки, плагіни, сайти та проєкти з нуля під ключ.",
};

export function OrganizationJsonLd({ locale = "ru" }: { locale?: Locale }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TheFurryDev",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: DESCRIPTION[locale],
    sameAs: [
      "https://t.me/thefurrysupport",
      "https://discord.gg/SJHMdFUyCA",
      "https://www.youtube.com/@thefurrydev",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
