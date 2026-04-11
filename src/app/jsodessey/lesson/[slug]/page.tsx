import { notFound } from "next/navigation";
import { getAllJsLessons, getJsLessonBySlug, getJsLessonSlugs } from "@/lib/js-lessons";
import { LessonClient } from "./LessonClient";

const BASE_URL =
  (process.env.SITE_URL ?? "https://nullstead.com") + "/jsodessey";

export async function generateStaticParams() {
  const slugs = getJsLessonSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getJsLessonBySlug(slug);
  if (!lesson) return { title: "Not Found" };
  const title = lesson.meta.title;
  const description = lesson.meta.description;
  return {
    title,
    description,
    openGraph: {
      title: `${title} - JSOdessey`,
      description,
    },
  };
}

export default async function JsLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getJsLessonBySlug(slug);
  if (!lesson) notFound();

  const allLessons = getAllJsLessons();

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
      name: "JSOdessey - JavaScriptプログラミング入門",
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
