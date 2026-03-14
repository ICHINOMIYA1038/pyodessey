"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { getWorldById } from "@/lib/world-config";
import { WorldId } from "@/types/lesson";
import Link from "next/link";

interface WorldClearOverlayProps {
  show: boolean;
  worldId: WorldId;
  onClose: () => void;
}

export function WorldClearOverlay({
  show,
  worldId,
  onClose,
}: WorldClearOverlayProps) {
  const world = getWorldById(worldId);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveRef = useRef<Element | null>(null);

  useEffect(() => {
    if (show) {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
      const timer = setTimeout(() => {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
      }, 500);
      return () => clearTimeout(timer);
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="world-clear-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="mx-4 max-w-md rounded-2xl p-10 text-center"
            style={{
              background: "var(--surface-0)",
              border: "1px solid rgba(255, 215, 0, 0.4)",
              boxShadow: "var(--shadow-lg), 0 0 30px rgba(255,215,0,0.15)",
              borderRadius: "var(--radius-lg)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-4 text-8xl">{world.emoji}</p>
            <h2
              id="world-clear-title"
              className="mb-2 text-3xl font-extrabold"
              style={{
                color: "#ffd700",
                textShadow: "0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.2)",
              }}
            >
              🏆 ワールドクリア!
            </h2>
            <p
              className="mb-2 text-xl font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {world.name}
            </p>
            <p
              className="mb-6"
              style={{
                color: "#fbbf24",
                textShadow: "0 0 8px rgba(251,191,36,0.3)",
                fontWeight: 600,
              }}
            >
              「{world.badgeTitle}」の称号を手に入れた！
            </p>
            <Link
              href="/"
              className="inline-block rounded-lg px-6 py-2.5 font-bold text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                boxShadow: "0 0 16px rgba(245,158,11,0.35)",
                borderRadius: "var(--radius-md)",
              }}
            >
              マップにもどる
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
