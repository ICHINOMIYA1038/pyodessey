"use client";

import { useRouter } from "next/navigation";
import { Check, Crown } from "lucide-react";
import { LessonMeta } from "@/types/lesson";
import { AccentStyle } from "@/lib/world-config";
import { useAppConfig } from "@/contexts/AppConfigContext";

interface LessonNodeProps {
  lesson: LessonMeta;
  status: "completed" | "current";
  accent: AccentStyle;
  isMilestone?: boolean;
}

export function LessonNode({ lesson, status, accent, isMilestone }: LessonNodeProps) {
  const router = useRouter();
  const { prefix } = useAppConfig();

  const handleClick = () => {
    router.push(`${prefix}/lesson/${lesson.slug}`);
  };

  const isCurrent = status === "current";
  const isCompleted = status === "completed";

  return (
    <button
      onClick={handleClick}
      data-lesson-order={lesson.order}
      data-current={isCurrent ? "true" : undefined}
      tabIndex={0}
      aria-label={`${lesson.title} - ${isCompleted ? "クリア済み" : "未クリア"}`}
      className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 cursor-pointer"
      style={{
        background: isCurrent ? `${accent.node}08` : "var(--surface-1)",
        border: isCurrent
          ? `1px solid ${accent.node}30`
          : "1px solid var(--border-muted)",
        ...(isCurrent && {
          boxShadow: `0 0 12px ${accent.glow}`,
        }),
        ...(isCompleted && {
          borderLeft: `3px solid ${accent.node}`,
        }),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = isCurrent ? `${accent.node}60` : "var(--border-default)";
        e.currentTarget.style.transform = "translateY(-1px)";
        if (!isCurrent) {
          e.currentTarget.style.background = "var(--surface-2)";
          e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isCurrent ? `${accent.node}30` : "var(--border-muted)";
        e.currentTarget.style.transform = "translateY(0)";
        if (!isCurrent) {
          e.currentTarget.style.background = "var(--surface-1)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {/* Status icon */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{
          background: isCompleted
            ? accent.node
            : `${accent.node}20`,
        }}
      >
        {isCompleted && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
        {isCurrent && (
          <span className="text-sm font-bold" style={{ color: accent.node }}>
            {lesson.order}
          </span>
        )}
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <span
          className={`block truncate ${isCurrent ? "text-sm font-bold" : "text-sm"}`}
          style={{
            color: isCompleted
              ? "var(--text-secondary)"
              : isCurrent
              ? "var(--text-primary)"
              : "var(--text-secondary)",
          }}
        >
          {lesson.title}
        </span>
      </div>

      {/* Milestone indicator */}
      {isMilestone && (
        <Crown
          className="h-4 w-4 shrink-0"
          style={{ color: isCompleted ? accent.node : "#fbbf24" }}
        />
      )}
    </button>
  );
}
