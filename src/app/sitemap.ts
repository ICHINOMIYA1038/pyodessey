import type { MetadataRoute } from "next";
import { getAllLessons } from "@/lib/lessons";

const BASE_URL =
  process.env.SITE_URL ?? "https://nullstead.com/pyodessey";

export default function sitemap(): MetadataRoute.Sitemap {
  const lessons = getAllLessons();

  const lessonEntries: MetadataRoute.Sitemap = lessons.map((lesson) => ({
    url: `${BASE_URL}/lesson/${lesson.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/sandbox`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...lessonEntries,
  ];
}
