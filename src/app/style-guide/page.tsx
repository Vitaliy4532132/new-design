"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Boxes,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Plus,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";
import { BASE_PATH } from "@/lib/base-path";

// Служебная страница — не индексируется, не привязана к локалям.
// export const metadata ниже не работает в "use client", поэтому
// noindex прописан через отдельный head в родительском layout не требуется:
// страница просто не добавлена ни в sitemap.ts, ни в навигацию.

const COLORS = [
  { name: "Background", cssVar: "--background", cls: "bg-background", hex: "#000000", note: "фон всего сайта" },
  { name: "Surface", cssVar: "--surface", cls: "bg-surface", hex: "#0c0c0e", note: "фон карточек, поповеров" },
  { name: "Border", cssVar: "--border", cls: "", hex: "#1c1c1f", note: "базовый бордер (редко, обычно white/10)" },
  { name: "Border light", cssVar: "--border-light", cls: "", hex: "#2a2a2e", note: "бордер на светлом фоне" },
  { name: "Blue deep", cssVar: "--blue-deep", cls: "", hex: "#0a3fff", note: "низ градиента CTA / glow" },
  { name: "Blue bright", cssVar: "--blue-bright", cls: "", hex: "#1797ff", note: "верх градиента CTA" },
  { name: "Accent", cssVar: "--accent-text", cls: "text-accent", hex: "#198cff", note: "акцентный текст, иконки, ссылки" },
  { name: "Text", cssVar: "--text", cls: "text-text", hex: "#ffffff", note: "основной текст" },
  { name: "Text muted", cssVar: "--text-muted", cls: "text-text-muted", hex: "#9a9aa3", note: "параграфы, описания" },
  { name: "Text dim", cssVar: "--text-dim", cls: "text-text-dim", hex: "#5c5c63", note: "второстепенные подписи" },
];

const OVERLAYS = [
  { name: "white/5", cls: "bg-white/5", note: "фон чипов, ховер пунктов меню" },
  { name: "white/10", cls: "bg-white/10", note: "основной бордер везде (border-white/10)" },
  { name: "white/20", cls: "bg-white/20", note: "бордер на ховере карточек" },
  { name: "green-400", cls: "bg-green-400", note: "успех / доступно (галочки, лейбл товара)" },
];

const RADII = [
  { name: "rounded-md", px: "6px", used: "мелкие теги/чипы" },
  { name: "rounded-lg", px: "8px", used: "пункты дропдауна, buy-пилюля" },
  { name: "rounded-xl", px: "12px", used: "иконка-бейдж в карточке услуги" },
  { name: "rounded-2xl", px: "16px", used: "карточки — основной радиус сайта" },
  { name: "rounded-3xl", px: "24px", used: "крупные карточки (галерея, stack-карточки)" },
  { name: "rounded-full", px: "9999px", used: "пилюли, точки, аватар-бейджи" },
];

const SHADOWS = [
  {
    name: "CTA glow",
    css: "shadow-[0_6px_20px_rgba(23,151,255,0.35)]",
    style: { boxShadow: "0 6px 20px rgba(23,151,255,0.35)" },
  },
  {
    name: "Card shadow (мелкая)",
    css: "shadow-[0_16px_30px_rgba(0,0,0,0.5)]",
    style: { boxShadow: "0 16px 30px rgba(0,0,0,0.5)" },
  },
  {
    name: "Card shadow (крупная)",
    css: "shadow-[0_24px_50px_rgba(0,0,0,0.55)]",
    style: { boxShadow: "0 24px 50px rgba(0,0,0,0.55)" },
  },
];

const NAV_ITEMS = [
  { href: "#colors", label: "Цвета" },
  { href: "#typography", label: "Типографика" },
  { href: "#buttons", label: "Кнопки и ссылки" },
  { href: "#badges", label: "Беджи и теги" },
  { href: "#cards", label: "Карточки и блоки" },
  { href: "#forms", label: "Формы и оверлеи" },
  { href: "#radius-shadow", label: "Радиусы и тени" },
];

