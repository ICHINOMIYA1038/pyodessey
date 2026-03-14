"use client";

import { Loader2 } from "lucide-react";

export function LoadingSpinner({ message }: { message?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-2 text-sm"
      style={{ color: "var(--text-secondary)" }}
    >
      <Loader2
        className="h-5 w-5 animate-spin"
        style={{ color: "var(--brand-purple)" }}
      />
      {message && <span>{message}</span>}
    </div>
  );
}
