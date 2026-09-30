"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SEED_SOCIETIES } from "@/lib/seed-societies";
import { DEMO_ANNOUNCEMENTS, DEMO_EVENTS, DEMO_OPPORTUNITIES } from "@/lib/demo-data";

function demoActivityFor(slug: string): number {
  const score =
    DEMO_EVENTS.filter((e) => e.societySlug === slug).length * 3 +
    DEMO_ANNOUNCEMENTS.filter((a) => a.societySlug === slug).length * 2 +
    DEMO_OPPORTUNITIES.filter((o) => o.societySlug === slug && o.status !== "closed").length * 2;
  return Math.min(1, 0.2 + score * 0.15);
}

const POSITIONS: Record<string, { x: number; y: number }> = {
  ieee: { x: 50, y: 26 },
  ares: { x: 28, y: 40 },
  fes: { x: 72, y: 40 },
  devcomm: { x: 50, y: 44 },
  junoon: { x: 18, y: 62 },
  "e-cell": { x: 82, y: 62 },
  crescendo: { x: 38, y: 68 },
  mirage: { x: 62, y: 68 },
  gdg: { x: 50, y: 84 },
  debsoc: { x: 30, y: 84 },
  moksha: { x: 70, y: 84 },
  rotaract: { x: 50, y: 10 },
};

export function SocietyRadar({ activityBySlug }: { activityBySlug?: Map<string, number> }): React.JSX.Element {
  const featured = SEED_SOCIETIES.filter((s) => s.slug in POSITIONS);
  return (
    <section aria-label="NSUTX society activity radar. Node size reflects recent activity. Not a ranking." className="panel relative overflow-hidden rounded-2xl p-6">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[25, 50, 75].map((r) => (
          <div key={r} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: `${r * 2}%`, aspectRatio: "1", border: "1px solid var(--hairline)" }} />
        ))}
      </div>
      <p className="text-center text-sm font-bold tracking-[0.3em] opacity-70">NSUTX</p>
      <div className="relative mx-auto aspect-square max-w-md">
        {featured.map((s) => {
          const pos = POSITIONS[s.slug] ?? { x: 50, y: 50 };
          const activity = activityBySlug?.get(s.slug) ?? demoActivityFor(s.slug);
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
                className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-xl px-3 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                aria-label={`${s.name} mini website`}
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
      <p className="mt-2 text-center text-xs opacity-60">Node intensity reflects upcoming events, updates and open opportunities — never a ranking.</p>
    </section>
  );
}
