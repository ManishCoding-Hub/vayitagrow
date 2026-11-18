"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Hero "pack stage": one product at a time floating over a soft glow, with a
 * ghosted index, clickable progress ticks and a mouse-only tilt. Auto-advance
 * is driven by the active tick's CSS progress animation (no timers), pauses on
 * hover/focus, and is off entirely for reduced motion.
 */

export type HeroSlide = { src: string; name: string; categoryName: string };

const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export function HeroSlideshow({
  slides,
  intervalMs = 4800,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), { stiffness: 140, damping: 16 });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [10, -10]), { stiffness: 140, damping: 16 });

  if (slides.length === 0) return null;
  const current = slides[index];
  const autoplay = !reduce && slides.length > 1;
  const go = (step: 1 | -1) => {
    setDirection(step);
    setIndex((i) => (i + step + slides.length) % slides.length);
  };
  const jump = (target: number) => {
    setDirection(target > index ? 1 : -1);
    setIndex(target);
  };
  const next = () => go(1);
  const arrowClass =
    "absolute top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-brand-900 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none";

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured products"
      className="relative mx-auto w-full max-w-sm sm:max-w-md"
      onPointerEnter={(event) => event.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setPaused(false);
        pointerX.set(0);
        pointerY.set(0);
      }}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (slides.length < 2) return;
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-2 z-0 font-display text-[6rem] sm:-top-10 sm:text-[9rem] leading-none text-white/[0.08] select-none"
      >
        {pad(index + 1)}
      </span>

      <div
        className="relative z-10 h-[20rem] sm:h-[24rem] lg:h-[27rem] [perspective:1000px]"
        onPointerMove={(event) => {
          if (reduce || event.pointerType !== "mouse") return;
          const box = event.currentTarget.getBoundingClientRect();
          pointerX.set((event.clientX - box.left) / box.width - 0.5);
          pointerY.set((event.clientY - box.top) / box.height - 0.5);
        }}
      >
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 size-[18rem] sm:size-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(88,180,120,0.45),rgba(88,180,120,0)_68%)]"
        />
        {slides.length > 1 ? (
          <>
            <button type="button" aria-label="Previous product" onClick={() => go(-1)} className={cn(arrowClass, "left-0")}>
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button type="button" aria-label="Next product" onClick={() => go(1)} className={cn(arrowClass, "right-0")}>
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </>
        ) : null}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.src}
            initial={reduce ? false : { opacity: 0, x: 90 * direction, scale: 0.9, rotate: 5 * direction }}
            animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -90 * direction, scale: 0.94, rotate: -4 * direction }}
            transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
            style={reduce ? undefined : { rotateX, rotateY }}
            className="absolute inset-0"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative size-full"
            >
              <Image
                src={current.src}
                alt={`${current.name} product pack`}
                fill
                priority={index === 0}
                sizes="28rem"
                className="object-contain p-10 sm:p-6 drop-shadow-[0_40px_40px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-4 space-y-4">
        <div aria-live="polite" className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-brand-200">
              {current.categoryName}
            </p>
            <p className="mt-1 truncate font-display text-3xl text-white">{current.name}</p>
          </div>
          <p className="shrink-0 pb-1 text-xs tracking-[0.2em] text-brand-200 tabular-nums">
            {pad(index + 1)} / {pad(slides.length)}
          </p>
        </div>

        <div className="flex gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show ${slide.name}`}
              aria-current={i === index}
              onClick={() => jump(i)}
              className="group flex-1 rounded-full py-2 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
            >
              <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/20">
                {i < index || (i === index && !autoplay) ? (
                  <span className="absolute inset-0 bg-white/70" />
                ) : null}
                {i === index && autoplay ? (
                  <span
                    key={index}
                    style={{ animationDuration: `${intervalMs}ms` }}
                    onAnimationEnd={next}
                    className={cn(
                      "hero-progress absolute inset-0 origin-left bg-gold-300",
                      paused && "[animation-play-state:paused]",
                    )}
                  />
                ) : null}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
