import { IsoCube } from "@/components/v2/iso-cube";
import { Backdrop } from "@/components/v2/backdrop";
import { JOBS_PAGE, POSITIONS } from "@/lib/jobs-copy";

// Цвета по кругу — просто чтобы сетка не была одноцветной. Порядок совпадает
// с POSITIONS, последняя карточка («Другое») получает приглушённый.
const COLORS = [
  "#E76F00",
  "#3178C6",
  "#0E7C99",
  "#7F52FF",
  "#6CB33F",
  "#1BA0E0",
  "#D3A625",
  "#C71A36",
  "#4A7FC1",
];

export function JobsPositions() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 px-5 py-20 sm:px-6">
      <Backdrop variant="grid" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-10 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-brand uppercase">
            {JOBS_PAGE.positionsEyebrow}
          </div>
          <h2 className="font-display text-3xl font-medium sm:text-4xl">{JOBS_PAGE.positionsTitle}</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POSITIONS.map((p, i) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-white/10 bg-surface p-5 transition-colors hover:border-brand/40"
            >
              <div className="mb-4 flex h-7 items-center">
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <IsoCube color={COLORS[i] ?? "#1797FF"} size={18} />
                </div>
              </div>
              <h3 className="mb-1.5 font-display text-base font-medium">{p.title}</h3>
              <p className="text-sm leading-relaxed text-text-muted">{p.note}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-text-muted">{JOBS_PAGE.positionsNote}</p>
      </div>
    </section>
  );
}
