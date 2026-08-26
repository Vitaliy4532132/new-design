import { BLOG_POSTS_EN } from "@/lib/blog-data-en";
import { buildMetadata } from "@/lib/seo";
import { BlogIndexView } from "@/components/blog-index-view";

export const metadata = buildMetadata({
  title: "Blog — Minecraft Server Development Guides — TheFurryDev",
  description:
    "Guides on optimization, server setup, plugins, builds and websites for Minecraft servers from the TheFurryDev studio — practical steps, no fluff.",
  path: "/en/blog",
  locale: "en",
  alternatePaths: { ru: "/blog", en: "/en/blog", uk: "/uk/blog" },
});

export default function BlogIndexPageEn() {
  return (
    <BlogIndexView
      posts={BLOG_POSTS_EN}
      locale="en"
      eyebrow="blog"
      title="Minecraft server development guides."
      subtitle={`Optimization, builds, websites and everything else — practical steps, no fluff. ${BLOG_POSTS_EN.length} articles and growing.`}
      freshBadgeLabel="Latest"
    />
  );
}
