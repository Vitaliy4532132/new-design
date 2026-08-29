"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { ChangelogEntry } from "@/lib/product-data";

export function ProductChangelog({ entries }: { entries: ChangelogEntry[] }) {
  // Свежая версия раскрыта: чаще всего смотрят именно её.
  const [open, setOpen] = useState(0);

  if (entries.length === 0) return null;

  return (
    <section className="border-t border-white/10 px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-xs tracking-widest text-brand uppercase">обновления</div>
        <h2 className="mb-3 font-display text-3xl font-medium sm:text-4xl">История версий.</h2>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-text-muted">
          Что менялось от версии к версии. Обновления входят в покупку — платить
          повторно не нужно.
        </p>

        <div className="max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-surface">
          {entries.map((e, i) => {
            const isOpen = open === i;
            const latest = i === 0;

            return (
              <div key={e.version} className={i > 0 ? "border-t border-white/10" : ""}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="font-mono text-sm text-brand">v{e.version}</span>

                  {latest && (
                    <span className="rounded-md border border-green-400/40 px-2 py-0.5 font-mono text-[10px] tracking-wide text-green-400 uppercase">
                      свежая
                    </span>
                  )}

                  <span className="ml-auto shrink-0 font-mono text-xs text-text-dim">
                    {formatDate(e.date)}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-text-dim transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <ul className="flex flex-col gap-2.5 px-5 pb-5 sm:px-6">
                      {e.changes.map((c) => (
                        <li key={c} className="flex items-start gap-3 text-sm text-text-muted">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
