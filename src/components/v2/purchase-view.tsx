"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  Eye,
  EyeOff,
  KeyRound,
  RefreshCw,
  Star,
  X,
} from "lucide-react";
import { formatDate } from "@/lib/format";
import {
  DEMO_REVIEWS,
  REVIEW_STATUS,
  type DemoLicense,
  type DemoPurchase,
} from "@/lib/profile-demo";

const CARD = "rounded-2xl border border-white/10 bg-surface";

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-surface p-7 shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
      >
        <div className="mb-5 flex items-start justify-between">
          <h3 className="font-display text-xl font-medium">{title}</h3>
          <button onClick={onClose} className="text-text-dim transition-colors hover:text-white" aria-label="Закрыть">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function LicenseBlock({ license }: { license: DemoLicense }) {
  const [current, setCurrent] = useState(license);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [regenOpen, setRegenOpen] = useState(false);
  const [hwidOpen, setHwidOpen] = useState(false);

  // Ключ по умолчанию скрыт: страницу могут открыть в стриме или на созвоне.
  const masked = `${current.key.slice(0, 4)}-••••-••••-••••`;

  async function copyKey() {
    try {
      await navigator.clipboard.writeText(current.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Буфер недоступен вне защищённого соединения — тогда ключ
      // просто открываем, чтобы его можно было выделить руками.
      setVisible(true);
    }
  }

  return (
    <div className={`${CARD} p-6`}>
      <div className="mb-5 flex items-center gap-3">
        <KeyRound size={17} className="text-accent" />
        <h2 className="font-display text-lg font-medium">Лицензия</h2>
        <span
          className={`ml-auto rounded-md border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase ${
            current.status === "active"
              ? "border-green-400/40 text-green-400"
              : "border-red-500/40 text-red-400"
          }`}
        >
          {current.status === "active" ? "активна" : "заблокирована"}
        </span>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-background/60 px-4 py-3">
        <code className="min-w-0 flex-1 font-mono text-sm break-all text-white">
          {visible ? current.key : masked}
        </code>
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Скрыть ключ" : "Показать ключ"}
          className="shrink-0 text-text-dim transition-colors hover:text-white"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
        <button
          type="button"
          onClick={copyKey}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-white/25"
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? "Скопировано" : "Копировать"}
        </button>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <div className="mb-1 font-mono text-[11px] tracking-widest text-text-dim uppercase">Активаций</div>
          <div className="text-sm">
            {current.activations} из {current.maxActivations}
          </div>
        </div>
        <div>
          <div className="mb-1 font-mono text-[11px] tracking-widest text-text-dim uppercase">Выдана</div>
          <div className="text-sm">{formatDate(current.issued)}</div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <div className="mb-1 font-mono text-[11px] tracking-widest text-text-dim uppercase">Привязка</div>
          <div className="font-mono text-sm break-all">{current.hwid ?? "нет"}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
        <button
          type="button"
          onClick={() => setHwidOpen(true)}
          disabled={!current.hwid}
          className="flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RefreshCw size={14} />
          Сбросить привязку
        </button>
        <button
          type="button"
          onClick={() => setRegenOpen(true)}
          className="flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/25"
        >
          <KeyRound size={14} />
          Перевыпустить ключ
        </button>
      </div>

      {hwidOpen && (
        <Modal title="Сбросить привязку?" onClose={() => setHwidOpen(false)}>
          <p className="mb-6 text-sm leading-relaxed text-text-muted">
            Ключ отвяжется от текущей машины, и его можно будет активировать заново.
            Пригодится при переезде на другой хостинг.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setHwidOpen(false)}
              className="rounded-[10px] px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-white"
            >
              Отмена
            </button>
            <button
              onClick={() => {
                setCurrent((c) => ({ ...c, hwid: null, activations: 0 }));
                setHwidOpen(false);
              }}
              className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
            >
              Сбросить
            </button>
          </div>
        </Modal>
      )}

      {regenOpen && (
        <Modal title="Перевыпустить ключ?" onClose={() => setRegenOpen(false)}>
          <p className="mb-6 text-sm leading-relaxed text-text-muted">
            Старый ключ перестанет работать сразу. Делайте это, только если он
            попал к посторонним.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setRegenOpen(false)}
              className="rounded-[10px] px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-white"
            >
              Отмена
            </button>
            <button
              onClick={() => {
                const prefix = current.key.slice(0, 4);
                setCurrent((c) => ({ ...c, key: `${prefix}-0000-0000-0001`, hwid: null, activations: 0 }));
                setVisible(true);
                setRegenOpen(false);
              }}
              className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
            >
              Перевыпустить
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ReviewBlock({ purchase }: { purchase: DemoPurchase }) {
  const existing = DEMO_REVIEWS.find((r) => r.id === purchase.reviewId);
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  if (existing) {
    const status = REVIEW_STATUS[existing.status];
    return (
      <div className={`${CARD} p-6`}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h2 className="font-display text-lg font-medium">Ваш отзыв</h2>
          <span
            className={`rounded-md border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase ${status.className}`}
          >
            {status.label}
          </span>
          <span className="ml-auto font-mono text-[11px] text-text-dim">{formatDate(existing.date)}</span>
        </div>
        <div className="mb-3 flex gap-0.5 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} className={i < existing.rating ? "fill-current" : "opacity-25"} />
          ))}
        </div>
        <p className="text-sm leading-relaxed text-text-muted">{existing.text}</p>
      </div>
    );
  }

  if (sent) {
    return (
      <div className={`${CARD} p-6 text-center`}>
        <Check size={24} className="mx-auto mb-3 text-green-400" />
        <h2 className="mb-2 font-display text-lg font-medium">Отзыв отправлен</h2>
        <p className="text-sm text-text-muted">Появится на сайте после проверки модератором.</p>
      </div>
    );
  }

  return (
    <div className={`${CARD} p-6`}>
      <h2 className="mb-2 font-display text-lg font-medium">Оставить отзыв</h2>
      <p className="mb-5 text-sm text-text-muted">Расскажите, как товар показал себя на вашем сервере.</p>

      <div className="mb-5 flex gap-1" onMouseLeave={() => setHovered(0)}>
        {Array.from({ length: 5 }).map((_, i) => {
          const value = i + 1;
          const lit = value <= (hovered || rating);
          return (
            <button
              key={value}
              type="button"
              onMouseEnter={() => setHovered(value)}
              onClick={() => setRating(value)}
              aria-label={`Оценка ${value}`}
              className="text-accent transition-transform hover:scale-110"
            >
              <Star size={22} className={lit ? "fill-current" : "opacity-25"} />
            </button>
          );
        })}
      </div>

      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что понравилось, что можно улучшить"
        className="mb-5 w-full resize-none rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-text-dim focus:border-accent"
      />

      <button
        type="button"
        disabled={text.trim().length === 0}
        onClick={() => setSent(true)}
        className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-6 py-3 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        Отправить
      </button>
    </div>
  );
}

