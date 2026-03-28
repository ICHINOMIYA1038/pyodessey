import { Lesson, LessonMeta, LessonChallenge } from "@/types/lesson";
import lessonsMeta from "./lessons-meta.json";

function parseMeta(data: Record<string, unknown>): LessonMeta {
  const meta: LessonMeta = {
    title: data.title as string,
    slug: data.slug as string,
    order: data.order as number,
    description: data.description as string,
    world: data.world as LessonMeta["world"],
  };
  if (data.challenge) {
    meta.challenge = data.challenge as LessonChallenge;
  }
  return meta;
}

export function getLessonSlugs(): string[] {
  return (lessonsMeta as Record<string, unknown>[]).map(
    (l) => l.slug as string
  );
}

export function getAllLessons(): LessonMeta[] {
  return (lessonsMeta as Record<string, unknown>[])
    .map((l) => parseMeta(l))
    .sort((a, b) => a.order - b.order);
}

export function getLessonBySlug(slug: string): Lesson | null {
  // Dynamic import of individual lesson content file
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const data = require(`./lessons-content/${slug}.json`) as {
      meta: Record<string, unknown>;
      content: string;
    };
    return { meta: parseMeta(data.meta), content: data.content };
  } catch {
    return null;
  }
}
