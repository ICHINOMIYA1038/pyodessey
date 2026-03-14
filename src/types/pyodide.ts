export interface PyodideResult {
  success: boolean;
  output: string;
  error?: string;
  isTruncated?: boolean;
  isTimeout?: boolean;
  isCancelled?: boolean;
}

export type WorkerRequest =
  | { id: string; type: "init" }
  | { id: string; type: "run"; code: string };

export type WorkerResponse =
  | { id: string; type: "init"; success: boolean; error?: string }
  | { id: string; type: "run"; result: PyodideResult }
  | { type: "ready" };
