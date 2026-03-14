"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import type { Extension } from "@codemirror/state";

const ReactCodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#282c34] text-zinc-500 text-sm">
      Loading editor...
    </div>
  ),
});

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  minHeight?: string;
  onRun?: () => void;
}

export function CodeEditor({
  value,
  onChange,
  height = "100%",
  minHeight = "100px",
  onRun,
}: CodeEditorProps) {
  const extensions = useMemo(() => {
    const exts: Extension[] = [python()];
    if (onRun) {
      exts.push(
        keymap.of([
          {
            key: "Mod-Enter",
            run: () => {
              onRun();
              return true;
            },
          },
        ])
      );
    }
    return exts;
  }, [onRun]);

  return (
    <div
      style={{
        border: '1px solid #313244',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        background: '#282c34',
      }}
    >
      <ReactCodeMirror
        value={value}
        onChange={onChange}
        extensions={extensions}
        theme={oneDark}
        height={height}
        minHeight={minHeight}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLineGutter: true,
          tabSize: 4,
        }}
      />
    </div>
  );
}
