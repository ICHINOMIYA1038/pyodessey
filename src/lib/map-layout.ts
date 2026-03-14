import { WORLDS } from "@/lib/world-config";

export interface MapNode {
  order: number;
  x: number; // percentage (0-100) of container width
  y: number; // absolute pixel position from top
}

// World-specific wave phase offsets for visual variety
const WORLD_OFFSETS: Record<string, number> = {
  forest: 0,
  town: Math.PI * 0.5,
  mountain: Math.PI,
  castle: Math.PI * 1.5,
};

export function getMapNodes(): MapNode[] {
  const nodes: MapNode[] = [];
  let y = 40;

  for (const world of WORLDS) {
    const [start, end] = world.lessonRange;
    const count = end - start + 1;
    const worldOffset = WORLD_OFFSETS[world.id] ?? 0;

    // Space for world banner (banner ~56px + gap below)
    y += 90;

    for (let i = 0; i < count; i++) {
      const order = start + i;
      const x = 50 + 18 * Math.sin((i + worldOffset) * 0.8);
      nodes.push({ order, x, y });
      y += 100;
    }

    // Gap between worlds
    y += 40;
  }

  return nodes;
}

export function getMapHeight(): number {
  const nodes = getMapNodes();
  if (nodes.length === 0) return 600;
  return nodes[nodes.length - 1].y + 160;
}
