"use client";

import { motion } from "motion/react";
import * as React from "react";

export function HeroVisual(): React.JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 50, y: 40 });
  return (
    <div
      ref={ref}
      aria-hidden="true"
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
      }}
      className="pointer-events-none relative mx-auto h-40 max-w-2xl overflow-hidden rounded-3xl border border-black/10 dark:border-white/10"
    >
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-foreground/40"
          animate={{ x: (pos.x - 50) * (0.2 + (i % 5) * 0.15), y: (pos.y - 40) * (0.2 + (i % 4) * 0.15), opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity }}
          style={{ left: `${(i * 41) % 100}%`, top: `${(i * 29) % 100}%` }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center text-xs opacity-50">futuristic digital campus · motion respects reduced-motion</div>
    </div>
  );
}
