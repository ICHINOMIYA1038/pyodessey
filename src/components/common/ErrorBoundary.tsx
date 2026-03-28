"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className="flex flex-col items-center justify-center gap-4 p-8 text-center"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="text-4xl">😵</span>
            <h2 className="text-lg font-bold">エラーが発生しました</h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              ページを再読み込みしてみてください。
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg px-5 py-2 text-sm font-medium text-white"
              style={{
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              }}
            >
              再読み込み
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
