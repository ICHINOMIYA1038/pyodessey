"use client";

import { Check } from "lucide-react";

export function ProgressBadge({ completed }: { completed: boolean }) {
  if (!completed) {
    return (
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-xs"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border-default)",
          color: "var(--text-secondary)",
        }}
      >
        &nbsp;
      </span>
    );
  }
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full text-white"
      style={{
        background: "linear-gradient(135deg, #22c55e, #16a34a)",
        boxShadow: "0 0 8px rgba(34,197,94,0.3)",
        border: "1px solid rgba(34,197,94,0.5)",
      }}
    >
      <Check className="h-3 w-3" />
    </span>
  );
}
