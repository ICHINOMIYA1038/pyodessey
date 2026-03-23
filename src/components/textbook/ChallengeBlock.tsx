"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { RunButton } from "@/components/editor/RunButton";
import { OutputConsole } from "@/components/editor/OutputConsole";
import { usePyodide } from "@/hooks/usePyodide";
import { LessonChallenge } from "@/types/lesson";
import { ProgressiveHints } from "./ProgressiveHints";

interface ChallengeBlockProps {
  challenge: LessonChallenge;
  onPass: () => void;
}

export function ChallengeBlock({ challenge, onPass }: ChallengeBlockProps) {
  const [code, setCode] = useState(challenge.starterCode);
  const { isReady, isRunning, result, execute, cancel } = usePyodide();
  const [passed, setPassed] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [skipped, setSkipped] = useState(false);

  const handleRun = useCallback(() => {
    if (!isReady || isRunning) return;
    execute(code).then((res) => {
      if (res && res.success) {
        const output = (res.output ?? "").trimEnd();
        const expected = challenge.expectedOutput.trimEnd();
        if (output === expected) {
          setPassed(true);
          onPass();
        } else {
          setFailCount((c) => c + 1);
        }
      } else {
        setFailCount((c) => c + 1);
      }
    });
  }, [code, isReady, isRunning, execute, challenge.expectedOutput, onPass]);

  const handleSkip = useCallback(() => {
    setSkipped(true);
    onPass();
  }, [onPass]);

  return (
    <div
      className="challenge-card my-8 overflow-hidden"
      style={{
        borderRadius: 'var(--radius-lg)',
        background: 'var(--surface-1)',
        border: '2px solid transparent',
        backgroundClip: 'padding-box',
        boxShadow: '0 0 0 2px rgba(251, 191, 36, 0.3), var(--shadow-lg)',
        position: 'relative',
      }}
    >
      {/* Quest card header */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.08))',
          borderBottom: '1px solid rgba(251, 191, 36, 0.2)',
        }}
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg text-lg"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 0 12px rgba(245, 158, 11, 0.3)' }}
        >
          🏆
        </span>
        <div>
          <span className="text-sm font-bold" style={{ color: '#b45309' }}>チャレンジ</span>
          <span className="ml-2 text-xs" style={{ color: 'var(--text-muted)' }}>QUEST</span>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 py-4">
        <p className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{challenge.description}</p>
        <div
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs"
          style={{ background: 'var(--surface-0)', border: '1px solid var(--border-default)' }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>期待される出力:</span>
          <code className="rounded px-2 py-0.5 font-mono font-bold" style={{ background: 'rgba(45, 212, 168, 0.1)', color: 'var(--brand-teal)' }}>{challenge.expectedOutput}</code>
        </div>
      </div>

      {/* Code area */}
      <div style={{ borderTop: '1px solid var(--border-default)' }}>
        <div className="flex items-center justify-between px-4 py-2" style={{ background: '#181825' }}>
          <span className="text-xs font-medium" style={{ color: '#a6adc8' }}>コードを書こう</span>
          <RunButton
            onClick={handleRun}
            onCancel={cancel}
            isRunning={isRunning}
            disabled={!isReady}
          />
        </div>
        <CodeEditor value={code} onChange={setCode} height="auto" minHeight="80px" onRun={handleRun} />
      </div>

      {result && (
        <div style={{ borderTop: '1px solid #313244' }}>
          <OutputConsole result={result} />
        </div>
      )}

      {/* Progressive hints */}
      {challenge.hints && challenge.hints.length > 0 && !passed && !skipped && (
        <ProgressiveHints hints={challenge.hints} failCount={failCount} />
      )}

      {/* 3回失敗したらスキップ表示 */}
      {failCount >= 3 && !passed && !skipped && (
        <div
          className="px-5 py-4 text-center"
          style={{
            borderTop: '1px solid var(--border-default)',
            background: 'var(--surface-1)',
          }}
        >
          <p className="mb-3 text-xs" style={{ color: 'var(--text-muted)' }}>
            3回チャレンジしました。答えを見て次に進むこともできます。
          </p>
          <button
            onClick={handleSkip}
            className="rounded-lg px-5 py-2 text-sm font-medium transition-colors"
            style={{
              background: 'var(--surface-3)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface-3)'; }}
          >
            答えを見て次に進む
          </button>
        </div>
      )}

      {/* スキップ時: 答えを表示 */}
      {skipped && (
        <div
          className="px-5 py-4"
          style={{
            borderTop: '1px solid rgba(251, 191, 36, 0.2)',
            background: 'rgba(251, 191, 36, 0.05)',
          }}
        >
          <p className="mb-2 text-xs font-bold" style={{ color: '#b45309' }}>答えの出力</p>
          <code
            className="block rounded-lg px-4 py-3 font-mono text-sm"
            style={{ background: 'var(--surface-0)', color: 'var(--brand-teal)', border: '1px solid var(--border-default)' }}
          >
            {challenge.expectedOutput}
          </code>
          <p className="mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
            次のレッスンに進めます。後でまたチャレンジしてみよう！
          </p>
        </div>
      )}

      {passed && (
        <div
          className="px-5 py-4 text-center"
          style={{
            borderTop: '1px solid rgba(45, 212, 168, 0.3)',
            background: 'linear-gradient(135deg, rgba(45, 212, 168, 0.12), rgba(74, 222, 128, 0.08))',
          }}
        >
          <span className="text-lg font-bold" style={{ color: 'var(--brand-teal)' }}>🎉 正解! クエスト達成!</span>
        </div>
      )}
    </div>
  );
}
