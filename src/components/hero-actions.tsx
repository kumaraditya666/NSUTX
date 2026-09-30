"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function HeroActions(): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
    >
      <Link
        href="/explore"
        className="inline-flex h-12 items-center rounded-full bg-foreground px-6 font-medium text-background"
      >
        Explore Societies
      </Link>
      <Link
        href="/live"
        className="inline-flex h-12 items-center rounded-full border border-black/15 px-6 font-medium dark:border-white/20"
      >
        What&apos;s Happening?
      </Link>
    </motion.div>
  );
}
