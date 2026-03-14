"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { PyodideAPI } from "@/lib/pyodide-api";
import { PyodideResult } from "@/types/pyodide";

interface PyodideContextValue {
  isReady: boolean;
  isLoading: boolean;
  isReinitializing: boolean;
  error: string | null;
  runPython: (code: string) => Promise<PyodideResult>;
  cancelExecution: () => PyodideResult | null;
  retryInit: () => void;
}

const PyodideContext = createContext<PyodideContextValue | null>(null);

export function PyodideProvider({ children }: { children: React.ReactNode }) {
  const apiRef = useRef<PyodideAPI | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isReinitializing, setIsReinitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const api = new PyodideAPI();
    apiRef.current = api;

    api.onStatusChange((status) => {
      switch (status) {
        case "loading":
          setIsLoading(true);
          setError(null);
          break;
        case "ready":
          setIsReady(true);
          setIsLoading(false);
          setIsReinitializing(false);
          setError(null);
          break;
        case "error":
          setIsLoading(false);
          setIsReinitializing(false);
          break;
        case "reinitializing":
          setIsReinitializing(true);
          setIsReady(false);
          break;
      }
    });

    api
      .init()
      .then(() => {
        setIsReady(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(String(err));
        setIsLoading(false);
      });

    return () => {
      api.terminate();
    };
  }, []);

  const runPython = useCallback(async (code: string): Promise<PyodideResult> => {
    if (!apiRef.current) {
      return { success: false, output: "", error: "Pyodide not initialized" };
    }
    return apiRef.current.run(code);
  }, []);

  const cancelExecution = useCallback((): PyodideResult | null => {
    if (!apiRef.current) return null;
    return apiRef.current.cancel();
  }, []);

  const retryInit = useCallback(() => {
    if (!apiRef.current) return;
    setError(null);
    setIsLoading(true);
    apiRef.current
      .retry()
      .then(() => {
        setIsReady(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(String(err));
        setIsLoading(false);
      });
  }, []);

  return (
    <PyodideContext.Provider
      value={{
        isReady,
        isLoading,
        isReinitializing,
        error,
        runPython,
        cancelExecution,
        retryInit,
      }}
    >
      {children}
    </PyodideContext.Provider>
  );
}

export function usePyodideContext() {
  const ctx = useContext(PyodideContext);
  if (!ctx) throw new Error("usePyodideContext must be used within PyodideProvider");
  return ctx;
}
