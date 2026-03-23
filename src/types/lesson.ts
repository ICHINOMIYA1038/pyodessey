export type WorldId = "forest" | "town" | "mountain" | "castle" | "sea" | "sky";

export interface LessonChallenge {
  description: string;
  starterCode: string;
  expectedOutput: string;
  hints?: string[];
}

export interface LessonMeta {
  title: string;
  slug: string;
  order: number;
  description: string;
  world: WorldId;
  challenge?: LessonChallenge;
}

export interface Lesson {
  meta: LessonMeta;
  content: string;
}

export interface LessonProgress {
  slug: string;
  completed: boolean;
  lastAccessedAt: string;
  completedAt?: string;
}

export interface AppProgress {
  lessons: Record<string, LessonProgress>;
  worldsCleared: WorldId[];
  badges: string[];
  totalXp: number;
}
