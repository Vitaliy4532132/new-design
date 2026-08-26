import {
  Boxes,
  Globe,
  Mountain,
  Puzzle,
  Server,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";

export const CATEGORY_META: Record<string, { icon: LucideIcon; color: string }> = {
  "Оптимизация": { icon: Zap, color: "#38bdf8" },
  "Построение карты": { icon: Mountain, color: "#34d399" },
  "Сайты": { icon: Globe, color: "#a78bfa" },
  "Сервер с нуля": { icon: Server, color: "#fbbf24" },
  "Плагины": { icon: Puzzle, color: "#fb7185" },
  "Сборки": { icon: Boxes, color: "#1797FF" },
  "Главная": { icon: Wallet, color: "#9a9aa3" },
};

export const CATEGORY_META_EN: Record<string, { icon: LucideIcon; color: string }> = {
  "Optimization": { icon: Zap, color: "#38bdf8" },
  "Map Building": { icon: Mountain, color: "#34d399" },
  "Websites": { icon: Globe, color: "#a78bfa" },
  "Server From Scratch": { icon: Server, color: "#fbbf24" },
  "Plugins": { icon: Puzzle, color: "#fb7185" },
  "Server Builds": { icon: Boxes, color: "#1797FF" },
  "General": { icon: Wallet, color: "#9a9aa3" },
};

export const CATEGORY_META_UK: Record<string, { icon: LucideIcon; color: string }> = {
  "Оптимізація": { icon: Zap, color: "#38bdf8" },
  "Побудова карти": { icon: Mountain, color: "#34d399" },
  "Сайти": { icon: Globe, color: "#a78bfa" },
  "Сервер з нуля": { icon: Server, color: "#fbbf24" },
  "Плагіни": { icon: Puzzle, color: "#fb7185" },
  "Збірки": { icon: Boxes, color: "#1797FF" },
  "Головна": { icon: Wallet, color: "#9a9aa3" },
};

const META_BY_LOCALE: Record<Locale, Record<string, { icon: LucideIcon; color: string }>> = {
  ru: CATEGORY_META,
  en: CATEGORY_META_EN,
  uk: CATEGORY_META_UK,
};

export function getCategoryMeta(category: string, locale: Locale = "ru") {
  return META_BY_LOCALE[locale][category] ?? { icon: Zap, color: "#1797FF" };
}
