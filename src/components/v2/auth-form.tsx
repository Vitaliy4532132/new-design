"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Mail } from "lucide-react";
import { Backdrop } from "@/components/v2/backdrop";
import { useToast } from "@/components/v2/toast";
import { BASE_PATH } from "@/lib/base-path";

export type AuthMode = "login" | "register" | "reset";

const COPY: Record<AuthMode, { title: string; lead: string; submit: string }> = {
  login: {
    title: "С возвращением",
    lead: "Войдите, чтобы видеть заказы, покупки и лицензии.",
    submit: "Войти",
  },
  register: {
    title: "Создать аккаунт",
    lead: "Займёт минуту. После регистрации — доступ к заказам и лицензиям.",
    submit: "Зарегистрироваться",
  },
  reset: {
    title: "Восстановление пароля",
    lead: "Пришлём ссылку для смены пароля на указанную почту.",
    submit: "Отправить ссылку",
  },
};

const INPUT =
  "w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-text-dim focus:border-accent";
const LABEL = "mb-2 block font-mono text-[11px] tracking-widest text-text-dim uppercase";

// Знаки Discord и Google не перерисовываем — берём подпись и фирменный цвет
// тонкой полосой, этого достаточно, чтобы кнопку узнали.
const OAUTH = [
  { name: "Discord", color: "#5865F2" },
  { name: "Google", color: "#EA4335" },
];

export function AuthForm({ mode }: { mode: AuthMode }) {
  const t = COPY[mode];
  const toast = useToast();
  const [shown, setShown] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Бэкенда нет: форма никуда не отправляется, показываем только отклик.
    toast(
      "info",
      "Здесь пока нечему сработать",
      "Форма подключится вместе с авторизацией на боевом сайте.",
    );
  }

  return (
    <main className="relative min-h-dvh lg:grid lg:grid-cols-2">
      {/* Форма */}
      <div className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-5 py-16 sm:px-8 lg:min-h-0">
        <Backdrop variant="grid" />
        <Backdrop variant="glow" className="opacity-25" />

        <div className="relative mx-auto w-full max-w-sm">
          <Link
            href="/home"
            className="mb-10 flex items-center gap-2.5 font-sans text-xl font-bold tracking-tight"
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

          <h1 className="mb-2 font-display text-2xl font-medium sm:text-3xl">{t.title}</h1>
          <p className="mb-8 text-sm leading-relaxed text-text-muted">{t.lead}</p>

          {mode !== "reset" && (
            <>
              <div className="mb-6 flex flex-col gap-2.5">
                {OAUTH.map((o) => (
                  <button
                    key={o.name}
                    type="button"
                    onClick={() =>
                      toast("info", `Вход через ${o.name}`, "Подключится вместе с авторизацией.")
                    }
                    className="flex items-center justify-center gap-3 rounded-[10px] border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/25"
                  >
                    <span className="size-2 rounded-full" style={{ background: o.color }} />
                    Продолжить с {o.name}
                  </button>
                ))}
              </div>

              <div className="mb-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-white/10" />
                <span className="font-mono text-[11px] text-text-dim">или почтой</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
            </>
          )}

          <form onSubmit={submit}>
            {mode === "register" && (
              <div className="mb-5">
                <label className={LABEL} htmlFor="nickname">
                  Никнейм
                </label>
                <input id="nickname" name="nickname" required placeholder="SolarPlayer" className={INPUT} />
              </div>
            )}

            <div className="mb-5">
              <label className={LABEL} htmlFor="email">
                Почта
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={`${INPUT} pr-11`}
                />
                <Mail size={16} className="absolute top-1/2 right-4 -translate-y-1/2 text-text-dim" />
              </div>
            </div>

            {mode !== "reset" && (
              <div className="mb-5">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <label className={`${LABEL} mb-0`} htmlFor="password">
                    Пароль
                  </label>
                  {mode === "login" && (
                    <Link href="/home/auth/reset" className="text-xs text-accent transition-colors hover:text-white">
                      Забыли?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={shown ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="••••••••"
                    className={`${INPUT} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShown((v) => !v)}
                    aria-label={shown ? "Скрыть пароль" : "Показать пароль"}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-text-dim transition-colors hover:text-white"
                  >
                    {shown ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {mode === "register" && (
                  <p className="mt-2 text-xs text-text-dim">Минимум 8 символов.</p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-full rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5"
            >
              {t.submit}
            </button>
          </form>

          {mode === "register" && (
            <p className="mt-5 text-xs leading-relaxed text-text-dim">
              Регистрируясь, вы соглашаетесь с{" "}
              <Link href="/home/terms" className="text-accent transition-colors hover:text-white">
                условиями
              </Link>{" "}
              и{" "}
              <Link href="/home/privacy" className="text-accent transition-colors hover:text-white">
                политикой конфиденциальности
              </Link>
              .
            </p>
          )}

          <div className="mt-8 border-t border-white/10 pt-6 text-sm text-text-muted">
            {mode === "login" && (
              <>
                Нет аккаунта?{" "}
                <Link href="/home/auth/register" className="font-medium text-accent transition-colors hover:text-white">
                  Зарегистрироваться
                </Link>
              </>
            )}
            {mode === "register" && (
              <>
                Уже есть аккаунт?{" "}
                <Link href="/home/auth/login" className="font-medium text-accent transition-colors hover:text-white">
                  Войти
                </Link>
              </>
            )}
            {mode === "reset" && (
              <Link
                href="/home/auth/login"
                className="inline-flex items-center gap-2 font-medium text-accent transition-colors hover:text-white"
              >
                <ArrowLeft size={14} />
                Вернуться ко входу
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Кадр рядом — только на широких экранах, на телефоне он съел бы экран */}
      <div className="relative hidden lg:block">
        <Image
          src={`${BASE_PATH}/work/sakura-island-1.png`}
          alt="Сакура-остров — работа студии"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

        <div className="absolute right-0 bottom-0 left-0 p-10">
          <div className="mb-2 font-mono text-[10px] tracking-widest text-accent uppercase">из портфолио</div>
          <h2 className="mb-2 font-display text-2xl font-medium">Сакура-остров</h2>
          <p className="max-w-sm text-sm leading-relaxed text-text-muted">
            Спавн в японском стиле — один из проектов, собранных с нуля под конкретный сервер.
          </p>
        </div>
      </div>
    </main>
  );
}
