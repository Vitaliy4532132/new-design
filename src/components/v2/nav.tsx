"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogOut, Menu, Package, Shield, User, Wallet, X } from "lucide-react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { DEMO_USER } from "@/lib/profile-demo";
import { NAV_V2 } from "@/lib/nav-v2";
import type { Locale } from "@/lib/i18n";
import { BASE_PATH } from "@/lib/base-path";
import { TELEGRAM_URL } from "@/lib/links";

/** Пока авторизации нет, состояние переключается вручную кнопкой «демо».
 *  При подключении бэкенда её убрать, а состояние брать из сессии. */
type AuthState = "guest" | "user" | "admin";

const AUTH_CYCLE: Record<AuthState, AuthState> = {
  guest: "user",
  user: "admin",
  admin: "guest",
};

const AUTH_LABEL: Record<AuthState, string> = {
  guest: "гость",
  user: "вошёл",
  admin: "админ",
};

const CTA_CLASS =
  "rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_6px_20px_rgba(23,151,255,0.35)] transition-transform hover:-translate-y-0.5";

export function Nav({ locale = "ru" }: { locale?: Locale }) {
  const t = NAV_V2[locale];

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [auth, setAuth] = useState<AuthState>("guest");

  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!userOpen) return;
    function onOutside(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setUserOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      window.removeEventListener("keydown", onKey);
    };
  }, [userOpen]);

  const signedIn = auth !== "guest";

  function closeMenus() {
    setUserOpen(false);
    setMobileOpen(false);
  }

  const ITEM = "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors";

  const userMenu = (
    <>
      <Link href="/home/profile" onClick={closeMenus} className={`${ITEM} text-text-muted hover:bg-white/5 hover:text-white`}>
        <User size={15} className="text-text-dim" />
        {t.profileLabel}
      </Link>

      <Link href="/home/profile" onClick={closeMenus} className={`${ITEM} text-text-muted hover:bg-white/5 hover:text-white`}>
        <Package size={15} className="text-text-dim" />
        Покупки
      </Link>

      {auth === "admin" && (
        <Link href="/home/admin" onClick={closeMenus} className={`${ITEM} text-text-muted hover:bg-white/5 hover:text-white`}>
          <Shield size={15} className="text-accent" />
          {t.adminLabel}
        </Link>
      )}

      <button
        type="button"
        onClick={() => {
          setAuth("guest");
          closeMenus();
        }}
        // Выход отделён и краснеет на наведении: действие заметно отличается
        // от остальных пунктов, промахнуться по нему не должно быть легко.
        className={`${ITEM} w-full text-left text-text-muted hover:bg-red-500/10 hover:text-red-400`}
      >
        <LogOut size={15} />
        {t.logoutLabel}
      </button>
    </>
  );

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-6">
        <Link
          href={t.homeHref}
          className="flex shrink-0 items-center gap-2.5 font-sans text-xl font-bold tracking-tight"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src={`${BASE_PATH}/logo.svg`}
            alt="TheFurryDev"
            width={44}
            height={56}
            className="h-9 w-auto sm:h-10"
            priority
          />
          <span>
            TheFurry<span className="text-accent">Dev</span>
          </span>
        </Link>

        {/* Меню */}
        <div className="hidden items-center gap-5 text-sm font-medium text-text-muted lg:flex xl:gap-7">
          <div className="group relative">
            <button className="flex items-center gap-1 py-2 transition-colors group-hover:text-white">
              {t.servicesLabel}
              <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="flex w-60 flex-col gap-1 rounded-2xl border border-white/10 bg-surface p-2 shadow-[0_16px_30px_rgba(0,0,0,0.5)]">
                {t.serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {t.links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Правая часть */}
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <LocaleSwitcher locale={locale} />

          {/* ДЕМО: переключатель состояния авторизации. Убрать вместе с
              подключением реальной сессии. */}
          <button
            type="button"
            onClick={() => setAuth((a) => AUTH_CYCLE[a])}
            title="Демо: переключить состояние входа"
            className="rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] text-text-dim transition-colors hover:text-white"
          >
            демо: {AUTH_LABEL[auth]}
          </button>

          {signedIn ? (
            <>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener" className={CTA_CLASS}>
                {t.ctaLabel}
              </a>

              <div ref={userRef} className="relative">
                <button
                  type="button"
                  onClick={() => setUserOpen((v) => !v)}
                  aria-expanded={userOpen}
                  aria-label={t.profileLabel}
                  className={`flex items-center gap-1.5 rounded-full p-0.5 pr-2 ring-1 transition-colors ${
                    userOpen ? "bg-white/5 ring-accent/50" : "ring-white/10 hover:bg-white/5 hover:ring-white/25"
                  }`}
                >
                  <span className="relative flex size-9 items-center justify-center rounded-full bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] font-sans text-sm font-bold text-white">
                    {DEMO_USER.name.charAt(0)}
                    {/* Точка статуса: маленькая деталь, по которой аватар
                        читается как «вы вошли», а не просто как картинка. */}
                    <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-green-400 ring-2 ring-background" />
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-text-dim transition-transform duration-200 ${userOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {userOpen && (
                  <div className="absolute top-full right-0 mt-3 w-64 origin-top-right animate-menu-in overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_24px_50px_rgba(0,0,0,0.55)]">
                    {/* Кто вошёл */}
                    <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] font-sans text-sm font-bold text-white">
                        {DEMO_USER.name.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{DEMO_USER.name}</div>
                        <div className="truncate font-mono text-[11px] text-text-dim">@{DEMO_USER.username}</div>
                      </div>
                      {auth === "admin" && (
                        <span className="ml-auto shrink-0 rounded-md border border-accent/40 px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent uppercase">
                          админ
                        </span>
                      )}
                    </div>

                    {/* Баланс на виду: чаще всего в меню заходят из-за него */}
                    <Link
                      href="/home/profile"
                      onClick={closeMenus}
                      className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5 transition-colors hover:bg-white/5"
                    >
                      <Wallet size={15} className="text-accent" />
                      <span className="text-sm text-text-muted">Баланс</span>
                      <span className="ml-auto font-display text-base font-medium">{DEMO_USER.balance}</span>
                    </Link>

                    <div className="flex flex-col gap-0.5 p-2">{userMenu}</div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/home/auth/login"
                className="text-sm font-medium text-text-muted transition-colors hover:text-white"
              >
                {t.loginLabel}
              </Link>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener" className={CTA_CLASS}>
                {t.ctaLabel}
              </a>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-background/95 px-5 pb-8 backdrop-blur-md sm:px-6 lg:hidden">
          <div className="flex flex-col gap-1 pt-4">
            <div className="mb-1 px-3 font-mono text-[11px] tracking-widest text-text-dim uppercase">
              {t.servicesLabel}
            </div>
            {t.serviceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <div className="my-3 h-px bg-white/10" />

            {t.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            {signedIn && (
              <>
                <div className="my-3 h-px bg-white/10" />
                {userMenu}
              </>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
            <LocaleSwitcher locale={locale} />

            <button
              type="button"
              onClick={() => setAuth((a) => AUTH_CYCLE[a])}
              className="rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] text-text-dim"
            >
              демо: {AUTH_LABEL[auth]}
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {!signedIn && (
              <Link
                href="/home/auth/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-[10px] border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-medium text-white"
              >
                {t.loginLabel} / {t.registerLabel}
              </Link>
            )}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener"
              onClick={() => setMobileOpen(false)}
              className={`${CTA_CLASS} text-center`}
            >
              {t.ctaLabel}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
