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
          ? '#fff5f5'
          : hasSuccess
            ? '#f0fdf9'
            : '#f8fafc',
      }}
    >
      {result.output && (
        <div>
          {hasSuccess && (
            <span className="mb-1 block text-xs font-bold" style={{ color: '#16a34a' }}>
              実行成功
            </span>
          )}
          <pre className="whitespace-pre-wrap" style={{ color: '#1a1a1a' }}>{result.output}</pre>
        </div>
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
        <div role="alert">
          <span className="mb-1 block text-xs font-bold" style={{ color: '#dc2626' }}>
            エラー
          </span>
          <pre className="whitespace-pre-wrap" style={{ color: '#dc2626' }}>{result.error}</pre>
        </div>
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
