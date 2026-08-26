import { BLOG_POSTS } from "@/lib/blog-data";
import { buildMetadata } from "@/lib/seo";
import { BlogIndexView } from "@/components/blog-index-view";

export const metadata = buildMetadata({
  title: "Блог — гайды по майнкрафт серверам — TheFurryDev",
  description:
    "Гайды по оптимизации, настройке, постройкам, плагинам и сайтам для серверов майнкрафт от студии TheFurryDev — конкретные шаги, без воды.",
  path: "/blog",
  alternatePaths: { ru: "/blog", en: "/en/blog", uk: "/uk/blog" },
});

export default function BlogIndexPage() {
  return (
    <BlogIndexView
      posts={BLOG_POSTS}
      locale="ru"
      eyebrow="блог"
      title="Гайды по майнкрафт серверам."
      subtitle={`Оптимизация, постройки, сайты и всё остальное — без воды, с конкретными шагами. ${BLOG_POSTS.length} статей и растёт.`}
      freshBadgeLabel="Свежее"
    />
  );
}
