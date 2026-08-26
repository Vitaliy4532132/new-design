import { BLOG_POSTS_UK } from "@/lib/blog-data-uk";
import { buildMetadata } from "@/lib/seo";
import { BlogIndexView } from "@/components/blog-index-view";

export const metadata = buildMetadata({
  title: "Блог — гайди по майнкрафт серверам — TheFurryDev",
  description:
    "Гайди з оптимізації, налаштування, побудов, плагінів і сайтів для серверів майнкрафт від студії TheFurryDev — конкретні кроки, без води.",
  path: "/uk/blog",
  locale: "uk",
  alternatePaths: { ru: "/blog", en: "/en/blog", uk: "/uk/blog" },
});

export default function BlogIndexPageUk() {
  return (
    <BlogIndexView
      posts={BLOG_POSTS_UK}
      locale="uk"
      eyebrow="блог"
      title="Гайди по майнкрафт серверам."
      subtitle={`Оптимізація, побудови, сайти і все інше — без води, з конкретними кроками. ${BLOG_POSTS_UK.length} статей і зростає.`}
      freshBadgeLabel="Свіже"
    />
  );
}
