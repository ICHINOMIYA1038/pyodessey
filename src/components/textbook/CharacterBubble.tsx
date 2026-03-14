"use client";

import React from "react";

interface CharacterBubbleProps {
  character: "sensei" | "student";
  children: React.ReactNode;
}

function SenseiAvatar() {
  return (
    <svg width="56" height="56" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soft shadow */}
      <ellipse cx="40" cy="72" rx="18" ry="4" fill="#16a34a" opacity="0.15" />

      {/* Tail curling behind */}
      <path d="M52 58 Q62 54 60 46 Q58 38 52 42" stroke="#22c55e" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M52 58 Q62 54 60 46 Q58 38 52 42" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Body */}
      <ellipse cx="40" cy="56" rx="16" ry="10" fill="#22c55e" />
      <ellipse cx="40" cy="57" rx="12" ry="7" fill="#4ade80" />
      <ellipse cx="40" cy="58" rx="9" ry="5" fill="#86efac" />

      {/* Head - big round */}
      <circle cx="40" cy="32" r="22" fill="#22c55e" />
      <circle cx="40" cy="32" r="20" fill="#4ade80" />

      {/* Belly face area */}
      <ellipse cx="40" cy="36" rx="14" ry="12" fill="#86efac" />

      {/* Graduation cap */}
      <rect x="25" y="11" width="30" height="4" rx="1" fill="#1a1a2e" />
      <polygon points="40,5 25,13 55,13" fill="#1a1a2e" />
      <rect x="38" y="5" width="4" height="3" rx="1" fill="#fbbf24" />
      {/* Tassel */}
      <line x1="52" y1="13" x2="56" y2="20" stroke="#fbbf24" strokeWidth="1.5" />
      <circle cx="56" cy="21" r="2" fill="#fbbf24" />

      {/* Eyes - huge kawaii */}
      <ellipse cx="32" cy="30" rx="6.5" ry="7.5" fill="white" />
      <ellipse cx="48" cy="30" rx="6.5" ry="7.5" fill="white" />

      {/* Iris */}
      <ellipse cx="33" cy="31" rx="4.5" ry="5.5" fill="#15803d" />
      <ellipse cx="49" cy="31" rx="4.5" ry="5.5" fill="#15803d" />

      {/* Pupil */}
      <ellipse cx="33.5" cy="31.5" rx="2.8" ry="3.2" fill="#0a3d1f" />
      <ellipse cx="49.5" cy="31.5" rx="2.8" ry="3.2" fill="#0a3d1f" />

      {/* Eye sparkle - big */}
      <circle cx="35.5" cy="28.5" r="2" fill="white" />
      <circle cx="51.5" cy="28.5" r="2" fill="white" />
      {/* Eye sparkle - small */}
      <circle cx="31.5" cy="33" r="1" fill="white" />
      <circle cx="47.5" cy="33" r="1" fill="white" />

      {/* Blush */}
      <ellipse cx="24" cy="37" rx="4" ry="2.5" fill="#f9a8d4" opacity="0.5" />
      <ellipse cx="56" cy="37" rx="4" ry="2.5" fill="#f9a8d4" opacity="0.5" />

      {/* Nostrils */}
      <circle cx="37" cy="37" r="1.2" fill="#15803d" />
      <circle cx="43" cy="37" r="1.2" fill="#15803d" />

      {/* Smile */}
      <path d="M34 42 Q40 48 46 42" stroke="#15803d" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Tongue peek */}
      <ellipse cx="40" cy="45" rx="2.5" ry="2" fill="#fb7185" />
    </svg>
  );
}

