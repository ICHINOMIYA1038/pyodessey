"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { BADGES } from "@/lib/badges";
import { AppProgress } from "@/types/lesson";

interface BadgeShowcaseProps {
  show: boolean;
  progress: AppProgress;
  onClose: () => void;
}

export function BadgeShowcase({ show, progress, onClose }: BadgeShowcaseProps) {
  const earnedCount = progress.badges.length;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="mx-4 max-h-[80vh] w-full max-w-md overflow-y-auto rounded-2xl p-6"
            style={{
              background: "var(--surface-0)",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-lg)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                🏅 バッジコレクション
              </h2>
              <button onClick={onClose} style={{ color: "var(--text-muted)" }}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
              {earnedCount}/{BADGES.length} 個ゲット
            </p>
            <div className="grid grid-cols-3 gap-3">
              {BADGES.map((badge) => {
                const earned = progress.badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center gap-1 rounded-xl p-3 text-center"
                    style={{
                      background: earned ? "var(--surface-1)" : "var(--surface-2)",
                      border: earned
                        ? "1px solid rgba(251, 191, 36, 0.3)"
                        : "1px solid var(--border-muted)",
                      opacity: earned ? 1 : 0.4,
                    }}
                  >
                    <span className="text-2xl">{badge.emoji}</span>
                    <span
                      className="text-[10px] font-bold leading-tight"
                      style={{ color: earned ? "var(--text-primary)" : "var(--text-muted)" }}
                    >
                      {badge.name}
                    </span>
                    {!earned && (
                      <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>
                        ???
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
