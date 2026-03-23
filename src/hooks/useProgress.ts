"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProgress,
  markLessonAccessed,
  markLessonCompleted,
  initLessonOrderMap,
  resetAllProgress,
  earnBadge as earnBadgeStorage,
} from "@/lib/progress";
import { AppProgress, WorldId } from "@/types/lesson";

export function useProgress() {
  const [progress, setProgress] = useState<AppProgress>({
    lessons: {},
    worldsCleared: [],
    badges: [],
    totalXp: 0,
  });

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const initMap = useCallback(
    (lessons: { slug: string; order: number }[]) => {
      initLessonOrderMap(lessons);
    },
    []
  );

  const accessLesson = useCallback((slug: string) => {
    markLessonAccessed(slug);
    setProgress(getProgress());
  }, []);

  const completeLesson = useCallback(
    (slug: string): { worldCleared: WorldId | null; xpGained: number } => {
      const result = markLessonCompleted(slug);
      setProgress(getProgress());
      return result;
    },
    []
  );

  const earnBadge = useCallback((badgeId: string) => {
    earnBadgeStorage(badgeId);
    setProgress(getProgress());
  }, []);

  const isCompleted = useCallback(
    (slug: string) => progress.lessons[slug]?.completed ?? false,
    [progress]
  );

  const isWorldCleared = useCallback(
    (worldId: WorldId) => progress.worldsCleared.includes(worldId),
    [progress]
  );

  const resetProgress = useCallback(() => {
    resetAllProgress();
    setProgress(getProgress());
  }, []);

  const completedCount = Object.values(progress.lessons).filter(
    (l) => l.completed
  ).length;

  return {
    progress,
    initMap,
    accessLesson,
    completeLesson,
    isCompleted,
    isWorldCleared,
    completedCount,
    earnBadge,
    resetProgress,
  };
}
