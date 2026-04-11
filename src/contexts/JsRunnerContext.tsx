"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { PyodideResult } from "@/types/pyodide";
import { CodeRunnerProvider } from "./CodeRunnerContext";

interface JsRunnerContextValue {
  isReady: boolean;
  isLoading: boolean;
  isReinitializing: boolean;
  error: string | null;
  runPython: (code: string) => Promise<PyodideResult>;
  cancelExecution: () => PyodideResult | null;
  retryInit: () => void;
}

const JsRunnerContext = createContext<JsRunnerContextValue | null>(null);

function buildSrcdoc(code: string, runId: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: sans-serif; background: #fff; overflow: auto; }
  #app { padding: 8px; }
  canvas { display: block; }
</style>
</head>
<body>
<div id="app"></div>
<canvas id="canvas" width="400" height="400" style="display:none"></canvas>
<script>
(function() {
  var _initOutput = [];
  var _hasVisual = false;
  var _MAX = 50 * 1024;
  var _totalLen = 0;
  var _truncated = false;
  var _initDone = false;
  var _runId = ${JSON.stringify(runId)};

  function fmt(v) {
    if (v === null) return "null";
    if (v === undefined) return "undefined";
    if (typeof v === "string") return v;
    if (typeof v === "object") {
      try { return JSON.stringify(v, null, 2); } catch(e) { return String(v); }
    }
    return String(v);
  }

  function capture() {
    var args = Array.prototype.slice.call(arguments);
    var line = args.map(fmt).join(" ") + "\\n";
    if (_totalLen + line.length > _MAX) { _truncated = true; return; }
    _totalLen += line.length;

    if (!_initDone) {
      _initOutput.push(line);
    } else {
      parent.postMessage({ type: "js-console", id: _runId, line: line }, "*");
    }
  }

  var console = {
    log: capture,
    error: capture,
    warn: capture,
    info: capture,
  };

  var app = document.getElementById("app");
  var canvas = document.getElementById("canvas");

  var _checkVisual = function() {
    if (app.childNodes.length > 0 || app.innerHTML.trim() !== "" || canvas.style.display !== "none") {
      _hasVisual = true;
    }
  };

  try {
    var _fn = new Function("console", "document", "app", "canvas", "showCanvas", ${JSON.stringify(code)});
    _fn(console, document, app, canvas, function() {
      canvas.style.display = "block";
      _hasVisual = true;
    });
  } catch(e) {
    parent.postMessage({
      type: "js-run-result",
      id: _runId,
      result: {
        success: false,
        output: _initOutput.join(""),
        error: e.name + ": " + e.message,
        isTruncated: _truncated,
        hasVisualOutput: false
      }
    }, "*");
    _initDone = true;
    return;
  }

  _checkVisual();
  _initDone = true;

  parent.postMessage({
    type: "js-run-result",
    id: _runId,
    result: {
      success: true,
      output: _initOutput.join(""),
      isTruncated: _truncated,
      hasVisualOutput: _hasVisual
    }
  }, "*");
})();
</script>
</body>
</html>`;
}

let idCounter = 0;

export function JsRunnerProvider({ children }: { children: React.ReactNode }) {
  const [isReady] = useState(true);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const resolverRef = useRef<{ resolve: (result: PyodideResult) => void; id: string } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onConsoleLineRef = useRef<((line: string) => void) | null>(null);
  const activeIframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleMessage = useCallback((e: MessageEvent) => {
    const data = e.data;
    if (!data) return;
    if (data.type === "js-run-result" && resolverRef.current && data.id === resolverRef.current.id) {
      if (timerRef.current) clearTimeout(timerRef.current);
      resolverRef.current.resolve(data.result);
      resolverRef.current = null;
    } else if (data.type === "js-console") {
      if (onConsoleLineRef.current) {
        onConsoleLineRef.current(data.line);
      }
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  /**
   * Run code. If an iframe element is passed, use it for execution (visual output).
   * Otherwise fall back to a temporary hidden iframe.
   */
  const runCode = useCallback(async (code: string, iframe?: HTMLIFrameElement | null): Promise<PyodideResult> => {
    const id = String(++idCounter);

    // Use provided iframe or create a temporary one
    let targetIframe = iframe;
    let tempIframe: HTMLIFrameElement | null = null;
    if (!targetIframe) {
      tempIframe = document.createElement("iframe");
      tempIframe.sandbox.add("allow-scripts", "allow-same-origin");
      tempIframe.style.display = "none";
      document.body.appendChild(tempIframe);
      targetIframe = tempIframe;
    }

    activeIframeRef.current = targetIframe;

    return new Promise((resolve) => {
      resolverRef.current = { resolve, id };

      timerRef.current = setTimeout(() => {
        if (resolverRef.current?.id === id) {
          resolverRef.current.resolve({
            success: false,
            output: "",
            error: "Execution timed out (10s)",
            isTimeout: true,
          });
          resolverRef.current = null;
          if (targetIframe) targetIframe.srcdoc = "";
          if (tempIframe) tempIframe.remove();
        }
      }, 10000);

      const origResolve = resolve;
      resolverRef.current = {
        resolve: (result) => {
          if (tempIframe) tempIframe.remove();
          origResolve(result);
        },
        id,
      };

      targetIframe!.srcdoc = buildSrcdoc(code, id);
    });
  }, []);

  const cancelExecution = useCallback((): PyodideResult | null => {
    if (resolverRef.current) {
      if (timerRef.current) clearTimeout(timerRef.current);
      const result: PyodideResult = {
        success: false,
        output: "",
        error: "Execution cancelled",
        isCancelled: true,
      };
      resolverRef.current.resolve(result);
      resolverRef.current = null;
      if (activeIframeRef.current) activeIframeRef.current.srcdoc = "";
      return result;
    }
    return null;
  }, []);

  const retryInit = useCallback(() => {}, []);

  const contextValue = {
    isReady,
    isLoading,
    isReinitializing: false,
    error,
    runPython: runCode,
    cancelExecution,
    retryInit,
  };

  const codeRunnerValue = {
    isReady,
    isLoading,
    isReinitializing: false,
    error,
    runCode,
    cancelExecution,
    retryInit,
    supportsPreview: true,
    onConsoleLineRef,
  };

  return (
    <JsRunnerContext.Provider value={contextValue}>
      <CodeRunnerProvider value={codeRunnerValue}>
        {children}
      </CodeRunnerProvider>
    </JsRunnerContext.Provider>
  );
}

export function useJsRunnerContext() {
  const ctx = useContext(JsRunnerContext);
  if (!ctx) throw new Error("useJsRunnerContext must be used within JsRunnerProvider");
  return ctx;
}
