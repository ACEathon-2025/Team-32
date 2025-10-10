// src/components/ArrowIndicator.tsx
import React from "react";

interface Field {
  keyBox?: { x: number; y: number }[];
}

interface ArrowIndicatorProps {
  field: Field;
  scale: number;
}

export default function ArrowIndicator({ field, scale }: ArrowIndicatorProps) {
  if (!field.keyBox) return null;

  // calculate arrow positions
  const y = (field.keyBox[0].y + field.keyBox[2].y) / 2;
  const endX = field.keyBox[1].x * scale + 40;
  const startX = endX + 60;
  const startY = y * scale + 20;
  const endY = y * scale + 20;

  return (
    <svg
      className="absolute top-0 left-0 pointer-events-none"
      width="100%"
      height="100%"
    >
      <defs>
        <marker
          id="arrowhead-left"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="blue" />
        </marker>
      </defs>

      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="blue"
        strokeWidth="2"
        markerEnd="url(#arrowhead-left)"
      />
    </svg>
  );
}
