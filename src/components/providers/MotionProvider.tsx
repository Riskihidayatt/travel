"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * - LazyMotion + `m.*` + fitur yang dimuat async menjaga bundle awal tetap ramping.
 * - reducedMotion="user": animasi transform dimatikan otomatis untuk
 *   pengguna yang mengaktifkan prefers-reduced-motion.
 */
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 260, damping: 30 }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
