import type { Locale } from "@/lib/i18n";

export type HomeCopy = {
  hero: {
    before: string;
    word: string;
    after: string;
    hook: string;
    ctaLabel: string;
    scrollBefore: string;
    scrollAfter: string;
  };
  ticker: {
    badge: string;
    h2Bold: string;
    h2After: string;
    cta: string;
  };
  stats: {
    projects: string;
    plugins: string;
    clients: string;
    support: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
  };
  services: {
    eyebrow: string;
    title: string;
    moreLabel: string;
    note: string;
    items: {
      title: string;
      description: string;
      tags: string[];
      href: string;
    }[];
  };
  products: {
    eyebrow: string;
    defaultTitle: string;
    subtitle: string;
    buyLabel: string;
    typeLabels: { plugin: string; build: string };
    items: {
      kind: "plugin" | "build";
      slug: string;
      title: string;
      description: string;
      price: string;
    }[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { n: string; title: string; text: string }[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    reasons: { title: string; text: string }[];
  };
  portfolioGrid: {
    eyebrow: string;
    title: string;
  };
  carousel: {
    eyebrow: string;
    title: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    reviews: { name: string; role: string; text: string }[];
  };
  homeFaq: {
    eyebrow: string;
    title: string;
  };
  cta: {
    title: string;
    subtitle: string;
    ctaLabel: string;
  };
  categoryLabels: { build: string; map: string; server: string };
};

export const HOME_COPY: Record<Locale, HomeCopy> = {
  ru: {
    hero: {
      before: "Студия для тех, кто строит свой ",
      word: "майнкрафт",
      after: "-сервер.",
      hook: "Хочешь сервер как FunTime, HolyWorld или AresMine? Пиши — сделаем не хуже.",
      ctaLabel: "Оставить заявку",
      scrollBefore: "Прокрути вниз",
      scrollAfter: "чтобы увидеть проекты",
    },
    ticker: {
      badge: "Наши работы",
      h2Bold: "Сборки",
      h2After: " и сервера, которые впечатляют.",
      cta: "Начать проект",
    },
    stats: {
      projects: "проектов",
      plugins: "плагинов",
      clients: "клиентов",
      support: "поддержка",
    },
    gallery: {
      eyebrow: "что мы построили",
      title: "Каждый проект — отдельный мир.",
    },
    services: {
      eyebrow: "что мы создаём",
      title: "Сервис под любую задачу.",
      moreLabel: "Подробнее",
      note: "Это не весь список — мы беремся за любые задачи, связанные с майнкрафтом: ресурс-паки, GUI-меню для серверов, модовые сервера на Forge/Fabric и многое другое. Не нашли нужную услугу — просто напишите.",
      items: [
        {
          title: "Крутые сборки",
          description: "SkyBlock, Survival, Anarchy, BoxPvP — от 3000₽, готовы от 7 дней, под версии 1.16–1.21.x.",
          tags: ["SkyBlock", "Survival", "Anarchy", "BoxPvP"],
          href: "/builds",
        },
        {
          title: "Сайты для серверов",
          description: "Донат-магазин, голосование, личный кабинет игрока.",
          tags: ["Next.js", "Donate"],
          href: "/sites",
        },
        {
          title: "Сервер с нуля",
          description: "Proxy Velocity/BungeeCord, экономика, оптимизация TPS.",
          tags: ["Velocity", "TPS"],
          href: "/server-setup",
        },
        {
          title: "Плагины на заказ",
          description: "Кастомные механики на Java и Kotlin под любые задачи.",
          tags: ["Java", "Spigot"],
          href: "/plugins",
        },
        {
          title: "Построение карты",
          description: "Лобби, арены, данжи, города — любой стиль и масштаб.",
          tags: ["Build", "World"],
          href: "/map-building",
        },
      ],
    },
    products: {
      eyebrow: "готовые решения",
      defaultTitle: "Купить готовое — без разработки на заказ.",
      subtitle: "Проверенные плагины и сборки, которые можно поставить на сервер уже сегодня.",
      buyLabel: "Купить",
      typeLabels: { plugin: "плагин", build: "сборка" },
      items: [
        { kind: "plugin", slug: "furrynick", title: "FurryNick", description: "Лучший плагин на команду /nick для смены ника.", price: "299₽" },
        { kind: "plugin", slug: "furrychat", title: "FurryChat", description: "Плагин на чат для майнкрафт сервера с AI-модерацией.", price: "299₽" },
        { kind: "build", slug: "solaranarchy-v2", title: "SolarAnarchyV2", description: "Анархия, выдерживает 100+ игроков онлайн одновременно.", price: "999₽" },
        { kind: "build", slug: "solarbox-v2", title: "SolarBox V2", description: "Готовый Box PvP сервер — настроен и готов к запуску.", price: "299₽" },
      ],
    },
    process: {
      eyebrow: "как мы работаем",
      title: "От заявки до запуска.",
      steps: [
        { n: "01", title: "Заявка", text: "Оставляешь заявку, обсуждаем детали проекта и сроки." },
        { n: "02", title: "Расчёт стоимости", text: "Присылаем смету, фиксируем объём работ." },
        { n: "03", title: "Разработка", text: "Держим на связи, показываем прогресс на каждом этапе." },
        { n: "04", title: "Сдача и поддержка", text: "Принимаешь проект, дальше — на связи 24/7." },
      ],
    },
    whyUs: {
      eyebrow: "почему мы",
      title: "Не очередная безликая студия.",
      reasons: [
        { title: "Быстро", text: "Готовая сборка — от 7 дней. Сервер с нуля — без растягивания сроков без причины." },
        { title: "Без шаблонов", text: "Каждый плагин и каждая карта пишутся под конкретный проект — не копипаста чужих сборок." },
        { title: "Прозрачная смета", text: "Цена фиксируется до старта работ. Никаких доплат за то, что не обсуждали заранее." },
        { title: "На связи 24/7", text: "Отвечаем быстро на этапе разработки и остаёмся на связи после сдачи проекта." },
      ],
    },
    portfolioGrid: { eyebrow: "портфолио", title: "Наши работы." },
    carousel: { eyebrow: "портфолио", title: "Пролистай наши проекты." },
    testimonials: {
      eyebrow: "отзывы",
      title: "Нам доверяют.",
      reviews: [
        { name: "Mavier", role: "Самописный плагин: DragonRoom", text: "Заказ у парней плагин на кабинки, достаточно простой плагин и берут за это мало, за кабинки с простым функционалом взяли 400 рублей и еще поддержка на месяц классно." },
        { name: "Urchxula", role: "SolarAnarchyV2 | Анархическая сборка 1.16.5", text: "Сборка топ, всё работает без каких-либо проблем, можно и на Java, и на Bedrock установить. Продавцу респект, всё чётко работает без багов, всем рекомендую." },
        { name: "Анастасия", role: "Разработка гриферского сервера", text: "Заказала с друзьями разработку гриферского сервера, спустя 2 недели завершили работу, помогли установить всё на хостинге. Исправляют баги бесплатно. Рада, что связалась с ними." },
        { name: "wanthh1507", role: "FurryChat | Профессиональный чат для сервера", text: "Отличный плагин на чат с уникальными фишками, а главное — очень удобной конфигурацией даже для новичков. Отдельный респект за возможность отключить любую функцию. Лучший плагин на чат, с которым я работал." },
        { name: "Артём", role: "Полноценный режим: Sneaky Snipers", text: "Режим получился просто шикарно, сделали всё как я хотел и довольно быстро — это та студия, которую я так давно искал." },
        { name: "StarCore", role: "Сборка анархии", text: "Брал сборку анархии, вообще без лишней фигни сделали. Всё стабильно, античит норм стоит, дюпы прикрыты. Онлайн уже 40+ держится." },
        { name: "Влад", role: "Сборка мини-игр", text: "Заказывал мини-игры (BedWars, SkyWars), сделали быстро и качественно. Онлайн поднялся буквально за пару дней." },
        { name: "Егор", role: "Сайт для сервера", text: "Заказал сайт под сервер, сделали быстро. Донат подключили, дизайн нормальный, не колхоз. Уже есть покупки, так что окупается." },
      ],
    },
    homeFaq: { eyebrow: "faq", title: "Частые вопросы." },
    cta: {
      title: "Готовы создать свой идеальный сервер?",
      subtitle: "Оставь заявку в Telegram — обсудим идею, посчитаем стоимость и сроки.",
      ctaLabel: "Оставить заявку",
    },
    categoryLabels: { build: "Сборка", map: "Карта", server: "Сервер" },
  },
  en: {
    hero: {
      before: "A studio for people building their own ",
      word: "Minecraft",
      after: " server.",
      hook: "Want a server like FunTime, HolyWorld or AresMine? Message us — we'll make it just as good.",
      ctaLabel: "Get a quote",
      scrollBefore: "Scroll down",
      scrollAfter: "to see the projects",
    },
    ticker: {
      badge: "Our work",
      h2Bold: "Server builds",
      h2After: " and servers that impress.",
      cta: "Start a project",
    },
    stats: {
      projects: "projects",
      plugins: "plugins",
      clients: "clients",
      support: "support",
    },
    gallery: {
      eyebrow: "what we've built",
      title: "Every project is its own world.",
    },
    services: {
      eyebrow: "what we build",
      title: "A service for any task.",
      moreLabel: "Learn more",
      note: "This isn't the full list — we take on anything Minecraft-related: resource packs, GUI menus for servers, modded servers on Forge/Fabric and much more. Didn't find what you need? Just message us.",
      items: [
        {
          title: "Server builds",
          description: "SkyBlock, Survival, Anarchy, BoxPvP — from $39 (≈3000₽), ready in 7 days, for versions 1.16–1.21.x.",
          tags: ["SkyBlock", "Survival", "Anarchy", "BoxPvP"],
          href: "/builds",
        },
        {
          title: "Server websites",
          description: "Donation store, voting, player dashboard.",
          tags: ["Next.js", "Donate"],
          href: "/sites",
        },
        {
          title: "Server from scratch",
          description: "Velocity/BungeeCord proxy, economy, TPS optimization.",
          tags: ["Velocity", "TPS"],
          href: "/server-setup",
        },
        {
          title: "Plugins on commission",
          description: "Custom mechanics in Java and Kotlin for any task.",
          tags: ["Java", "Spigot"],
          href: "/plugins",
        },
        {
          title: "Map building",
          description: "Lobbies, arenas, dungeons, cities — any style, any scale.",
          tags: ["Build", "World"],
          href: "/map-building",
        },
      ],
    },
    products: {
      eyebrow: "ready-made",
      defaultTitle: "Buy ready-made — no custom development needed.",
      subtitle: "Proven plugins and packs you can put on your server today.",
      buyLabel: "Buy",
      typeLabels: { plugin: "plugin", build: "pack" },
      items: [
        { kind: "plugin", slug: "furrynick", title: "FurryNick", description: "The best plugin for the /nick nickname-change command.", price: "$4 (≈299₽)" },
        { kind: "plugin", slug: "furrychat", title: "FurryChat", description: "A chat plugin for Minecraft servers with AI moderation.", price: "$4 (≈299₽)" },
        { kind: "build", slug: "solaranarchy-v2", title: "SolarAnarchyV2", description: "Anarchy pack, handles 100+ concurrent players.", price: "$13 (≈999₽)" },
        { kind: "build", slug: "solarbox-v2", title: "SolarBox V2", description: "A ready BoxPvP server — configured and ready to launch.", price: "$4 (≈299₽)" },
      ],
    },
    process: {
      eyebrow: "how we work",
      title: "From inquiry to launch.",
      steps: [
        { n: "01", title: "Inquiry", text: "You send a message, we discuss project details and timeline." },
        { n: "02", title: "Quote", text: "We send a quote and lock in the scope of work." },
        { n: "03", title: "Development", text: "We stay in touch and show progress at every stage." },
        { n: "04", title: "Delivery & support", text: "You review the project, then we stay on call 24/7." },
      ],
    },
    whyUs: {
      eyebrow: "why us",
      title: "Not just another faceless studio.",
      reasons: [
        { title: "Fast", text: "A ready pack — from 7 days. A server from scratch — no timelines stretched out without reason." },
        { title: "No templates", text: "Every plugin and every map is written for your specific project — not a copy of someone else's build." },
        { title: "Transparent pricing", text: "The price is locked in before work starts. No surprise charges for things we didn't discuss upfront." },
        { title: "On call 24/7", text: "We respond quickly during development and stay reachable after the project ships." },
      ],
    },
    portfolioGrid: { eyebrow: "portfolio", title: "Our work." },
    carousel: { eyebrow: "portfolio", title: "Browse our projects." },
    testimonials: {
      eyebrow: "reviews",
      title: "Trusted by our clients.",
      reviews: [
        { name: "Mavier", role: "Custom plugin: DragonRoom", text: "Ordered a booth plugin from these guys — a fairly simple plugin, and they charge little for it. Paid $5 (≈400₽) for a booth plugin with simple functionality, plus a month of support. Great." },
        { name: "Urchxula", role: "SolarAnarchyV2 | Anarchy pack 1.16.5", text: "The pack is great, everything works without any issues, installs fine on both Java and Bedrock. Respect to the seller, everything runs clean with no bugs, highly recommend." },
        { name: "Anastasia", role: "Custom griefer server", text: "Ordered a griefer server build with friends, they finished in two weeks and helped us set everything up on the host. They fix bugs for free. Glad we reached out to them." },
        { name: "wanthh1507", role: "FurryChat | Professional chat for your server", text: "A great chat plugin with unique features, and the config is very easy to use even for beginners. Extra respect for letting you disable any feature individually. The best chat plugin I've worked with." },
        { name: "Artem", role: "Full custom mode: Sneaky Snipers", text: "The mode turned out great, they did everything exactly how I wanted and pretty fast — this is the studio I'd been looking for." },
        { name: "StarCore", role: "Anarchy pack", text: "Got an anarchy pack, no unnecessary bloat. Everything is stable, the anticheat is solid, dupes are patched. Already holding 40+ online." },
        { name: "Vlad", role: "Minigames pack", text: "Ordered minigames (BedWars, SkyWars), built fast and well. Player count went up within a couple of days." },
        { name: "Egor", role: "Server website", text: "Ordered a website for my server, built fast. Donation store connected, clean design, nothing cheap-looking. Already getting sales, so it's paying for itself." },
      ],
    },
    homeFaq: { eyebrow: "faq", title: "Frequently asked questions." },
    cta: {
      title: "Ready to build your perfect server?",
      subtitle: "Message us on Telegram — we'll discuss your idea and work out the cost and timeline.",
      ctaLabel: "Get a quote",
    },
    categoryLabels: { build: "Build", map: "Map", server: "Server" },
  },
  uk: {
    hero: {
      before: "Студія для тих, хто будує свій ",
      word: "майнкрафт",
      after: "-сервер.",
      hook: "Хочеш сервер як FunTime, HolyWorld чи AresMine? Пиши — зробимо не гірше.",
      ctaLabel: "Залишити заявку",
      scrollBefore: "Прокрути вниз",
      scrollAfter: "щоб побачити проєкти",
    },
    ticker: {
      badge: "Наші роботи",
      h2Bold: "Збірки",
      h2After: " і сервери, які вражають.",
      cta: "Почати проєкт",
    },
    stats: {
      projects: "проєктів",
      plugins: "плагінів",
      clients: "клієнтів",
      support: "підтримка",
    },
    gallery: {
      eyebrow: "що ми побудували",
      title: "Кожен проєкт — окремий світ.",
    },
    services: {
      eyebrow: "що ми створюємо",
      title: "Сервіс під будь-яку задачу.",
      moreLabel: "Детальніше",
      note: "Це не весь список — ми беремося за будь-які задачі, пов'язані з майнкрафтом: ресурс-паки, GUI-меню для серверів, модові сервери на Forge/Fabric і багато іншого. Не знайшли потрібну послугу — просто напишіть.",
      items: [
        {
          title: "Круті збірки",
          description: "SkyBlock, Survival, Anarchy, BoxPvP — від ₴1744 (≈3000₽), готові від 7 днів, під версії 1.16–1.21.x.",
          tags: ["SkyBlock", "Survival", "Anarchy", "BoxPvP"],
          href: "/builds",
        },
        {
          title: "Сайти для серверів",
          description: "Донат-магазин, голосування, особистий кабінет гравця.",
          tags: ["Next.js", "Donate"],
          href: "/sites",
        },
        {
          title: "Сервер з нуля",
          description: "Proxy Velocity/BungeeCord, економіка, оптимізація TPS.",
          tags: ["Velocity", "TPS"],
          href: "/server-setup",
        },
        {
          title: "Плагіни на замовлення",
          description: "Кастомні механіки на Java і Kotlin під будь-які задачі.",
          tags: ["Java", "Spigot"],
          href: "/plugins",
        },
        {
          title: "Побудова карти",
          description: "Лобі, арени, данжі, міста — будь-який стиль і масштаб.",
          tags: ["Build", "World"],
          href: "/map-building",
        },
      ],
    },
    products: {
      eyebrow: "готові рішення",
      defaultTitle: "Купити готове — без розробки на замовлення.",
      subtitle: "Перевірені плагіни та збірки, які можна поставити на сервер уже сьогодні.",
      buyLabel: "Купити",
      typeLabels: { plugin: "плагін", build: "збірка" },
      items: [
        { kind: "plugin", slug: "furrynick", title: "FurryNick", description: "Найкращий плагін на команду /nick для зміни ніка.", price: "₴174 (≈299₽)" },
        { kind: "plugin", slug: "furrychat", title: "FurryChat", description: "Плагін на чат для майнкрафт сервера з AI-модерацією.", price: "₴174 (≈299₽)" },
        { kind: "build", slug: "solaranarchy-v2", title: "SolarAnarchyV2", description: "Анархія, витримує 100+ гравців онлайн одночасно.", price: "₴581 (≈999₽)" },
        { kind: "build", slug: "solarbox-v2", title: "SolarBox V2", description: "Готовий Box PvP сервер — налаштований і готовий до запуску.", price: "₴174 (≈299₽)" },
      ],
    },
    process: {
      eyebrow: "як ми працюємо",
      title: "Від заявки до запуску.",
      steps: [
        { n: "01", title: "Заявка", text: "Залишаєш заявку, обговорюємо деталі проєкту та терміни." },
        { n: "02", title: "Розрахунок вартості", text: "Надсилаємо кошторис, фіксуємо обсяг робіт." },
        { n: "03", title: "Розробка", text: "Тримаємо на зв'язку, показуємо прогрес на кожному етапі." },
        { n: "04", title: "Здача та підтримка", text: "Приймаєш проєкт, далі — на зв'язку 24/7." },
      ],
    },
    whyUs: {
      eyebrow: "чому ми",
      title: "Не чергова безлика студія.",
      reasons: [
        { title: "Швидко", text: "Готова збірка — від 7 днів. Сервер з нуля — без розтягування термінів без причини." },
        { title: "Без шаблонів", text: "Кожен плагін і кожна карта пишуться під конкретний проєкт — не копіпаста чужих збірок." },
        { title: "Прозорий кошторис", text: "Ціна фіксується до старту робіт. Жодних доплат за те, що не обговорювали заздалегідь." },
        { title: "На зв'язку 24/7", text: "Відповідаємо швидко на етапі розробки і залишаємося на зв'язку після здачі проєкту." },
      ],
    },
    portfolioGrid: { eyebrow: "портфоліо", title: "Наші роботи." },
    carousel: { eyebrow: "портфоліо", title: "Погортай наші проєкти." },
    testimonials: {
      eyebrow: "відгуки",
      title: "Нам довіряють.",
      reviews: [
        { name: "Mavier", role: "Самописний плагін: DragonRoom", text: "Замовив у хлопців плагін на кабінки, доволі простий плагін і беруть за це мало, за кабінки з простим функціоналом взяли ₴233 (≈400₽) і ще підтримка на місяць класно." },
        { name: "Urchxula", role: "SolarAnarchyV2 | Анархічна збірка 1.16.5", text: "Збірка топ, все працює без жодних проблем, можна і на Java, і на Bedrock встановити. Продавцю респект, все чітко працює без багів, всім рекомендую." },
        { name: "Анастасія", role: "Розробка гриферського сервера", text: "Замовила з друзями розробку гриферського сервера, за 2 тижні завершили роботу, допомогли встановити все на хостингу. Виправляють баги безкоштовно. Рада, що звернулася до них." },
        { name: "wanthh1507", role: "FurryChat | Професійний чат для сервера", text: "Відмінний плагін на чат з унікальними фішками, а головне — дуже зручною конфігурацією навіть для новачків. Окремий респект за можливість вимкнути будь-яку функцію. Найкращий плагін на чат, з яким я працював." },
        { name: "Артем", role: "Повноцінний режим: Sneaky Snipers", text: "Режим вийшов просто чудово, зробили все як я хотів і доволі швидко — це та студія, яку я так довго шукав." },
        { name: "StarCore", role: "Збірка анархії", text: "Брав збірку анархії, взагалі без зайвої фігні зробили. Все стабільно, античит норм стоїть, дюпи прикриті. Онлайн вже 40+ тримається." },
        { name: "Влад", role: "Збірка міні-ігор", text: "Замовляв міні-ігри (BedWars, SkyWars), зробили швидко і якісно. Онлайн піднявся буквально за пару днів." },
        { name: "Єгор", role: "Сайт для сервера", text: "Замовив сайт під сервер, зробили швидко. Донат підключили, дизайн нормальний, не колхоз. Вже є покупки, тож окупається." },
      ],
    },
    homeFaq: { eyebrow: "faq", title: "Часті питання." },
    cta: {
      title: "Готові створити свій ідеальний сервер?",
      subtitle: "Залиш заявку в Telegram — обговоримо ідею, порахуємо вартість і терміни.",
      ctaLabel: "Залишити заявку",
    },
    categoryLabels: { build: "Збірка", map: "Карта", server: "Сервер" },
  },
};
