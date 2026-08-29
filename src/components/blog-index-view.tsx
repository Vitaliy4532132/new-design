import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/v2/nav";
import { Cta } from "@/components/v2/cta";
import { Footer } from "@/components/v2/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { BlogGrid } from "@/components/blog-grid";
import { getCategoryMeta } from "@/lib/blog-meta";
import { BLOG_UI, type Locale } from "@/lib/i18n";
import type { BlogPost } from "@/lib/blog-types";
import { SetHtmlLang } from "@/components/set-html-lang";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";

export function BlogIndexView({
  posts,
  locale = "ru",
  eyebrow,
  title,
  subtitle,
  freshBadgeLabel,
}: {
  posts: BlogPost[];
  locale?: Locale;
  eyebrow: string;
  title: string;
  subtitle: string;
  freshBadgeLabel: string;
}) {
  const { blogBasePath, homeLabel, homeHref, blogLabel, readMoreLabel } = BLOG_UI[locale];
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const [featured, ...rest] = sorted;
  const meta = getCategoryMeta(featured.category, locale);

  return (
    <main>
      {locale !== "ru" && <SetHtmlLang locale={locale} />}
      <BreadcrumbJsonLd
        items={[{ label: homeLabel, href: homeHref }, { label: blogLabel, href: blogBasePath }]}
      />
      <Nav locale={locale} />
      <section className="relative overflow-hidden px-6 pt-44 pb-16 text-center">
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[760px] -translate-x-1/2 opacity-30 blur-[110px]"
          style={{
            background: "radial-gradient(circle, #0A3FFF, transparent 70%)",
          }}
        />
        <Reveal className="relative mx-auto max-w-2xl">
          <div className="mb-6 flex justify-center">
            <Breadcrumbs items={[{ label: homeLabel, href: homeHref }, { label: blogLabel }]} />
          </div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-text-muted">
            {eyebrow}
          </div>
          <h1 className="mb-6 font-display text-4xl leading-[1.1] font-medium sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-text-muted">
            {subtitle}
          </p>
        </Reveal>
      </section>

      <section className="relative bg-background px-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Link
              href={`${blogBasePath}/${featured.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface"
            >
              <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
                <div className="mb-3 flex items-center gap-3 font-mono text-xs">
                  <span
                    className="rounded-full border px-2.5 py-1"
                    style={{ borderColor: meta.color, color: meta.color }}
                  >
                    {freshBadgeLabel}
                  </span>
                  <span className="text-text-dim">{featured.readTime}</span>
                </div>
                <h2 className="mb-3 font-display text-3xl font-medium transition-colors group-hover:text-accent sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mb-6 max-w-xl text-sm leading-relaxed text-text-muted">
                  {featured.excerpt}
                </p>
                <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                  {readMoreLabel}
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-background px-6 pb-28">
        <div className="mx-auto max-w-5xl">
          <BlogGrid posts={rest} locale={locale} />
        </div>
      </section>

      <Cta locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
