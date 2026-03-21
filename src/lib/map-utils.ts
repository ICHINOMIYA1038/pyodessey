import { LessonMeta, AppProgress } from "@/types/lesson";

export function isLessonAccessible(
  _lesson: LessonMeta,
  _allLessons: LessonMeta[],
  _progress: AppProgress
): boolean {
  // All lessons are always accessible
  return true;
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
