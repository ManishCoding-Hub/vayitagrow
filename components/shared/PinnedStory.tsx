"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface StoryStep {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

/**
 * Scroll-driven story. On large screens the section pins and the scroll
 * position advances the active step (crossfading its photo); everywhere else,
 * and for reduced motion, it is a plain stacked list. Steps are also
 * focusable so keyboard users can move through them without scrolling.
 */
export function PinnedStory({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string;
  title: string;
  steps: StoryStep[];
}) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Layout effect on purpose: its cleanup must un-wrap GSAP's pin-spacer
  // before React removes the section, or removeChild throws on navigation.
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: `+=${steps.length * 80}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) =>
          setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
      });
      return () => trigger.kill();
    });
    return () => media.revert();
  }, [steps.length]);

  return (
    <section ref={root} className="grain relative overflow-hidden bg-brand-950 text-white lg:h-screen">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:h-full lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-0">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase">{eyebrow}</p>
          <h2 className="text-headline mt-4 max-w-xl">{title}</h2>
          <ol className="mt-10 space-y-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                tabIndex={0}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={cn(
                  "rounded-2xl border p-5 transition-[background-color,border-color,opacity] duration-500 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none",
                  active === index
                    ? "border-white/25 bg-white/10"
                    : "border-white/10 opacity-60 lg:opacity-45",
                )}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm text-gold-300">0{index + 1}</span>
                  <div>
                    <h3 className="font-sans text-lg font-semibold">{step.title}</h3>
                    <p
                      className={cn(
                        "grid text-sm leading-relaxed text-brand-200 transition-[grid-template-rows,margin] duration-500",
                        active === index ? "mt-2 grid-rows-[1fr]" : "grid-rows-[1fr] lg:grid-rows-[0fr]",
                      )}
                    >
                      <span className="overflow-hidden">{step.description}</span>
                    </p>
                  </div>
                </div>
                <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl lg:hidden">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 1px, 100vw"
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative hidden aspect-[4/5] max-h-[78vh] w-full overflow-hidden rounded-[2rem] lg:block">
          {steps.map((step, index) => (
            <Image
              key={step.image}
              src={step.image}
              alt={step.imageAlt}
              fill
              sizes="50vw"
              className={cn(
                "object-cover transition-[opacity,transform] duration-1000 ease-out",
                active === index ? "scale-100 opacity-100" : "scale-110 opacity-0",
              )}
            />
          ))}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-950/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
