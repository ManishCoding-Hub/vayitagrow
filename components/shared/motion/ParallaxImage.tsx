"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Photo that drifts slower than the page. The inner layer is 30% taller than
 * the frame so a +/-10% travel never exposes an edge.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  priority = false,
  speed = 10,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Travel in percent of the layer height; keep <= 11. */
  speed?: number;
  className?: string;
  imageClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${speed}%`, `${speed}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y, top: "-15%", bottom: "-15%" }} className="absolute inset-x-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
    </div>
  );
}
