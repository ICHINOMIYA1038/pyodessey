"use client";

import Link from "next/link";
import { Loader2, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { useCodeRunner } from "@/contexts/CodeRunnerContext";
import { useAppConfig } from "@/contexts/AppConfigContext";

export function Header() {
  const { isReady, isLoading, isReinitializing, error, retryInit } =
    useCodeRunner();
  const { prefix, emoji, headerTitle, language } = useAppConfig();

  return (
    <header className="relative flex h-12 items-center justify-between px-4" style={{ background: 'var(--surface-0)', borderBottom: '1px solid var(--border-default)' }}>
      <div className="flex items-center gap-3">
        <Link
          href={prefix}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-3)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>マップ</span>
        </Link>
        <div className="h-5 w-px" style={{ background: 'var(--border-default)' }} />
        <Link
          href={prefix}
          className="flex items-center gap-2 hover:opacity-90"
        >
          <span className="text-lg">{emoji}</span>
          <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{headerTitle}</span>
        </Link>
      </div>
      <div className="flex items-center gap-2 text-xs">
        {isLoading && !isReinitializing && (
          <span className="flex items-center gap-1.5 text-yellow-600">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            {language}をよみこみ中...
          </span>
        )}
        {isReinitializing && (
          <span className="flex items-center gap-1.5 text-yellow-600">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            {language}をさいきどう中...
          </span>
        )}
        {isReady && !isReinitializing && (
          <span className="flex items-center gap-1.5 text-green-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            じゅんびOK!
          </span>
        )}
        {error && (
          <>
            <span className="flex items-center gap-1.5 text-red-600">
              <XCircle className="h-3.5 w-3.5" />
              よみこみエラー
            </span>
            <button
              onClick={retryInit}
              className="rounded px-2 py-0.5"
              style={{ background: 'var(--surface-3)', color: 'var(--text-secondary)' }}
            >
              もういちど
            </button>
          </>
        )}
      </div>
    </header>
  );
}
