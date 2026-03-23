"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface ProgressiveHintsProps {
  hints: string[];
  failCount: number;
}

export function ProgressiveHints({ hints, failCount }: ProgressiveHintsProps) {
  const [revealedCount, setRevealedCount] = useState(0);

  if (hints.length === 0 || failCount < 1) return null;

  // How many hints are available to reveal based on fail count
  const availableCount = Math.min(failCount, hints.length);
  const canRevealMore = revealedCount < availableCount;

  return (
    <div
      className="px-5 py-3"
      style={{
        borderTop: "1px solid rgba(251, 191, 36, 0.15)",
        background: "rgba(251, 191, 36, 0.03)",
      }}
    >
      <AnimatePresence>
        {Array.from({ length: revealedCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-2 flex items-start gap-2 rounded-lg p-3 text-sm"
            style={{
              background: "rgba(251, 191, 36, 0.08)",
              border: "1px solid rgba(251, 191, 36, 0.15)",
            }}
          >
            <Lightbulb
              className="mt-0.5 h-4 w-4 shrink-0"
              style={{ color: "#f59e0b" }}
            />
            <span style={{ color: "var(--text-primary)" }}>{hints[i]}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {canRevealMore && (
        <button
          onClick={() => setRevealedCount((c) => c + 1)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
          style={{
            background: "rgba(251, 191, 36, 0.1)",
            color: "#b45309",
            border: "1px solid rgba(251, 191, 36, 0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(251, 191, 36, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(251, 191, 36, 0.1)";
          }}
        >
          <Lightbulb className="h-3.5 w-3.5" />
          ヒント {revealedCount + 1} を見る
        </button>
      )}
    </div>
  );
}
