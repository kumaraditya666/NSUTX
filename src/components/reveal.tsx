"use client";

import { motion } from "motion/react";

// Subtle scroll reveal. Disabled automatically when the user prefers
// reduced motion (see Providers → MotionConfig reducedMotion="user").
export function Reveal({ children, label }: { children: React.ReactNode; label: string }): React.JSX.Element {
  return (
    <motion.section
      aria-label={label}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