const CALENDAR_WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 max-w-lg">
      <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
        {eyebrow}
      </div>
      <h2 className="font-display text-4xl font-medium sm:text-[44px]">{title}</h2>
    </div>
  );
}

function Spec({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 font-mono text-[11px] leading-relaxed text-text-dim">
      {children}
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-surface p-6">
      {children}
    </div>
  );
}

function FaqDemoItem() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-medium">
          Пример вопроса в аккордеоне?
        </span>
        <Plus
          size={18}
          className={`shrink-0 text-accent transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        />
      </button>
      <div
        className="grid overflow-hidden transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-text-muted">
            Ответ выезжает по высоте контейнера, иконка плюс поворачивается на 45°.
          </p>
        </div>
      </div>
    </div>
  );
}

function FilterPillsDemo() {
  const options = ["Все", "Гайды", "Новости"];
  const [active, setActive] = useState(options[0]);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setActive(opt)}
          className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
            active === opt
              ? "border-accent bg-accent/10 text-accent"
              : "border-white/10 text-text-muted hover:border-white/25 hover:text-white"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label onClick={onChange} className="flex cursor-pointer items-center gap-3 text-sm text-text-muted">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
          checked
            ? "border-transparent bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)]"
            : "border-white/15 bg-white/5"
        }`}
      >
        {checked && <Check size={13} className="text-white" />}
      </span>
      {label}
    </label>
  );
}

function RadioOption({
  selected,
  onSelect,
  label,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
}) {
  return (
    <label onClick={onSelect} className="flex cursor-pointer items-center gap-3 text-sm text-text-muted">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
          selected ? "border-accent" : "border-white/15"
        }`}
      >
        {selected && (
          <span className="h-2.5 w-2.5 rounded-full bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)]" />
        )}
      </span>
      {label}
    </label>
  );
}

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label
      onClick={onChange}
      className="flex w-full max-w-[220px] cursor-pointer items-center justify-between gap-4 text-sm text-text-muted"
    >
      {label}
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          on ? "bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)]" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </span>
    </label>
  );
}

function TextInputDemo() {
  return (
    <input
      type="text"
      placeholder="Ваш ник в Telegram"
      className="w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-text-dim focus:border-accent"
    />
  );
}

const SELECT_OPTIONS = ["Сборка под ключ", "Плагин на заказ", "Сайт для сервера"];

function CustomSelect({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-[10px] border bg-white/5 px-4 py-3 text-left text-sm text-white outline-none transition-colors ${
          open ? "border-accent" : "border-white/10"
        }`}
      >
        {value}
        <ChevronDown
          size={16}
          className={`text-text-dim transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-10 mt-2 w-full rounded-2xl border border-white/10 bg-surface p-2 shadow-[0_16px_30px_rgba(0,0,0,0.5)]">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                opt === value ? "bg-white/5 text-accent" : "text-text-muted hover:bg-white/5 hover:text-white"
              }`}
            >
              {opt}
              {opt === value && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SelectDemo() {
  const [value, setValue] = useState(SELECT_OPTIONS[0]);
  return <CustomSelect options={SELECT_OPTIONS} value={value} onChange={setValue} />;
}

function TextareaDemo() {
  return (
    <textarea
      rows={3}
      placeholder="Опишите задачу"
      className="w-full resize-none rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-text-dim focus:border-accent"
    />
  );
}

function ModalShell({
  open,
  onClose,
  maxWidth,
  padded = true,
  children,
}: {
  open: boolean;
  onClose: () => void;
  maxWidth: string;
  padded?: boolean;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[85vh] w-full overflow-y-auto rounded-2xl border border-white/10 bg-surface shadow-[0_24px_50px_rgba(0,0,0,0.55)] ${maxWidth} ${
          padded ? "p-7" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function ModalTrigger({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="rounded-[10px] border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/25"
    >
      {children}
    </button>
  );
}

function ConfirmModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ModalTrigger onClick={() => setOpen(true)}>Confirm · sm</ModalTrigger>
      <ModalShell open={open} onClose={() => setOpen(false)} maxWidth="max-w-sm">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <AlertTriangle size={20} className="text-accent" />
        </div>
        <h3 className="mb-2 font-display text-lg font-medium">Покинуть страницу?</h3>
        <p className="mb-6 text-sm leading-relaxed text-text-muted">
          Несохранённые изменения в заявке будут потеряны.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="rounded-[10px] px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-white"
          >
            Остаться
          </button>
          <button
            onClick={() => setOpen(false)}
            className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
          >
            Уйти
          </button>
        </div>
      </ModalShell>
    </>
  );
}

function FormModalDemo() {
  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(true);
  return (
    <>
      <ModalTrigger onClick={() => setOpen(true)}>Форма · md</ModalTrigger>
      <ModalShell open={open} onClose={() => setOpen(false)} maxWidth="max-w-md">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="font-display text-xl font-medium">Оставить заявку</h3>
            <p className="mt-1 text-sm text-text-muted">Ответим в Telegram в течение часа.</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-text-dim transition-colors hover:text-white"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <TextInputDemo />
          <SelectDemo />
          <TextareaDemo />
          <Checkbox checked={agree} onChange={() => setAgree((v) => !v)} label="Согласен с обработкой данных" />
          <button
            onClick={() => setOpen(false)}
            className="mt-2 rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
          >
            Отправить заявку
          </button>
        </div>
      </ModalShell>
    </>
  );
}

function SuccessModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ModalTrigger onClick={() => setOpen(true)}>Успех · sm</ModalTrigger>
      <ModalShell open={open} onClose={() => setOpen(false)} maxWidth="max-w-sm">
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)]">
            <CircleCheck size={26} className="text-white" />
          </div>
          <h3 className="mb-2 font-display text-lg font-medium">Заявка отправлена</h3>
          <p className="mb-6 text-sm leading-relaxed text-text-muted">
            Мы получили заявку и ответим в Telegram в течение часа.
          </p>
          <button
            onClick={() => setOpen(false)}
            className="w-full rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
          >
            Понятно
          </button>
        </div>
      </ModalShell>
    </>
  );
}

function GalleryModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ModalTrigger onClick={() => setOpen(true)}>Галерея · xl</ModalTrigger>
      <ModalShell open={open} onClose={() => setOpen(false)} maxWidth="max-w-4xl" padded={false}>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl bg-black">
          <Image
            src={`${BASE_PATH}/work/medieval-town-1.png`}
            alt="Средневековый город"
            fill
            sizes="(min-width: 1024px) 60vw, 90vw"
            className="object-cover"
          />
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
            aria-label="Закрыть"
          >
            <X size={18} />
          </button>
          <button className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70">
            <ChevronLeft size={20} />
          </button>
          <button className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between p-6">
          <div>
            <div className="mb-1 font-mono text-[10px] tracking-widest text-accent uppercase">карта</div>
            <h3 className="font-display text-lg font-medium">Средневековый город</h3>
          </div>
          <span className="font-mono text-xs text-text-dim">2 / 6</span>
        </div>
      </ModalShell>
    </>
  );
}

function DetailModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ModalTrigger onClick={() => setOpen(true)}>Детали услуги · xl</ModalTrigger>
      <ModalShell open={open} onClose={() => setOpen(false)} maxWidth="max-w-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <div className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">услуга</div>
            <h3 className="font-display text-2xl font-medium">Сборка под ключ</h3>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-text-dim transition-colors hover:text-white"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-text-muted">
          Полное описание услуги внутри модального окна — с прокруткой
          (max-h-[85vh] overflow-y-auto на ModalShell), когда контента больше, чем
          помещается на экране.
        </p>

        <div className="mb-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10">
          {[
            { v: "от 7 дней", l: "срок" },
            { v: "от 3000₽", l: "цена" },
            { v: "24/7", l: "поддержка" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col items-center justify-center gap-1 px-4 py-5 text-center">
              <div className="font-display text-lg font-medium">{s.v}</div>
              <div className="text-xs text-text-muted">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {["survival", "creative", "under 7 дней", "1.21"].map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mb-6 text-sm leading-relaxed text-text-muted">
          Ландшафт, архитектура, интерьеры, освещение — под стиль вашего проекта.
          Обсуждаем референсы, делаем поэтапные скриншоты прогресса, финальная
          сдача с гарантией правок.
        </p>

        <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
          <button
            onClick={() => setOpen(false)}
            className="rounded-[10px] px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-white"
          >
            Закрыть
          </button>
          <button
            onClick={() => setOpen(false)}
            className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
          >
            Оставить заявку
          </button>
        </div>
      </ModalShell>
    </>
  );
}

function CalendarDemo() {
  const [selected, setSelected] = useState(25);
  // Август 2026: 1-е число — суббота, неделя с понедельника → 5 пустых ячеек перед 1.
  const offset = 5;
  const daysInMonth = 31;
  const cells: (number | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="w-full max-w-[280px] rounded-2xl border border-white/10 bg-surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          className="rounded-lg p-1 text-text-dim transition-colors hover:bg-white/5 hover:text-white"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="font-display text-sm font-medium">Август 2026</div>
        <button
          type="button"
          className="rounded-lg p-1 text-text-dim transition-colors hover:bg-white/5 hover:text-white"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center font-mono text-[10px] tracking-wide text-text-dim uppercase">
        {CALENDAR_WEEKDAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) =>
          day === null ? (
            <div key={i} />
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(day)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${
                day === selected
                  ? "bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] font-medium text-white"
                  : "text-text-muted hover:bg-white/5 hover:text-white"
              }`}
            >
              {day}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

function RadioGroupDemo() {
  const options = ["Сборка", "Плагин", "Сайт"];
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => (
        <RadioOption key={opt} selected={selected === opt} onSelect={() => setSelected(opt)} label={opt} />
      ))}
    </div>
  );
}

function ToggleDemo() {
  const [on, setOn] = useState(true);
  return <Toggle on={on} onChange={() => setOn((v) => !v)} label="Уведомления в Telegram" />;
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(true);
  return <Checkbox checked={checked} onChange={() => setChecked((v) => !v)} label="Согласен с условиями" />;
}

function RequestFormDemo() {
  const [agree, setAgree] = useState(true);
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-surface p-7">
      <h3 className="mb-1 font-display text-xl font-medium">Оставить заявку</h3>
      <p className="mb-6 text-sm text-text-muted">
        Пример собранной формы — та же сетка отступов (gap-4), что и везде на сайте.
      </p>
      <div className="flex flex-col gap-4">
        <TextInputDemo />
        <SelectDemo />
        <TextareaDemo />
        <Checkbox checked={agree} onChange={() => setAgree((v) => !v)} label="Согласен с обработкой данных" />
        <button className="mt-2 w-fit rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5">
          Отправить заявку
        </button>
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <main className="min-h-screen bg-background pb-32 text-text">
      {/* header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-background/90 px-6 py-4 backdrop-blur">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-white">
          <ArrowLeft size={15} />
          На сайт
        </Link>
        <div className="font-mono text-xs tracking-widest text-text-dim uppercase">
          Style Guide · TheFurryDev
        </div>
      </header>

      {/* intro */}
      <section className="px-6 pt-16 pb-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
            internal
          </div>
          <h1 className="mb-4 font-display text-5xl leading-[1.05] font-medium sm:text-6xl">
            Style Guide
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
            Справочник по текущей визуальной системе лендинга: цвета, шрифты, кнопки, беджи
            и типовые блоки — как есть в коде сейчас. Используем как базу для следующих
            обновлений сайта.
          </p>

          <nav className="mt-8 flex flex-wrap gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-text-muted transition-colors hover:border-white/25 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* COLORS */}
      <section id="colors" className="scroll-mt-20 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="palette" title="Цвета." />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {COLORS.map((c) => (
              <div key={c.name} className="flex flex-col gap-3">
                <div
                  className="h-20 rounded-2xl border border-white/15"
                  style={{ background: c.hex }}
                />
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="font-mono text-[11px] text-text-dim">{c.hex}</div>
                  <div className="font-mono text-[11px] text-text-dim">{c.cssVar}</div>
                  <div className="mt-1 text-[11px] text-text-muted">{c.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <div className="mb-4 text-sm font-medium text-text-muted">
              Прозрачные оверлеи (бордеры/фоны поверх surface)
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {OVERLAYS.map((o) => (
                <div key={o.name} className="flex flex-col gap-3">
                  <div className={`h-20 rounded-2xl border border-white/15 ${o.cls}`} />
                  <div>
                    <div className="text-sm font-medium">{o.name}</div>
                    <div className="mt-1 text-[11px] text-text-muted">{o.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-4 text-sm font-medium text-text-muted">Фирменный градиент</div>
            <div className="h-20 w-full max-w-xs rounded-2xl bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)]" />
            <Spec>bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] — все основные CTA</Spec>
          </div>
        </div>
      </section>

      {/* TYPOGRAPHY */}
      <section id="typography" className="scroll-mt-20 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="type" title="Типографика." />

          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-display text-6xl leading-[1.04] font-normal">
                Заголовок H1 <span className="font-medium text-accent">с акцентом</span>
              </h1>
              <Spec>font-display (Unbounded) · text-6xl / lg:text-[76px] · font-normal, акцентное слово — font-medium text-accent</Spec>
            </div>

            <div>
              <h2 className="font-display text-4xl font-medium sm:text-[44px]">
                Заголовок H2 секции.
              </h2>
              <Spec>font-display (Unbounded) · text-4xl sm:text-[44px] · font-medium — стандарт для всех секций</Spec>
            </div>

            <div>
              <h3 className="font-display text-xl font-medium">Заголовок H3 карточки</h3>
              <Spec>font-display (Unbounded) · text-xl/text-lg · font-medium — заголовки карточек</Spec>
            </div>

            <div>
              <p className="max-w-xl text-base leading-relaxed text-text-muted">
                Основной текст набирается Inter (переменная называется --font-dm-sans,
                хотя физически используется Inter — исторический нейминг). Используется
                для описаний, параграфов, лидов.
              </p>
              <Spec>font-sans (Inter) · text-sm/text-base · text-text-muted · leading-relaxed</Spec>
            </div>

            <div>
              <p className="text-xs text-text-dim">
                Второстепенная подпись — роль, дата, мелкий комментарий.
              </p>
              <Spec>font-sans · text-xs · text-text-dim</Spec>
            </div>

            <div>
              <div className="font-mono text-xs tracking-widest text-accent uppercase">
                eyebrow-лейбл секции
              </div>
              <Spec>font-mono (Roboto Mono) · text-xs · tracking-widest · uppercase · text-accent — стоит перед каждым H2</Spec>
            </div>
          </div>
        </div>
      </section>

      {/* BUTTONS */}
      <section id="buttons" className="scroll-mt-20 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="buttons" title="Кнопки и ссылки." />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Frame>
              <button className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5">
                Написать в Telegram
              </button>
              <Spec>Primary CTA — единственная главная кнопка на сайте (Hero, PageHero, CtaSection)</Spec>
            </Frame>

            <Frame>
              <button className="rounded-[10px] border-[3px] border-white/15 px-7 py-3.5 text-sm font-medium tracking-[-0.3px] text-white">
                Outline CTA
              </button>
              <Spec>Outline CTA — используется на тёмном/видео-фоне (CircleTicker)</Spec>
            </Frame>

            <Frame>
              <button className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 font-sans text-[13px] font-bold text-background transition-transform hover:scale-105">
                <ShoppingBag size={14} />
                Купить
              </button>
              <Spec>White pill — кнопка покупки в карточках товара (ProductsShelf)</Spec>
            </Frame>

            <Frame>
              <FilterPillsDemo />
              <Spec>Filter pill — активна: border-accent bg-accent/10 text-accent · неактивна: border-white/10 text-text-muted</Spec>
            </Frame>

            <Frame>
              <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                Подробнее
                <ArrowRight size={15} />
              </span>
              <Spec>Text-link со стрелкой — «читать/подробнее» в карточках (сдвигается вправо на ховере)</Spec>
            </Frame>

            <Frame>
              <span className="flex items-center gap-1 py-2 text-sm font-medium text-text-muted transition-colors hover:text-white">
                Услуги
                <ChevronDown size={14} />
              </span>
              <Spec>Nav-ссылка (+ дропдаун) — text-text-muted, hover:text-white</Spec>
            </Frame>

            <Frame>
              <div className="w-52 rounded-2xl border border-white/10 bg-surface p-2 shadow-[0_16px_30px_rgba(0,0,0,0.5)]">
                <div className="rounded-lg bg-white/5 px-3 py-2.5 text-sm text-white">Пункт меню</div>
                <div className="rounded-lg px-3 py-2.5 text-sm text-text-muted">Пункт меню</div>
              </div>
              <Spec>Dropdown item — hover:bg-white/5 hover:text-white, контейнер surface + бордер</Spec>
            </Frame>

            <Frame>
              <div className="rounded-2xl border border-white/10 bg-surface">
                <FaqDemoItem />
              </div>
              <Spec>Аккордеон (FAQ) — плюс поворачивается на 45°, высота через grid-template-rows</Spec>
            </Frame>

            <Frame>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-white">RU</span>
                <span className="text-text-dim transition-colors hover:text-white">EN</span>
                <span className="text-text-dim transition-colors hover:text-white">UA</span>
              </div>
              <Spec>Locale switcher — активная локаль белая, остальные text-dim</Spec>
            </Frame>
          </div>
        </div>
      </section>

      {/* BADGES */}
      <section id="badges" className="scroll-mt-20 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="badges" title="Беджи и теги." />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Frame>
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-text-muted">
                minecraft 1.21
              </span>
              <Spec>Tag chip — теги технологий в карточках услуг</Spec>
            </Frame>

            <Frame>
              <span className="font-mono text-[10px] tracking-widest text-accent uppercase">
                карта
              </span>
              <Spec>Category label — подпись категории на превью портфолио</Spec>
            </Frame>

            <Frame>
              <span className="font-mono text-[10px] tracking-widest text-green-400 uppercase">
                плагин
              </span>
              <Spec>Type label (успех) — тип товара в ProductsShelf, зелёный акцент</Spec>
            </Frame>

            <Frame>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-text-muted">
                услуги · сборка под ключ
              </span>
              <Spec>Eyebrow pill — бедж над заголовком в PageHero</Spec>
            </Frame>

            <Frame>
              <div className="mb-1 flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <Spec>Рейтинг — 5 звёзд, text-accent + fill-current</Spec>
            </Frame>

            <Frame>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-sm">
                  <Check size={16} className="text-green-400" /> есть
                </span>
                <span className="flex items-center gap-1.5 text-sm">
                  <X size={16} className="text-text-dim" /> нет
                </span>
              </div>
              <Spec>Comparison-иконки — Check зелёный, X приглушённый (ComparisonTable)</Spec>
            </Frame>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section id="cards" className="scroll-mt-20 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="blocks" title="Карточки и блоки." />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* service card */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-surface p-7 transition-colors hover:border-white/20">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Boxes size={20} className="text-accent" />
              </div>
              <h3 className="mb-2 font-display text-xl font-medium">Карточка услуги</h3>
              <p className="mb-5 max-w-sm text-sm leading-relaxed text-text-muted">
                Иконка-бейдж, заголовок, описание, теги и ссылка «подробнее» со стрелкой.
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {["survival", "under 7 дней"].map((tag) => (
                  <span key={tag} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                Подробнее <ArrowRight size={15} />
              </span>
            </div>

            {/* info card */}
            <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-white/20">
              <div className="mb-4 inline-block w-fit rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-accent">
                опционально
              </div>
              <h3 className="mb-2 font-display text-lg font-medium">Инфо-карточка</h3>
              <p className="text-sm leading-relaxed text-text-muted">
                Универсальный блок для фактов/преимуществ (InfoGrid).
              </p>
            </div>

            {/* testimonial */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-surface p-6">
              <div className="mb-4 flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <p className="mb-5 text-sm leading-relaxed text-text-muted">
                «Отзыв клиента — карточка появляется в бегущей ленте (marquee), останавливается по ховеру».
              </p>
              <div>
                <div className="text-sm font-medium">Имя Фамилия</div>
                <div className="text-xs text-text-dim">роль клиента</div>
              </div>
            </div>

            {/* product card */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-accent/40">
              <div>
                <div className="mb-4 font-mono text-[10px] tracking-widest text-green-400 uppercase">
                  плагин
                </div>
                <h3 className="mb-2 font-display text-lg font-medium">Название товара</h3>
                <p className="mb-6 min-h-10 text-sm leading-relaxed text-text-muted">
                  Готовый продукт из магазина thefurry.store.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-display text-lg font-medium">от 3000₽</span>
                <span className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 font-sans text-[13px] font-bold text-background">
                  <ShoppingBag size={14} /> Купить
                </span>
              </div>
            </div>

            {/* stat block */}
            <div className="grid grid-cols-2 divide-x divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 sm:col-span-2 sm:grid-cols-4 sm:divide-y-0">
              {[
                { v: "100+", l: "проектов" },
                { v: "120+", l: "плагинов" },
                { v: "87+", l: "клиентов" },
                { v: "24/7", l: "поддержка" },
              ].map((s) => (
                <div key={s.l} className="flex flex-col items-center justify-center gap-2 px-6 py-10 text-center">
                  <div className="font-display text-4xl font-medium sm:text-5xl">{s.v}</div>
                  <div className="text-sm text-text-muted">{s.l}</div>
                </div>
              ))}
            </div>

            {/* portfolio card */}
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-surface">
              <Image
                src={`${BASE_PATH}/work/sakura-island-1.png`}
                alt="Пример работы"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-transparent opacity-70" />
              <div className="absolute right-0 bottom-0 left-0 p-5">
                <div className="mb-1 font-mono text-[10px] tracking-widest text-accent uppercase">
                  сборка
                </div>
                <h3 className="font-display text-base font-medium">Карточка портфолио</h3>
              </div>
            </div>

            {/* blog card */}
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors hover:border-white/20">
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-3 font-mono text-[11px] text-text-dim">
                  <span className="text-accent">гайды</span>
                  <span>·</span>
                  <span>5 мин</span>
                </div>
                <h3 className="mb-2 font-display text-lg font-medium">Карточка блога</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
                  Категория, заголовок, отрывок текста, ссылка «читать» со стрелкой.
                </p>
                <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                  Читать <ArrowRight size={14} />
                </span>
              </div>
            </div>

            {/* comparison row */}
            <div className="overflow-hidden rounded-2xl border border-white/10 sm:col-span-2">
              <div className="grid grid-cols-3 border-b border-white/10 bg-white/5">
                <div className="px-5 py-4 text-xs text-text-muted">&nbsp;</div>
                <div className="px-5 py-4 text-center text-sm font-medium">Своими силами</div>
                <div className="px-5 py-4 text-center text-sm font-medium text-accent">TheFurryDev</div>
              </div>
              {[
                { label: "Срок", a: "недели", b: "от 7 дней" },
                { label: "Поддержка", a: false, b: true },
              ].map((row, i) => (
                <div key={row.label} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-surface" : "bg-background"}`}>
                  <div className="px-5 py-4 text-sm text-text-muted">{row.label}</div>
                  <div className="flex items-center justify-center px-5 py-4">
                    {typeof row.a === "boolean" ? (
                      row.a ? <Check size={16} className="text-green-400" /> : <X size={16} className="text-text-dim" />
                    ) : (
                      <span className="text-sm">{row.a}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-center px-5 py-4">
                    {typeof row.b === "boolean" ? (
                      row.b ? <Check size={16} className="text-green-400" /> : <X size={16} className="text-text-dim" />
                    ) : (
                      <span className="text-sm">{row.b}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FORMS + OVERLAYS */}
      <section id="forms" className="scroll-mt-20 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="new" title="Формы и оверлеи." />
          <p className="-mt-6 mb-10 max-w-xl text-sm leading-relaxed text-text-muted">
            Этих элементов ещё нет в коде сайта — сейчас все CTA ведут в Telegram.
            Черновой вариант в текущей стилистике: те же surface-карточки, border-white/10,
            синий градиент и radius-шкала, что и везде.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Frame>
              <ConfirmModalDemo />
              <Spec>Confirm modal — max-w-sm, предупреждающая иконка, два действия (нейтральное + основное)</Spec>
            </Frame>

            <Frame>
              <FormModalDemo />
              <Spec>Form modal — max-w-md, те же поля формы, что и в отдельной секции ниже</Spec>
            </Frame>

            <Frame>
              <SuccessModalDemo />
              <Spec>Success modal — max-w-sm, круглая иконка градиентом, одна кнопка-действие</Spec>
            </Frame>

            <Frame>
              <GalleryModalDemo />
              <Spec>Gallery modal — max-w-4xl, картинка на всю ширину без паддинга, стрелки листания, счётчик</Spec>
            </Frame>

            <Frame>
              <DetailModalDemo />
              <Spec>Detail modal — max-w-2xl, длинный контент, скролл внутри окна (max-h-[85vh] overflow-y-auto)</Spec>
            </Frame>

            <Frame>
              <CalendarDemo />
              <Spec>Date picker — сетка 7×6, выбранный день закрашен градиентом (rounded-lg)</Spec>
            </Frame>

            <Frame>
              <TextInputDemo />
              <Spec>Text input — bg-white/5, border-white/10, focus:border-accent</Spec>
            </Frame>

            <Frame>
              <SelectDemo />
              <Spec>Select — кастомный dropdown (как меню «Услуги» в шапке), не нативный select</Spec>
            </Frame>

            <Frame>
              <TextareaDemo />
              <Spec>Textarea — идентичен text input, resize-none</Spec>
            </Frame>

            <Frame>
              <CheckboxDemo />
              <Spec>Checkbox — rounded-md, снятый: border-white/15 bg-white/5, отмеченный: градиент + Check-иконка</Spec>
            </Frame>

            <Frame>
              <RadioGroupDemo />
              <Spec>Radio group — кольцо border-accent, точка градиентом внутри</Spec>
            </Frame>

            <Frame>
              <ToggleDemo />
              <Spec>Toggle / switch — трек bg-white/10 → градиент, кружок translate-x-5</Spec>
            </Frame>

            <div className="sm:col-span-2 lg:col-span-3">
              <RequestFormDemo />
              <Spec>Пример собранной формы заявки — сочетание всех полей выше в одной карточке</Spec>
            </div>
          </div>
        </div>
      </section>

      {/* RADIUS + SHADOW */}
      <section id="radius-shadow" className="scroll-mt-20 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="shape" title="Радиусы и тени." />

          <div className="mb-4 text-sm font-medium text-text-muted">Радиусы</div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {RADII.map((r) => (
              <div key={r.name} className="flex flex-col gap-3">
                <div className={`h-20 w-full border border-white/15 bg-surface ${r.name}`} />
                <div>
                  <div className="font-mono text-xs text-white">{r.name}</div>
                  <div className="text-[11px] text-text-dim">{r.px}</div>
                  <div className="mt-1 text-[11px] text-text-muted">{r.used}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 mb-4 text-sm font-medium text-text-muted">Тени</div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {SHADOWS.map((s) => (
              <div key={s.name} className="flex flex-col items-start gap-3">
                <div
                  className="h-20 w-full rounded-2xl border border-white/10 bg-surface"
                  style={s.style}
                />
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <Spec>{s.css}</Spec>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
