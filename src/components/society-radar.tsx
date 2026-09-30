"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SEED_SOCIETIES } from "@/lib/seed-societies";
import { DEMO_EVENTS } from "@/lib/demo-data";

function activityFor(slug: string): number {
  const events = DEMO_EVENTS.filter((e) => e.societySlug === slug).length;
  return Math.min(1, 0.25 + events * 0.35);
}

const POSITIONS: Record<string, { x: number; y: number }> = {
  ieee: { x: 50, y: 30 },
  ares: { x: 30, y: 45 },
  fes: { x: 70, y: 45 },
  junoon: { x: 22, y: 62 },
  "e-cell": { x: 78, y: 62 },
  crescendo: { x: 50, y: 78 },
};

export function SocietyRadar(): React.JSX.Element {
  const featured = SEED_SOCIETIES.filter((s) => s.slug in POSITIONS);
  return (
    <div className="relative overflow-hidden rounded-3xl border border-black/10 p-6 dark:border-white/10" role="img" aria-label="Society activity radar. Not a ranking.">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[25, 50, 75].map((r) => (
          <div key={r} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 dark:border-white/10" style={{ width: `${r * 2}%`, aspectRatio: "1" }} />
        ))}
      </div>
      <p className="text-center text-sm font-semibold tracking-widest opacity-60">NSUT</p>
      <div className="relative mx-auto aspect-square max-w-md">
        {featured.map((s) => {
          const pos = POSITIONS[s.slug] ?? { x: 50, y: 50 };
          const activity = activityFor(s.slug);
          return (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="absolute"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <Link
                href={`/societies/${s.slug}`}
                className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-2xl px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
                aria-label={`${s.name}, activity ${Math.round(activity * 100)} percent`}
              >
                <span className="relative flex h-4 w-4">
                  <span className="absolute h-full w-full animate-ping rounded-full opacity-40" style={{ backgroundColor: s.accentColor }} />
                  <span className="h-4 w-4 rounded-full border-2 border-white" style={{ backgroundColor: s.accentColor, transform: `scale(${0.8 + activity * 0.6})` }} />
                </span>
                <span className="text-xs font-medium">{s.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-2 text-center text-xs opacity-60">Activity visualization — not a competition. Click a society to open its mini-website.</p>
    </div>
  );
}
