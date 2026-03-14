interface PathConnectorProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  status: "completed" | "active" | "incomplete";
  color: string;
  containerWidth: number;
  svgLeft: number;
}

export function PathConnector({
  from,
  to,
  status,
  color,
  containerWidth,
  svgLeft,
}: PathConnectorProps) {
  const x1 = (from.x / 100) * containerWidth - svgLeft;
  const y1 = from.y;
  const x2 = (to.x / 100) * containerWidth - svgLeft;
  const y2 = to.y;

  // S-curve control points for smooth path
  const cy1 = y1 + (y2 - y1) * 0.4;
  const cy2 = y1 + (y2 - y1) * 0.6;
  const d = `M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`;

  const glowId = `glow-${Math.round(from.x)}-${Math.round(from.y)}-${Math.round(to.x)}`;
  const pathId = `mpath-${Math.round(from.x)}-${Math.round(from.y)}-${Math.round(to.x)}`;

  if (status === "completed") {
    return (
      <>
        <defs>
          <filter id={glowId}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Glow line underneath */}
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          opacity={0.15}
          filter={`url(#${glowId})`}
        />
        {/* Main completed line */}
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.8}
          filter={`url(#${glowId})`}
        />
      </>
    );
  }

  if (status === "active") {
    const activeGlowId = `${glowId}-active`;
    return (
      <>
        <defs>
          <path id={pathId} d={d} />
          <filter id={activeGlowId}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Background line */}
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.15}
        />
        {/* Animated dash */}
        <use
          href={`#${pathId}`}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="8 14"
          opacity={0.7}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="72"
            to="0"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </use>
        {/* Leading circle */}
        <circle r="4" fill={color} opacity={0.9} filter={`url(#${activeGlowId})`}>
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
        {/* Trailing circle */}
        <circle r="2" fill={color} opacity={0.5}>
          <animateMotion dur="3s" repeatCount="indefinite" begin="0.5s">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      </>
    );
  }

  // incomplete
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--border-default)"
      strokeWidth={1}
      strokeLinecap="round"
      strokeDasharray="3 10"
      opacity={0.4}
    />
  );
}
