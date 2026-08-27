"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { IsoCube } from "@/components/v2/iso-cube";
import { PLANS, PLANS_PAGE, type Plan } from "@/lib/plans-copy";
import { TELEGRAM_URL } from "@/lib/links";

// Сколько пунктов видно до раскрытия. В тарифах 11, 16 и 20 возможностей —
// без ограничения карточки различались бы по высоте почти втрое.
const PREVIEW = 6;

function Price({ value, inView }: { value: number; inView: boolean }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 900;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setShown(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <>{shown}</>;
}

function PlanCard({ plan, inView }: { plan: Plan; inView: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? plan.features : plan.features.slice(0, PREVIEW);
  const hidden = plan.features.length - PREVIEW;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
        plan.popular
          ? "border-accent/40 bg-[linear-gradient(180deg,rgba(10,63,255,0.10),transparent)]"
          : "border-white/10 bg-surface"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-3 py-1 font-mono text-[10px] tracking-wide text-white uppercase shadow-[0_4px_14px_rgba(23,151,255,0.4)]">
          чаще берут
        </span>
      )}

      <div className="mb-5 flex h-7 items-center">
        <IsoCube color={plan.color} size={20} />
      </div>

      <h3 className="mb-2 font-display text-xl font-medium">{plan.name}</h3>
      <p className="mb-6 text-sm leading-relaxed text-text-muted">{plan.description}</p>

      <div className="mb-6 flex items-end gap-1.5">
        <span className="font-display text-4xl font-medium">
          <Price value={plan.price} inView={inView} />
        </span>
        <span className="mb-1.5 font-mono text-xs text-text-dim">{PLANS_PAGE.perMonth}</span>
      </div>

      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener"
        className={`mb-6 rounded-[10px] px-6 py-3 text-center text-sm font-bold transition-transform hover:-translate-y-0.5 ${
          plan.popular
            ? "bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
            : "border border-white/15 bg-white/5 font-medium text-white"
        }`}
      >
        {plan.buttonLabel}
      </a>

      <ul className="flex flex-col gap-2.5 border-t border-white/10 pt-5">
        {visible.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-text-muted">
            <Check size={14} className="mt-0.5 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 flex items-center gap-1.5 self-start text-sm font-medium text-accent"
        >
          {expanded ? PLANS_PAGE.showLess : `${PLANS_PAGE.showAll} — ещё ${hidden}`}
          <ChevronDown size={14} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
}

export function PricingCards() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section className="px-5 pb-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent" />
            {PLANS_PAGE.hintPrice}
          </span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-green-400" />
            {PLANS_PAGE.hintMonthly}
          </span>
        </div>

        {/* items-start: раскрытие списка в одной карточке не должно тянуть
            вверх соседние. */}
        <div ref={ref} className="grid grid-cols-1 items-start gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.key} plan={plan} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
