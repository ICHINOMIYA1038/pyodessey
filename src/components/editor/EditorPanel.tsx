"use client";

import { useState, useCallback } from "react";
import { Panel, Group, Separator } from "react-resizable-panels";
import { CodeEditor } from "./CodeEditor";
import { RunButton } from "./RunButton";
import { OutputConsole } from "./OutputConsole";
import { usePyodide } from "@/hooks/usePyodide";

const DEFAULT_CODE = `# Pythonコードを入力して「実行」ボタンを押してください
print("Hello, Python!")
`;

export function EditorPanel() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const { isReady, isRunning, result, execute, cancel } = usePyodide();

  const handleRun = useCallback(() => {
    if (isReady && !isRunning) {
      execute(code);
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
        <Panel id="editor-code" defaultSize={60} minSize={30}>
          <CodeEditor value={code} onChange={setCode} onRun={handleRun} />
        </Panel>
        <Separator
          id="editor-separator"
          className="transition-colors"
          style={{ height: '4px', background: '#313244', cursor: 'row-resize' }}
        />
        <Panel id="editor-output" defaultSize={40} minSize={15}>
          <div className="flex h-full flex-col">
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
          </div>
        </Panel>
      </Group>
    </div>
  );
}
