import { buildMetadata } from "@/lib/seo";
import { SiteNav } from "@/components/site-nav";
import { PageHero } from "@/components/page-hero";
import { ComparisonTable } from "@/components/comparison-table";
import { InfoGrid } from "@/components/info-grid";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { SetHtmlLang } from "@/components/set-html-lang";
import { SERVER_SETUP_FAQ_UK } from "@/lib/faq-data-uk";
import { TELEGRAM_URL } from "@/lib/links";

export const metadata = buildMetadata({
  title: "Налаштування та оптимізація сервера майнкрафт — TheFurryDev",
  description:
    "Оптимізація сервера майнкрафт від ₴291 (≈500₽) і сервер з нуля під ключ від ₴3488 (≈6000₽): Velocity/BungeeCord, економіка, права, кастомні режими.",
  path: "/uk/server-setup",
  locale: "uk",
  alternatePaths: { ru: "/server-setup", en: "/en/server-setup", uk: "/uk/server-setup" },
});

const STEPS = [
  "Оновіть ядро на Paper або Purpur — вони швидші за ванільний Spigot завдяки вбудованим оптимізаціям.",
  "Налаштуйте view-distance і simulation-distance під реальне навантаження, а не максимум за замовчуванням.",
  "Поставте плагіни оптимізації: Spark для профілювання, Clumps для зменшення лагів від предметів.",
  "Обмежте кількість мобів і редстоун-тіки в конфігу, якщо на сервері ферми та автоматика.",
  "Винесіть базу даних на окремий процес (MySQL замість вбудованого SQLite) при зростанні онлайну.",
];

const SCRATCH_FEATURES = [
  {
    title: "Proxy Velocity / BungeeCord",
    description: "Налаштування проксі-мережі, перемикання між серверами без перепідключення.",
  },
  {
    title: "Лобі та переходи",
    description: "Хаб-сервер з порталами на режими, розподіл навантаження між процесами.",
  },
  {
    title: "Економіка і права",
    description: "LuckPerms, кастомна валюта, банківська система під ваш баланс гри.",
  },
  {
    title: "Кастомні режими",
    description: "Унікальна ігрова механіка, написана під вашу ідею з нуля.",
  },
];

export default function ServerSetupPageUk() {
  return (
    <main>
      <SetHtmlLang locale="uk" />
      <FaqJsonLd items={SERVER_SETUP_FAQ_UK} />
      <SiteNav locale="uk" />
      <PageHero
        eyebrow="Послуги / Сервер з нуля"
        title="Сервер з нуля та оптимізація"
        highlight="майнкрафт-сервера"
        lead="Від швидкого налаштування та оптимізації (від ₴291, ≈500₽) до повноцінного сервера з нуля під ключ — проксі, лобі, режим і самописні плагіни — від ₴3488 (≈6000₽)."
        stats={[
          { value: "від ₴291", label: "оптимізація" },
          { value: "від ₴3488", label: "сервер з нуля" },
          { value: "24/7", label: "підтримка" },
        ]}
      />

      <section className="relative bg-background px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
            гайд
          </div>
          <h2 className="mb-4 font-display text-4xl font-medium sm:text-[44px]">
            Як оптимізувати сервер майнкрафт.
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-text-muted">
            Лаги майже завжди зводяться до п&apos;яти причин: застаріле ядро,
            невірні налаштування дальності відображення, перевантаження
            мобами, редстоун-ферми та слабка база даних. Ось що перевірити в
            першу чергу:
          </p>
          <ol className="mb-8 flex flex-col gap-4">
            {STEPS.map((step, i) => (
              <li key={i} className="flex min-w-0 gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 font-mono text-xs text-accent">
                  {i + 1}
                </span>
                <span className="min-w-0 text-sm leading-relaxed text-text-muted">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <div className="rounded-2xl border border-accent/30 bg-[linear-gradient(180deg,rgba(123,95,255,0.06),transparent)] p-6">
            <p className="mb-4 text-sm text-text-muted">
              Розбиратися і тестувати самому — довго. Ми налаштуємо та
              оптимізуємо сервер за вас, від ₴291 (≈500₽).
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener"
              className="inline-block rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-6 py-3 text-sm font-bold text-white"
            >
              Замовити оптимізацію
            </a>
          </div>
        </div>
      </section>

      <InfoGrid
        eyebrow="сервер з нуля"
        title="Повноцінний проєкт під вашу ідею."
        lead="Від ₴3488 (≈6000₽) залежно від масштабу (невеликий/середній/великий), термін — від 21 дня, для складних проєктів — до 4-10 тижнів."
        items={SCRATCH_FEATURES}
        columns={2}
      />

      <ComparisonTable
        eyebrow="порівняння"
        title="Velocity чи BungeeCord?"
        lead="Для нових проєктів рекомендуємо Velocity — він швидший і активніше розвивається."
        columnA="BungeeCord"
        columnB="Velocity"
        rows={[
          { label: "Продуктивність", a: "середня", b: "висока" },
          { label: "Активна розробка", a: false, b: true },
          { label: "Підтримка старих плагінів", a: true, b: "частково" },
          { label: "Сучасна архітектура", a: false, b: true },
        ]}
      />

      <FaqAccordion
        items={SERVER_SETUP_FAQ_UK}
        eyebrow="faq"
        title="Питання про налаштування."
      />
      <CtaSection locale="uk" />
      <SiteFooter locale="uk" />
    </main>
  );
}
