"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export type FaqItem = { q: string; a: string };

export function FaqAccordion({
  items,
  eyebrow = "faq",
  title = "Частые вопросы.",
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-background px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
            {eyebrow}
          </div>
          <h2 className="font-display text-4xl font-medium sm:text-[44px]">
            {title}
          </h2>
        </div>

        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-surface">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-medium">
                    {item.q}
                  </span>
                  <Plus
                    size={18}
                    className={`shrink-0 text-accent transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-text-muted">
                      {item.a}
                    </p>
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
