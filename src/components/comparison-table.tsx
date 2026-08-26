import { Check, X } from "lucide-react";
import { Reveal } from "@/components/reveal";

type Row = { label: string; a: boolean | string; b: boolean | string };

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check size={16} className="text-green-400" />
    ) : (
      <X size={16} className="text-text-dim" />
    );
  }
  return <span className="text-sm">{value}</span>;
}

export function ComparisonTable({
  eyebrow,
  title,
  lead,
  columnA,
  columnB,
  rows,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  columnA: string;
  columnB: string;
  rows: Row[];
}) {
  return (
    <section className="relative bg-background px-6 py-20">
      <div className="mx-auto max-w-3xl">
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

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-3 border-b border-white/10 bg-white/5">
            <div className="px-5 py-4 text-xs text-text-muted">&nbsp;</div>
            <div className="px-5 py-4 text-center text-sm font-medium">
              {columnA}
            </div>
            <div className="px-5 py-4 text-center text-sm font-medium text-accent">
              {columnB}
            </div>
          </div>
          {rows.map((row, i) => (
            <Reveal key={row.label} delay={i * 70}>
              <div
                className={`grid grid-cols-3 ${
                  i % 2 === 0 ? "bg-surface" : "bg-background"
                }`}
              >
                <div className="px-5 py-4 text-sm text-text-muted">
                  {row.label}
                </div>
                <div className="flex items-center justify-center px-5 py-4">
                  <Cell value={row.a} />
                </div>
                <div className="flex items-center justify-center px-5 py-4">
                  <Cell value={row.b} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
