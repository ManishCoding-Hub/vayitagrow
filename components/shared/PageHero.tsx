import type { ReactNode } from "react";
import { ParallaxImage } from "@/components/shared/motion/ParallaxImage";
import { SplitReveal } from "@/components/shared/motion/SplitReveal";
import { MotionReveal } from "@/components/shared/MotionReveal";

/**
 * Dark photographic page opener shared by the public inner pages. The fixed
 * header floats over it, so the top padding clears the header height.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  size = "display",
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  image: string;
  /** `headline` for long titles (e.g. the legal company name). */
  size?: "display" | "headline";
  children?: ReactNode;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-brand-950 text-white">
      <ParallaxImage
        src={image}
        alt=""
        sizes="100vw"
        priority
        className="absolute inset-0 -z-10 opacity-45"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950/70 via-brand-950/30 to-brand-950"
      />
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-14 sm:px-6 sm:pt-40 sm:pb-20 lg:px-8 lg:pt-52 lg:pb-28">
        <MotionReveal>
          <p className="text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase">{eyebrow}</p>
        </MotionReveal>
        <SplitReveal as="h1" text={title} delay={0.1} className={`${size === "display" ? "text-display" : "text-headline"} mt-5 max-w-5xl`} />
        {lede ? (
          <MotionReveal delay={0.35}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-brand-100 sm:text-lg">
              {lede}
            </p>
          </MotionReveal>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
