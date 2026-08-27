"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, LinkIcon, Star } from "lucide-react";
import { Backdrop } from "@/components/v2/backdrop";
import { useToast } from "@/components/v2/toast";
import { BASE_PATH } from "@/lib/base-path";
import { TELEGRAM_URL } from "@/lib/links";

const CARD = "rounded-2xl border border-white/10 bg-surface";

// Бэкенда нет, поэтому состояние ссылки выводим из самого токена: так можно
// посмотреть оба варианта, не подключая базу.
function resolveLink(token: string) {
  if (token === "expired" || token === "invalid") return null;
  return {
    productName: "FurryChat",
    description: "Спасибо за покупку! Расскажите, как плагин показал себя на вашем сервере.",
  };
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-16 sm:px-6">
      <Backdrop variant="grid" />
      <Backdrop variant="glow" className="opacity-25" />

      <div className="relative w-full max-w-md">
        <Link
          href="/home"
          className="mb-8 flex items-center justify-center gap-2.5 font-sans text-xl font-bold tracking-tight"
        >
          <Image
            src={`${BASE_PATH}/logo.svg`}
            alt="TheFurryDev"
            width={44}
            height={56}
            className="h-9 w-auto"
          />
          <span>
            TheFurry<span className="text-accent">Dev</span>
          </span>
        </Link>

        {children}
      </div>
    </main>
  );
}

export function ReviewLinkForm({ token }: { token: string }) {
  const link = resolveLink(token);
  const toast = useToast();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  if (!link) {
    return (
      <Shell>
        <div className={`${CARD} p-8 text-center`}>
          <span className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <LinkIcon size={20} className="text-text-dim" />
          </span>
          <h1 className="mb-2 font-display text-xl font-medium">Ссылка недействительна</h1>
          <p className="mb-6 text-sm leading-relaxed text-text-muted">
            Возможно, отзыв уже оставлен или срок ссылки истёк. Напишите нам, и мы пришлём новую.
          </p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener"
            className="inline-block rounded-[10px] border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/25"
          >
            Написать в Telegram
          </a>
        </div>
      </Shell>
    );
  }

  if (sent) {
    return (
      <Shell>
        <div className={`${CARD} p-8 text-center`}>
          <span className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)]">
            <Check size={22} className="text-white" />
          </span>
          <h1 className="mb-2 font-display text-xl font-medium">Спасибо за отзыв</h1>
          <p className="mb-6 text-sm leading-relaxed text-text-muted">
            Он появится на сайте после проверки модератором.
          </p>
          <Link
            href="/home"
            className="inline-block rounded-[10px] border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/25"
          >
            На главную
          </Link>
        </div>
      </Shell>
    );
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Звёзды не поле формы, поэтому браузер их не проверит.
    if (rating === 0) {
      toast("error", "Поставьте оценку", "Без звёзд отзыв не отправить.");
      return;
    }

    setSent(true);
    toast("success", "Отзыв отправлен", "Появится на сайте после проверки.");
  }

  return (
    <Shell>
      <form onSubmit={submit} className={`${CARD} p-6 sm:p-8`}>
        <div className="mb-1 font-mono text-[11px] tracking-widest text-accent uppercase">отзыв</div>
        <h1 className="mb-2 font-display text-xl font-medium">{link.productName}</h1>
        <p className="mb-7 text-sm leading-relaxed text-text-muted">{link.description}</p>

        <div className="mb-6">
          <span className="mb-3 block font-mono text-[11px] tracking-widest text-text-dim uppercase">
            Оценка
          </span>
          <div className="flex gap-1.5" onMouseLeave={() => setHovered(0)}>
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
                  <Star size={26} className={lit ? "fill-current" : "opacity-25"} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="review-name"
            className="mb-2 block font-mono text-[11px] tracking-widest text-text-dim uppercase"
          >
            Как вас подписать
          </label>
          <input
            id="review-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ник или имя"
            className="w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-text-dim focus:border-accent"
          />
        </div>

        <div className="mb-7">
          <label
            htmlFor="review-text"
            className="mb-2 block font-mono text-[11px] tracking-widest text-text-dim uppercase"
          >
            Отзыв
          </label>
          <textarea
            id="review-text"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            placeholder="Что понравилось, что можно улучшить"
            className="w-full resize-none rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-text-dim focus:border-accent"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
        >
          Отправить отзыв
        </button>
      </form>
    </Shell>
  );
}
