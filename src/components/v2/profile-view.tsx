"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  KeyRound,
  MessageSquare,
  Package,
  Plus,
  Settings,
  ShoppingBag,
  Star,
  Upload,
  Wallet,
  X,
} from "lucide-react";
import { ReviewBlock } from "@/components/v2/purchase-view";
import { formatAmount, formatDate } from "@/lib/format";
import {
  DEMO_ORDERS,
  DEMO_PURCHASES,
  DEMO_REVIEWS,
  DEMO_TRANSACTIONS,
  DEMO_USER,
  ORDER_STATUS,
  REVIEW_STATUS,
} from "@/lib/profile-demo";

type TabId = "orders" | "purchases" | "licenses" | "balance" | "reviews" | "settings";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "orders", label: "Заказы", icon: ShoppingBag },
  { id: "purchases", label: "Покупки", icon: Package },
  { id: "licenses", label: "Лицензии", icon: KeyRound },
  { id: "balance", label: "Баланс", icon: Wallet },
  { id: "reviews", label: "Отзывы", icon: MessageSquare },
  { id: "settings", label: "Настройки", icon: Settings },
];

const CARD = "rounded-2xl border border-white/10 bg-surface";
const INPUT =
  "w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-text-dim focus:border-brand";

function Badge({ label, className }: { label: string; className: string }) {
  return (
    <span className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase ${className}`}>
      {label}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-brand">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className={i < rating ? "fill-current" : "opacity-25"} />
      ))}
    </div>
  );
}

function TopupModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("1000");

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
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface p-7 shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
      >
        <div className="mb-5 flex items-start justify-between">
          <h3 className="font-display text-xl font-medium">Пополнение</h3>
          <button onClick={onClose} className="text-text-dim transition-colors hover:text-white" aria-label="Закрыть">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {["500", "1000", "3000", "5000"].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setAmount(v)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                amount === v
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-white/10 text-text-muted hover:border-white/25 hover:text-white"
              }`}
            >
              {v}₽
            </button>
          ))}
        </div>

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
          inputMode="numeric"
          className={`${INPUT} mb-5`}
          placeholder="Сумма"
        />

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
        >
          Пополнить
        </button>
      </div>
    </div>
  );
}

