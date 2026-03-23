"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  text: string;
  className?: string;
}

export function ShareButton({ text, className = "" }: ShareButtonProps) {
  const shareUrl = "https://pyodessey.pages.dev/pyodessey";
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <a
      href={twitterUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${className}`}
      style={{
        background: "var(--surface-3)",
        color: "var(--text-secondary)",
        border: "1px solid var(--border-default)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#1d9bf0";
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.borderColor = "#1d9bf0";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--surface-3)";
        e.currentTarget.style.color = "var(--text-secondary)";
        e.currentTarget.style.borderColor = "var(--border-default)";
      }}
    >
      <Share2 className="h-4 w-4" />
      シェアする
    </a>
  );
}
