"use client";

import { LessonMeta, AppProgress } from "@/types/lesson";
import { WorldConfig } from "@/lib/world-config";
import { isLessonAccessible } from "@/lib/map-utils";
import { LessonNode } from "./LessonNode";

interface WorldSectionProps {
  world: WorldConfig;
  lessons: LessonMeta[];
  progress: AppProgress;
  allLessons: LessonMeta[];
}

function getStatus(
  lesson: LessonMeta,
  allLessons: LessonMeta[],
  progress: AppProgress
): "completed" | "current" | "locked" {
  if (progress.lessons[lesson.slug]?.completed) return "completed";
  if (isLessonAccessible(lesson, allLessons, progress)) return "current";
  return "locked";
}

export function WorldSection({
  world,
  lessons,
  progress,
  allLessons,
}: WorldSectionProps) {
  const completedInWorld = lessons.filter(
    (l) => progress.lessons[l.slug]?.completed
  ).length;
  const allCleared = completedInWorld === lessons.length;

  return (
    <section>
      {/* World header */}
      <div className="mb-3 flex items-center gap-3">
        <span className="text-2xl">{world.emoji}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-bold"
              style={{ color: world.colors.text }}
            >
              {world.name}
            </span>
            {allCleared && (
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{
                  background: `${world.colors.node}20`,
                  color: world.colors.node,
                }}
              >
                CLEARED
              </span>
            )}
          </div>
          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            {completedInWorld}/{lessons.length}
          </span>
        </div>
      </div>

      {/* Lesson list */}
      <div className="flex flex-col gap-2">
        {lessons.map((lesson) => (
          <LessonNode
            key={lesson.slug}
            lesson={lesson}
            status={getStatus(lesson, allLessons, progress)}
            accent={world.colors}
            isMilestone={lesson.order === world.lessonRange[1]}
          />
        ))}
      </div>
    </section>
  );
}
