"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { LessonMeta } from "@/types/lesson";
import { AdventureMap } from "@/components/map/AdventureMap";

const TitleScreen = dynamic(
  () => import("@/components/title/TitleScreen").then((m) => m.TitleScreen),
  { ssr: false }
);

type TitlePhase = "idle" | "animating-out" | "fading" | "done";

const TITLE_SEEN_KEY = "jsodessey-title-seen";

interface HomeClientProps {
  lessons: LessonMeta[];
}

export function HomeClient({ lessons }: HomeClientProps) {
  const [titlePhase, setTitlePhase] = useState<TitlePhase>(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(TITLE_SEEN_KEY)) {
      return "done";
    }
    return "idle";
  });

  const handleStart = useCallback(() => {
    setTitlePhase("animating-out");
  }, []);

  const handleExitComplete = useCallback(() => {
    setTitlePhase("fading");
    sessionStorage.setItem(TITLE_SEEN_KEY, "1");
    setTimeout(() => {
      setTitlePhase("done");
    }, 400);
  }, []);

  useEffect(() => {
    if (titlePhase !== "animating-out") return;
    const timer = setTimeout(() => {
      setTitlePhase("fading");
      sessionStorage.setItem(TITLE_SEEN_KEY, "1");
      setTimeout(() => setTitlePhase("done"), 400);
    }, 3000);
    return () => clearTimeout(timer);
  }, [titlePhase]);

  return (
    <>
      {titlePhase !== "done" && (
        <TitleScreen
          phase={titlePhase}
          onStart={handleStart}
          onExitComplete={handleExitComplete}
        />
      )}
      {(titlePhase === "fading" || titlePhase === "done") && (
        <AdventureMap lessons={lessons} />
      )}
    </>
  );
}
