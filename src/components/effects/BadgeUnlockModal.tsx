"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { BadgeDefinition } from "@/lib/badges";

interface BadgeUnlockModalProps {
  badge: BadgeDefinition | null;
  onClose: () => void;
}

export function BadgeUnlockModal({ badge, onClose }: BadgeUnlockModalProps) {
  useEffect(() => {
    if (badge) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#fbbf24", "#f59e0b", "#d97706"],
      });
    }
  }, [badge]);

  useEffect(() => {
    if (!badge) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [badge, onClose]);

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="mx-4 max-w-xs rounded-2xl p-8 text-center"
            style={{
              background: "var(--surface-0)",
              border: "2px solid rgba(251, 191, 36, 0.5)",
              boxShadow: "0 0 40px rgba(251, 191, 36, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: "#fbbf24" }}>
              Badge Unlocked!
            </p>
            <motion.p
              className="mb-2 text-6xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {badge.emoji}
            </motion.p>
            <h3
              className="mb-1 text-xl font-extrabold"
              style={{ color: "var(--text-primary)" }}
            >
              {badge.name}
            </h3>
            <p className="mb-5 text-sm" style={{ color: "var(--text-secondary)" }}>
              {badge.description}
            </p>
            <button
              onClick={onClose}
              className="rounded-lg px-6 py-2 text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                boxShadow: "0 0 12px rgba(245, 158, 11, 0.3)",
              }}
            >
              やったー！
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
