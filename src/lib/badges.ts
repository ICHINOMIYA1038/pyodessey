import { AppProgress } from "@/types/lesson";
import { getAllLessons } from "./lessons";

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  emoji: string;
  condition: (progress: AppProgress) => boolean;
}

const TOTAL_LESSONS = getAllLessons().length;

export const BADGES: BadgeDefinition[] = [
  // Milestone badges
  {
    id: "first-clear",
    name: "はじめの一歩",
    description: "最初のレッスンをクリア",
    emoji: "🌱",
    condition: (p) => Object.values(p.lessons).some((l) => l.completed),
  },
  {
    id: "five-clear",
    name: "かけだしぼうけんしゃ",
    description: "5つのレッスンをクリア",
    emoji: "⭐",
    condition: (p) => Object.values(p.lessons).filter((l) => l.completed).length >= 5,
  },
  {
    id: "ten-clear",
    name: "コードのつかいて",
    description: "10のレッスンをクリア",
    emoji: "🌟",
    condition: (p) => Object.values(p.lessons).filter((l) => l.completed).length >= 10,
  },
  {
    id: "twenty-clear",
    name: "パイソンマスター",
    description: "20のレッスンをクリア",
    emoji: "💎",
    condition: (p) => Object.values(p.lessons).filter((l) => l.completed).length >= 20,
  },
  {
    id: "all-clear",
    name: "でんせつのゆうしゃ",
    description: "すべてのレッスンをクリア",
    emoji: "👑",
    condition: (p) => Object.values(p.lessons).filter((l) => l.completed).length >= TOTAL_LESSONS,
  },
  // World badges
  {
    id: "world-forest",
    name: "もりのぼうけんしゃ",
    description: "きそのもりをクリア",
    emoji: "🌲",
    condition: (p) => p.worldsCleared.includes("forest"),
  },
  {
    id: "world-town",
    name: "まちのたんけんか",
    description: "ちゅうきゅうのまちをクリア",
    emoji: "🏘️",
    condition: (p) => p.worldsCleared.includes("town"),
  },
  {
    id: "world-mountain",
    name: "やまのせいふくしゃ",
    description: "おうようのやまをクリア",
    emoji: "⛰️",
    condition: (p) => p.worldsCleared.includes("mountain"),
  },
  {
    id: "world-castle",
    name: "しろのきし",
    description: "じょうきゅうのしろをクリア",
    emoji: "🏰",
    condition: (p) => p.worldsCleared.includes("castle"),
  },
  {
    id: "world-sea",
    name: "うみのモンスター",
    description: "じっせんのうみをクリア",
    emoji: "🌊",
    condition: (p) => p.worldsCleared.includes("sea"),
  },
  {
    id: "world-sky",
    name: "そらのおうじゃ",
    description: "ちょうせんのそらをクリア",
    emoji: "🌤️",
    condition: (p) => p.worldsCleared.includes("sky"),
  },
];

export function checkNewBadges(progress: AppProgress): BadgeDefinition[] {
  return BADGES.filter(
    (badge) => !progress.badges.includes(badge.id) && badge.condition(progress)
  );
}