function StudentAvatar() {
  return (
    <svg width="56" height="56" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soft shadow */}
      <ellipse cx="40" cy="74" rx="16" ry="3" fill="#3b82f6" opacity="0.15" />

      {/* Body / shirt */}
      <path d="M24 64 Q24 56 32 53 Q36 52 40 51 Q44 52 48 53 Q56 56 56 64 L56 72 L24 72Z" fill="#60a5fa" />
      {/* Shirt detail */}
      <path d="M36 53 L40 58 L44 53" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Collar */}
      <path d="M32 53 Q36 56 40 58 Q44 56 48 53" fill="#3b82f6" />

      {/* Hair back volume */}
      <ellipse cx="40" cy="24" rx="22" ry="20" fill="#4a3728" />

      {/* Face */}
      <ellipse cx="40" cy="34" rx="17" ry="18" fill="#fde0b6" />

      {/* Hair front - fluffy bangs */}
      <path d="M18 24 Q20 10 30 8 Q34 7 40 6 Q46 7 50 8 Q60 10 62 24
               Q60 20 55 18 Q50 22 46 16 Q43 20 40 14 Q37 20 34 16 Q30 22 25 18 Q20 20 18 24Z"
            fill="#5c3d2e" />
      {/* Hair highlight */}
      <path d="M30 10 Q35 8 40 9" stroke="#8b6f5e" strokeWidth="1.5" fill="none" opacity="0.5" />

      {/* Side hair tufts */}
      <path d="M18 24 Q16 32 18 40 Q20 34 20 26Z" fill="#5c3d2e" />
      <path d="M62 24 Q64 32 62 40 Q60 34 60 26Z" fill="#5c3d2e" />

      {/* Ears */}
      <ellipse cx="22" cy="35" rx="3" ry="4" fill="#fde0b6" />
      <ellipse cx="58" cy="35" rx="3" ry="4" fill="#fde0b6" />

      {/* Eyes - huge kawaii */}
      <ellipse cx="32" cy="34" rx="6" ry="7" fill="white" />
      <ellipse cx="48" cy="34" rx="6" ry="7" fill="white" />

      {/* Iris */}
      <ellipse cx="32.5" cy="35" rx="4.2" ry="5.2" fill="#3b82f6" />
      <ellipse cx="48.5" cy="35" rx="4.2" ry="5.2" fill="#3b82f6" />

      {/* Pupil */}
      <ellipse cx="33" cy="35.5" rx="2.5" ry="3" fill="#1e1b4b" />
      <ellipse cx="49" cy="35.5" rx="2.5" ry="3" fill="#1e1b4b" />

      {/* Eye sparkle - big */}
      <circle cx="35" cy="32.5" r="2" fill="white" />
      <circle cx="51" cy="32.5" r="2" fill="white" />
      {/* Eye sparkle - small */}
      <circle cx="31" cy="37" r="1" fill="white" />
      <circle cx="47" cy="37" r="1" fill="white" />

      {/* Eyelashes hint */}
      <path d="M26 29 Q29 27 33 28" stroke="#4a3728" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M47 28 Q51 27 54 29" stroke="#4a3728" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="25" cy="40" rx="4" ry="2.5" fill="#fca5a5" opacity="0.45" />
      <ellipse cx="55" cy="40" rx="4" ry="2.5" fill="#fca5a5" opacity="0.45" />

      {/* Nose - tiny */}
      <ellipse cx="40" cy="39" rx="1.2" ry="0.8" fill="#e8c99b" />

      {/* Mouth - happy open */}
      <path d="M35 44 Q40 49 45 44" stroke="#c2410c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M36 44.5 Q40 48 44 44.5" fill="#fca5a5" />
    </svg>
  );
}

const config = {
  sensei: {
    label: "パイソン先生",
    avatar: SenseiAvatar,
    glowColor: "rgba(34, 197, 94, 0.1)",
    borderColor: "rgba(34, 197, 94, 0.3)",
    bubbleBg: "#f0fdf4",
    labelColor: "#16a34a",
    pointerFill: "#f0fdf4",
  },
  student: {
    label: "コードくん",
    avatar: StudentAvatar,
    glowColor: "rgba(59, 130, 246, 0.1)",
    borderColor: "rgba(59, 130, 246, 0.3)",
    bubbleBg: "#eff6ff",
    labelColor: "#2563eb",
    pointerFill: "#eff6ff",
  },
} as const;

export function CharacterBubble({ character, children }: CharacterBubbleProps) {
  const { label, avatar: Avatar, glowColor, borderColor, bubbleBg, labelColor, pointerFill } =
    config[character];

  const isStudent = character === "student";

  return (
    <div className={`my-5 flex items-start gap-3 ${isStudent ? "flex-row-reverse" : ""}`}>
      {/* Avatar with glow */}
      <div className="shrink-0">
        <div
          className="flex h-14 w-14 items-center justify-center overflow-hidden"
          style={{
            borderRadius: 'var(--radius-lg)',
            border: `2px solid ${borderColor}`,
            background: 'var(--surface-2)',
            boxShadow: `0 0 16px ${glowColor}, var(--shadow-md)`,
          }}
        >
          <Avatar />
        </div>
      </div>
      {/* Bubble */}
      <div className="relative max-w-[85%] flex-1">
        <div
          className={`mb-1 text-xs font-bold ${isStudent ? "text-right" : ""}`}
          style={{ color: labelColor }}
        >
          {label}
        </div>
        <div
          className="relative px-4 py-3"
          style={{
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${borderColor}`,
            background: bubbleBg,
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* Triangle pointer */}
          <div
            className={`absolute top-3 ${isStudent ? "-right-[6px]" : "-left-[6px]"}`}
          >
            <svg width="8" height="12" viewBox="0 0 8 12" className={isStudent ? "scale-x-[-1]" : ""}>
              <path
                d="M8 0 L0 6 L8 12"
                fill={pointerFill}
              />
            </svg>
          </div>
          <div className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
