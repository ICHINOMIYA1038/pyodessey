"use client";

import { useState, useCallback } from "react";
import { usePyodideContext } from "@/contexts/PyodideContext";
import { PyodideResult } from "@/types/pyodide";

export function usePyodide() {
  const {
    isReady,
    isLoading,
    isReinitializing,
    error,
    runPython,
    cancelExecution,
  } = usePyodideContext();
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<PyodideResult | null>(null);

  const execute = useCallback(
    async (code: string): Promise<PyodideResult> => {
      setIsRunning(true);
      try {
        const res = await runPython(code);
        setResult(res);
        return res;
      } finally {
        setIsRunning(false);
      }
    },
    [runPython]
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
  };
}
