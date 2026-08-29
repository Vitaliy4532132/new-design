import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { PageHero } from "@/components/page-hero";
import { InfoGrid } from "@/components/info-grid";
import { PortfolioCarousel } from "@/components/portfolio-carousel";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { Cta } from "@/components/v2/cta";
import { Footer } from "@/components/v2/footer";
import { BUILDS_FAQ } from "@/lib/faq-data";

export const metadata = buildMetadata({
  title: "Крутые сборки майнкрафт под ключ — TheFurryDev",
  description:
    "Крутые сборки майнкрафт: SkyBlock, Survival, Anarchy, BoxPvP. От 3000₽, готовы от 7 дней. Версии 1.16–1.21.x.",
  path: "/builds",
  alternatePaths: { ru: "/builds", en: "/en/builds", uk: "/uk/builds" },
});

const TYPES = [
  {
    title: "Мини",
    tag: "от 3000₽",
    description:
      "Один игровой режим (SkyBlock, Survival, BoxPvP и другие), базовый набор плагинов, готовая карта без уникального дизайна.",
  },
  {
    title: "Стандарт",
    tag: "от 5000₽",
    description:
      "Расширенный набор плагинов, кастомная экономика и баланс, доработка карты под ваш стиль.",
  },
  {
    title: "Большая",
    tag: "от 15000₽",
    description:
      "Уникальные механики под заказ, индивидуальный дизайн карты, донат-система и углублённая настройка под ваш проект.",
  },
];

export default function BuildsPage() {
  return (
    <main>
      <FaqJsonLd items={BUILDS_FAQ} />
      <Nav />
      <PageHero
        eyebrow="Услуги / Сборки"
        title="Крутые сборки"
        highlight="майнкрафт под ключ"
        lead="Полноценная серверная сборка с плагинами, мирами и настроенной экономикой — от 3000₽, готова от 7 дней в зависимости от наполнения. Поддерживаем версии от 1.16 до актуальной 1.21.x."
        hook="Хочешь сервер как FunTime, HolyWorld или AresMine? Пиши — сделаем не хуже."
        stats={[
          { value: "от 7 дней", label: "срок" },
          { value: "1.16–1.21.x", label: "версии" },
          { value: "от 3000₽", label: "стоимость" },
        ]}
      />
      <InfoGrid
        eyebrow="размер сборки"
        title="Выбирай по масштабу проекта."
        lead="SkyBlock, Survival, Anarchy, BoxPvP, RPG, MiniGames — любой режим можно собрать в любом из трёх размеров."
        items={TYPES}
      />
      <PortfolioCarousel />
      <FaqAccordion items={BUILDS_FAQ} eyebrow="faq" title="Вопросы про сборки." />
      <Cta />
      <Footer />
    </main>
  );
}
