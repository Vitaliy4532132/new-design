import { buildMetadata } from "@/lib/seo";
import { SiteNav } from "@/components/site-nav";
import { PageHero } from "@/components/page-hero";
import { ComparisonTable } from "@/components/comparison-table";
import { InfoGrid } from "@/components/info-grid";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { SERVER_SETUP_FAQ } from "@/lib/faq-data";
import { TELEGRAM_URL } from "@/lib/links";

export const metadata = buildMetadata({
  title: "Настройка и оптимизация сервера майнкрафт — TheFurryDev",
  description:
    "Оптимизация сервера майнкрафт от 500₽ и сервер с нуля под ключ от 6000₽: Velocity/BungeeCord, экономика, права, кастомные режимы.",
  path: "/server-setup",
  alternatePaths: { ru: "/server-setup", en: "/en/server-setup", uk: "/uk/server-setup" },
});

const STEPS = [
  "Обновите ядро на Paper или Purpur — они быстрее ванильного Spigot за счёт встроенных оптимизаций.",
  "Настройте view-distance и simulation-distance под реальную нагрузку, а не максимум по умолчанию.",
  "Поставьте плагины оптимизации: Spark для профилирования, Clumps для уменьшения лагов от предметов.",
  "Ограничьте количество мобов и редстоун-тики в конфиге, если на сервере фермы и автоматика.",
  "Вынесите базу данных на отдельный процесс (MySQL вместо встроенного SQLite) при росте онлайна.",
];

const SCRATCH_FEATURES = [
  {
    title: "Proxy Velocity / BungeeCord",
    description: "Настройка прокси-сети, переключение между серверами без переподключения.",
  },
  {
    title: "Лобби и переходы",
    description: "Хаб-сервер с порталами на режимы, разделение нагрузки между процессами.",
  },
  {
    title: "Экономика и права",
    description: "LuckPerms, кастомная валюта, банковская система под ваш баланс игры.",
  },
  {
    title: "Кастомные режимы",
    description: "Уникальная игровая механика, написанная под вашу идею с нуля.",
  },
];

export default function ServerSetupPage() {
  return (
    <main>
      <FaqJsonLd items={SERVER_SETUP_FAQ} />
      <SiteNav />
      <PageHero
        eyebrow="Услуги / Сервер с нуля"
        title="Сервер с нуля и оптимизация"
        highlight="майнкрафт-сервера"
        lead="От быстрой настройки и оптимизации (от 500₽) до полноценного сервера с нуля под ключ — прокси, лобби, режим и самописные плагины — от 6000₽."
        stats={[
          { value: "от 500₽", label: "оптимизация" },
          { value: "от 6000₽", label: "сервер с нуля" },
          { value: "24/7", label: "поддержка" },
        ]}
      />

      <section className="relative bg-background px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
            гайд
          </div>
          <h2 className="mb-4 font-display text-4xl font-medium sm:text-[44px]">
            Как оптимизировать сервер майнкрафт.
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-text-muted">
            Лаги почти всегда сводятся к пяти причинам: устаревшее ядро,
            неверные настройки дальности отрисовки, перегруз мобами,
            редстоун-фермы и слабая база данных. Вот что проверить в первую
            очередь:
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
              Разбираться и тестировать самому — долго. Мы настроим и
              оптимизируем сервер за вас, от 500₽.
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener"
              className="inline-block rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-6 py-3 text-sm font-bold text-white"
            >
              Заказать оптимизацию
            </a>
          </div>
        </div>
      </section>

      <InfoGrid
        eyebrow="сервер с нуля"
        title="Полноценный проект под вашу идею."
        lead="От 6000₽ в зависимости от масштаба (небольшой/средний/крупный), срок — от 21 дня, для сложных проектов — до 4-10 недель."
        items={SCRATCH_FEATURES}
        columns={2}
      />

      <ComparisonTable
        eyebrow="сравнение"
        title="Velocity или BungeeCord?"
        lead="Для новых проектов рекомендуем Velocity — он быстрее и активнее развивается."
        columnA="BungeeCord"
        columnB="Velocity"
        rows={[
          { label: "Производительность", a: "средняя", b: "высокая" },
          { label: "Активная разработка", a: false, b: true },
          { label: "Поддержка старых плагинов", a: true, b: "частично" },
          { label: "Современная архитектура", a: false, b: true },
        ]}
      />

      <FaqAccordion
        items={SERVER_SETUP_FAQ}
        eyebrow="faq"
        title="Вопросы про настройку."
      />
      <CtaSection />
      <SiteFooter />
    </main>
  );
}
