"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

export default function Parallax({
  children,
  className,
  offset = 15,
}: {
  children: ReactNode;
  className?: string;
  /**
   * Vertical drift as a percentage of the element's own height, across its
   * full pass through the viewport. Pair with a matching scale (buffer >=
   * offset on each edge) on the wrapped element so the drift never reveals
   * an edge — see usage sites.
   */
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const transform = useMotionTemplate`translateY(${y}%)`;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduceMotion ? undefined : { transform }}
    >
      {children}
    </motion.div>
  );
}
