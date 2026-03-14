"use client";

import React from "react";

interface HintBlockProps {
  children: React.ReactNode;
}

export function HintBlock({ children }: HintBlockProps) {
  return (
    <details
      className="my-4 group"
      style={{
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
        overflow: 'hidden',
      }}
    >
      <summary
        className="cursor-pointer select-none flex items-center gap-2 px-4 py-3 transition-colors"
        style={{ color: '#b45309', fontWeight: 700, fontSize: '0.875rem' }}
      >
        <span
          className="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs"
          style={{ background: 'rgba(251, 191, 36, 0.2)', color: '#b45309' }}
        >
          📜
        </span>
        <span>ヒントを見る</span>
        <span
          className="ml-auto text-xs transition-transform group-open:rotate-90"
          style={{ color: 'rgba(180, 83, 9, 0.5)' }}
        >
          ▶
        </span>
      </summary>
      <div
        className="px-4 pb-4 text-sm leading-relaxed"
        style={{
          color: 'var(--text-primary)',
          borderTop: '1px solid rgba(245, 158, 11, 0.15)',
          paddingTop: '0.75rem',
        }}
      >
        {children}
      </div>
    </details>
  );
}
