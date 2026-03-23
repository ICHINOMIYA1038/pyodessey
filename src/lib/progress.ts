import { AppProgress, LessonProgress, WorldId } from "@/types/lesson";
import { WORLDS } from "@/lib/world-config";

const STORAGE_KEY = "pyodessey_progress";

const DEFAULT_PROGRESS: AppProgress = { lessons: {}, worldsCleared: [], badges: [], totalXp: 0 };

export function getProgress(): AppProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_PROGRESS;
  try {
    const parsed = JSON.parse(raw) as AppProgress;
    if (!parsed.worldsCleared) parsed.worldsCleared = [];
    if (!parsed.badges) parsed.badges = [];
    if (parsed.totalXp == null) parsed.totalXp = 0;
    return parsed;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function getLessonProgress(slug: string): LessonProgress | null {
  const progress = getProgress();
  return progress.lessons[slug] ?? null;
}

export function markLessonAccessed(slug: string): void {
  const progress = getProgress();
  progress.lessons[slug] = {
    ...progress.lessons[slug],
    slug,
    completed: progress.lessons[slug]?.completed ?? false,
    lastAccessedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

const XP_PER_LESSON = 10;
const XP_PER_WORLD = 50;

export function markLessonCompleted(slug: string): { worldCleared: WorldId | null; xpGained: number } {
  const progress = getProgress();
  const alreadyCompleted = progress.lessons[slug]?.completed;
  progress.lessons[slug] = {
    slug,
    completed: true,
    lastAccessedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  };

  let xpGained = 0;
  if (!alreadyCompleted) {
    xpGained += XP_PER_LESSON;
  }

  const worldCleared = checkWorldCleared(progress, slug);
  if (worldCleared && !progress.worldsCleared.includes(worldCleared)) {
    progress.worldsCleared.push(worldCleared);
    xpGained += XP_PER_WORLD;
  }

  progress.totalXp += xpGained;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return { worldCleared, xpGained };
}

export function earnBadge(badgeId: string): void {
  const progress = getProgress();
  if (!progress.badges.includes(badgeId)) {
    progress.badges.push(badgeId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
}

function checkWorldCleared(progress: AppProgress, _slug: string): WorldId | null {
  for (const world of WORLDS) {
    if (progress.worldsCleared.includes(world.id)) continue;

    const [start, end] = world.lessonRange;
    let allCompleted = true;
    for (let i = start; i <= end; i++) {
      const lessonSlug = getLessonSlugByOrder(i);
      if (lessonSlug && !progress.lessons[lessonSlug]?.completed) {
        allCompleted = false;
        break;
      }
    }
    if (allCompleted) return world.id;
  }
  return null;
}

let _lessonOrderMap: Record<number, string> | null = null;

function getLessonSlugByOrder(order: number): string | null {
  if (typeof window !== "undefined" && !_lessonOrderMap) {
    // Client-side: read from stored map
    const raw = localStorage.getItem("pyodessey_lesson_map");
    if (raw) {
      try {
        _lessonOrderMap = JSON.parse(raw);
      } catch {
        _lessonOrderMap = {};
      }
    }
  }
  return _lessonOrderMap?.[order] ?? null;
}

export function resetAllProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("pyodessey_lesson_map");
  _lessonOrderMap = null;
}

export function initLessonOrderMap(lessons: { slug: string; order: number }[]): void {
  _lessonOrderMap = {};
  for (const l of lessons) {
    _lessonOrderMap[l.order] = l.slug;
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("pyodessey_lesson_map", JSON.stringify(_lessonOrderMap));
  }
}
