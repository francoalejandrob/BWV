"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function Enter({
  children,
  className,
  fromY = 24,
  delay = 0,
  spring = false,
}: {
  children: ReactNode;
  className?: string;
  /** Starting vertical offset in px. Negative falls in from above, positive rises from below. */
  fromY?: number;
  delay?: number;
  /** Use a gentle spring settle instead of a tween — for rare, first-paint moments. */
  spring?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        transform: reduceMotion ? "translateY(0px)" : `translateY(${fromY}px)`,
      }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={
        spring
          ? { type: "spring", duration: 0.8, bounce: 0.18, delay }
          : { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay }
      }
    >
      {children}
    </motion.div>
  );
}
