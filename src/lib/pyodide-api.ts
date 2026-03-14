import { PyodideResult, WorkerRequest, WorkerResponse } from "@/types/pyodide";
import {
  EXECUTION_TIMEOUT_MS,
  INIT_TIMEOUT_MS,
  MAX_CODE_LENGTH,
  CODE_TOO_LONG_MESSAGE,
  TIMEOUT_MESSAGE,
} from "@/lib/constants";
import { friendlyError } from "@/lib/error-messages";

export type PyodideStatus = "loading" | "ready" | "error" | "reinitializing";
type StatusListener = (status: PyodideStatus) => void;

export class PyodideAPI {
  private worker: Worker | null = null;
  private pending = new Map<
    string,
    {
      resolve: (res: WorkerResponse) => void;
      reject: (err: Error) => void;
    }
  >();
  private readyPromise: Promise<void>;
  private resolveReady!: () => void;
  private currentRunId: string | null = null;
  private statusListener: StatusListener | null = null;

  constructor() {
    this.readyPromise = new Promise((resolve) => {
      this.resolveReady = resolve;
    });
  }

  onStatusChange(listener: StatusListener): void {
    this.statusListener = listener;
  }

  async init(): Promise<void> {
    if (this.worker) return;

    this.statusListener?.("loading");
    this.worker = new Worker(
      new URL("../workers/pyodide.worker.ts", import.meta.url)
    );

    this.worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const data = e.data;
      if (data.type === "ready") {
        this.resolveReady();
        this.statusListener?.("ready");
        return;
      }
      const entry = this.pending.get(data.id);
      if (entry) {
        this.pending.delete(data.id);
        entry.resolve(data);
      }
    };

    this.worker.onerror = (e: ErrorEvent) => {
      e.preventDefault();
      for (const [, entry] of this.pending) {
        entry.reject(new Error("Worker crashed"));
      }
      this.pending.clear();
      this.currentRunId = null;
      this.statusListener?.("error");
    };

    const id = this.generateId();
    const initPromise = new Promise<void>((resolve, reject) => {
      this.pending.set(id, {
        resolve: (res) => {
          if (res.type === "init" && res.success) resolve();
          else
            reject(new Error("error" in res ? res.error : "Init failed"));
        },
        reject,
      });
    });

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(
        () => reject(new Error("Pyodide init timeout")),
        INIT_TIMEOUT_MS
      );
    });

    this.worker.postMessage({ id, type: "init" } satisfies WorkerRequest);

    try {
      await Promise.race([initPromise, timeoutPromise]);
    } catch (err) {
      this.statusListener?.("error");
      throw err;
    }
  }

  async run(code: string): Promise<PyodideResult> {
    if (code.length > MAX_CODE_LENGTH) {
      return {
        success: false,
        output: "",
        error: CODE_TOO_LONG_MESSAGE,
      };
    }

    await this.readyPromise;
    if (!this.worker) throw new Error("Worker not initialized");

    const id = this.generateId();
    this.currentRunId = id;

    const runPromise = new Promise<PyodideResult>((resolve, reject) => {
      this.pending.set(id, {
        resolve: (res) => {
          this.currentRunId = null;
          if (res.type === "run") {
            const result = { ...res.result };
            if (result.error) {
              result.error = friendlyError(result.error);
            }
            resolve(result);
          }
        },
        reject,
      });
      this.worker!.postMessage({
        id,
        type: "run",
        code,
      } satisfies WorkerRequest);
    });

    const timeoutPromise = new Promise<PyodideResult>((resolve) => {
      setTimeout(() => {
        if (this.currentRunId === id) {
          this.currentRunId = null;
          this.pending.delete(id);
          this.terminateAndReinit();
          resolve({
            success: false,
            output: "",
            error: TIMEOUT_MESSAGE,
            isTimeout: true,
          });
        }
      }, EXECUTION_TIMEOUT_MS);
    });

    return Promise.race([runPromise, timeoutPromise]);
  }

  cancel(): PyodideResult | null {
    if (!this.currentRunId) return null;
    this.currentRunId = null;
    this.pending.clear();
    this.terminateAndReinit();
    return {
      success: false,
      output: "",
      error: "実行を停止しました。",
      isCancelled: true,
    };
  }

  get isRunningCode(): boolean {
    return this.currentRunId !== null;
  }

  async retry(): Promise<void> {
    this.terminate();
    this.readyPromise = new Promise((resolve) => {
      this.resolveReady = resolve;
    });
    return this.init();
  }

  terminate(): void {
    this.worker?.terminate();
    this.worker = null;
    this.pending.clear();
    this.currentRunId = null;
  }

  private async terminateAndReinit(): Promise<void> {
    this.terminate();
    this.statusListener?.("reinitializing");
    this.readyPromise = new Promise((resolve) => {
      this.resolveReady = resolve;
    });
    try {
      await this.init();
    } catch {
      this.statusListener?.("error");
    }
  }

  private generateId(): string {
    return Math.random().toString(36).slice(2, 10);
  }
}
