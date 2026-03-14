import { Lesson, LessonMeta, LessonChallenge } from "@/types/lesson";
import lessonsData from "./lessons-data.json";

interface RawLesson {
  meta: Record<string, unknown>;
  content: string;
}

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
  return (lessonsData as RawLesson[]).map((l) => l.meta.slug as string);
}

export function getAllLessons(): LessonMeta[] {
  return (lessonsData as RawLesson[])
    .map((l) => parseMeta(l.meta))
    .sort((a, b) => a.order - b.order);
}

export function getLessonBySlug(slug: string): Lesson | null {
  const found = (lessonsData as RawLesson[]).find((l) => l.meta.slug === slug);
  if (!found) return null;
  return { meta: parseMeta(found.meta), content: found.content };
}
