"use client";

import { useEffect, useRef } from "react";

interface ResetProgressModalProps {
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ResetProgressModal({
  show,
  onConfirm,
  onClose,
}: ResetProgressModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, onClose]);

  useEffect(() => {
    if (!show) return;
    previousActiveRef.current = document.activeElement;
    const modal = modalRef.current;
    if (modal) {
      const firstFocusable = modal.querySelector<HTMLElement>("button");
      firstFocusable?.focus();
    }
    return () => {
      if (previousActiveRef.current instanceof HTMLElement) {
        previousActiveRef.current.focus();
      }
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
    >
      <div
        ref={modalRef}
        className="mx-4 max-w-sm p-6 text-center"
        style={{
          background: "var(--surface-0)",
          border: "1px solid var(--border-default)",
          borderRadius: "16px",
          boxShadow: "var(--shadow-lg)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-3 text-3xl">⚠️</p>
        <h2 id="reset-modal-title" className="mb-2 text-lg font-bold" style={{ color: "var(--text-primary)" }}>
          進捗をリセットしますか？
        </h2>
        <p className="mb-6 text-sm" style={{ color: "var(--text-secondary)" }}>
          すべてのレッスンの進捗がリセットされます。この操作は取り消せません。
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            style={{ border: "1px solid var(--border-default)", color: "var(--text-secondary)", background: "var(--surface-3)" }}
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
            style={{ background: "#dc2626" }}
          >
            リセットする
          </button>
        </div>
      </div>
    </div>
  );
}
