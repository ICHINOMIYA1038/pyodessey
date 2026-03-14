"use client";

import { Play, Square } from "lucide-react";

interface RunButtonProps {
  onClick: () => void;
  onCancel: () => void;
  isRunning: boolean;
  disabled?: boolean;
}

export function RunButton({ onClick, onCancel, isRunning, disabled }: RunButtonProps) {
  if (isRunning) {
    return (
      <button
        onClick={onCancel}
        className="run-button-cancel inline-flex items-center gap-1.5 text-sm font-bold text-white transition-all"
        style={{
          borderRadius: 'var(--radius-sm)',
          padding: '6px 14px',
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
          animation: 'runPulse 1.5s ease-in-out infinite',
        }}
      >
        <Square className="h-3.5 w-3.5" />
        停止
        <style jsx>{`
          @keyframes runPulse {
            0%, 100% { box-shadow: 0 0 10px rgba(239, 68, 68, 0.3); }
            50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.5); }
          }
        `}</style>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 text-sm font-bold text-white transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      style={{
        borderRadius: 'var(--radius-sm)',
        padding: '6px 14px',
        background: disabled ? '#4b5563' : 'linear-gradient(135deg, #22c55e, #16a34a)',
        boxShadow: disabled ? 'none' : '0 0 12px rgba(34, 197, 94, 0.3)',
        transitionDuration: 'var(--duration-fast)',
      }}
    >
      <Play className="h-3.5 w-3.5" />
      実行
    </button>
  );
}
