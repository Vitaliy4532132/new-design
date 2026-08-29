import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { PageHero } from "@/components/page-hero";
import { InfoGrid } from "@/components/info-grid";
import { ProductsShelf } from "@/components/products-shelf";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { Cta } from "@/components/v2/cta";
import { Footer } from "@/components/v2/footer";
import { SetHtmlLang } from "@/components/set-html-lang";
import { PLUGINS_FAQ_EN } from "@/lib/faq-data-en";

export const metadata = buildMetadata({
  title: "Custom Minecraft Plugin Development — TheFurryDev",
  description:
    "Custom Minecraft plugins in Java and Kotlin for Spigot, Paper, Velocity: economy, anticheat, chat moderation, clans. From $3 (≈200₽), ready in 3 days.",
  path: "/en/plugins",
  locale: "en",
  alternatePaths: { ru: "/plugins", en: "/en/plugins", uk: "/uk/plugins" },
});

const TYPES = [
  { title: "Economy", tag: "Java", description: "Custom currency, shops, a banking system." },
  { title: "Anticheat", tag: "Java", description: "Protection from cheaters without false-banning legit players." },
  { title: "Minigames", tag: "Kotlin", description: "Logic for bedwars, skywars, parkour modes." },
  { title: "NPC buyer", tag: "Java", description: "An NPC that buys resources from players for economy servers." },
  { title: "Chat & AI moderation", tag: "Kotlin", description: "Profanity and spam filtering, custom chat formatting." },
  { title: "Clans and guilds", tag: "Java", description: "A clan system with territories, rankings and wars." },
];

export default function PluginsPageEn() {
  return (
    <main>
      <SetHtmlLang locale="en" />
      <FaqJsonLd items={PLUGINS_FAQ_EN} />
      <Nav locale="en" />
      <PageHero
        eyebrow="Services / Plugins"
        title="Custom plugins for your"
        highlight="Minecraft server"
        lead="Custom mechanics in Java and Kotlin for Spigot, Paper and Velocity — from a simple utility at $3 (≈200₽) to a complex system with economy and a database at $23 (≈1800₽)."
        stats={[
          { value: "from $3", label: "price" },
          { value: "Java / Kotlin", label: "stack" },
          { value: "Spigot / Paper", label: "cores" },
        ]}
      />
      <InfoGrid
        eyebrow="plugin types"
        title="Any mechanic for any task."
        items={TYPES}
      />
      <ProductsShelf
        locale="en"
        filter="plugin"
        title="Ready-made plugins — no waiting on custom development."
      />
      <FaqAccordion items={PLUGINS_FAQ_EN} eyebrow="faq" title="Questions about plugins." />
      <Cta locale="en" />
      <Footer locale="en" />
    </main>
  );
}
