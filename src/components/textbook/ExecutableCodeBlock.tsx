"use client";

import { useState, useEffect, useCallback } from "react";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { RunButton } from "@/components/editor/RunButton";
import { OutputConsole } from "@/components/editor/OutputConsole";
import { usePyodide } from "@/hooks/usePyodide";
import { SuccessSparkle } from "@/components/effects/SuccessSparkle";

interface ExecutableCodeBlockProps {
  initialCode: string;
}

export function ExecutableCodeBlock({ initialCode }: ExecutableCodeBlockProps) {
  const [code, setCode] = useState(initialCode);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const { isReady, isRunning, result, execute, cancel } = usePyodide();

  useEffect(() => {
    if (result && result.success && !result.error) {
      setShowSparkle(true);
      const timer = setTimeout(() => setShowSparkle(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const handleRun = useCallback(() => {
    if (isReady && !isRunning) {
      setShowOutput(true);
      execute(code);
    }
  }, [code, isReady, isRunning, execute]);

  return (
    <div
      className="relative my-4 overflow-hidden"
      style={{
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-default)',
        background: '#1e1e2e',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <SuccessSparkle show={showSparkle} />
      <div
        className="flex items-center justify-between px-3 py-1.5"
        style={{ background: '#181825', borderBottom: '1px solid #313244' }}
      >
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: '#94e2d5' }} />
          <span className="text-xs font-medium" style={{ color: '#a6adc8' }}>Python (編集・実行可能)</span>
        </div>
        <RunButton
          onClick={handleRun}
          onCancel={cancel}
          isRunning={isRunning}
          disabled={!isReady}
        />
      </div>
      <CodeEditor value={code} onChange={setCode} height="auto" minHeight="60px" onRun={handleRun} />
      {result && showOutput && (
        <div style={{ borderTop: '1px solid #313244', position: 'relative' }}>
          <button
            onClick={() => setShowOutput(false)}
            className="absolute right-2 top-1.5 flex h-5 w-5 items-center justify-center rounded text-xs transition-colors"
            style={{ color: '#6c7086', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 1 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#cdd6f4'; e.currentTarget.style.background = '#313244'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#6c7086'; e.currentTarget.style.background = 'transparent'; }}
            title="出力を閉じる"
          >
            ✕
          </button>
          <OutputConsole result={result} />
        </div>
      )}
    </div>
  );
}
