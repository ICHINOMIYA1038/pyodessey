"use client";

import React from "react";
import { PyodideResult } from "@/types/pyodide";

interface HtmlPreviewProps {
  result: PyodideResult | null;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
}

export function HtmlPreview({ result, iframeRef }: HtmlPreviewProps) {
  const showPreview = result?.hasVisualOutput;

  return (
    <div className="flex h-full flex-col" style={{ background: "#fff" }}>
      <div className="relative flex-1 overflow-hidden">
        <iframe
          ref={iframeRef}
          sandbox="allow-scripts allow-same-origin"
          title="JS Preview"
          className="h-full w-full border-0"
          style={{ background: "#fff", display: "block" }}
        />
        {!showPreview && (
          <div
            className="absolute inset-0 flex items-center justify-center text-xs"
            style={{ background: "#1e1e2e", color: "#6c7086" }}
          >
            画面出力がここに表示されます
          </div>
        )}
      </div>
    </div>
  );
}
