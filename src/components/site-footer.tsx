import Image from "next/image";
import Link from "next/link";
import { TELEGRAM_URL, DISCORD_URL, YOUTUBE_URL } from "@/lib/links";
import { NAV_COPY, FOOTER_COPY, type Locale } from "@/lib/i18n";
import { BASE_PATH } from "@/lib/base-path";

export function SiteFooter({ locale = "ru" }: { locale?: Locale }) {
  const { serviceLinks } = NAV_COPY[locale];
  const { description, servicesTitle, companyTitle, companyLinks, copyrightSuffix, socialLabels } =
    FOOTER_COPY[locale];

  return (
    <footer className="relative border-t border-white/10 bg-background px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-2">
            <div className="mb-4 flex items-center gap-2 font-sans text-lg font-bold tracking-tight">
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
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              {description}
            </p>
          </div>

          <div>
            <div className="mb-4 font-mono text-xs tracking-widest text-text-dim uppercase">
              {servicesTitle}
            </div>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 font-mono text-xs tracking-widest text-text-dim uppercase">
              {companyTitle}
            </div>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-text-dim sm:flex-row">
          <span>© {new Date().getFullYear()} {copyrightSuffix}</span>
          <div className="flex gap-5">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-white"
            >
              {socialLabels.telegram}
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-white"
            >
              {socialLabels.discord}
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-white"
            >
              {socialLabels.youtube}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
