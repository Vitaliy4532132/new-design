import type { Locale } from "@/lib/i18n";

const CATEGORY_PHRASE: Record<Locale, Record<string, string>> = {
  ru: {
    Сборка: "сборка сервера майнкрафт",
    Карта: "постройка карты для майнкрафт сервера",
    Сервер: "проект сервера майнкрафт под ключ",
  },
  en: {
    Build: "Minecraft server build",
    Map: "custom map build for a Minecraft server",
    Server: "turnkey Minecraft server project",
  },
  uk: {
    Збірка: "збірка сервера майнкрафт",
    Карта: "побудова карти для майнкрафт сервера",
    Сервер: "проєкт сервера майнкрафт під ключ",
  },
};

const FALLBACK: Record<Locale, string> = {
  ru: "проект сервера майнкрафт",
  en: "Minecraft server project",
  uk: "проєкт сервера майнкрафт",
};

export function portfolioAlt(title: string, category: string, locale: Locale = "ru") {
  const phrase = CATEGORY_PHRASE[locale][category] ?? FALLBACK[locale];
  return `${title} — ${phrase}`;
}
