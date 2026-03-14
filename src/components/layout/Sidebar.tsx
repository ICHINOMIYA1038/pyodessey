"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Search } from "lucide-react";
import { ProgressBadge } from "@/components/common/ProgressBadge";
import { useProgress } from "@/hooks/useProgress";
import { LessonMeta } from "@/types/lesson";
import { WORLDS } from "@/lib/world-config";

interface SidebarProps {
  lessons: LessonMeta[];
}

export function Sidebar({ lessons }: SidebarProps) {
  const pathname = usePathname();
  const { isCompleted } = useProgress();
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  // Ctrl/Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isLessonUnlocked = (lesson: LessonMeta) => {
    if (lesson.order === 1) return true;
    const prev = lessons.find((l) => l.order === lesson.order - 1);
    return prev ? isCompleted(prev.slug) : false;
  };

  const normalizedQuery = query.toLowerCase().trim();
  const filteredLessons = normalizedQuery
    ? lessons.filter((l) => l.title.toLowerCase().includes(normalizedQuery))
    : lessons;

  return (
    <nav className="w-56 shrink-0 overflow-y-auto" style={{ background: 'var(--surface-1)', borderRight: '1px solid var(--border-default)' }}>
      <div className="p-3">
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="レッスンを検索… (⌘K)"
            className="w-full py-1.5 pl-8 pr-3 text-xs focus:outline-none"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}
          />
        </div>
        {WORLDS.map((world) => {
          const worldLessons = filteredLessons.filter(
            (l) => l.order >= world.lessonRange[0] && l.order <= world.lessonRange[1]
          );
          if (worldLessons.length === 0) return null;

          return (
            <div key={world.id} className="mb-4">
              <h2 className="mb-1.5 px-2 text-xs font-semibold tracking-wider" style={{ color: world.colors.node }}>
                {world.emoji} {world.name}
              </h2>
              <ul className="space-y-0.5">
                {worldLessons.map((lesson) => {
                  const isActive = pathname === `/lesson/${lesson.slug}`;
                  const unlocked = isLessonUnlocked(lesson);
                  const completed = isCompleted(lesson.slug);

                  return (
                    <li key={lesson.slug}>
                      {unlocked || completed ? (
                        <Link
                          href={`/lesson/${lesson.slug}`}
                          className="flex items-center gap-2 px-2 py-1.5 text-sm transition-colors"
                          style={{
                            borderRadius: 'var(--radius-sm)',
                            color: isActive ? 'var(--text-primary)' : completed ? 'var(--text-secondary)' : 'var(--text-secondary)',
                            background: isActive ? `${world.colors.node}15` : 'transparent',
                            borderLeft: isActive ? `2px solid ${world.colors.node}` : '2px solid transparent',
                          }}
                          onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = 'var(--surface-3)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
                          onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = completed ? 'var(--text-secondary)' : 'var(--text-secondary)'; } }}
                        >
                          <ProgressBadge completed={completed} />
                          <span className="truncate">{lesson.title}</span>
                        </Link>
                      ) : (
                        <span className="flex items-center gap-2 px-2 py-1.5 text-sm" style={{ borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', borderLeft: '2px solid transparent' }}>
                          <Lock className="h-3.5 w-3.5" />
                          <span className="truncate">{lesson.title}</span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        {normalizedQuery && filteredLessons.length === 0 && (
          <p className="px-2 text-xs" style={{ color: 'var(--text-muted)' }}>レッスンが見つかりません</p>
        )}
      </div>
    </nav>
  );
}
