"use client";

import { useState } from "react";
import { Nav } from "@/components/v2/nav";
import { Footer } from "@/components/v2/footer";
import { Backdrop } from "@/components/v2/backdrop";

// Интерфейс намеренно повторяет обёртку основного сайта: тексты политики и
// условий переносятся файлами как есть, меняется только оформление.
export interface LegalSection {
  id: string;
  num: number;
  title: string;
  content: React.ReactNode;
}

export function Para({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm leading-relaxed text-text-muted last:mb-0">{children}</p>;
}

export function Ul({ items }: { items: string[] }) {
  return (
    <ul className="mb-4 flex flex-col gap-2.5 last:mb-0">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-text-muted">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand/60" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="mb-3 font-display text-base font-medium">{title}</h3>
      {children}
    </div>
  );
}

export function LegalPage({
  title,
  subtitle,
  date,
  sections,
}: {
  title: string;
  subtitle?: string;
  date?: string;
  sections: LegalSection[];
}) {
  const [active, setActive] = useState(sections[0]?.id);

  return (
    <main>
      <Nav locale="ru" />

      <section className="relative overflow-hidden px-5 pt-32 pb-12 sm:px-6 sm:pt-40">
        <Backdrop variant="grid" />
        <Backdrop variant="glow" className="opacity-25" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-4 font-mono text-xs tracking-widest text-brand uppercase">документы</div>
          <h1 className="mb-3 font-display text-3xl font-medium break-words sm:text-4xl">
            {title}
            {subtitle && <span className="text-text-muted"> {subtitle}</span>}
          </h1>
          {date && <p className="font-mono text-xs text-text-dim">{date}</p>}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[240px_1fr]">
          {/* Оглавление: документ длинный, без него ориентироваться нечем */}
          <nav className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-3 font-mono text-[11px] tracking-widest text-text-dim uppercase">
              Разделы
            </div>
            <ul className="flex max-h-[60vh] flex-col gap-0.5 overflow-y-auto pr-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setActive(s.id)}
                    className={`flex gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active === s.id
                        ? "bg-brand/10 text-brand"
                        : "text-text-muted hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="shrink-0 font-mono text-xs opacity-60">{s.num}</span>
                    <span className="min-w-0">{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex min-w-0 flex-col gap-4">
            {sections.map((s) => (
              // scroll-mt: под фиксированной шапкой заголовок иначе уезжает
              // под неё при переходе по якорю.
              <article
                key={s.id}
                id={s.id}
                className="scroll-mt-28 rounded-2xl border border-white/10 bg-surface p-6 sm:p-7"
              >
                <div className="mb-5 flex items-baseline gap-3">
                  <span className="font-mono text-sm text-brand">{String(s.num).padStart(2, "0")}</span>
                  <h2 className="font-display text-lg font-medium sm:text-xl">{s.title}</h2>
                </div>
                <div>{s.content}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer locale="ru" />
    </main>
  );
}
