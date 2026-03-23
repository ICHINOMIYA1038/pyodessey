"use client";

import { useEffect, useState, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { SplitPane } from "@/components/layout/SplitPane";
import { TextbookPanel } from "@/components/textbook/TextbookPanel";
import { EditorPanel } from "@/components/editor/EditorPanel";
import { LessonCompleteModal } from "@/components/effects/LessonCompleteModal";
import { WorldClearOverlay } from "@/components/effects/WorldClearOverlay";
import { BadgeUnlockModal } from "@/components/effects/BadgeUnlockModal";
import { ChallengeBlock } from "@/components/textbook/ChallengeBlock";
import { useProgress } from "@/hooks/useProgress";
import { checkNewBadges, BadgeDefinition } from "@/lib/badges";
import { Lesson, LessonMeta, WorldId } from "@/types/lesson";

interface LessonClientProps {
  lesson: Lesson;
  allLessons: LessonMeta[];
}

export function LessonClient({ lesson, allLessons }: LessonClientProps) {
  const { accessLesson, completeLesson, isCompleted, initMap, earnBadge, progress } = useProgress();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showWorldClear, setShowWorldClear] = useState(false);
  const [clearedWorldId, setClearedWorldId] = useState<WorldId>("forest");
  const [challengePassed, setChallengePassed] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [badgeQueue, setBadgeQueue] = useState<BadgeDefinition[]>([]);
  const [currentBadge, setCurrentBadge] = useState<BadgeDefinition | null>(null);

  const hasChallenge = !!lesson.meta.challenge;

  useEffect(() => {
    initMap(allLessons);
  }, [allLessons, initMap]);

  useEffect(() => {
    accessLesson(lesson.meta.slug);
  }, [lesson.meta.slug, accessLesson]);

  const nextLesson = allLessons.find(
    (l) => l.order === lesson.meta.order + 1
  );

  const handleComplete = () => {
    const result = completeLesson(lesson.meta.slug);
    setXpGained(result.xpGained);

    // Check for new badges
    const updatedProgress = { ...progress };
    updatedProgress.lessons = { ...updatedProgress.lessons, [lesson.meta.slug]: { slug: lesson.meta.slug, completed: true, lastAccessedAt: new Date().toISOString(), completedAt: new Date().toISOString() } };
    if (result.worldCleared && !updatedProgress.worldsCleared.includes(result.worldCleared)) {
      updatedProgress.worldsCleared = [...updatedProgress.worldsCleared, result.worldCleared];
    }
    updatedProgress.totalXp = (progress.totalXp || 0) + result.xpGained;
    const newBadges = checkNewBadges(updatedProgress);
    newBadges.forEach((b) => earnBadge(b.id));

    if (result.worldCleared) {
      setClearedWorldId(result.worldCleared);
      setShowWorldClear(true);
    } else {
      setShowCompleteModal(true);
    }

    if (newBadges.length > 0) {
      setBadgeQueue(newBadges);
    }
  };

  const handleCompleteModalClose = () => {
    setShowCompleteModal(false);
    showNextBadge();
  };

  const handleWorldClearClose = () => {
    setShowWorldClear(false);
    showNextBadge();
  };

  const showNextBadge = () => {
    if (badgeQueue.length > 0) {
      const [next, ...rest] = badgeQueue;
      setCurrentBadge(next);
      setBadgeQueue(rest);
    }
  };

  const handleBadgeClose = () => {
    setCurrentBadge(null);
    if (badgeQueue.length > 0) {
      const [next, ...rest] = badgeQueue;
      setTimeout(() => {
        setCurrentBadge(next);
        setBadgeQueue(rest);
      }, 300);
    }
  };

  const handleChallengePass = useCallback(() => {
    setChallengePassed(true);
  }, []);

  const completed = isCompleted(lesson.meta.slug);
  const canComplete = !hasChallenge || challengePassed;

  return (
    <div className="flex h-screen flex-col" style={{ background: "var(--surface-0)", color: "var(--text-primary)" }}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar lessons={allLessons} />
        <main id="main-content" className="flex-1">
          <SplitPane
            left={
              <div className="flex h-full flex-col">
                <div className="flex-1 overflow-hidden">
                  <TextbookPanel
                    content={lesson.content}
                    title={lesson.meta.title}
                    challenge={lesson.meta.challenge}
                    onChallengePass={handleChallengePass}
                  />
                </div>
                {!completed && (
                  <div className="px-4 py-3" style={{ borderTop: "1px solid var(--border-default)", background: "var(--surface-1)" }}>
                    <button
                      onClick={handleComplete}
                      disabled={!canComplete}
                      className="w-full rounded-lg py-2 font-medium text-white transition-all"
                      style={
                        canComplete
                          ? {
                              background: "linear-gradient(135deg, #22c55e, #16a34a)",
                              boxShadow: "0 0 12px rgba(34,197,94,0.3)",
                              borderRadius: "var(--radius-md)",
                            }
                          : {
                              background: "var(--surface-3)",
                              color: "var(--text-secondary)",
                              cursor: "not-allowed",
                              borderRadius: "var(--radius-md)",
                            }
                      }
                    >
                      {hasChallenge && !challengePassed
                        ? "チャレンジをクリアしよう！"
                        : "レッスンかんりょう！✅"}
                    </button>
                  </div>
                )}
              </div>
            }
            right={<EditorPanel />}
          />
        </main>
      </div>
      <LessonCompleteModal
        show={showCompleteModal}
        lessonTitle={lesson.meta.title}
        nextLessonSlug={nextLesson?.slug ?? null}
        xpGained={xpGained}
        totalXp={progress.totalXp}
        onClose={handleCompleteModalClose}
      />
      <WorldClearOverlay
        show={showWorldClear}
        worldId={clearedWorldId}
        onClose={handleWorldClearClose}
      />
      <BadgeUnlockModal
        badge={currentBadge}
        onClose={handleBadgeClose}
      />
    </div>
  );
}
