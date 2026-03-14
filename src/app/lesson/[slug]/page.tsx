import { notFound } from "next/navigation";
import { getAllLessons, getLessonBySlug, getLessonSlugs } from "@/lib/lessons";
import { LessonClient } from "./LessonClient";

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
  return {
    title: `${lesson.meta.title} - PyOdessey`,
    description: lesson.meta.description,
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

  return (
    <LessonClient
      lesson={lesson}
      allLessons={allLessons}
    />
  );
}
