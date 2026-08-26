import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS_EN, getPostBySlugEn } from "@/lib/blog-data-en";
import { buildMetadata } from "@/lib/seo";
import { BlogPostView } from "@/components/blog-post-view";

export function generateStaticParams() {
  return BLOG_POSTS_EN.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlugEn(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} — TheFurryDev`,
    description: post.excerpt,
    path: `/en/blog/${post.slug}`,
    type: "article",
    locale: "en",
  });
}

export default async function BlogPostPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlugEn(slug);
  if (!post) notFound();

  return <BlogPostView post={post} locale="en" />;
}
