import { notFound } from "next/navigation";
import { getAllLessons, getLessonBySlug, getLessonSlugs } from "@/lib/lessons";
import { LessonClient } from "./LessonClient";

const BASE_URL =
  process.env.SITE_URL ?? "https://ichinomiya1038.github.io/pyodessey";

export async function generateStaticParams() {
  const slugs = getLessonSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return { title: "Not Found" };
  const title = lesson.meta.title;
  const description = lesson.meta.description;
  return {
    title,
    description,
    openGraph: {
      title: `${title} - PyOdessey`,
      description,
    },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const allLessons = getAllLessons();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.meta.title,
    description: lesson.meta.description,
    educationalLevel: "Beginner",
    learningResourceType: "lesson",
    inLanguage: "ja",
    isAccessibleForFree: true,
    url: `${BASE_URL}/lesson/${slug}`,
    isPartOf: {
      "@type": "Course",
      name: "PyOdessey - Pythonプログラミング入門",
      url: BASE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LessonClient
        lesson={lesson}
        allLessons={allLessons}
      />
    </>
  );
}
