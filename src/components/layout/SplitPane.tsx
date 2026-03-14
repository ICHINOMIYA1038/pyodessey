"use client";

import { Panel, Group, Separator } from "react-resizable-panels";

interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function SplitPane({ left, right }: SplitPaneProps) {
  return (
    <Group orientation="horizontal" className="h-full" id="lesson-split">
      <Panel id="lesson-left" defaultSize={50} minSize={25}>
        {left}
      </Panel>
      <Separator
        id="lesson-separator"
        className="group relative w-2 transition-colors"
        style={{ background: 'var(--border-default)' }}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.background = 'var(--brand-purple)'; }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.background = 'var(--border-default)'; }}
      >
        {/* Grip dots */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="h-1 w-1 rounded-full" style={{ background: 'var(--text-secondary)' }} />
          <div className="h-1 w-1 rounded-full" style={{ background: 'var(--text-secondary)' }} />
          <div className="h-1 w-1 rounded-full" style={{ background: 'var(--text-secondary)' }} />
        </div>
      </Separator>
      <Panel id="lesson-right" defaultSize={50} minSize={25}>
        {right}
      </Panel>
    </Group>
  );
}
