"use client";

import React, { createContext, useContext } from "react";
import { PyodideResult } from "@/types/pyodide";

export interface CodeRunnerContextValue {
  isReady: boolean;
  isLoading: boolean;
  isReinitializing: boolean;
  error: string | null;
  runCode: (code: string, iframe?: HTMLIFrameElement | null) => Promise<PyodideResult>;
  cancelExecution: () => PyodideResult | null;
  retryInit: () => void;
  /** If true, this runner supports visual output (iframe-based) */
  supportsPreview?: boolean;
  /** Ref for streaming console lines from event handlers */
  onConsoleLineRef?: React.MutableRefObject<((line: string) => void) | null>;
}

export const CodeRunnerContext = createContext<CodeRunnerContextValue | null>(null);

export function CodeRunnerProvider({
  value,
  children,
}: {
  value: CodeRunnerContextValue;
  children: React.ReactNode;
}) {
  return (
    <CodeRunnerContext.Provider value={value}>
      {children}
    </CodeRunnerContext.Provider>
  );
}

export function useCodeRunner(): CodeRunnerContextValue {
  const ctx = useContext(CodeRunnerContext);
  if (!ctx) throw new Error("useCodeRunner must be used within CodeRunnerProvider");
  return ctx;
}
