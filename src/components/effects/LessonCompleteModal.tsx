"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Link from "next/link";
import { XpBar } from "./XpBar";
import { ShareButton } from "./ShareButton";

interface LessonCompleteModalProps {
  show: boolean;
  lessonTitle: string;
  nextLessonSlug: string | null;
  xpGained: number;
  totalXp: number;
  onClose: () => void;
}

export function LessonCompleteModal({
  show,
  lessonTitle,
  nextLessonSlug,
  xpGained,
  totalXp,
  onClose,
}: LessonCompleteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveRef = useRef<Element | null>(null);

  useEffect(() => {
    if (show) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [show]);

  // Escape key to close
  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, onClose]);

  // Focus trap
  useEffect(() => {
    if (!show) return;
    previousActiveRef.current = document.activeElement;
    const modal = modalRef.current;
    if (modal) {
      const firstFocusable = modal.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modal) return;
      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleTab);
    return () => {
      document.removeEventListener("keydown", handleTab);
      if (previousActiveRef.current instanceof HTMLElement) {
        previousActiveRef.current.focus();
      }
    };
  }, [show]);

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
          role="dialog"
          aria-modal="true"
          aria-labelledby="lesson-complete-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative mx-4 max-w-sm rounded-2xl p-8 text-center"
            style={{
              background: "var(--surface-0)",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-lg)",
              borderRadius: "var(--radius-lg)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 text-lg transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              aria-label="閉じる"
            >
              &times;
            </button>
            <p className="mb-2 text-4xl">🎉</p>
            <h2
              id="lesson-complete-title"
              className="mb-2 text-2xl font-bold"
              style={{ color: "var(--brand-teal)", textShadow: "0 0 12px rgba(45,212,168,0.4)" }}
            >
              やったね!
            </h2>
            <p className="mb-2" style={{ color: "var(--text-secondary)" }}>
              「{lessonTitle}」をクリアしたよ！
            </p>
            <XpBar totalXp={totalXp} gained={xpGained} />
            <div className="mb-4" />
            {nextLessonSlug ? (
              <div className="flex flex-col gap-3">
                <Link
                  href={`/lesson/${nextLessonSlug}`}
                  className="inline-block rounded-lg px-6 py-2.5 font-bold text-white transition-all"
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    boxShadow: "0 0 16px rgba(34,197,94,0.35)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  次のレッスンへ →
                </Link>
                <Link
                  href="/"
                  className="inline-block rounded-lg px-6 py-2 font-medium transition-colors"
                  style={{
                    background: "var(--surface-3)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  マップにもどる
                </Link>
              </div>
            ) : (
              <Link
                href="/"
                className="inline-block rounded-lg px-6 py-2.5 font-bold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  boxShadow: "0 0 16px rgba(34,197,94,0.35)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                マップにもどる
              </Link>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