export function ProfileView() {
  const [tab, setTab] = useState<TabId>("orders");
  const [topupOpen, setTopupOpen] = useState(false);

  return (
    <section className="px-5 pt-28 pb-20 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-5xl">
        {/* Шапка профиля */}
        <div className={`${CARD} mb-8 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between`}>
          <div className="flex items-center gap-4">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] font-display text-2xl font-medium text-white">
              {DEMO_USER.name.charAt(0)}
            </span>
            <div className="min-w-0">
              <h1 className="font-display text-2xl font-medium">{DEMO_USER.name}</h1>
              <div className="font-mono text-xs text-text-dim">@{DEMO_USER.username}</div>
              <div className="mt-1.5 text-xs text-text-muted">
                С нами с {formatDate(DEMO_USER.since)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-background/60 px-5 py-4">
            <div>
              <div className="mb-1 font-mono text-[11px] tracking-widest text-text-dim uppercase">Баланс</div>
              <div className="font-display text-2xl font-medium">{DEMO_USER.balance}</div>
            </div>
            <button
              type="button"
              onClick={() => setTopupOpen(true)}
              className="flex items-center gap-1.5 rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
            >
              <Plus size={14} />
              Пополнить
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
          {/* Вкладки: сбоку на десктопе, лентой на телефоне */}
          <nav className="-mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-[10px] px-4 py-2.5 text-sm font-medium transition-colors lg:w-full ${
                    active
                      ? "bg-brand/10 text-brand"
                      : "text-text-muted hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {t.label}
                </button>
              );
            })}
          </nav>

          <div className="min-w-0">
            {tab === "orders" && (
              <div className="flex flex-col gap-4">
                {DEMO_ORDERS.map((o) => {
                  const status = ORDER_STATUS[o.status];
                  return (
                    <div key={o.id} className={`${CARD} p-6`}>
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="mb-1 flex items-center gap-3">
                            <span className="font-mono text-xs text-text-dim">№{o.id}</span>
                            <Badge label={status.label} className={status.className} />
                          </div>
                          <h3 className="font-display text-lg font-medium">{o.title}</h3>
                        </div>
                        <div className="text-right">
                          <div className="font-display text-lg font-medium">{o.price}</div>
                          <div className="font-mono text-[11px] text-text-dim">{formatDate(o.date)}</div>
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-4">
                        <div className="mb-3 font-mono text-[11px] tracking-widest text-text-dim uppercase">
                          Ход работы
                        </div>
                        <ul className="flex flex-col gap-3">
                          {o.log.map((l) => (
                            <li key={l.date + l.text} className="flex gap-3 text-sm">
                              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                              <span className="min-w-0 text-text-muted">{l.text}</span>
                              <span className="ml-auto shrink-0 font-mono text-[11px] text-text-dim">
                                {formatDate(l.date)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {tab === "purchases" && (
              <div className="flex flex-col gap-4">
                {DEMO_PURCHASES.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/home/profile/purchases/${p.slug}`}
                    className={`${CARD} group p-6 transition-colors hover:border-brand/40`}
                  >
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="mb-1 font-display text-lg font-medium">{p.title}</h3>
                        <div className="font-mono text-[11px] text-text-dim">
                          версия {p.version} · куплено {formatDate(p.date)}
                        </div>
                      </div>
                      <div className="font-display text-lg font-medium">{p.price}</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-background/60 px-4 py-3">
                      <KeyRound size={15} className="shrink-0 text-brand" />
                      {/* Ключ здесь скрыт: полный показывается на странице покупки */}
                      <code className="min-w-0 font-mono text-xs break-all text-text-muted">
                        {p.licenseKey.slice(0, 4)}-••••-••••-••••
                      </code>
                      <span className="ml-auto flex shrink-0 items-center gap-1.5 text-xs font-medium text-brand">
                        Открыть
                        <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {tab === "licenses" && (
              <div className="flex flex-col gap-4">
                {DEMO_PURCHASES.map((p) => {
                  const used = p.license.servers.length;
                  const active = p.license.status === "active";

                  return (
                    <div key={p.slug} className={`${CARD} p-6`}>
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="mb-1 font-display text-lg font-medium">{p.title}</h3>
                          <div className="font-mono text-[11px] text-text-dim">
                            выдана {formatDate(p.license.issued)}
                          </div>
                        </div>
                        <Badge
                          label={active ? "активна" : "заблокирована"}
                          className={active ? "border-green-400/40 text-green-400" : "border-red-500/40 text-red-400"}
                        />
                      </div>

                      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-background/60 px-4 py-3">
                        <KeyRound size={15} className="shrink-0 text-brand" />
                        {/* Полный ключ показывается только на странице покупки */}
                        <code className="min-w-0 font-mono text-xs break-all text-text-muted">
                          {p.license.key.slice(0, 4)}-••••-••••-••••
                        </code>
                        <span className="ml-auto shrink-0 font-mono text-[11px] text-text-dim">
                          {used} из {p.license.maxActivations} серверов
                        </span>
                      </div>

                      {used > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {p.license.servers.map((s) => (
                            <span
                              key={s.ip}
                              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-text-muted"
                            >
                              {s.ip}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/home/profile/purchases/${p.slug}`}
                        className="group flex w-fit items-center gap-1.5 text-sm font-medium text-brand"
                      >
                        Управлять ключом
                        <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}

            {tab === "balance" && (
              <div className={CARD}>
                <div className="border-b border-white/10 px-6 py-5">
                  <div className="mb-1 font-mono text-[11px] tracking-widest text-text-dim uppercase">
                    История операций
                  </div>
                  <div className="text-sm text-text-muted">Пополнения, покупки и оплата заказов</div>
                </div>

                <ul>
                  {DEMO_TRANSACTIONS.map((t, i) => (
                    <li
                      key={t.id}
                      className={`flex items-center gap-4 px-6 py-4 ${i > 0 ? "border-t border-white/10" : ""}`}
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm">{t.text}</div>
                        <div className="font-mono text-[11px] text-text-dim">{formatDate(t.date)}</div>
                      </div>
                      <span
                        className={`ml-auto shrink-0 font-display text-base font-medium ${
                          t.amount > 0 ? "text-green-400" : "text-text-muted"
                        }`}
                      >
                        {formatAmount(t.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "reviews" && (
              <div className="flex flex-col gap-4">
                {/* Сначала то, что ждёт действия: купленное без отзыва */}
                {DEMO_PURCHASES.filter((p) => !p.reviewId).map((p) => (
                  <ReviewBlock key={p.slug} purchase={p} />
                ))}

                {DEMO_REVIEWS.map((r) => {
                  const status = REVIEW_STATUS[r.status];
                  return (
                    <div key={r.id} className={`${CARD} p-6`}>
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-base font-medium">{r.product}</h3>
                          <Badge label={status.label} className={status.className} />
                        </div>
                        <span className="font-mono text-[11px] text-text-dim">{formatDate(r.date)}</span>
                      </div>
                      <div className="mb-3">
                        <Stars rating={r.rating} />
                      </div>
                      <p className="text-sm leading-relaxed text-text-muted">{r.text}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {tab === "settings" && (
              <div className="flex flex-col gap-4">
                <div className={`${CARD} p-6`}>
                  <h3 className="mb-5 font-display text-lg font-medium">Профиль</h3>

                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] font-display text-xl font-medium text-white">
                      {DEMO_USER.name.charAt(0)}
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/25"
                    >
                      <Upload size={14} />
                      Загрузить аватар
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] tracking-widest text-text-dim uppercase">Имя</span>
                      <input className={INPUT} defaultValue={DEMO_USER.name} />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] tracking-widest text-text-dim uppercase">Ник</span>
                      <input className={INPUT} defaultValue={DEMO_USER.username} />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] tracking-widest text-text-dim uppercase">Telegram</span>
                      <input className={INPUT} defaultValue={DEMO_USER.telegram} />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] tracking-widest text-text-dim uppercase">Discord</span>
                      <input className={INPUT} defaultValue={DEMO_USER.discord} />
                    </label>
                  </div>

                  <button
                    type="button"
                    className="mt-6 rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-6 py-3 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)]"
                  >
                    Сохранить
                  </button>
                </div>

                <div className={`${CARD} p-6`}>
                  <h3 className="mb-5 font-display text-lg font-medium">Пароль</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] tracking-widest text-text-dim uppercase">Новый</span>
                      <input type="password" className={INPUT} placeholder="••••••••" />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] tracking-widest text-text-dim uppercase">Повтор</span>
                      <input type="password" className={INPUT} placeholder="••••••••" />
                    </label>
                  </div>
                  <button
                    type="button"
                    className="mt-6 rounded-[10px] border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/25"
                  >
                    Сменить пароль
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {topupOpen && <TopupModal onClose={() => setTopupOpen(false)} />}
    </section>
  );
}
