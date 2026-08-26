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
import { SERVER_SETUP_FAQ_EN } from "@/lib/faq-data-en";
import { TELEGRAM_URL } from "@/lib/links";

export const metadata = buildMetadata({
  title: "Minecraft Server Setup and Optimization — TheFurryDev",
  description:
    "Minecraft server optimization from $6 (≈500₽) and a full server from scratch from $78 (≈6000₽): Velocity/BungeeCord, economy, permissions, custom modes.",
  path: "/en/server-setup",
  locale: "en",
  alternatePaths: { ru: "/server-setup", en: "/en/server-setup", uk: "/uk/server-setup" },
});

const STEPS = [
  "Switch the core to Paper or Purpur — they're faster than vanilla Spigot thanks to built-in optimizations.",
  "Tune view-distance and simulation-distance for actual load, not the default maximum.",
  "Install optimization plugins: Spark for profiling, Clumps for reducing item-drop lag.",
  "Limit mob counts and redstone ticks in the config if your server has farms and automation.",
  "Move the database to a separate process (MySQL instead of built-in SQLite) as player count grows.",
];

const SCRATCH_FEATURES = [
  {
    title: "Velocity / BungeeCord proxy",
    description: "Proxy network setup, switching between servers without reconnecting.",
  },
  {
    title: "Lobby and transitions",
    description: "A hub server with portals to each mode, splitting load across processes.",
  },
  {
    title: "Economy and permissions",
    description: "LuckPerms, a custom currency, a banking system for your game's balance.",
  },
  {
    title: "Custom game modes",
    description: "Unique gameplay mechanics written from scratch for your idea.",
  },
];

export default function ServerSetupPageEn() {
  return (
    <main>
      <SetHtmlLang locale="en" />
      <FaqJsonLd items={SERVER_SETUP_FAQ_EN} />
      <SiteNav locale="en" />
      <PageHero
        eyebrow="Services / Server From Scratch"
        title="Server from scratch and"
        highlight="optimization"
        lead="From quick setup and optimization (from $6, ≈500₽) to a full server from scratch under one roof — proxy, lobby, mode and custom plugins — from $78 (≈6000₽)."
        stats={[
          { value: "from $6", label: "optimization" },
          { value: "from $78", label: "server from scratch" },
          { value: "24/7", label: "support" },
        ]}
      />

      <section className="relative bg-background px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
            guide
          </div>
          <h2 className="mb-4 font-display text-4xl font-medium sm:text-[44px]">
            How to optimize a Minecraft server.
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-text-muted">
            Lag almost always comes down to five causes: an outdated core,
            wrong render-distance settings, mob overload, redstone farms and
            a weak database. Here&apos;s what to check first:
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
              Figuring it out and testing it yourself takes a while. We&apos;ll
              set up and optimize your server for you, from $6 (≈500₽).
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener"
              className="inline-block rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-6 py-3 text-sm font-bold text-white"
            >
              Get optimization
            </a>
          </div>
        </div>
      </section>

      <InfoGrid
        eyebrow="server from scratch"
        title="A full project built for your idea."
        lead="From $78 (≈6000₽) depending on scale (small/medium/large), turnaround from 21 days, up to 4-10 weeks for complex projects."
        items={SCRATCH_FEATURES}
        columns={2}
      />

      <ComparisonTable
        eyebrow="comparison"
        title="Velocity or BungeeCord?"
        lead="For new projects we recommend Velocity — it's faster and more actively developed."
        columnA="BungeeCord"
        columnB="Velocity"
        rows={[
          { label: "Performance", a: "average", b: "high" },
          { label: "Active development", a: false, b: true },
          { label: "Legacy plugin support", a: true, b: "partial" },
          { label: "Modern architecture", a: false, b: true },
        ]}
      />

      <FaqAccordion
        items={SERVER_SETUP_FAQ_EN}
        eyebrow="faq"
        title="Questions about server setup."
      />
      <CtaSection locale="en" />
      <SiteFooter locale="en" />
    </main>
  );
}
