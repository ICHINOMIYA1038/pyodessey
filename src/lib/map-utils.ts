import { LessonMeta, AppProgress } from "@/types/lesson";

export function isLessonAccessible(
  lesson: LessonMeta,
  allLessons: LessonMeta[],
  progress: AppProgress
): boolean {
  // First lesson is always accessible
  if (lesson.order === 1) return true;

  // Accessible if the previous lesson (by order) is completed
  const prev = allLessons.find((l) => l.order === lesson.order - 1);
  if (!prev) return true;
  return progress.lessons[prev.slug]?.completed ?? false;
}

export function getCurrentLesson(
  allLessons: LessonMeta[],
  progress: AppProgress
): LessonMeta | null {
  const sorted = [...allLessons].sort((a, b) => a.order - b.order);
  for (const lesson of sorted) {
    const completed = progress.lessons[lesson.slug]?.completed ?? false;
    if (!completed && isLessonAccessible(lesson, allLessons, progress)) {
      return lesson;
    }
  }
  return null;
}
