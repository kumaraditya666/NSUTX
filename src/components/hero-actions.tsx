"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function HeroActions(): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
    >
      <Link
        href="/explore"
        className="inline-flex h-12 items-center rounded-full bg-foreground px-8 text-sm font-semibold tracking-wide text-background transition-transform hover:scale-[1.03]"
      >
        EXPLORE NSUT
      </Link>
      <Link
        href="/nsut-mode"
        className="inline-flex h-12 items-center rounded-full border px-8 text-sm font-semibold tracking-wide transition-colors hover:bg-black/5 dark:hover:bg-white/10"
        style={{ borderColor: "var(--hairline)" }}
      >
        ENTER NSUT MODE
      </Link>
    </motion.div>
  );
}
