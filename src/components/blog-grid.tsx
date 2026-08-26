"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getCategoryMeta } from "@/lib/blog-meta";
import { BLOG_UI, type Locale } from "@/lib/i18n";
import type { BlogPost } from "@/lib/blog-types";

export function BlogGrid({
  posts,
  locale = "ru",
}: {
  posts: BlogPost[];
  locale?: Locale;
}) {
  const { blogBasePath, allCategoriesLabel, readLabel } = BLOG_UI[locale];
  const categories = useMemo(
    () => [allCategoriesLabel, ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts, allCategoriesLabel],
  );
  const [active, setActive] = useState(allCategoriesLabel);
  const filtered =
    active === allCategoriesLabel ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
              active === cat
                ? "border-accent bg-accent/10 text-accent"
                : "border-white/10 text-text-muted hover:border-white/25 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, i) => {
          const meta = getCategoryMeta(post.category, locale);
          return (
            <Reveal key={post.slug} delay={i * 70}>
              <Link
                href={`${blogBasePath}/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors hover:border-white/20"
              >
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3 font-mono text-[11px] text-text-dim">
                    <span style={{ color: meta.color }}>{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mb-2 font-display text-lg font-medium transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
                    {post.excerpt}
                  </p>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                    {readLabel}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
