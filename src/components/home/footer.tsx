import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Send, SquarePlay } from "lucide-react";
import { TELEGRAM_URL, DISCORD_URL, YOUTUBE_URL } from "@/lib/links";
import { NAV_COPY, FOOTER_COPY, type Locale } from "@/lib/i18n";
import { BASE_PATH } from "@/lib/base-path";

export function HomeFooter({ locale = "ru" }: { locale?: Locale }) {
  const { serviceLinks } = NAV_COPY[locale];
  const {
    description,
    companyTitle,
    companyLinks,
    copyrightSuffix,
    ctaTitle,
    ctaText,
    ctaLabel,
    mojangDisclaimer,
  } = FOOTER_COPY[locale];

  const navLinks = [...serviceLinks.slice(0, 2), ...companyLinks];

  return (
    <footer className="relative border-t border-white/10 bg-background px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
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
            <p className="mb-5 max-w-xs text-sm leading-relaxed text-text-muted">{description}</p>
            <div className="flex gap-2">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener"
                aria-label="Telegram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-text-muted transition-colors hover:border-white/20 hover:text-white"
              >
                <Send size={15} />
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener"
                aria-label="Discord"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-text-muted transition-colors hover:border-white/20 hover:text-white"
              >
                <MessageCircle size={15} />
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-text-muted transition-colors hover:border-white/20 hover:text-white"
              >
                <SquarePlay size={15} />
              </a>
            </div>
          </div>

          <div>
            <div className="mb-4 font-mono text-xs tracking-widest text-text-dim uppercase">{companyTitle}</div>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 font-mono text-xs tracking-widest text-text-dim uppercase">{ctaTitle}</div>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-text-muted">{ctaText}</p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener"
              className="inline-block rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
            >
              {ctaLabel}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-text-dim">
          <span>
            © {new Date().getFullYear()} {copyrightSuffix}
          </span>
          <span className="max-w-2xl text-text-dim/70">{mojangDisclaimer}</span>
        </div>
      </div>
    </footer>
  );
}