export function PurchaseView({ purchase }: { purchase: DemoPurchase }) {
  return (
    <section className="px-5 pt-28 pb-20 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/home/profile"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-white"
        >
          <ArrowLeft size={15} />
          Все покупки
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 font-display text-3xl font-medium break-words sm:text-4xl">{purchase.title}</h1>
          <div className="font-mono text-xs text-text-dim">
            куплено {formatDate(purchase.date)} · {purchase.price}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <LicenseBlock license={purchase.license} />

          {/* Загрузки */}
          <div className={CARD}>
            <div className="border-b border-white/10 px-6 py-5">
              <h2 className="mb-1 font-display text-lg font-medium">Загрузки</h2>
              <p className="text-sm text-text-muted">Все версии доступны без доплаты.</p>
            </div>
            <ul>
              {purchase.downloads.map((d, i) => (
                <li
                  key={d.version}
                  className={`flex flex-wrap items-center gap-4 px-6 py-4 ${i > 0 ? "border-t border-white/10" : ""}`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-sm text-white">v{d.version}</span>
                      {d.latest && (
                        <span className="rounded-md border border-green-400/40 px-2 py-0.5 font-mono text-[10px] tracking-wide text-green-400 uppercase">
                          свежая
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] text-text-dim">
                      {formatDate(d.date)} · {d.size}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`ml-auto flex shrink-0 items-center gap-2 rounded-[10px] px-4 py-2.5 text-[13px] font-bold transition-transform hover:-translate-y-0.5 ${
                      d.latest
                        ? "bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
                        : "border border-white/15 bg-white/5 font-medium text-white"
                    }`}
                  >
                    <Download size={14} />
                    Скачать
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <ReviewBlock purchase={purchase} />
        </div>
      </div>
    </section>
  );
}
