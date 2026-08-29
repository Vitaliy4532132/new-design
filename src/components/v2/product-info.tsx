import { Check, Headset, Package } from "lucide-react";
import { IsoCube } from "@/components/v2/iso-cube";
import type { Dependency } from "@/lib/product-data";

export function ProductAbout({ paragraphs }: { paragraphs: string[] }) {
  return (
    <section className="border-t border-white/10 px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-xs tracking-widest text-brand uppercase">описание</div>
        <h2 className="mb-8 font-display text-3xl font-medium sm:text-4xl">Что он умеет.</h2>

        <div className="flex max-w-2xl flex-col gap-5">
          {paragraphs.map((p) => (
            <p key={p} className="text-sm leading-relaxed text-text-muted sm:text-base">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductDependencies({
  dependencies,
  support,
}: {
  dependencies: Dependency[];
  support: { included: boolean; note: string };
}) {
  return (
    <section className="border-t border-white/10 px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-xs tracking-widest text-brand uppercase">зависимости</div>
        <h2 className="mb-3 font-display text-3xl font-medium sm:text-4xl">Что нужно на сервере.</h2>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-text-muted">
          Обязательные ставятся до установки товара, без них он не запустится. Необязательные
          нужны только под конкретные возможности.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dependencies.map((d) => (
            <div key={d.name} className="rounded-2xl border border-white/10 bg-surface p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <IsoCube color={d.required ? "#E76F00" : "#4A7FC1"} size={18} />
                  <span className="font-display text-base font-medium">{d.name}</span>
                </div>
                <span
                  className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase ${
                    d.required
                      ? "border-[#E76F00]/40 text-[#E76F00]"
                      : "border-white/15 text-text-dim"
                  }`}
                >
                  {d.required ? "обязательно" : "по желанию"}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-text-muted">{d.note}</p>
            </div>
          ))}

          {/* Поддержка стоит рядом с зависимостями: это тоже про то, что
              покупатель получает вместе с товаром. */}
          <div
            className={`rounded-2xl border p-5 ${
              support.included ? "border-green-400/30 bg-green-400/5" : "border-white/10 bg-surface"
            }`}
          >
            <div className="mb-4 flex items-center gap-3">
              {support.included ? (
                <Headset size={18} className="text-green-400" />
              ) : (
                <Package size={18} className="text-text-dim" />
              )}
              <span className="font-display text-base font-medium">
                {support.included ? "С поддержкой" : "Без поддержки"}
              </span>
            </div>
            <p className="flex items-start gap-2 text-sm leading-relaxed text-text-muted">
              {support.included && <Check size={14} className="mt-0.5 shrink-0 text-green-400" />}
              {support.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
