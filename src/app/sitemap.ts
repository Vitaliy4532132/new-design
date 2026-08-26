import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BLOG_POSTS_EN } from "@/lib/blog-data-en";
import { BLOG_POSTS_UK } from "@/lib/blog-data-uk";
import { SITE_URL } from "@/lib/seo";

const SERVICE_ROUTES = [
  "/builds",
  "/sites",
  "/server-setup",
  "/plugins",
  "/map-building",
];

function localeStaticEntries(prefix: string) {
  return [
    {
      url: `${SITE_URL}${prefix || "/"}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...SERVICE_ROUTES.map((route) => ({
      url: `${SITE_URL}${prefix}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const ruEntries = [
    ...localeStaticEntries(""),
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const enEntries = [
    ...localeStaticEntries("/en"),
    {
      url: `${SITE_URL}/en/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...BLOG_POSTS_EN.map((post) => ({
      url: `${SITE_URL}/en/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const ukEntries = [
    ...localeStaticEntries("/uk"),
    {
      url: `${SITE_URL}/uk/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...BLOG_POSTS_UK.map((post) => ({
      url: `${SITE_URL}/uk/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...ruEntries, ...enEntries, ...ukEntries];
}
