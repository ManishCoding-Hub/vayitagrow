import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { PageHero } from "@/components/shared/PageHero";
import { company } from "@/lib/config/company";
import { getProductBySlug } from "@/lib/services/products";
import { paramString } from "@/lib/url";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact & Orders",
  description: `Contact ${company.shortName} Bioorganics for dealership, distribution, and product inquiries across ${company.operatingStates.join(" and ")}.`,
};

export default async function ContactPage(props: PageProps<"/contact">) {
  const searchParams = await props.searchParams;
  const subject = paramString(searchParams, "subject");
  const productSlug = paramString(searchParams, "product");
  const product = productSlug ? await getProductBySlug(productSlug) : null;

  const contactCards = [
    {
      icon: MapPin,
      title: "Registered Office",
      lines: company.contact.addressLines,
    },
    {
      icon: Phone,
      title: "Phone",
      lines: [...company.contact.mobiles],
    },
    {
      icon: Mail,
      title: "Email",
      lines: [company.contact.email],
    },
    {
      icon: Clock,
      title: "Office Hours",
      lines: [company.contact.hours],
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact & Orders"
        title="Talk to our team"
        image="/images/wheat-sunset.webp"
        lede="Whether you want to join the dealer network, place an order inquiry, or ask about a product, send a message and we will get back to you."
      />

      <section className="bg-cream-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <MotionReveal>
            <div className="space-y-4">
              {contactCards.map((card) => (
                <div key={card.title} className="flex gap-4 rounded-3xl border border-brand-900/10 bg-white p-6">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <card.icon aria-hidden className="size-5" />
                  </div>
                  <div>
                    <h2 className="font-sans text-sm font-semibold">{card.title}</h2>
                    {card.lines.map((line) => (
                      <p key={line} className="mt-1 text-sm text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              <p className="rounded-3xl border border-dashed border-brand-900/20 p-5 text-xs leading-relaxed text-muted-foreground">
                We operate across {company.operatingStates.join(" and ")}. For dealership
                inquiries, please mention your district and the territory you can serve.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="rounded-[2rem] border border-brand-900/10 bg-white p-6 shadow-[0_40px_80px_-50px_rgba(5,46,24,0.45)] sm:p-10">
              <h2 className="text-3xl">Send an inquiry</h2>
              <p className="mt-1 mb-6 text-sm text-muted-foreground">
                {product
                  ? `Asking about ${product.name} - we have pre-filled part of the message for you.`
                  : "Fill in the form and our team will respond within working hours."}
              </p>
              <ContactForm initialSubject={subject} productName={product?.name} />
            </div>
          </MotionReveal>
        </div>
      </div>
      </section>
    </>
  );
}
