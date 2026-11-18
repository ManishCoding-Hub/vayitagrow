"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Headline reveal: each word rises out of a mask. Animates on mount by
 * default (hero) or once in view (`onView`). Plain text for reduced motion.
 */
export function SplitReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  onView = false,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  onView?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }

  const trigger = onView
    ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { animate: "show" };

  return (
    <Tag
      aria-label={text}
      className={className}
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden
          className={cn("inline-block overflow-hidden pb-[0.14em] align-bottom", "-mb-[0.14em]")}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%" },
              show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
            {index < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
