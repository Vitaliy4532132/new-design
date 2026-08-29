import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { PageHero } from "@/components/page-hero";
import { InfoGrid } from "@/components/info-grid";
import { PortfolioCarousel } from "@/components/portfolio-carousel";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { Cta } from "@/components/v2/cta";
import { Footer } from "@/components/v2/footer";
import { SetHtmlLang } from "@/components/set-html-lang";
import { BUILDS_FAQ_UK } from "@/lib/faq-data-uk";

export const metadata = buildMetadata({
  title: "Круті збірки майнкрафт під ключ — TheFurryDev",
  description:
    "Круті збірки майнкрафт: SkyBlock, Survival, Anarchy, BoxPvP. Від ₴1744 (≈3000₽), готові від 7 днів. Версії 1.16–1.21.x.",
  path: "/uk/builds",
  locale: "uk",
  alternatePaths: { ru: "/builds", en: "/en/builds", uk: "/uk/builds" },
});

const TYPES = [
  {
    title: "Міні",
    tag: "від ₴1744",
    description:
      "Один ігровий режим (SkyBlock, Survival, BoxPvP та інші), базовий набір плагінів, готова карта без унікального дизайну.",
  },
  {
    title: "Стандарт",
    tag: "від ₴2907",
    description:
      "Розширений набір плагінів, кастомна економіка та баланс, доопрацювання карти під ваш стиль.",
  },
  {
    title: "Велика",
    tag: "від ₴8721",
    description:
      "Унікальні механіки на замовлення, індивідуальний дизайн карти, донат-система та поглиблене налаштування під ваш проєкт.",
  },
];

export default function BuildsPageUk() {
  return (
    <main>
      <SetHtmlLang locale="uk" />
      <FaqJsonLd items={BUILDS_FAQ_UK} />
      <Nav locale="uk" />
      <PageHero
        eyebrow="Послуги / Збірки"
        title="Круті збірки"
        highlight="майнкрафт під ключ"
        lead="Повноцінна серверна збірка з плагінами, світами та налаштованою економікою — від ₴1744 (≈3000₽), готова від 7 днів залежно від наповнення. Підтримуємо версії від 1.16 до актуальної 1.21.x."
        hook="Хочеш сервер як FunTime, HolyWorld чи AresMine? Пиши — зробимо не гірше."
        stats={[
          { value: "від 7 днів", label: "термін" },
          { value: "1.16–1.21.x", label: "версії" },
          { value: "від ₴1744", label: "вартість" },
        ]}
      />
      <InfoGrid
        eyebrow="розмір збірки"
        title="Обирай за масштабом проєкту."
        lead="SkyBlock, Survival, Anarchy, BoxPvP, RPG, MiniGames — будь-який режим можна зібрати в будь-якому з трьох розмірів."
        items={TYPES}
      />
      <PortfolioCarousel locale="uk" />
      <FaqAccordion items={BUILDS_FAQ_UK} eyebrow="faq" title="Питання про збірки." />
      <Cta locale="uk" />
      <Footer locale="uk" />
    </main>
  );
}
