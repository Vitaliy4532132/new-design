import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAV_COPY, type Locale } from "@/lib/i18n";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { BASE_PATH } from "@/lib/base-path";

export function SiteNav({ locale = "ru" }: { locale?: Locale }) {
  const { homeHref, servicesLabel, servicesHref, serviceLinks, navLinks } = NAV_COPY[locale];
  return (
    <nav className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between px-10 py-[30px]">
      <Link
        href={homeHref}
        className="flex items-center gap-2 font-sans text-lg font-bold tracking-tight"
      >
        <Image
          src={`${BASE_PATH}/logo.svg`}
          alt="TheFurryDev"
          width={28}
          height={36}
          className="h-7 w-auto"
        />
        <span>
          TheFurry<span className="text-accent">Dev</span>
        </span>
      </Link>
      <div className="flex items-center gap-[34px] text-sm font-medium text-text-muted">
        <div className="group relative">
          <Link
            href={servicesHref}
            className="flex items-center gap-1 py-2 transition-colors hover:text-white"
          >
            {servicesLabel}
            <ChevronDown
              size={14}
              className="transition-transform group-hover:rotate-180"
            />
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
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
        <LocaleSwitcher locale={locale} />
      </div>
    </nav>
  );
}
