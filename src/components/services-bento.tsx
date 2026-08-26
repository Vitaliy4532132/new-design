"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Boxes, Globe, Puzzle, Server, Mountain } from "lucide-react";
import { HOME_COPY } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const ICONS = [Boxes, Globe, Server, Puzzle, Mountain];

type Service = {
  title: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  featured?: boolean;
};

function ServiceCard({
  service,
  moreLabel,
}: {
  service: Service;
  moreLabel: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const Icon = service.icon;

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <Link
      href={service.href}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface p-7 transition-colors duration-300 hover:border-white/20 ${
        service.featured ? "sm:col-span-2" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--x) var(--y), rgba(23,151,255,0.12), transparent 70%)",
        }}
      />
      <div className="relative flex flex-1 flex-col">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Icon size={20} className="text-accent" />
        </div>
        <h3 className="mb-2 font-display text-xl font-medium">
          {service.title}
        </h3>
        <p className="mb-5 max-w-sm text-sm leading-relaxed text-text-muted">
          {service.description}
        </p>
        <div className="mb-5 flex flex-1 flex-wrap items-start gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
          {moreLabel}
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

export function ServicesBento({ locale = "ru" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].services;
  const services: Service[] = t.items.map((item, i) => ({
    ...item,
    icon: ICONS[i],
    featured: i === 0,
  }));

  return (
    <section id="services" className="relative bg-background px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-lg">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
            {t.eyebrow}
          </div>
          <h2 className="font-display text-4xl font-medium sm:text-[44px]">
            {t.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} moreLabel={t.moreLabel} />
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-text-muted">
          {t.note}
        </p>
      </div>
    </section>
  );
}
