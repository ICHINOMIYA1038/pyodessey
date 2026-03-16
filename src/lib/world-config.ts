import { WorldId } from "@/types/lesson";

export interface AccentStyle {
  node: string;
  glow: string;
  bg: string;
  text: string;
  path: string;
}

export interface WorldConfig {
  id: WorldId;
  name: string;
  emoji: string;
  theme: string;
  lessonRange: [number, number];
  gradient: string;
  accentColor: string;
  badgeTitle: string;
  colors: AccentStyle;
}

export const WORLDS: WorldConfig[] = [
  {
    id: "forest",
    name: "きそのもり",
    emoji: "🌲",
    theme: "森",
    lessonRange: [1, 5],
    gradient: "from-green-50 to-green-100",
    accentColor: "green",
    badgeTitle: "もりのぼうけんしゃ",
    colors: {
      node: "#16a34a",
      glow: "rgba(22,163,74,0.3)",
      bg: "#f0fdf4",
      text: "#15803d",
      path: "#4ade80",
    },
  },
  {
    id: "town",
    name: "ちゅうきゅうのまち",
    emoji: "🏘️",
    theme: "町",
    lessonRange: [6, 10],
    gradient: "from-amber-50 to-amber-100",
    accentColor: "amber",
    badgeTitle: "まちのたんけんか",
    colors: {
      node: "#d97706",
      glow: "rgba(217,119,6,0.3)",
      bg: "#fffbeb",
      text: "#b45309",
      path: "#fbbf24",
    },
  },
  {
    id: "mountain",
    name: "おうようのやま",
    emoji: "⛰️",
    theme: "山",
    lessonRange: [11, 16],
    gradient: "from-blue-50 to-blue-100",
    accentColor: "blue",
    badgeTitle: "やまのせいふくしゃ",
    colors: {
      node: "#2563eb",
      glow: "rgba(37,99,235,0.3)",
      bg: "#eff6ff",
      text: "#1d4ed8",
      path: "#60a5fa",
    },
  },
  {
    id: "castle",
    name: "じょうきゅうのしろ",
    emoji: "🏰",
    theme: "城",
    lessonRange: [17, 21],
    gradient: "from-purple-50 to-purple-100",
    accentColor: "purple",
    badgeTitle: "しろのけんじゃ",
    colors: {
      node: "#7c3aed",
      glow: "rgba(124,58,237,0.3)",
      bg: "#f5f3ff",
      text: "#6d28d9",
      path: "#a78bfa",
    },
  },
  {
    id: "sea",
    name: "じっせんのうみ",
    emoji: "🌊",
    theme: "海",
    lessonRange: [22, 27],
    gradient: "from-cyan-50 to-cyan-100",
    accentColor: "cyan",
    badgeTitle: "うみのぼうけんか",
    colors: {
      node: "#0891b2",
      glow: "rgba(8,145,178,0.3)",
      bg: "#ecfeff",
      text: "#0e7490",
      path: "#22d3ee",
    },
  },
  {
    id: "sky",
    name: "ちょうせんのそら",
    emoji: "🌤️",
    theme: "空",
    lessonRange: [28, 33],
    gradient: "from-rose-50 to-rose-100",
    accentColor: "rose",
    badgeTitle: "そらのマスター",
    colors: {
      node: "#e11d48",
      glow: "rgba(225,29,72,0.3)",
      bg: "#fff1f2",
      text: "#be123c",
      path: "#fb7185",
    },
  },
];

export function getWorldForLesson(order: number): WorldConfig {
  return (
    WORLDS.find(
      (w) => order >= w.lessonRange[0] && order <= w.lessonRange[1]
    ) ?? WORLDS[0]
  );
}

export function getWorldById(id: WorldId): WorldConfig {
  return WORLDS.find((w) => w.id === id) ?? WORLDS[0];
}
