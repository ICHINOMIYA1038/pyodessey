"use client";

import { useEffect, useRef, useCallback } from "react";
import { LessonMeta } from "@/types/lesson";
import { WORLDS } from "@/lib/world-config";
import { useProgress } from "@/hooks/useProgress";
import { MapHeader } from "./MapHeader";
import { MapSidebar } from "./MapSidebar";
import { WorldSection } from "./WorldSection";

interface AdventureMapProps {
  lessons: LessonMeta[];
}

export function AdventureMap({ lessons }: AdventureMapProps) {
  const { progress, initMap, completedCount, resetProgress } = useProgress();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initMap(lessons);
  }, [lessons, initMap]);

  // Scroll to current lesson
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const currentEl = container.querySelector('[data-current="true"]');
    if (currentEl) {
      setTimeout(() => {
        currentEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [progress]);

  const handleMapKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      e.preventDefault();
      const container = scrollRef.current;
      if (!container) return;
      const buttons = Array.from(
        container.querySelectorAll<HTMLButtonElement>(
          'button[data-lesson-order]:not([aria-disabled="true"])'
        )
      ).sort(
        (a, b) =>
          Number(a.dataset.lessonOrder) - Number(b.dataset.lessonOrder)
      );
      if (buttons.length === 0) return;
      const currentIdx = buttons.findIndex(
        (btn) => btn === document.activeElement
      );
      let nextIdx: number;
      if (e.key === "ArrowDown") {
        nextIdx = currentIdx < buttons.length - 1 ? currentIdx + 1 : 0;
      } else {
        nextIdx = currentIdx > 0 ? currentIdx - 1 : buttons.length - 1;
      }
      buttons[nextIdx].focus();
      buttons[nextIdx].scrollIntoView({ behavior: "smooth", block: "center" });
    },
    []
  );

  return (
    <div
      className="flex h-screen flex-col"
      style={{ background: "var(--surface-0)" }}
      onKeyDown={handleMapKeyDown}
    >
      <MapHeader completedCount={completedCount} totalCount={lessons.length} onReset={resetProgress} />
      <div className="flex flex-1 overflow-hidden">
        <MapSidebar lessons={lessons} progress={progress} />
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto"
        >
          <div className="mx-auto w-full max-w-md px-4 py-8 flex flex-col gap-10">
            {WORLDS.map((world) => {
              const worldLessons = lessons.filter((l) => l.world === world.id);
              return (
                <WorldSection
                  key={world.id}
                  world={world}
                  lessons={worldLessons}
                  progress={progress}
                  allLessons={lessons}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
