import { buildMetadata } from "@/lib/seo";
import { SiteNav } from "@/components/site-nav";
import { PageHero } from "@/components/page-hero";
import { InfoGrid } from "@/components/info-grid";
import { ComparisonTable } from "@/components/comparison-table";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { SetHtmlLang } from "@/components/set-html-lang";
import { SITES_FAQ_UK } from "@/lib/faq-data-uk";

export const metadata = buildMetadata({
  title: "Сайт для майнкрафт сервера на замовлення — TheFurryDev",
  description:
    "Сайти для серверів майнкрафт: донат-магазин, голосування, особистий кабінет гравця, інтеграція з базою сервера. Від ₴581 (≈1000₽), готовий від 3 днів.",
  path: "/uk/sites",
  locale: "uk",
  alternatePaths: { ru: "/sites", en: "/en/sites", uk: "/uk/sites" },
});

const FEATURES = [
  {
    title: "Лендінг сервера",
    description: "Презентація проєкту: правила, новини, опис режимів і команда.",
  },
  {
    title: "Донат-магазин",
    description: "Каталог привілеїв з оплатою карткою, автоматична видача після покупки.",
  },
  {
    title: "Особистий кабінет гравця",
    description: "Статистика, інвентар, баланс — прив'язка до бази даних вашого сервера.",
  },
  {
    title: "Голосування",
    description: "Інтеграція з топ-листами серверів і система нагород за голос.",
  },
];

export default function SitesPageUk() {
  return (
    <main>
      <SetHtmlLang locale="uk" />
      <FaqJsonLd items={SITES_FAQ_UK} />
      <SiteNav locale="uk" />
      <PageHero
        eyebrow="Послуги / Сайти"
        title="Сайт для"
        highlight="вашого майнкрафт-сервера"
        lead="Індивідуальний сайт під наявний сервер: донат-магазин, голосування, особистий кабінет гравця. Від ₴581 (≈1000₽), з інтеграцією платежів і бази даних."
        stats={[
          { value: "від ₴581", label: "вартість" },
          { value: "Next.js", label: "технологія" },
          { value: "від 3 днів", label: "термін" },
        ]}
      />
      <InfoGrid
        eyebrow="що входить"
        title="Не просто лендінг."
        lead="Сайт інтегрується з реальними даними вашого сервера, а не просто гарно виглядає."
        items={FEATURES}
        columns={2}
      />
      <ComparisonTable
        eyebrow="порівняння"
        title="Безкоштовний шаблон vs індивідуальний сайт."
        lead="Безкоштовні CMS на кшталт NamelessMC вирішують базову задачу, але виглядають однаково у сотень серверів."
        columnA="Безкоштовний шаблон"
        columnB="Сайт від TheFurryDev"
        rows={[
          { label: "Унікальний дизайн", a: false, b: true },
          { label: "Інтеграція з базою сервера", a: "обмежено", b: true },
          { label: "SEO-оптимізація", a: false, b: true },
          { label: "Підтримка і доопрацювання", a: false, b: true },
          { label: "Швидкість завантаження", a: "середня", b: "висока" },
        ]}
      />
      <FaqAccordion items={SITES_FAQ_UK} eyebrow="faq" title="Питання про сайти." />
      <CtaSection locale="uk" />
      <SiteFooter locale="uk" />
    </main>
  );
}
