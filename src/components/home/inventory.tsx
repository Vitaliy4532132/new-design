import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

// Названия технологий и категорий не переводятся: это имена собственные и
// термины, которые в русской и украинской разработке звучат так же.
const ITEMS = [
  { name: "Java", tag: "backend", color: "#E76F00" },
  { name: "Kotlin", tag: "backend", color: "#7F52FF" },
  { name: "Spigot API", tag: "api", color: "#D3A625" },
  { name: "Paper API", tag: "api", color: "#EAE6DC" },
  { name: "Velocity", tag: "proxy", color: "#1BA0E0" },
  { name: "BungeeCord", tag: "proxy", color: "#4A7FC1" },
  { name: "MySQL", tag: "database", color: "#0E7C99" },
  { name: "MongoDB", tag: "database", color: "#4DB33D" },
  { name: "Redis", tag: "cache", color: "#D82C20" },
  { name: "Docker", tag: "infra", color: "#2496ED" },
  { name: "Gradle", tag: "build", color: "#3A7D8C" },
  { name: "Maven", tag: "build", color: "#C71A36" },
];

// Скос как в интерфейсе игры: светлая грань сверху-слева, тёмная снизу-справа.
// У слота порядок обратный, поэтому он выглядит вдавленным, а предмет — выпуклым.
const SLOT_BEVEL = "inset 2px 2px 0 rgba(0,0,0,0.55), inset -2px -2px 0 rgba(255,255,255,0.07)";
const ITEM_BEVEL = "inset 2px 2px 0 rgba(255,255,255,0.35), inset -2px -2px 0 rgba(0,0,0,0.4)";

export function TechInventory({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].stack;

  return (
    <section className="relative border-y border-white/10 bg-background px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">{t.eyebrow}</div>
          <h2 className="font-display text-4xl font-medium sm:text-[44px]">{t.title}</h2>
        </div>

        {/* Панель инвентаря */}
        <div
          className="rounded-lg bg-[#15151a] p-2.5 sm:p-3"
          style={{ boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.06), inset -2px -2px 0 rgba(0,0,0,0.6)" }}
        >
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {ITEMS.map((item) => (
              <div
                key={item.name}
                className="group relative flex cursor-default flex-col items-center justify-center gap-2 rounded-[3px] bg-[#0d0d11] py-4 transition-colors hover:bg-[#191922]"
                style={{ boxShadow: SLOT_BEVEL }}
              >
                <span
                  className="h-7 w-7 rounded-[2px] transition-transform duration-200 group-hover:scale-110"
                  style={{ background: item.color, boxShadow: ITEM_BEVEL }}
                  aria-hidden
                />
                <span className="px-1 text-center font-mono text-[10px] leading-tight text-text-muted">
                  {item.name}
                </span>

                {/* Всплывающая подсказка в духе описания предмета */}
                <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  <div
                    className="rounded-[2px] bg-[#100010]/95 px-3 py-2 whitespace-nowrap"
                    style={{ boxShadow: "0 0 0 1px #4B2A9E, 0 0 0 3px #16062E" }}
                  >
                    <div className="font-mono text-xs text-white">{item.name}</div>
                    <div className="font-mono text-[10px] text-[#A98BFF]">{item.tag}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
