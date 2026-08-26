import type { BlogPost } from "./blog-types";

const TELEGRAM = "https://t.me/thefurrysupport";

export const BLOG_POSTS_EN: BlogPost[] = [
  {
    slug: "how-much-does-a-minecraft-server-cost",
    title: "How Much Does a Custom Minecraft Server Cost in 2026?",
    excerpt:
      "From a ready-made pack to a full network built from scratch — here's what actually drives the price of a custom Minecraft server, and how the pieces add up.",
    date: "2026-06-01",
    category: "General",
    readTime: "5 min",
    ctaHref: TELEGRAM,
    ctaLabel: "Get a free quote",
    blocks: [
      {
        type: "p",
        text: "A custom Minecraft server starts around $39 (≈3000₽) for a ready-made game pack (one mode, standard plugins) and scales up to $78+ (≈6000₽+) for a full server built from scratch — proxy, lobby, custom map and bespoke plugins included. The exact price depends on scope, not just the label of the service.",
      },
      { type: "h2", text: "Ready-made server packs" },
      {
        type: "p",
        text: "A pack (Mini, Standard, or Large tier) is a pre-built game mode — SkyBlock, Survival, Anarchy, BoxPvP and similar — with plugins, worlds and balance already configured. This is the fastest and cheapest way to launch, usually ready within a week.",
      },
      { type: "h2", text: "Full server from scratch" },
      {
        type: "p",
        text: "A [server built from scratch](/server-setup) includes proxy setup (Velocity or BungeeCord), a custom lobby, map building for the mode, and plugins written specifically for your idea. This is the right choice when the pack format doesn't cover what you're building, or you're launching a multi-server network from day one.",
      },
      { type: "h2", text: "What adds to the bill" },
      {
        type: "ul",
        items: [
          "VPS/hosting — a recurring monthly cost, separate from the one-time build",
          "A dedicated [website with a donation store](/sites) — needed once monetization matters",
          "Custom plugins beyond the base pack — priced per feature, not bundled",
          "Map/world building for a unique spawn or arena, if the pack's default map isn't enough",
        ],
      },
      { type: "h2", text: "Getting an exact number" },
      {
        type: "p",
        text: "Generic price lists only go so far — the real number depends on your specific idea, target player count, and which pieces you actually need. We quote projects for free after a short chat about what you're building — reach out and we'll walk through the scope with you.",
      },
    ],
  },
  {
    slug: "velocity-vs-bungeecord",
    title: "Velocity vs BungeeCord: Which Proxy Should You Choose in 2026?",
    excerpt:
      "Both proxies connect multiple Minecraft servers into one network with seamless switching. Here's the real difference, and which one fits a new project.",
    date: "2026-06-10",
    category: "Server From Scratch",
    readTime: "4 min",
    ctaHref: TELEGRAM,
    ctaLabel: "Set up your proxy network",
    blocks: [
      {
        type: "p",
        text: "For a new Minecraft server network in 2026, [Velocity](https://papermc.io/software/velocity) is the better default: it's faster, actively maintained, and built on a modern codebase. BungeeCord still has a place if your network depends on plugins that only ship for it.",
      },
      { type: "h2", text: "Velocity: strengths" },
      {
        type: "ul",
        items: [
          "Noticeably better performance under load thanks to a modern architecture",
          "Active development with regular updates and security fixes",
          "Growing plugin ecosystem, though still smaller than BungeeCord's for legacy tools",
        ],
      },
      { type: "h2", text: "BungeeCord: strengths" },
      {
        type: "ul",
        items: [
          "A huge library of plugins accumulated over many years",
          "Familiar to most experienced network administrators",
          "Development has slowed considerably compared to Velocity",
        ],
      },
      { type: "h2", text: "What to pick" },
      {
        type: "p",
        text: "Starting fresh with no dependency on BungeeCord-only plugins? Go with Velocity. Already running a BungeeCord network with critical plugins that have no Velocity equivalent? Migrating might not be worth the effort right now.",
      },
      { type: "h2", text: "If you'd rather not configure it yourself" },
      {
        type: "p",
        text: "Setting up a proxy correctly — IP forwarding, server registration, fallback handling — is easy to get subtly wrong on the first try. We [configure proxy networks](/server-setup) on either Velocity or BungeeCord, matched to whatever plugins your project actually needs.",
      },
    ],
  },
  {
    slug: "skyblock-vs-survival-vs-anarchy",
    title: "SkyBlock vs Survival vs Anarchy: Which Minecraft Server Pack Should You Start With?",
    excerpt:
      "The three most popular Minecraft server formats attract very different audiences and need very different setup work. Here's how to pick.",
    date: "2026-06-20",
    category: "Server Builds",
    readTime: "5 min",
    ctaHref: TELEGRAM,
    ctaLabel: "Pick a pack for your project",
    blocks: [
      {
        type: "p",
        text: "SkyBlock, Survival, and Anarchy are the three most common Minecraft server formats in 2026, and each targets a different kind of player. Picking the wrong one for your audience is the single most common early mistake new server owners make.",
      },
      { type: "h2", text: "SkyBlock" },
      {
        type: "p",
        text: "Island-based economy with progression and upgrades keeps players engaged the longest — it's the stickiest format by a wide margin. It also needs the most careful economy balancing, or progression stalls out fast and players leave.",
      },
      { type: "h2", text: "Survival" },
      {
        type: "p",
        text: "The genre classic, understood by any player within the first minute. Works well with land claims and social mechanics like clans and player trading. It has the lowest barrier to entry for brand-new players.",
      },
      { type: "h2", text: "Anarchy" },
      {
        type: "p",
        text: "Minimal rules, maximum freedom and PvP. It attracts a niche but extremely loyal audience — anarchy servers hold their player base for years with very little ongoing moderation. It does need infrastructure that can absorb aggressive load (100+ concurrent players, active griefing).",
      },
      { type: "h2", text: "How to decide" },
      {
        type: "p",
        text: "Want a fast, easy-to-understand launch? Survival. Want long-term retention? SkyBlock. Is your audience looking for hardcore, no-rules gameplay? Anarchy. You can also combine several modes on one network through a shared lobby with mode switching. We [build ready-made server packs](/builds) for any of these formats, starting at $39 (≈3000₽).",
      },
    ],
  },
  {
    slug: "how-to-hire-a-minecraft-developer-safely",
    title: "How to Hire a Minecraft Developer Without Getting Scammed",
    excerpt:
      "The Minecraft dev marketplace is full of gig listings with no accountability. Here's what to check before you pay anyone for a plugin or a server build.",
    date: "2026-06-28",
    category: "General",
    readTime: "5 min",
    ctaHref: TELEGRAM,
    ctaLabel: "Talk to our team",
    blocks: [
      {
        type: "p",
        text: "Hiring a Minecraft developer safely comes down to three checks: a visible portfolio of finished, playable work, a clear written scope before any money changes hands, and a payment structure that isn't 100% upfront. Skipping any of the three is how most scam stories start.",
      },
      { type: "h2", text: "Ask for a real portfolio, not just screenshots" },
      {
        type: "p",
        text: "Screenshots can be borrowed from someone else's work. Ask to see a live server, a working plugin demo, or verifiable reviews tied to specific delivered projects — not just a generic gig listing with stock images.",
      },
      { type: "h2", text: "Get the scope in writing first" },
      {
        type: "p",
        text: "\"I'll build you a plugin\" is not a scope. A real quote lists exactly what's included, which version of Minecraft it targets, and what counts as a revision versus a new feature request. Vague scopes are where budget disputes start later.",
      },
      { type: "h2", text: "Never pay 100% upfront on a large project" },
      {
        type: "ul",
        items: [
          "A 50% deposit with the balance due on delivery is standard for anything beyond a small utility plugin",
          "Full upfront payment is reasonable only for very small, quick jobs",
          "A developer who insists on full payment before showing any progress is a red flag, not a normal business practice",
        ],
      },
      { type: "h2", text: "Freelancer marketplace vs an established studio" },
      {
        type: "p",
        text: "A solo freelancer can be cheaper for a one-off small job, but there's no fallback if they disappear mid-project. An established studio with a track record and public reviews carries more accountability — worth the difference in price for anything beyond a quick fix.",
      },
    ],
  },
  {
    slug: "how-to-set-up-a-minecraft-server-network",
    title: "How to Set Up a Minecraft Server Network From Scratch (Velocity Guide)",
    excerpt:
      "Proxy, lobby, and multiple game modes under one roof — here's the step-by-step process for building a real Minecraft network, not just a single server.",
    date: "2026-07-05",
    category: "Server From Scratch",
    readTime: "6 min",
    ctaHref: TELEGRAM,
    ctaLabel: "Build my network",
    blocks: [
      {
        type: "p",
        text: "A Minecraft server network is a proxy (Velocity or BungeeCord) sitting in front of multiple backend servers — a lobby plus one or more game modes — letting players switch between them without reconnecting. Here's the build order that avoids the most common setup mistakes.",
      },
      { type: "h2", text: "Step 1. Set up the proxy" },
      {
        type: "p",
        text: "Install [Velocity](https://papermc.io/software/velocity), enable modern IP forwarding, and register each backend server in its config. This is the piece most beginners get wrong first — mismatched forwarding settings between the proxy and backend servers cause silent connection failures.",
      },
      { type: "h2", text: "Step 2. Build the lobby" },
      {
        type: "p",
        text: "The lobby is the first thing every player sees. It needs clear navigation to each game mode — NPCs or signs, not a maze of unlabeled portals — plus a look that matches your brand from the very first screen.",
      },
      { type: "h2", text: "Step 3. Add the game modes" },
      {
        type: "p",
        text: "Each backend server runs on its own process with its own plugin stack. Keep them isolated: a crash or a heavy plugin on one mode shouldn't be able to bring down the lobby or the other modes.",
      },
      { type: "h2", text: "Step 4. Shared economy and permissions" },
      {
        type: "p",
        text: "If players carry currency or ranks across modes, the economy plugin needs a shared database (MySQL), not per-server SQLite files that silently drift out of sync.",
      },
      { type: "h2", text: "Step 5. Load-test before launch" },
      {
        type: "p",
        text: "Verify TPS under simulated load, check that mode switching works cleanly, and confirm permissions apply correctly across every backend server — not just the one you tested first.",
      },
      {
        type: "p",
        text: "If you'd rather skip the setup and get straight to a working network, we [build Minecraft server networks from scratch](/server-setup) — proxy, lobby, economy and custom game modes included, starting at $78 (≈6000₽).",
      },
    ],
  },
  {
    slug: "bedrock-crossplay-floodgate-guide",
    title: "How to Enable Bedrock Crossplay on Your Minecraft Server (Floodgate Guide)",
    excerpt:
      "Letting Bedrock (mobile, console) players join your Java server can meaningfully grow your player base. Here's what Floodgate and Geyser actually do.",
    date: "2026-07-11",
    category: "Plugins",
    readTime: "4 min",
    ctaHref: TELEGRAM,
    ctaLabel: "Add Bedrock support to my server",
    blocks: [
      {
        type: "p",
        text: "Bedrock crossplay lets players on mobile, console, and Windows Bedrock Edition join a Java Minecraft server. It's handled by two plugins working together: Geyser translates the Bedrock protocol into Java, and Floodgate lets Bedrock players join without needing a paid Java account.",
      },
      { type: "h2", text: "What Geyser does" },
      {
        type: "p",
        text: "Geyser sits on your Java server (or proxy) and translates Bedrock's network protocol in real time, so Bedrock clients can connect to a standard Java server without the owner needing a separate Bedrock server at all.",
      },
      { type: "h2", text: "What Floodgate adds" },
      {
        type: "p",
        text: "Without Floodgate, a Bedrock player still needs a linked, paid Java account to join through Geyser. Floodgate removes that requirement, letting Bedrock players join directly with their existing Xbox/Microsoft identity — this is usually the actual blocker for casual Bedrock players trying a new server.",
      },
      { type: "h2", text: "Things that don't carry over cleanly" },
      {
        type: "ul",
        items: [
          "Some plugins that rely on Java-specific UI (custom books, complex GUIs) render differently or not at all on Bedrock clients",
          "Bedrock's simplified crafting and combat mechanics can shift PvP balance if your server leans heavily on Java-only mechanics",
          "Cross-play permission and rank plugins need to recognize Floodgate's player ID format, not just standard Java UUIDs",
        ],
      },
      { type: "h2", text: "Is it worth setting up" },
      {
        type: "p",
        text: "For most survival, SkyBlock, and anarchy-style servers, yes — Bedrock represents a large share of the overall Minecraft player base, and the setup itself is a one-time configuration task, not an ongoing maintenance burden. For PvP-heavy servers where precise Java mechanics matter, test carefully before opening it up. We [set up Bedrock crossplay](/plugins) as part of server configuration work, alongside any other plugin needs your project has.",
      },
    ],
  },
];

export function getPostBySlugEn(slug: string) {
  return BLOG_POSTS_EN.find((p) => p.slug === slug);
}
