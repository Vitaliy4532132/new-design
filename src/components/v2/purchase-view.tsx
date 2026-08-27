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
  Server,
  Star,
  Unplug,
  X,
} from "lucide-react";
import { formatDate } from "@/lib/format";
import { PRODUCT_DETAILS } from "@/lib/product-data";
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
  const [unbindIp, setUnbindIp] = useState<string | null>(null);

  // Ключ скрыт по умолчанию — на случай, если экран видит кто-то ещё.
  const masked = `${current.key.slice(0, 4)}-••••-••••-••••`;
  const used = current.servers.length;

  async function copyKey() {
    try {
      await navigator.clipboard.writeText(current.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Буфер доступен только по защищённому соединению — иначе просто
      // раскрываем ключ, чтобы его можно было выделить руками.
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
            current.status === "active" ? "border-green-400/40 text-green-400" : "border-red-500/40 text-red-400"
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

      {/* Активные серверы */}
      <div className="mb-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] tracking-widest text-text-dim uppercase">Активные серверы</span>
          <span className="font-mono text-[11px] text-text-dim">
            {used} из {current.maxActivations}
          </span>
        </div>

        {used === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-background/60 px-4 py-4 text-sm text-text-muted">
            Ключ ещё не запускался ни на одном сервере. Он привяжется сам при первом старте.
          </p>
        ) : (
          <ul className="overflow-hidden rounded-2xl border border-white/10">
            {current.servers.map((s, i) => (
              <li
                key={s.ip}
                className={`flex flex-wrap items-center gap-3 bg-background/60 px-4 py-3 ${
                  i > 0 ? "border-t border-white/10" : ""
                }`}
              >
                <Server size={15} className="shrink-0 text-accent" />
                <div className="min-w-0">
                  <code className="font-mono text-sm break-all text-white">{s.ip}</code>
                  <div className="font-mono text-[11px] text-text-dim">был на связи {formatDate(s.lastSeen)}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setUnbindIp(s.ip)}
                  className="ml-auto flex shrink-0 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-white/25"
                >
                  <Unplug size={12} />
                  Отвязать
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
        <span className="font-mono text-[11px] text-text-dim">Выдана {formatDate(current.issued)}</span>
        <button
          type="button"
          onClick={() => setRegenOpen(true)}
          className="flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/25"
        >
          <KeyRound size={14} />
          Перевыпустить ключ
        </button>
      </div>

      {unbindIp && (
        <Modal title="Отвязать сервер?" onClose={() => setUnbindIp(null)}>
          <p className="mb-6 text-sm leading-relaxed text-text-muted">
            Ключ перестанет работать на <code className="font-mono text-white">{unbindIp}</code> и освободит слот.
            Пригодится при переезде на другой хостинг.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setUnbindIp(null)}
              className="rounded-[10px] px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-white"
            >
              Отмена
            </button>
            <button
              onClick={() => {
                setCurrent((c) => ({ ...c, servers: c.servers.filter((s) => s.ip !== unbindIp) }));
                setUnbindIp(null);
              }}
              className="rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
            >
              Отвязать
            </button>
          </div>
        </Modal>
      )}

      {regenOpen && (
        <Modal title="Перевыпустить ключ?" onClose={() => setRegenOpen(false)}>
          <p className="mb-6 text-sm leading-relaxed text-text-muted">
            Старый ключ перестанет работать сразу, и все серверы отвяжутся.
            Делайте это, только если он попал к посторонним.
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
                setCurrent((c) => ({ ...c, key: `${prefix}-0000-0000-0001`, servers: [] }));
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

export function ReviewBlock({ purchase }: { purchase: DemoPurchase }) {
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
          <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase ${status.className}`}>
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
      <h2 className="mb-1 font-display text-lg font-medium">Оставить отзыв</h2>
      <p className="mb-5 text-sm text-text-muted">
        {purchase.title} — расскажите, как показал себя на вашем сервере.
      </p>

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
  const latest = purchase.downloads.find((d) => d.latest) ?? purchase.downloads[0];
  const older = purchase.downloads.filter((d) => d !== latest);
  const changelog = PRODUCT_DETAILS[purchase.slug]?.changelog ?? [];

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

          {/* Загрузка. Качается только свежая версия — старые остаются
              в списке, чтобы было видно, что менялось. */}
          <div className={`${CARD} p-6`}>
            <h2 className="mb-5 font-display text-lg font-medium">Загрузка</h2>

            <div className="mb-5 flex flex-wrap items-center gap-4 rounded-2xl border border-accent/30 bg-accent/5 px-5 py-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-sm text-white">v{latest.version}</span>
                  <span className="rounded-md border border-green-400/40 px-2 py-0.5 font-mono text-[10px] tracking-wide text-green-400 uppercase">
                    свежая
                  </span>
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-text-dim">
                  {formatDate(latest.date)} · {latest.size}
                </div>
              </div>
              <button
                type="button"
                className="ml-auto flex shrink-0 items-center gap-2 rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
              >
                <Download size={14} />
                Скачать
              </button>
            </div>

            {older.length > 0 && (
              <p className="text-xs leading-relaxed text-text-dim">
                Скачать можно только свежую версию — в ней все прошлые правки.
                Предыдущих {older.length} перечислены ниже в истории обновлений.
              </p>
            )}
          </div>

          {/* История обновлений */}
          {changelog.length > 0 && (
            <div className={CARD}>
              <div className="border-b border-white/10 px-6 py-5">
                <h2 className="mb-1 font-display text-lg font-medium">Обновления</h2>
                <p className="text-sm text-text-muted">Все версии входят в покупку, доплачивать не нужно.</p>
              </div>

              <ul>
                {changelog.map((e, i) => (
                  <li key={e.version} className={`px-6 py-5 ${i > 0 ? "border-t border-white/10" : ""}`}>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="font-mono text-sm text-accent">v{e.version}</span>
                      {i === 0 && (
                        <span className="rounded-md border border-green-400/40 px-2 py-0.5 font-mono text-[10px] tracking-wide text-green-400 uppercase">
                          свежая
                        </span>
                      )}
                      <span className="ml-auto font-mono text-[11px] text-text-dim">{formatDate(e.date)}</span>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {e.changes.map((c) => (
                        <li key={c} className="flex items-start gap-3 text-sm text-text-muted">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ReviewBlock purchase={purchase} />
        </div>
      </div>
    </section>
  );
}
