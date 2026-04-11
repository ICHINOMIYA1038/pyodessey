"use client";

import Link from "next/link";
import { LessonMeta, AppProgress } from "@/types/lesson";
import { WORLDS } from "@/lib/world-config";
import { Check, ChevronRight } from "lucide-react";
import { useAppConfig } from "@/contexts/AppConfigContext";

interface MapSidebarProps {
  lessons: LessonMeta[];
  progress: AppProgress;
}

export function MapSidebar({ lessons, progress }: MapSidebarProps) {
  const { prefix } = useAppConfig();
  return (
    <aside
      className="hidden lg:flex h-full w-64 flex-col overflow-y-auto border-r"
      style={{
        background: "var(--surface-1)",
        borderColor: "var(--border-default)",
      }}
    >
      {/* Header */}
      <div className="px-4 py-4 border-b" style={{ borderColor: "var(--border-default)" }}>
        <h2 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
          ぼうけんの進捗
        </h2>
      </div>

      {/* World sections */}
      <div className="flex-1 overflow-y-auto py-2">
        {WORLDS.map((world) => {
          const worldLessons = lessons.filter((l) => l.world === world.id);
          const completedCount = worldLessons.filter(
            (l) => progress.lessons[l.slug]?.completed
          ).length;

          return (
            <div key={world.id} className="mb-1">
              {/* World header */}
              <div className="flex items-center gap-2 px-4 py-2">
                <span className="text-base">{world.emoji}</span>
                <span className="flex-1 text-xs font-bold" style={{ color: world.colors.text }}>
                  {world.name}
                </span>
                <span className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
                  {completedCount}/{worldLessons.length}
                </span>
              </div>

              {/* Lesson list */}
              {worldLessons.map((lesson) => {
                const completed = !!progress.lessons[lesson.slug]?.completed;

                return (
                  <Link
                    key={lesson.slug}
                    href={`${prefix}/lesson/${lesson.slug}`}
                    className="flex items-center gap-2 px-4 py-1.5 mx-2 rounded-lg text-xs transition-colors hover:bg-[var(--surface-3)]"
                    style={{
                      background: !completed ? `${world.colors.node}10` : "transparent",
                    }}
                  >
                    {/* Status icon */}
                    {completed ? (
                      <Check className="h-3.5 w-3.5 shrink-0" style={{ color: world.colors.node }} strokeWidth={3} />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0" style={{ color: world.colors.node }} />
                    )}
                    {/* Title */}
                    <span
                      className="truncate"
                      style={{
                        color: completed ? "var(--text-secondary)" : "var(--text-primary)",
                        fontWeight: completed ? 400 : 600,
                      }}
                    >
                      {lesson.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Overall progress at bottom */}
      <div className="border-t px-4 py-3" style={{ borderColor: "var(--border-default)" }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium" style={{ color: "var(--text-secondary)" }}>全体の進捗</span>
          <span className="text-[11px] font-bold" style={{ color: "var(--text-primary)" }}>
            {lessons.filter(l => progress.lessons[l.slug]?.completed).length}/{lessons.length}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--surface-3)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${lessons.length > 0 ? (lessons.filter(l => progress.lessons[l.slug]?.completed).length / lessons.length) * 100 : 0}%`,
              background: "var(--brand-purple)",
            }}
          />
        </div>
      </div>
    </aside>
  );
}
