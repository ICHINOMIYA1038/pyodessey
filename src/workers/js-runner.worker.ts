// Web Worker for executing user JavaScript code in a sandboxed context.

const MAX_OUTPUT = 50 * 1024; // 50KB

interface RunRequest {
  id: string;
  type: "run";
  code: string;
}

interface RunResponse {
  id: string;
  type: "run";
  result: {
    success: boolean;
    output: string;
    error?: string;
    isTruncated?: boolean;
    isTimeout?: boolean;
  };
}

self.onmessage = (e: MessageEvent<RunRequest>) => {
  const { id, type, code } = e.data;
  if (type !== "run") return;

  let output = "";
  let truncated = false;

  // Override console.log to capture output
  const fakConsole = {
    log: (...args: unknown[]) => {
      const line = args.map((a) => formatValue(a)).join(" ") + "\n";
      if (output.length + line.length > MAX_OUTPUT) {
        truncated = true;
        return;
      }
      output += line;
    },
    error: (...args: unknown[]) => {
      const line = args.map((a) => formatValue(a)).join(" ") + "\n";
      if (output.length + line.length > MAX_OUTPUT) {
        truncated = true;
        return;
      }
      output += line;
    },
    warn: (...args: unknown[]) => fakConsole.log(...args),
    info: (...args: unknown[]) => fakConsole.log(...args),
  };

  try {
    // Create a function with console overridden
    const wrappedCode = `
      "use strict";
      const console = __console__;
      ${code}
    `;
    const fn = new Function("__console__", wrappedCode);
    fn(fakConsole);

    const response: RunResponse = {
      id,
      type: "run",
      result: {
        success: true,
        output,
        isTruncated: truncated,
      },
    };
    self.postMessage(response);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    const errorStack = err instanceof Error ? err.stack : undefined;

    // Extract a clean error display
    let displayError = errorMessage;
    if (errorStack) {
      // Only show the error name and message, not internal worker stack
      const firstLine = errorStack.split("\n")[0];
      if (firstLine) displayError = firstLine;
    }

    const response: RunResponse = {
      id,
      type: "run",
      result: {
        success: false,
        output,
        error: displayError,
      },
    };
    self.postMessage(response);
  }
};

function formatValue(val: unknown): string {
  if (val === null) return "null";
  if (val === undefined) return "undefined";
  if (typeof val === "string") return val;
  if (typeof val === "object") {
    try {
      return JSON.stringify(val, null, 2);
    } catch {
      return String(val);
    }
  }
  return String(val);
}
