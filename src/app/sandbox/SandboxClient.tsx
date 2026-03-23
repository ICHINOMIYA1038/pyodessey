"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { RunButton } from "@/components/editor/RunButton";
import { OutputConsole } from "@/components/editor/OutputConsole";
import { usePyodide } from "@/hooks/usePyodide";

const TEMPLATES = [
  { label: "Hello World", code: 'print("Hello, World!")' },
  { label: "たし算", code: "a = 3\nb = 5\nprint(a + b)" },
  { label: "for ループ", code: 'for i in range(5):\n    print(f"{i}ばんめ")' },
  { label: "リスト", code: 'fruits = ["りんご", "みかん", "ぶどう"]\nfor f in fruits:\n    print(f)' },
  { label: "かんすう", code: 'def greet(name):\n    return f"こんにちは、{name}！"\n\nprint(greet("パイソン"))' },
  { label: "じしょ", code: 'scores = {"国語": 80, "算数": 95, "理科": 70}\nfor subject, score in scores.items():\n    print(f"{subject}: {score}点")' },
];

const DEFAULT_CODE = `# 自由にPythonコードを書いてみよう！
# 「▶ 実行」ボタンでコードを動かせるよ

print("こんにちは、Python！")
`;

export function SandboxClient() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const { isReady, isRunning, result, execute, cancel } = usePyodide();

  const handleRun = useCallback(() => {
    if (isReady && !isRunning) {
      execute(code);
    }
  }, [code, isReady, isRunning, execute]);

  const handleTemplate = (templateCode: string) => {
    setCode(templateCode);
  };

  return (
    <div className="flex h-screen flex-col" style={{ background: "var(--surface-0)" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          background: "var(--surface-0)",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--surface-3)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            マップ
          </Link>
          <div className="h-5 w-px" style={{ background: "var(--border-default)" }} />
          <span className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
            🧪 サンドボックス
          </span>
        </div>
        <div className="flex items-center gap-3">
          {!isReady && (
            <span className="flex items-center gap-1.5 text-xs text-yellow-600">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Pythonをよみこみ中...
            </span>
          )}
          {isReady && (
            <span className="flex items-center gap-1.5 text-xs text-green-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              じゅんびOK!
            </span>
          )}
          <RunButton
            onClick={handleRun}
            onCancel={cancel}
            isRunning={isRunning}
            disabled={!isReady}
          />
        </div>
      </header>

      {/* Template buttons */}
      <div
        className="flex items-center gap-2 overflow-x-auto px-4 py-2"
        style={{
          background: "var(--surface-1)",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <span className="shrink-0 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          テンプレート:
        </span>
        {TEMPLATES.map((t) => (
          <button
            key={t.label}
            onClick={() => handleTemplate(t.code)}
            className="shrink-0 rounded-md px-3 py-1 text-xs transition-colors"
            style={{
              background: "var(--surface-2)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-default)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--surface-3)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--surface-2)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Editor + Output */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden" style={{ minHeight: 0 }}>
          <CodeEditor value={code} onChange={setCode} onRun={handleRun} />
        </div>
        <div
          style={{
            borderTop: "1px solid var(--border-default)",
            height: "40%",
          }}
        >
          <div
            className="flex items-center gap-2 px-3 py-1.5"
            style={{
              borderBottom: "1px solid var(--border-default)",
              background: "var(--surface-1)",
            }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: result?.success === false ? "#ef4444" : "#94e2d5" }}
            />
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              出力
            </span>
          </div>
          <div className="h-full overflow-auto">
            <OutputConsole result={result} />
          </div>
        </div>
      </div>
    </div>
  );
}
