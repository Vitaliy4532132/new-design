"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const KEY = "furrydev-cookie-choice";

// Выбор живёт в localStorage — это внешнее хранилище, поэтому читаем его
// через useSyncExternalStore, а не через эффект с setState.
let listeners: (() => void)[] = [];
let cached: string | null = null;
let loaded = false;

function subscribe(cb: () => void) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

function getSnapshot() {
  if (!loaded) {
    try {
      cached = localStorage.getItem(KEY);
    } catch {
      // Приватный режим или запрет на хранение: считаем, что выбор сделан,
      // иначе баннер всплывал бы на каждой странице без шанса его закрыть.
      cached = "essential";
    }
    loaded = true;
  }
  return cached;
}

// На сервере хранилища нет. Возвращаем «выбор сделан», чтобы баннер не попал
// в разметку и не мигнул у тех, кто уже ответил.
function getServerSnapshot() {
  return "essential";
}

function saveChoice(value: string) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // Не сохранится — но закрыть баннер всё равно нужно.
  }
  cached = value;
  loaded = true;
  listeners.forEach((l) => l());
}

export function CookieBanner() {
  const choice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (choice) return null;

  const choose = saveChoice;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-center p-4 sm:p-6">
      <div className="pointer-events-auto relative w-full max-w-3xl animate-banner-in rounded-2xl border border-white/10 bg-surface/95 p-5 shadow-[0_24px_50px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-start gap-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand/30 bg-brand/10">
              <Cookie size={16} className="text-brand" />
            </span>
            <p className="min-w-0 text-sm leading-relaxed text-text-muted">
              Мы используем куки, чтобы сайт работал и чтобы понимать, какие страницы
              полезны. Без вашего согласия включаем только необходимые.{" "}
              <Link href="/home/privacy" className="text-brand transition-colors hover:text-white">
                Подробнее
              </Link>
            </p>
          </div>

          {/* Отказ — такая же кнопка, а не мелкая ссылка: выбор должен быть
              равноправным, иначе это не выбор. */}
          <div className="flex shrink-0 gap-2.5 sm:ml-auto">
            <button
              type="button"
              onClick={() => choose("essential")}
              className="flex-1 rounded-[10px] border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white transition-colors hover:border-white/25 sm:flex-none"
            >
              Только необходимые
            </button>
            <button
              type="button"
              onClick={() => choose("all")}
              className="flex-1 rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-5 py-2.5 text-sm font-bold whitespace-nowrap text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] sm:flex-none"
            >
              Принять все
            </button>
          </div>

          <button
            type="button"
            onClick={() => choose("essential")}
            aria-label="Закрыть"
            className="absolute top-3 right-3 text-text-dim transition-colors hover:text-white sm:hidden"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
