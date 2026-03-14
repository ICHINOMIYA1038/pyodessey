"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { StarfieldCanvas } from "./StarfieldCanvas";
import { AuroraBackground } from "./AuroraBackground";
import { CinematicTitle } from "./CinematicTitle";
import { WorldEmblems } from "./WorldEmblems";
import { StartButton } from "./StartButton";

type TitlePhase = "idle" | "animating-out" | "fading" | "done";

interface TitleScreenProps {
  phase: TitlePhase;
  onStart: () => void;
  onExitComplete: () => void;
}

export function TitleScreen({ phase, onStart, onExitComplete }: TitleScreenProps) {
  const [showContent, setShowContent] = useState(true);
  const isExiting = phase === "animating-out" || phase === "fading";

  const handleClick = useCallback(() => {
    if (phase === "idle") {
      setShowContent(false);
      onStart();
    }
  }, [phase, onStart]);

  const handleExitComplete = useCallback(() => {
    onExitComplete();
  }, [onExitComplete]);

  return (
    <div className="fixed inset-0 z-40">
      {/* Layer 1: Starfield */}
      <StarfieldCanvas />

      {/* Layer 2: Aurora */}
      <AuroraBackground isExiting={isExiting} />

      {/* Layer 3: Noise overlay */}
      <div className="absolute inset-0 map-noise pointer-events-none" />

      {/* Layer 4: Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 z-10">
        <AnimatePresence onExitComplete={handleExitComplete}>
          {showContent && (
            <>
              <CinematicTitle key="title" />
              <WorldEmblems key="emblems" />
              <StartButton key="start" onClick={handleClick} />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
