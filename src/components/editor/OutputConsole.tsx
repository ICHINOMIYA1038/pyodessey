"use client";

import { PyodideResult } from "@/types/pyodide";

interface OutputConsoleProps {
  result: PyodideResult | null;
}

export function OutputConsole({ result }: OutputConsoleProps) {
  if (!result) {
    return (
      <div
        className="h-full p-3 font-mono text-sm"
        style={{ background: '#1e1e2e', color: '#6c7086' }}
      >
        実行結果がここに表示されます
      </div>
    );
  }

  const hasError = !!result.error;
  const hasSuccess = !!result.output && !result.error;

  return (
    <div
      className="h-full overflow-auto p-3 font-mono text-sm"
      style={{
        background: hasError
          ? 'linear-gradient(180deg, rgba(239, 68, 68, 0.08), #1e1e2e)'
          : hasSuccess
            ? 'linear-gradient(180deg, rgba(45, 212, 168, 0.06), #1e1e2e)'
            : '#1e1e2e',
      }}
    >
      {result.output && (
        <pre className="whitespace-pre-wrap" style={{ color: '#e2e8f0' }}>{result.output}</pre>
      )}
      {result.isTruncated && (
        <div
          className="mt-2 rounded-lg px-3 py-2 text-xs"
          style={{
            border: '1px solid rgba(251, 191, 36, 0.3)',
            background: 'rgba(251, 191, 36, 0.08)',
            color: '#fbbf24',
          }}
        >
          出力が長すぎるため省略されました。プログラムを見直してみましょう。
        </div>
      )}
      {result.error && (
        <pre className="whitespace-pre-wrap" style={{ color: '#fca5a5' }}>{result.error}</pre>
      )}
      {result.isTimeout && (
        <div
          className="mt-2 rounded-lg px-3 py-2 text-xs"
          style={{
            border: '1px solid rgba(251, 146, 60, 0.3)',
            background: 'rgba(251, 146, 60, 0.08)',
            color: '#fb923c',
          }}
        >
          ヒント：while文の終了条件を確認してみましょう。
        </div>
      )}
      {!result.output && !result.error && (
        <span style={{ color: '#6c7086' }}>（出力なし）</span>
      )}
    </div>
  );
}
