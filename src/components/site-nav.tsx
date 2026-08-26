"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV_COPY, type Locale } from "@/lib/i18n";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { BASE_PATH } from "@/lib/base-path";
import { TELEGRAM_URL } from "@/lib/links";

export function SiteNav({ locale = "ru" }: { locale?: Locale }) {
  const { homeHref, servicesLabel, servicesHref, serviceLinks, navLinks, ctaLabel } = NAV_COPY[locale];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-white/10 bg-background/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-[22px]">
        <Link
          href={homeHref}
          className="flex items-center gap-2 font-sans text-lg font-bold tracking-tight"
          onClick={() => setMobileOpen(false)}
        >
          <Image src={`${BASE_PATH}/logo.svg`} alt="TheFurryDev" width={28} height={36} className="h-7 w-auto" />
          <span>
            TheFurry<span className="text-accent">Dev</span>
          </span>
        </Link>

        <div className="hidden items-center gap-[34px] text-sm font-medium text-text-muted md:flex">
          <div className="group relative">
            <Link href={servicesHref} className="flex items-center gap-1 py-2 transition-colors hover:text-white">
              {servicesLabel}
              <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="flex w-56 flex-col gap-1 rounded-2xl border border-white/10 bg-surface p-2 shadow-[0_16px_30px_rgba(0,0,0,0.5)]">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
          <LocaleSwitcher locale={locale} />
        </div>

        <div className="hidden md:block">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener"
            className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
          >
            {ctaLabel}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white md:hidden"
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-background/95 px-6 pb-8 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 pt-4">
            <div className="mb-1 px-3 font-mono text-[11px] tracking-widest text-text-dim uppercase">
              {servicesLabel}
            </div>
            {serviceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <div className="my-3 h-px bg-white/10" />

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
            <LocaleSwitcher locale={locale} />
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener"
              onClick={() => setMobileOpen(false)}
              className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
