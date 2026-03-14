"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { ResetProgressModal } from "./ResetProgressModal";

interface MapHeaderProps {
  completedCount: number;
  totalCount: number;
  onReset?: () => void;
}

export function MapHeader({ completedCount, totalCount, onReset }: MapHeaderProps) {
  const pct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const [showResetModal, setShowResetModal] = useState(false);

  const handleReset = () => {
    setShowResetModal(false);
    if (onReset) {
      onReset();
    }
    window.location.reload();
  };

  return (
    <>
      <header
        className="sticky top-0 z-20"
        style={{
          background: "var(--surface-0)",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
          <span className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
            🐍 パイソンのぼうけん
          </span>
          <div className="flex items-center gap-3">
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-24 overflow-hidden rounded-full"
                style={{ background: "var(--surface-3)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    background: "var(--brand-purple)",
                  }}
                />
              </div>
              <span className="text-xs tabular-nums" style={{ color: "var(--text-muted)" }}>
                {completedCount}/{totalCount}
              </span>
            </div>
            {/* Reset button */}
            <button
              onClick={() => setShowResetModal(true)}
              className="rounded-full p-1.5 transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--surface-3)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
              aria-label="進捗をリセット"
              title="進捗をリセット"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      <ResetProgressModal
        show={showResetModal}
        onConfirm={handleReset}
        onClose={() => setShowResetModal(false)}
      />
    </>
  );
}
