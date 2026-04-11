"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Panel, Group, Separator } from "react-resizable-panels";
import { CodeEditor } from "./CodeEditor";
import { RunButton } from "./RunButton";
import { OutputConsole } from "./OutputConsole";
import { HtmlPreview } from "./HtmlPreview";
import { usePyodide } from "@/hooks/usePyodide";
import { useAppConfig } from "@/contexts/AppConfigContext";

const DEFAULT_CODES: Record<string, string> = {
  Python: `# Pythonコードを入力して「実行」ボタンを押してください
print("Hello, Python!")
`,
  JavaScript: `// JavaScriptコードを入力して「実行」ボタンを押してください
console.log("Hello, JavaScript!");
`,
};

export function EditorPanel() {
  const { language } = useAppConfig();
  const isJs = language === "JavaScript";
  const defaultCode = DEFAULT_CODES[language] ?? DEFAULT_CODES.Python;
  const [code, setCode] = useState(defaultCode);
  const { isReady, isRunning, result, execute, cancel, supportsPreview } = usePyodide();
  const hasEdited = useRef(false);
  const [activeTab, setActiveTab] = useState<"console" | "preview">("console");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (code !== defaultCode) {
      hasEdited.current = true;
    }
  }, [code, defaultCode]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasEdited.current) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  useEffect(() => {
    if (result?.hasVisualOutput) {
      setActiveTab("preview");
    }
  }, [result]);

  const handleRun = useCallback(() => {
    if (isReady && !isRunning) {
      execute(code, iframeRef.current);
    }
  }, [code, isReady, isRunning, execute]);

  return (
    <div className="flex h-full flex-col" style={{ background: '#1e1e2e' }}>
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: '1px solid #313244', background: '#181825' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: '#89b4fa' }}>⌨️</span>
          <span className="text-sm font-semibold" style={{ color: '#cdd6f4' }}>エディタ</span>
        </div>
        <RunButton
          onClick={handleRun}
          onCancel={cancel}
          isRunning={isRunning}
          disabled={!isReady}
        />
      </div>
      <Group orientation="vertical" id="editor-split">
        <Panel id="editor-code" defaultSize={isJs ? 50 : 60} minSize={25}>
          <CodeEditor value={code} onChange={setCode} onRun={handleRun} />
        </Panel>
        <Separator
          id="editor-separator"
          className="transition-colors"
          style={{ height: '4px', background: '#313244', cursor: 'row-resize' }}
        />
        <Panel id="editor-output" defaultSize={isJs ? 50 : 40} minSize={15}>
          <div className="flex h-full flex-col">
            {isJs ? (
              <>
                <div
                  className="flex items-center gap-0"
                  style={{ borderBottom: '1px solid #313244', background: '#181825' }}
                >
                  <button
                    onClick={() => setActiveTab("console")}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      color: activeTab === "console" ? '#cdd6f4' : '#6c7086',
                      borderBottom: activeTab === "console" ? '2px solid #94e2d5' : '2px solid transparent',
                    }}
                  >
                    <span className="inline-block h-2 w-2 rounded-full" style={{
                      background: result?.error ? '#ef4444' : '#94e2d5',
                    }} />
                    コンソール
                  </button>
                  <button
                    onClick={() => setActiveTab("preview")}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      color: activeTab === "preview" ? '#cdd6f4' : '#6c7086',
                      borderBottom: activeTab === "preview" ? '2px solid #89b4fa' : '2px solid transparent',
                    }}
                  >
                    <span className="inline-block h-2 w-2 rounded-full" style={{
                      background: result?.hasVisualOutput ? '#89b4fa' : '#6c7086',
                    }} />
                    プレビュー
                  </button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div style={{ display: activeTab === "console" ? "block" : "none", height: "100%" }}>
                    <OutputConsole result={result} />
                  </div>
                  <div style={{ display: activeTab === "preview" ? "block" : "none", height: "100%" }}>
                    <HtmlPreview result={result} iframeRef={iframeRef} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="flex items-center gap-2 px-3 py-1.5"
                  style={{ borderBottom: '1px solid #313244', background: '#181825' }}
                >
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: '#94e2d5' }} />
                  <span className="text-xs font-medium" style={{ color: '#a6adc8' }}>出力</span>
                </div>
                <div className="flex-1 overflow-auto">
                  <OutputConsole result={result} />
                </div>
              </>
            )}
          </div>
        </Panel>
      </Group>
    </div>
  );
}
