import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Infinite horizontal ticker (CSS only). Pauses on hover; static for reduced motion. */
export function Marquee({
  children,
  duration = 45,
  className,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={cn("group flex overflow-hidden", className)}>
      {[false, true].map((hidden) => (
        <div
          key={String(hidden)}
          aria-hidden={hidden || undefined}
          style={{ ["--marquee-duration" as string]: `${duration}s` }}
          className="marquee-track flex shrink-0 items-center group-hover:[animation-play-state:paused]"
        >
          {children}
        </div>
      ))}
    </div>
  );
}
