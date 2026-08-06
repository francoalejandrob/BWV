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
  offset = 60,
}: {
  children: ReactNode;
  className?: string;
  /** Vertical drift in px across the element's scroll range. */
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const transform = useMotionTemplate`translateY(${y}px)`;

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
