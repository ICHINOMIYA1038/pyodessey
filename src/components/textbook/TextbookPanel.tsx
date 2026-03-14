"use client";

import { useState, useRef, useCallback } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { ChallengeBlock } from "./ChallengeBlock";
import { LessonChallenge } from "@/types/lesson";

interface TextbookPanelProps {
  content: string;
  title: string;
  challenge?: LessonChallenge;
  onChallengePass?: () => void;
}

export function TextbookPanel({ content, title, challenge, onChallengePass }: TextbookPanelProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      return;
    }
    setScrollProgress((scrollTop / maxScroll) * 100);
  }, []);

  const isComplete = scrollProgress >= 98;

  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--surface-0)' }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--surface-1)' }}>
        <span className="text-sm font-bold" style={{ color: 'var(--brand-purple)' }}>📖</span>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</span>
      </div>
      <div
        className="transition-all"
        style={{
          height: '2px',
          width: `${scrollProgress}%`,
          background: isComplete
            ? 'var(--brand-teal)'
            : 'linear-gradient(90deg, var(--brand-purple), var(--brand-teal))',
          opacity: scrollProgress > 0 ? 1 : 0,
          transitionDuration: 'var(--duration-normal)',
        }}
      />
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="textbook-scroll flex-1 overflow-auto p-6 pb-16"
        style={{ background: 'var(--surface-0)' }}
      >
        <MarkdownRenderer content={content} />
        {challenge && onChallengePass && (
          <ChallengeBlock challenge={challenge} onPass={onChallengePass} />
        )}
      </div>
      <style jsx>{`
        .textbook-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .textbook-scroll::-webkit-scrollbar-track {
          background: var(--surface-0);
        }
        .textbook-scroll::-webkit-scrollbar-thumb {
          background: var(--border-default);
          border-radius: 3px;
        }
        .textbook-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
