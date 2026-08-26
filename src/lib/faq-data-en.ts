import type { FaqItem } from "@/components/faq-accordion";

export const HOME_FAQ_EN: FaqItem[] = [
  {
    q: "How much does a turnkey Minecraft server cost?",
    a: "Depends on scope: a pack (just the game mode) — from $39 (≈3000₽), a server from scratch under one roof (proxy, lobby, mode, map building, website on request) — from $78 (≈6000₽). We send an exact quote for free after your inquiry.",
  },
  {
    q: "How are you different from free hosting like Aternos?",
    a: "Aternos is just hosting — you still configure the server yourself. We deliver a finished product: plugins, balance, anti-grief protection and design, all under one roof.",
  },
  {
    q: "I'm a player and want to buy donations on a server — is that you?",
    a: "No, donations and perks are bought from the owner of the server you're playing on. We develop servers and packs for project owners, not individual players.",
  },
  {
    q: "Do you work with ready packs or only from-scratch builds?",
    a: "Both. A ready pack is a fast start from $39 (≈3000₽) (Mini/Standard/Large depending on scope), a server from scratch is a full custom project from $78 (≈6000₽).",
  },
  {
    q: "Which Minecraft versions do you support?",
    a: "From 1.16 to the current 1.21.x, on Paper, Spigot, BungeeCord and Velocity. Bedrock crossplay via Floodgate/Geyser on request.",
  },
  {
    q: "Is there support after the project is delivered?",
    a: "Yes. Free support after delivery runs 7 to 30 days depending on the tier, with paid support available after that. We're reachable on Telegram/Discord at every stage of development.",
  },
  {
    q: "How does payment work?",
    a: "Usually 50% upfront before work starts, the rest on delivery. Full upfront payment is possible for smaller orders. We accept card transfers and cryptocurrency.",
  },
  {
    q: "Can I buy a ready plugin or pack without custom development?",
    a: "Yes, the \"Ready-made\" section has plugins and packs you can put on your server today without waiting on custom development.",
  },
  {
    q: "Do you only do what's listed in your services?",
    a: "No, those are just our main directions — we take on anything Minecraft-related: resource packs, GUI menus for servers, modded servers on Forge/Fabric, and other non-standard tasks. Didn't find what you need? Message us and we'll discuss it.",
  },
];

export const BUILDS_FAQ_EN: FaqItem[] = [
  {
    q: "How much does a ready Minecraft server pack cost?",
    a: "Three sizes depending on scope: Mini — from $39 (≈3000₽), Standard — from $65 (≈5000₽), Large — from $195 (≈15000₽). That's for the game mode itself — plugins, balance, economy.",
  },
  {
    q: "How is a pack different from a server built from scratch?",
    a: "A pack is a ready set of plugins, worlds and configuration for a standard mode (SkyBlock, Survival, Anarchy). A full server from scratch also includes proxy setup, a lobby, map building and a website on request, from $78 (≈6000₽).",
  },
  {
    q: "Can I get a pack with an economy and donations?",
    a: "Yes, a pack can include economy, donation perks and a store — this affects which tier (Mini/Standard/Large) the pack falls into.",
  },
  {
    q: "Which Minecraft versions do you build packs for?",
    a: "Any current version from 1.16 to 1.21.x. Tell us the version you need in your inquiry and we'll build for it specifically.",
  },
  {
    q: "How long does building a server pack take?",
    a: "From 7 days depending on the size and complexity of the scope.",
  },
];

export const SITES_FAQ_EN: FaqItem[] = [
  {
    q: "How much does a website for a Minecraft server cost?",
    a: "From $13 (≈1000₽) for a landing page with basic server info. A multi-page site or a custom project with a donation store and player dashboard costs more, depending on complexity. Turnaround — from 3 days.",
  },
  {
    q: "Why is a paid website better than a free template?",
    a: "Free templates (NamelessMC and similar) look the same across hundreds of servers and don't customize well. A custom site makes your project stand out and converts donations better.",
  },
  {
    q: "Can you integrate an existing donation store?",
    a: "Yes, we connect EasyDonate, Tebex and other payment systems to a new or existing site.",
  },
  {
    q: "Does the website work with my server's database?",
    a: "Yes, we integrate a player dashboard and stats directly with your server's database (PlayerData, economy, ranks).",
  },
];

export const SERVER_SETUP_FAQ_EN: FaqItem[] = [
  {
    q: "How much does a full server from scratch cost?",
    a: "From $78 (≈6000₽) depending on scale (small/medium/large): proxy, lobby, game mode, map building, and custom plugins built for your idea.",
  },
  {
    q: "How much does server optimization cost?",
    a: "From $6 (≈500₽) for a basic setup (core configs, standard optimization plugins). Full optimization for heavy load is quoted individually, based on your server's current state.",
  },
  {
    q: "Velocity or BungeeCord — which is better?",
    a: "Velocity is more modern, faster and actively maintained — we recommend it for new projects. BungeeCord has more legacy plugins with existing support, but develops much more slowly.",
  },
  {
    q: "How long does setting up a server from scratch take?",
    a: "From 21 days for a small scale (proxy, lobby, one mode) up to 4-10 weeks for a large project with complex plugins and unique mechanics.",
  },
  {
    q: "Do you work with an already-running server, or only new ones?",
    a: "Both. We can set up a server from scratch, or optimize/upgrade an already-running project without losing player data.",
  },
];

export const PLUGINS_FAQ_EN: FaqItem[] = [
  {
    q: "How much does it cost to write a Minecraft plugin?",
    a: "Three complexity tiers: simple (utility, command) — from $3 (≈200₽), medium — from $10 (≈800₽), complex (economy, database, GUI) — from $23 (≈1800₽). Turnaround — from 3 days.",
  },
  {
    q: "Can you fix or extend an existing plugin?",
    a: "Yes, we take on fixes and upgrades to third-party or previously written plugins — send us the source or compiled jar along with a description of the task.",
  },
  {
    q: "What's the difference between a custom plugin and a ready one?",
    a: "Ready plugins (FurryNick, FurryChat) are already built and sold immediately — you install and use them. A custom plugin is written from scratch for your specific spec.",
  },
  {
    q: "Which server cores do your plugins support?",
    a: "Spigot, Paper, Purpur and Velocity. Bedrock support (Geyser/Floodgate) is discussed separately — there are compatibility nuances.",
  },
];

export const MAP_BUILDING_FAQ_EN: FaqItem[] = [
  {
    q: "How much does building a lobby for a Minecraft server cost?",
    a: "From $19 (≈1500₽) for a small lobby in a simple style. Large-scale maps with unique architecture and detail run from $52 (≈4000₽), depending on size and complexity.",
  },
  {
    q: "Can you build a map in any style?",
    a: "Yes — medieval, fantasy, cyberpunk, natural landscape and any other references. Send examples of what you like and we'll match the style.",
  },
  {
    q: "How long does a build take?",
    a: "A small lobby — from 3-4 days. A large, detailed map (city, dungeon, island) — from 1 to 3 weeks.",
  },
  {
    q: "Do you provide schematics I can install myself?",
    a: "On request, we can hand over the finished build as a schematic for self-installation via WorldEdit/Litematica.",
  },
];
