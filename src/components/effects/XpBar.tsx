"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface XpBarProps {
  totalXp: number;
  gained: number;
}

export function XpBar({ totalXp, gained }: XpBarProps) {
  const [showGain, setShowGain] = useState(true);
  const prevXp = totalXp - gained;

  useEffect(() => {
    const timer = setTimeout(() => setShowGain(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-4 w-full">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span style={{ color: "var(--text-secondary)" }}>けいけんち</span>
        <div className="flex items-center gap-1">
          <span className="font-bold tabular-nums" style={{ color: "#fbbf24" }}>
            {totalXp} XP
          </span>
          {showGain && gained > 0 && (
            <motion.span
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -16 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="font-bold"
              style={{ color: "#22c55e" }}
            >
              +{gained}
            </motion.span>
          )}
        </div>
      </div>
      <div
        className="h-3 w-full overflow-hidden rounded-full"
        style={{ background: "var(--surface-3)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
            boxShadow: "0 0 8px rgba(251, 191, 36, 0.4)",
          }}
          initial={{ width: `${prevXp % 100}%` }}
          animate={{ width: `${totalXp % 100 || (gained > 0 ? 100 : 0)}%` }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
