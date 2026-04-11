"use client";

import { useState, useCallback, useEffect } from "react";
import { useCodeRunner } from "@/contexts/CodeRunnerContext";
import { PyodideResult } from "@/types/pyodide";

export function usePyodide() {
  const {
    isReady,
    isLoading,
    isReinitializing,
    error,
    runCode,
    cancelExecution,
    supportsPreview,
    onConsoleLineRef,
  } = useCodeRunner();
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<PyodideResult | null>(null);

  // Register streaming console handler for event handler output
  useEffect(() => {
    if (!onConsoleLineRef) return;
    onConsoleLineRef.current = (line: string) => {
      setResult((prev) => {
        if (!prev) return prev;
        return { ...prev, output: prev.output + line };
      });
    };
    return () => {
      onConsoleLineRef.current = null;
    };
  }, [onConsoleLineRef]);

  const execute = useCallback(
    async (code: string, iframe?: HTMLIFrameElement | null): Promise<PyodideResult> => {
      setIsRunning(true);
      try {
        const res = await runCode(code, iframe);
        setResult(res);
        return res;
      } finally {
        setIsRunning(false);
      }
    },
    [runCode]
  );

  const cancel = useCallback(() => {
    const res = cancelExecution();
    if (res) {
      setResult(res);
      setIsRunning(false);
    }
  }, [cancelExecution]);

  return {
    isReady,
    isLoading,
    isReinitializing,
    error,
    isRunning,
    result,
    execute,
    cancel,
    supportsPreview: supportsPreview ?? false,
  };
}
