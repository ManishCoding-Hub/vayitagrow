import { ArrowRight, Eye, Factory, Target, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { Magnetic } from "@/components/shared/motion/Magnetic";
import { ParallaxImage } from "@/components/shared/motion/ParallaxImage";
import { SplitReveal } from "@/components/shared/motion/SplitReveal";
import { PageHero } from "@/components/shared/PageHero";
import { company } from "@/lib/config/company";
import { coreValues } from "@/lib/config/marketing";

export const metadata: Metadata = {
  title: "About Us",
  description: `${company.legalName} - an agricultural inputs manufacturer focused on sustainable farming, operating across ${company.operatingStates.join(" and ")}.`,
};

const operations = [
  {
    title: "Manufacturing",
    description:
      "Bioorganic inputs such as growth promoters, organic fertilizers, soil conditioners, enzymes, and spray adjuvants, produced under careful quality control.",
    icon: Factory,
  },
  {
    title: "Marketing & Distribution",
    description: `Products reach farmers through a dealer and distributor network across ${company.operatingStates.join(" and ")}, supported by planned dispatch and delivery tracking.`,
    icon: Target,
  },
  {
    title: "Field Support",
    description:
      "Field teams conduct dealer visits, application demonstrations, and farmer meetings, turning ground-level feedback into better products and better guidance.",
    icon: Users,
  },
];

const eyebrow = "text-xs font-semibold tracking-[0.3em] uppercase";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={company.legalName}
        size="headline"
        image="/images/wheat-sprouts.webp"
        lede={`A ${company.businessModel} agricultural solutions company manufacturing and marketing bioorganic inputs for sustainable, productive farming.`}
      />

      {/* Story */}
      <section className="bg-cream-50">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8 lg:py-36">
          <div>
            <MotionReveal>
              <p className={`${eyebrow} text-brand-600`}>Our Story</p>
            </MotionReveal>
            <SplitReveal
              onView
              text="Rooted in soil health, grown through partnership"
              className="text-headline mt-4 text-brand-950"
            />
            <MotionReveal delay={0.1}>
              <div className="mt-10 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  {company.shortName} Bioorganics was founded to bring dependable, science-led
                  bioorganic inputs to the farmers of {company.operatingStates.join(" and ")}. We
                  focus on products that improve soil health, crop nutrition, and overall farm
                  efficiency, which are the foundations of long-term productivity.
                </p>
                <p>
                  We work business-to-business: dealers, distributors, retailers, and
                  institutional buyers are our partners on the ground. Their counters and
                  godowns are where our products meet the farmer, so we invest in the network with
                  fair terms, reliable supply, and field support that shows up.
                </p>
                <p>
                  With our registered office in {company.registeredState}, and operations across
                  both states, we are building the organization, product range, and digital
                  systems of a company preparing for wider expansion.
                </p>
              </div>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.12}>
            <ParallaxImage
              src="/images/seedling-hands.webp"
              alt="Hands holding a young seedling in soil"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-[4/5] rounded-[2rem]"
            />
          </MotionReveal>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="grain relative bg-brand-950 text-white">
        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 lg:px-8 lg:py-32">
          {[
            {
              icon: Eye,
              title: "Our Vision",
              text: "To be a trusted name in sustainable agriculture, known for products that restore soil, support farmers, and prove that productive farming and responsible farming are the same thing.",
            },
            {
              icon: Target,
              title: "Our Mission",
              text: "Deliver quality bioorganic inputs through a strong dealer network, backed by technical field support and honest, transparent business practices.",
            },
          ].map((item, index) => (
            <MotionReveal key={item.title} delay={index * 0.1}>
              <div className="h-full rounded-3xl border border-white/15 bg-white/5 p-8 sm:p-10">
                <item.icon aria-hidden className="size-8 text-gold-300" />
                <h2 className="mt-8 text-4xl">{item.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-brand-100">{item.text}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className="bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-36">
          <MotionReveal>
            <p className={`${eyebrow} text-brand-600`}>What We Do</p>
          </MotionReveal>
          <SplitReveal
            onView
            text="Manufacturing, marketing, and field support"
            className="text-headline mt-4 max-w-4xl text-brand-950"
          />
          <MotionReveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Three connected capabilities that carry a product from formulation to a
              farmer&apos;s field.
            </p>
          </MotionReveal>
          <ol className="mt-16 divide-y divide-brand-900/15 border-y border-brand-900/15">
            {operations.map((item, index) => (
              <MotionReveal key={item.title}>
                <li className="grid gap-4 py-10 md:grid-cols-[6rem_1fr_1.2fr] md:items-baseline">
                  <span className="font-display text-xl text-gold-700">0{index + 1}</span>
                  <h3 className="flex items-center gap-3 text-3xl text-brand-950 sm:text-4xl">
                    <item.icon aria-hidden className="size-7 shrink-0 text-brand-600" />
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{item.description}</p>
                </li>
              </MotionReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-brand-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-36">
          <MotionReveal>
            <p className={`${eyebrow} text-brand-600`}>Core Values</p>
          </MotionReveal>
          <SplitReveal
            onView
            text="The principles behind every decision"
            className="text-headline mt-4 max-w-3xl text-brand-950"
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <MotionReveal key={value.title} delay={Math.min(index * 0.06, 0.24)}>
                <div className="group h-full rounded-3xl border border-brand-900/10 bg-white p-8 transition-[background-color,color,translate] duration-500 hover:-translate-y-1 hover:bg-brand-900 hover:text-white">
                  <value.icon
                    aria-hidden
                    className="size-8 text-brand-600 transition-colors group-hover:text-gold-300"
                  />
                  <h3 className="mt-8 text-2xl">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-brand-100">
                    {value.description}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain relative isolate overflow-hidden bg-brand-900 text-white">
        <ParallaxImage
          src="/images/wheat-sunset.webp"
          alt=""
          sizes="100vw"
          className="absolute inset-0 -z-10 opacity-40"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-brand-950/50" />
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <SplitReveal
            onView
            text="See the products behind the company"
            className="text-headline max-w-3xl"
          />
          <MotionReveal delay={0.15}>
            <Magnetic>
              <Link
                href="/products"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-white px-7 text-base font-medium text-brand-900 transition-colors hover:bg-gold-100 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
              >
                Explore the product range
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Magnetic>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
