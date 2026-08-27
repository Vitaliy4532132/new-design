import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Send, SquarePlay } from "lucide-react";
import { TELEGRAM_URL, DISCORD_URL, YOUTUBE_URL } from "@/lib/links";
import { FOOTER_V2 } from "@/lib/footer-v2";
import type { Locale } from "@/lib/i18n";
import { BASE_PATH } from "@/lib/base-path";

const SOCIALS = [
  { href: TELEGRAM_URL, label: "Telegram", Icon: Send },
  { href: YOUTUBE_URL, label: "YouTube", Icon: SquarePlay },
  { href: DISCORD_URL, label: "Discord", Icon: MessageCircle },
];

export function Footer({ locale = "ru" }: { locale?: Locale }) {
  const t = FOOTER_V2[locale];

  return (
    <footer className="relative border-t border-white/10 bg-background px-5 pt-16 pb-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Бренд */}
          <div>
            <div className="mb-4 flex items-center gap-2.5 font-sans text-xl font-bold tracking-tight">
              <Image
                src={`${BASE_PATH}/logo.svg`}
                alt="TheFurryDev"
                width={44}
                height={56}
                className="h-9 w-auto"
              />
              <span>
                TheFurry<span className="text-accent">Dev</span>
              </span>
            </div>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-text-muted">{t.description}</p>

            <div className="flex gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-text-muted transition-colors hover:border-white/20 hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Навигация */}
          <div>
            <div className="mb-4 font-display text-base font-medium">{t.navTitle}</div>
            <ul className="flex flex-col gap-2.5">
              {t.navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Призыв */}
          <div>
            <div className="mb-4 font-display text-base font-medium">{t.ctaTitle}</div>
            <p className="mb-5 max-w-xs text-sm leading-relaxed text-text-muted">{t.ctaText}</p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener"
              className="inline-block rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
            >
              {t.ctaLabel}
            </a>
          </div>
        </div>

        {/* Реквизиты и оплата */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm leading-relaxed text-text-muted">
            <div>{t.legalName}</div>
            <div className="font-mono text-xs text-text-dim">{t.legalId}</div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-text-muted">{t.paymentLabel}:</span>
            {/* Заглушка вместо официального знака ЮKassa — подменить на SVG,
                рисовать чужой платёжный логотип от руки не стоит. */}
            <span className="font-sans text-lg font-bold tracking-tight text-white">ЮKassa</span>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-text-dim lg:flex-row lg:items-center lg:justify-between">
          <span className="text-text-muted">
            © {new Date().getFullYear()} {t.copyright}
          </span>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {t.policyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
            <span className="text-text-dim/70">{t.mojangDisclaimer}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
