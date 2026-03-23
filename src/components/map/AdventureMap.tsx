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
      <MapHeader completedCount={completedCount} totalCount={lessons.length} progress={progress} onReset={resetProgress} />
      <div className="flex flex-1 overflow-hidden">
        <MapSidebar lessons={lessons} progress={progress} />
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto"
        >
          <div className="mx-auto w-full max-w-md px-4 py-8 flex flex-col gap-10">
            {/* 使い方ガイド */}
            <section
              className="rounded-2xl p-5"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border-default)",
              }}
            >
              <h2
                className="mb-3 text-base font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                📖 つかいかた
              </h2>
              <ol
                className="flex flex-col gap-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <li className="flex gap-2">
                  <span className="font-bold" style={{ color: "var(--brand-purple)" }}>1.</span>
                  <span>マップからレッスンをえらんでタップしよう</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold" style={{ color: "var(--brand-purple)" }}>2.</span>
                  <span>せつめいを読んで、Pythonコードを書いてみよう</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold" style={{ color: "var(--brand-purple)" }}>3.</span>
                  <span>「▶ 実行」ボタンでコードを動かそう</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold" style={{ color: "var(--brand-purple)" }}>4.</span>
                  <span>チャレンジをクリアするとレッスン完了！次へ進めるよ</span>
                </li>
              </ol>
              <p
                className="mt-3 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                💡 すべてのレッスンが自由に選べるよ。バッジを集めてコンプリートを目指そう！
              </p>
            </section>

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
