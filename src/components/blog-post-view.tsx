import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BLOG_UI, type Locale } from "@/lib/i18n";
import type { BlogBlock, BlogPost } from "@/lib/blog-types";
import { SetHtmlLang } from "@/components/set-html-lang";
import { ArticleJsonLd } from "@/components/article-jsonld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { SITE_URL } from "@/lib/seo";

const LINK_PATTERN = /(\[[^\]]+\]\([^)]+\))/g;
const LINK_MATCH = /^\[([^\]]+)\]\(([^)]+)\)$/;

function renderInline(text: string) {
  return text.split(LINK_PATTERN).map((part, i) => {
    const match = part.match(LINK_MATCH);
    if (!match) return part;
    const [, label, href] = match;
    const linkClassName =
      "text-accent underline underline-offset-2 hover:no-underline";
    if (href.startsWith("/")) {
      return (
        <Link key={i} href={href} className={linkClassName}>
          {label}
        </Link>
      );
    }
    return (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {label}
      </a>
    );
  });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 mb-4 font-display text-2xl font-medium">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="mb-4 text-sm leading-relaxed text-text-muted">
          {renderInline(block.text)}
        </p>
      );
    case "ul":
      return (
        <ul className="mb-4 flex flex-col gap-2">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-relaxed text-text-muted"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span className="min-w-0">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-4 flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li
              key={item}
              className="flex min-w-0 gap-3 text-sm leading-relaxed text-text-muted"
            >
              <span className="font-mono text-accent">{i + 1}.</span>
              <span className="min-w-0">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
  }
}

function CtaLink({ href, label }: { href: string; label: string }) {
  const className =
    "inline-block rounded-[10px] bg-[linear-gradient(180deg,#0A3FFF_0%,#1797FF_100%)] px-6 py-3 text-sm font-bold text-white";
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {label}
    </a>
  );
}

export function BlogPostView({
  post,
  locale = "ru",
}: {
  post: BlogPost;
  locale?: Locale;
}) {
  const { blogBasePath, homeLabel, homeHref, blogLabel, postCtaNote } = BLOG_UI[locale];

  return (
    <main>
      {locale !== "ru" && <SetHtmlLang locale={locale} />}
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        url={`${SITE_URL}${blogBasePath}/${post.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { label: homeLabel, href: homeHref },
          { label: blogLabel, href: blogBasePath },
          { label: post.title, href: `${blogBasePath}/${post.slug}` },
        ]}
      />
      <SiteNav locale={locale} />
      <article className="relative px-6 pt-36 pb-20">
        <div className="mx-auto max-w-2xl">
          <Breadcrumbs
            items={[
              { label: homeLabel, href: homeHref },
              { label: blogLabel, href: blogBasePath },
              { label: post.title },
            ]}
          />
          <div className="mb-6 flex items-center gap-3 font-mono text-xs text-text-dim">
            <span className="text-accent">{post.category}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="mb-8 font-display text-4xl leading-[1.1] font-medium sm:text-5xl">
            {post.title}
          </h1>

          <div>
            {post.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-accent/30 bg-[linear-gradient(180deg,rgba(123,95,255,0.06),transparent)] p-6">
            <p className="mb-4 text-sm text-text-muted">{postCtaNote}</p>
            <CtaLink href={post.ctaHref} label={post.ctaLabel} />
          </div>
        </div>
      </article>
      <CtaSection locale={locale} />
      <SiteFooter locale={locale} />
    </main>
  );
}
