import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Send, SquarePlay } from "lucide-react";
import { TELEGRAM_URL, DISCORD_URL, YOUTUBE_URL } from "@/lib/links";
import { FOOTER_V2 } from "@/lib/footer-v2";
import { NAV_V2 } from "@/lib/nav-v2";
import type { Locale } from "@/lib/i18n";
import { BASE_PATH } from "@/lib/base-path";

const SOCIALS = [
  { href: TELEGRAM_URL, label: "Telegram", Icon: Send },
  { href: YOUTUBE_URL, label: "YouTube", Icon: SquarePlay },
  { href: DISCORD_URL, label: "Discord", Icon: MessageCircle },
];

const LINK = "text-sm text-text-muted transition-colors hover:text-white";
const COLUMN_TITLE = "mb-4 font-mono text-xs tracking-widest text-text-dim uppercase";

export function Footer({ locale = "ru" }: { locale?: Locale }) {
  const t = FOOTER_V2[locale];
  // Ссылки берём из меню шапки, чтобы навигация не разъехалась в двух местах.
  const nav = NAV_V2[locale];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-background px-5 pt-16 pb-8 sm:px-6">
      <div
        className="pointer-events-none absolute top-0 left-1/2 hidden h-[300px] w-[700px] -translate-x-1/2 opacity-20 blur-[120px] md:block"
        style={{ background: "radial-gradient(circle, #0A3FFF, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Призыв во всю ширину: в колонке он смотрелся зажатым и оставлял
            пустоту, а здесь задаёт футеру начало. */}
        <div className="mb-14 flex flex-col items-start gap-6 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,63,255,0.10),transparent)] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="mb-2 font-display text-2xl font-medium sm:text-3xl">{t.ctaTitle}</h2>
            <p className="max-w-md text-sm leading-relaxed text-text-muted">{t.ctaText}</p>
          </div>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener"
            className="flex shrink-0 items-center gap-2 rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
          >
            {t.ctaLabel}
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
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
                TheFurry<span className="text-brand">Dev</span>
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
                  className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-text-muted transition-colors hover:border-brand/40 hover:text-brand"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Услуги */}
          <div>
            <div className={COLUMN_TITLE}>{t.servicesTitle}</div>
            <ul className="flex flex-col gap-2.5">
              {nav.serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Остальное меню */}
          <div>
            <div className={COLUMN_TITLE}>{t.navTitle}</div>
            <ul className="flex flex-col gap-2.5">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Реквизиты и оплата */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm leading-relaxed">
            <div className="text-text-muted">{t.legalName}</div>
            <div className="font-mono text-xs text-text-dim">{t.legalId}</div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-text-dim">{t.paymentLabel}</span>
            {/* Заглушка вместо официального знака ЮKassa — подменить на SVG,
                рисовать чужой платёжный логотип от руки не стоит. */}
            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-sans text-sm font-bold tracking-tight text-white">
              ЮKassa
            </span>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs lg:flex-row lg:items-center lg:justify-between">
          <span className="text-text-muted">
            © {new Date().getFullYear()} {t.copyright}
          </span>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-text-dim">
            {t.policyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-[11px] leading-relaxed text-text-dim/70">
          {t.mojangDisclaimer}
        </p>
      </div>
    </footer>
  );
}
