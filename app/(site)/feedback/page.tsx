import { MessageSquareHeart, Sprout, Users } from "lucide-react";
import type { Metadata } from "next";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { PageHero } from "@/components/shared/PageHero";
import { company } from "@/lib/config/company";
import { FeedbackForm } from "./feedback-form";

export const metadata: Metadata = {
  title: "Feedback",
  description: `Share your experience with ${company.shortName} Bioorganics products and service - feedback from dealers, retailers, and farmers shapes what we build next.`,
};

const reasons = [
  {
    icon: Sprout,
    title: "Product performance",
    description:
      "Tell us how our products perform on real crops and soils - results, dosage experience, and anything that could work better.",
  },
  {
    icon: Users,
    title: "Dealer & service experience",
    description:
      "Supply timelines, packaging, field support, business terms - we want to know how working with us feels on the ground.",
  },
  {
    icon: MessageSquareHeart,
    title: "Suggestions",
    description:
      "Ideas for new products, pack sizes, or regional needs we should be covering. The best suggestions come from the field.",
  },
];

export default function FeedbackPage() {
  return (
    <>
      <PageHero
        eyebrow="Feedback"
        title="Your experience shapes our products"
        size="headline"
        image="/images/field-aerial.webp"
        lede="We are building this company together with our dealer network and the farmers they serve. Honest feedback - good or critical - is always welcome."
      />

      <section className="bg-cream-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <MotionReveal>
            <div className="space-y-4">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4 rounded-3xl border border-brand-900/10 bg-white p-6">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <reason.icon aria-hidden className="size-5" />
                  </div>
                  <div>
                    <h2 className="font-sans text-sm font-semibold">{reason.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="rounded-[2rem] border border-brand-900/10 bg-white p-6 shadow-[0_40px_80px_-50px_rgba(5,46,24,0.45)] sm:p-10">
              <h2 className="text-3xl">Share your feedback</h2>
              <p className="mt-1 mb-6 text-sm text-muted-foreground">
                A few honest lines are more valuable than a long form.
              </p>
              <FeedbackForm />
            </div>
          </MotionReveal>
        </div>
      </div>
      </section>
    </>
  );
}
