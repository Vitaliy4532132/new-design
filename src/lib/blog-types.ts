export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ol"; items: string[] }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  ctaHref: string;
  ctaLabel: string;
  blocks: BlogBlock[];
};

export function findPostBySlug(posts: BlogPost[], slug: string) {
  return posts.find((p) => p.slug === slug);
}
