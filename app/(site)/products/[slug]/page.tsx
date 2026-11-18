import { ArrowRight, Beaker, Check, ChevronRight, Droplets, Package2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { Magnetic } from "@/components/shared/motion/Magnetic";
import { SplitReveal } from "@/components/shared/motion/SplitReveal";
import { getProductBySlug } from "@/lib/services/products";

// Product pages are generated on first request and then cached (ISR), so the
// build never queries the database. `dynamicParams` lets any valid slug render
// on demand; unknown slugs fall through to notFound().
export const dynamicParams = true;
export const revalidate = 3600;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} - ${product.categoryName}`,
    description: product.details.shortDescription,
    openGraph: product.imageUrl ? { images: [{ url: product.imageUrl }] } : undefined,
  };
}

export default async function ProductDetailPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const infoCards = [
    { title: "Dosage", value: product.details.dosage, icon: Droplets },
    ...(product.details.composition
      ? [{ title: "Composition", value: product.details.composition, icon: Beaker }]
      : []),
    { title: "Pack Sizes", value: product.details.packSizes.join(" · "), icon: Package2 },
  ];

  return (
    <>
      <section className="grain relative isolate overflow-hidden bg-brand-950 text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_80%_0%,rgba(42,157,75,0.35),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8 lg:pt-40 lg:pb-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-brand-200">
              <li>
                <Link href="/products" className="rounded-sm hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none">
                  Products
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="font-medium text-white">
                {product.name}
              </li>
            </ol>
          </nav>
          <MotionReveal>
            <p className="mt-8 text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase">
              {product.categoryName}
            </p>
          </MotionReveal>
          <SplitReveal as="h1" text={product.name} delay={0.1} className="text-display mt-4" />
        </div>
      </section>

      <article className="bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <MotionReveal className="lg:sticky lg:top-28 lg:self-start">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={`${product.name} product pack`}
                  width={0}
                  height={0}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                  className="h-auto w-full rounded-[2rem] border border-brand-900/10 shadow-[0_40px_80px_-40px_rgba(5,46,24,0.5)]"
                />
              ) : null}
            </MotionReveal>

            <div className="space-y-12">
              <MotionReveal>
                <p className="text-lg leading-relaxed text-pretty text-brand-950 sm:text-xl">
                  {product.description}
                </p>
              </MotionReveal>

              <MotionReveal delay={0.08}>
                <section aria-labelledby="benefits-heading">
                  <h2 id="benefits-heading" className="text-3xl text-brand-950">
                    Key benefits
                  </h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {product.details.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                          <Check aria-hidden className="size-3" />
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </section>
              </MotionReveal>

              <MotionReveal delay={0.16}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {infoCards.map((card) => (
                    <div key={card.title} className="rounded-3xl border border-brand-900/10 bg-white p-6">
                      <card.icon aria-hidden className="size-6 text-brand-600" />
                      <h3 className="mt-5 font-sans text-sm font-semibold">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.value}</p>
                    </div>
                  ))}
                </div>
              </MotionReveal>

              <MotionReveal delay={0.22}>
                <div className="flex flex-wrap gap-3 border-t border-brand-900/15 pt-8">
                  <Magnetic>
                    <Link
                      href={`/contact?subject=product&product=${product.slug}`}
                      className="inline-flex h-13 items-center gap-2 rounded-full bg-brand-600 px-7 text-base font-medium text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      Send an inquiry
                      <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  </Magnetic>
                  <Link
                    href="/products"
                    className="inline-flex h-13 items-center rounded-full border border-brand-900/20 px-7 text-base font-medium text-brand-900 transition-colors hover:bg-brand-900 hover:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    Back to all products
                  </Link>
                </div>
              </MotionReveal>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
