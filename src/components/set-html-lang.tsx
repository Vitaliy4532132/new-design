"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

export function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [locale]);

  return null;
}
