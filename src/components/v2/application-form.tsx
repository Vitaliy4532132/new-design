"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { HOURS, POSITIONS } from "@/lib/jobs-copy";

const INPUT =
  "w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-text-dim focus:border-brand";
const LABEL = "mb-2 block font-mono text-[11px] tracking-widest text-text-dim uppercase";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <span className="font-mono text-[11px] tracking-widest text-brand uppercase">{children}</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
        active
          ? "border-brand bg-brand/10 text-brand"
          : "border-white/10 text-text-muted hover:border-white/25 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function PositionSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-[10px] border bg-white/5 px-4 py-3 text-left text-sm outline-none transition-colors ${
          open ? "border-brand" : "border-white/10"
        } ${value ? "text-white" : "text-text-dim"}`}
      >
        {value || "Выберите должность"}
        <ChevronDown size={16} className={`text-text-dim transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-white/10 bg-surface p-2 shadow-[0_16px_30px_rgba(0,0,0,0.5)]">
          {POSITIONS.map((p) => (
            <button
              key={p.title}
              type="button"
              onClick={() => {
                onChange(p.title);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                p.title === value ? "bg-white/5 text-brand" : "text-text-muted hover:bg-white/5 hover:text-white"
              }`}
            >
              {p.title}
              {p.title === value && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ApplicationForm() {
  const [position, setPosition] = useState("");
  const [hours, setHours] = useState("");
  const [testReady, setTestReady] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Выбор из чипов и выпадашки не покрывается встроенной проверкой формы,
    // поэтому подсказываем словами, чего не хватает.
    if (!position) return setError("Выберите должность");
    if (!hours) return setError("Укажите, сколько часов готовы уделять");
    if (testReady === null) return setError("Ответьте про тестовое задание");

    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-white/10 bg-surface p-10 text-center">
        <Check size={28} className="mx-auto mb-4 text-green-400" />
        <h3 className="mb-2 font-display text-xl font-medium">Заявка отправлена</h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Обычно отвечаем за 2–8 часов. Если тишина дольше двух дней — напишите в Telegram напрямую.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
      <SectionTitle>Личная информация</SectionTitle>

      <div className="mb-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="real_name">
            Имя
          </label>
          <input id="real_name" name="real_name" required placeholder="Александр" className={INPUT} />
        </div>
        <div>
          <label className={LABEL} htmlFor="nickname">
            Никнейм
          </label>
          <input id="nickname" name="nickname" required placeholder="SolarPlayer" className={INPUT} />
        </div>
      </div>

      <div className="mb-5">
        <label className={LABEL} htmlFor="age">
          Возраст
        </label>
        <input
          id="age"
          name="age"
          type="number"
          min={14}
          max={60}
          required
          placeholder="18"
          className={`${INPUT} w-32`}
        />
      </div>

      <div className="mb-8">
        <label className={LABEL} htmlFor="about">
          О себе — чем занимаетесь, что интересно
        </label>
        <textarea
          id="about"
          name="about"
          rows={4}
          required
          placeholder="Пишу плагины с 2022 года, люблю разбираться в чужом коде..."
          className={`${INPUT} resize-none`}
        />
      </div>

      <SectionTitle>Должность и занятость</SectionTitle>

      <div className="mb-5">
        <span className={LABEL}>Направление</span>
        <PositionSelect value={position} onChange={setPosition} />
      </div>

      <div className="mb-5">
        <span className={LABEL}>Сколько часов в день готовы уделять</span>
        <div className="flex flex-wrap gap-2">
          {HOURS.map((h) => (
            <Chip key={h} active={hours === h} onClick={() => setHours(h)}>
              {h}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <span className={LABEL}>Готовы к тестовому заданию</span>
        <div className="flex flex-wrap gap-2">
          <Chip active={testReady === true} onClick={() => setTestReady(true)}>
            Да
          </Chip>
          <Chip active={testReady === false} onClick={() => setTestReady(false)}>
            Нет
          </Chip>
        </div>
      </div>

      <SectionTitle>Как связаться</SectionTitle>

      <div className="mb-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="telegram">
            Telegram
          </label>
          <input id="telegram" name="telegram" required placeholder="@nickname" className={INPUT} />
        </div>
        <div>
          <label className={LABEL} htmlFor="discord">
            Discord
          </label>
          <input id="discord" name="discord" placeholder="nickname" className={INPUT} />
        </div>
      </div>

      {error && (
        <p className="mb-5 rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
      >
        Отправить заявку
      </button>
    </form>
  );
}
