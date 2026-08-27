import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Nav } from "@/components/v2/nav";
import { ProductDetailView } from "@/components/v2/product-detail";
import { ProductAbout, ProductDependencies } from "@/components/v2/product-info";
import { ProductChangelog } from "@/components/v2/product-changelog";
import { ProductReviews } from "@/components/v2/product-reviews";
import { Cta } from "@/components/v2/cta";
import { Footer } from "@/components/v2/footer";
import { HOME_COPY } from "@/lib/home-copy";
import { PRODUCT_DETAILS } from "@/lib/product-data";
import { BASE_PATH } from "@/lib/base-path";

const LOCALE = "ru" as const;

export function generateStaticParams() {
  return Object.keys(PRODUCT_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = HOME_COPY[LOCALE].products.items.find((p) => p.slug === slug);

  return {
    ...buildMetadata({
      title: product ? `${product.title} (черновик) — TheFurryDev` : "Товар — TheFurryDev",
      description: product?.description ?? "Черновая страница товара.",
      path: `/home/shop/${slug}`,
    }),
    robots: { index: false, follow: false },
  };
}

export default async function ProductDraftPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const products = HOME_COPY[LOCALE].products;
  const product = products.items.find((p) => p.slug === slug);
  const detail = PRODUCT_DETAILS[slug];

  if (!product || !detail) notFound();

  const reviewCount = HOME_COPY[LOCALE].testimonials.reviews.filter((r) =>
    detail.reviewAuthors.includes(r.name),
  ).length;

  const related = products.items.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main>
      <Nav locale={LOCALE} />

      <ProductDetailView
        product={product}
        detail={detail}
        typeLabel={products.typeLabels[product.kind]}
        buyLabel={products.buyLabel}
        reviewCount={reviewCount}
      />

      <ProductAbout paragraphs={detail.about} />

      {/* Характеристики */}
      <section className="border-t border-white/10 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">характеристики</div>
          <h2 className="mb-10 font-display text-3xl font-medium sm:text-4xl">Что внутри.</h2>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            {detail.specs.map((s, i) => (
              <div
                key={s.label}
                className={`flex justify-between gap-6 px-5 py-4 text-sm sm:px-6 ${
                  i % 2 === 0 ? "bg-surface" : "bg-background"
                }`}
              >
                <span className="text-text-muted">{s.label}</span>
                <span className="text-right font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductDependencies dependencies={detail.dependencies} support={detail.support} />

      <ProductChangelog entries={detail.changelog} />

      <ProductReviews authors={detail.reviewAuthors} locale={LOCALE} />

      {/* Похожие товары */}
      <section className="border-t border-white/10 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">ещё в магазине</div>
          <h2 className="mb-10 font-display text-3xl font-medium sm:text-4xl">Смотрят вместе с этим.</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((p) => {
              const d = PRODUCT_DETAILS[p.slug];
              return (
                <Link
                  key={p.slug}
                  href={`/home/shop/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors hover:border-accent/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={`${BASE_PATH}${d.images[0]}`}
                      alt={p.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 font-mono text-[10px] tracking-widest text-accent uppercase">
                      {products.typeLabels[p.kind]}
                    </div>
                    <h3 className="mb-2 font-display text-base font-medium">{p.title}</h3>
                    <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="font-display text-base font-medium">{p.price}</span>
                      <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                        <ShoppingBag size={14} />
                        {products.buyLabel}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8">
            <Link
              href="/home/shop"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
            >
              Весь магазин
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Cta locale={LOCALE} />
      <Footer locale={LOCALE} />
    </main>
  );
}
