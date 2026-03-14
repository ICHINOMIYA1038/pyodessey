/// <reference lib="webworker" />

import type { WorkerRequest, WorkerResponse } from "@/types/pyodide";

declare const self: DedicatedWorkerGlobalScope;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pyodide: any = null;

// Python runner that catches errors in Python itself and returns structured results
const RUNNER_SETUP = `
import sys
import io
import json
import traceback

class _LimitedWriter:
    def __init__(self, limit=50000):
        self._buf = io.StringIO()
        self._limit = limit
        self._truncated = False
    def write(self, s):
        if self._truncated:
            return
        if self._buf.tell() + len(s) > self._limit:
            self._buf.write(s[:self._limit - self._buf.tell()])
            self._truncated = True
        else:
            self._buf.write(s)
    def getvalue(self):
        return self._buf.getvalue()
    def flush(self):
        pass
    @property
    def truncated(self):
        return self._truncated

def _run_user_code(code):
    sys.stdout = _LimitedWriter(50000)
    sys.stderr = _LimitedWriter(10000)
    try:
        exec(compile(code, "<user>", "exec"), {})
        return json.dumps({
            "success": True,
            "output": sys.stdout.getvalue(),
            "error": "",
            "truncated": sys.stdout.truncated or sys.stderr.truncated,
        })
    except Exception:
        tb = traceback.format_exc()
        return json.dumps({
            "success": False,
            "output": sys.stdout.getvalue(),
            "error": tb,
            "truncated": sys.stdout.truncated or sys.stderr.truncated,
        })
`;

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  const msg = e.data;

  if (msg.type === "init") {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (self as any).importScripts("https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pyodide = await (self as any).loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.0/full/",
      });
      // Pre-load the runner
      pyodide.runPython(RUNNER_SETUP);
      self.postMessage({
        id: msg.id,
        type: "init",
        success: true,
      } satisfies WorkerResponse);
      self.postMessage({ type: "ready" } satisfies WorkerResponse);
    } catch (err) {
      self.postMessage({
        id: msg.id,
        type: "init",
        success: false,
        error: String(err),
      } satisfies WorkerResponse);
    }
  }

  if (msg.type === "run") {
    if (!pyodide) {
      self.postMessage({
        id: msg.id,
        type: "run",
        result: {
          success: false,
          output: "",
          error: "Pyodide is not initialized",
        },
      } satisfies WorkerResponse);
      return;
    }

    try {
      // Run user code via Python-side try/except to get proper tracebacks
      const resultJson: string = pyodide.runPython(
        `_run_user_code(${JSON.stringify(msg.code)})`
      );
      const parsed = JSON.parse(resultJson);

      self.postMessage({
        id: msg.id,
        type: "run",
        result: {
          success: parsed.success,
          output: parsed.output || "",
          error: parsed.error || undefined,
          isTruncated: parsed.truncated || false,
        },
      } satisfies WorkerResponse);
    } catch (err) {
      // Fallback for unexpected JS-level errors
      self.postMessage({
        id: msg.id,
        type: "run",
        result: {
          success: false,
          output: "",
          error: err instanceof Error ? err.message : String(err),
        },
      } satisfies WorkerResponse);
    }
  }
};
