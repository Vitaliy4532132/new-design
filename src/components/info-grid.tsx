import { Reveal } from "@/components/reveal";

type InfoCard = {
  title: string;
  description: string;
  tag?: string;
};

export function InfoGrid({
  eyebrow,
  title,
  lead,
  items,
  columns = 3,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  items: InfoCard[];
  columns?: 2 | 3;
}) {
  return (
    <section className="relative bg-background px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
            {eyebrow}
          </div>
          <h2 className="mb-3 font-display text-4xl font-medium sm:text-[44px]">
            {title}
          </h2>
          {lead && (
            <p className="text-sm leading-relaxed text-text-muted">{lead}</p>
          )}
        </Reveal>

        <div
          className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${
            columns === 3 ? "lg:grid-cols-3" : ""
          }`}
        >
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-white/20">
                {item.tag && (
                  <div className="mb-4 inline-block rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-accent">
                    {item.tag}
                  </div>
                )}
                <h3 className="mb-2 font-display text-lg font-medium">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
