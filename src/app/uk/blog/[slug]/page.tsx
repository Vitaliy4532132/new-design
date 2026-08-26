import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS_UK, getPostBySlugUk } from "@/lib/blog-data-uk";
import { buildMetadata } from "@/lib/seo";
import { BlogPostView } from "@/components/blog-post-view";

export function generateStaticParams() {
  return BLOG_POSTS_UK.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlugUk(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} — TheFurryDev`,
    description: post.excerpt,
    path: `/uk/blog/${post.slug}`,
    type: "article",
    locale: "uk",
  });
}

export default async function BlogPostPageUk({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlugUk(slug);
  if (!post) notFound();

  return <BlogPostView post={post} locale="uk" />;
}
