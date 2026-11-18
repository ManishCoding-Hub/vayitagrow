import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { HeroSlideshow } from "@/components/shared/HeroSlideshow";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { Magnetic } from "@/components/shared/motion/Magnetic";
import { Marquee } from "@/components/shared/motion/Marquee";
import { ParallaxImage } from "@/components/shared/motion/ParallaxImage";
import { SplitReveal } from "@/components/shared/motion/SplitReveal";
import { PinnedStory, type StoryStep } from "@/components/shared/PinnedStory";
import { ProductCard } from "@/components/shared/ProductCard";
import { company } from "@/lib/config/company";
import { categoryIcons, DEFAULT_CATEGORY_ICON, whyChooseUs } from "@/lib/config/marketing";
import { getCategories, getPublicProducts } from "@/lib/services/products";

// ISR: the homepage is statically served and refreshed hourly, so normal page
// loads never hit the database. The fetch is wrapped so a database outage
// degrades to an empty catalog instead of failing the build/render.
export const revalidate = 3600;

const storyImages = [
  { image: "/images/field-aerial.webp", imageAlt: "Aerial view of green and harvested paddy plots" },
  { image: "/images/seedling-hands.webp", imageAlt: "Hands holding a young seedling in soil" },
  { image: "/images/wheat-sprouts.webp", imageAlt: "Rows of young wheat sprouts in warm light" },
  { image: "/images/wheat-sunset.webp", imageAlt: "A golden wheat field at sunset" },
];

const primaryCta =
  "inline-flex h-13 items-center gap-2 rounded-full bg-white px-7 text-base font-medium text-brand-900 transition-colors hover:bg-gold-100 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none";
const ghostCta =
  "inline-flex h-13 items-center rounded-full border border-white/30 px-7 text-base font-medium text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none";

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof getPublicProducts>> = [];
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  try {
    [products, categories] = await Promise.all([getPublicProducts(), getCategories()]);
  } catch (error) {
    console.error("Homepage catalog load failed; rendering without catalog:", error);
  }
  const featured = products.slice(0, 4);
  const heroSlides = products
    .filter((p) => p.details.imageCutoutUrl)
    .map((p) => ({
      src: p.details.imageCutoutUrl as string,
      name: p.name,
      categoryName: p.categoryName,
    }));
  const activeCategories = categories.filter((c) => c.productCount > 0);

  // Only verifiable facts - no invented statistics.
  const facts = [
    { label: "Bioorganic Products", value: products.length },
    { label: "Product Categories", value: activeCategories.length },
    { label: "Operating States", value: company.operatingStates.length },
  ];

  const story: StoryStep[] = whyChooseUs.map((pillar, index) => ({
    title: pillar.title,
    description: pillar.description,
    ...storyImages[index % storyImages.length],
  }));

  return (
    <>
      {/* Hero */}
      <section className="grain relative isolate flex min-h-svh flex-col overflow-hidden bg-brand-950 text-white">
        <Image
          src="/images/paddy-mist.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-50"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(5,46,24,0.75),rgba(5,46,24,0.35)_45%,rgba(5,46,24,0.95))]"
        />
        <div className="mx-auto grid w-full max-w-7xl flex-1 gap-12 px-4 pt-36 pb-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
          <div className="space-y-8">
            <MotionReveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-brand-100 uppercase backdrop-blur">
                <span aria-hidden className="size-1.5 rounded-full bg-gold-300" />
                {company.industry}
              </p>
            </MotionReveal>
            <SplitReveal as="h1" text={company.tagline} delay={0.15} className="text-display max-w-4xl" />
            <MotionReveal delay={0.7}>
              <p className="max-w-xl text-base leading-relaxed text-pretty text-brand-100 sm:text-lg">
                {company.legalName} manufactures and markets bioorganic inputs that improve soil
                health, crop nutrition, and farm productivity - supplied through a trusted dealer
                network across {company.operatingStates.join(" and ")}.
              </p>
            </MotionReveal>
            <MotionReveal delay={0.85}>
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Link href="/products" className={primaryCta}>
                    Explore Products
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </Magnetic>
                <Link href="/contact" className={ghostCta}>
                  Become a Dealer
                </Link>
              </div>
            </MotionReveal>
          </div>

          {heroSlides.length > 0 ? (
            <MotionReveal delay={0.5} className="hidden lg:block">
              <HeroSlideshow slides={heroSlides} />
            </MotionReveal>
          ) : null}
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dd className="font-display text-4xl text-white sm:text-5xl">
                  <AnimatedNumber value={fact.value} />
                </dd>
                <dt className="mt-1 text-xs text-brand-200 sm:text-sm">{fact.label}</dt>
              </div>
            ))}
          </dl>
          <p aria-hidden className="mt-8 hidden items-center justify-center gap-2 text-xs tracking-[0.3em] text-brand-200 uppercase lg:flex">
            Scroll <ChevronDown className="size-4 animate-bounce" />
          </p>
        </div>
      </section>

      {/* Category marquee */}
      {activeCategories.length > 0 ? (
        <section aria-label="Product categories" className="overflow-hidden border-b bg-cream-50 py-8">
          <Marquee>
            {activeCategories.map((category) => (
              <span key={category.categoryId} className="flex items-center">
                <span className="font-display px-8 text-4xl whitespace-nowrap text-brand-900 sm:text-6xl">
                  {category.categoryName}
                </span>
                <span aria-hidden className="size-2.5 rounded-full bg-gold-500" />
              </span>
            ))}
          </Marquee>
        </section>
      ) : null}

      {/* About snapshot */}
      <section className="bg-cream-50">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-36">
          <MotionReveal>
            <ParallaxImage
              src="/images/seedling-hands.webp"
              alt="Hands holding a young seedling in soil"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/5] rounded-[2rem]"
            />
          </MotionReveal>
          <div>
            <MotionReveal>
              <p className="text-xs font-semibold tracking-[0.3em] text-brand-600 uppercase">Who We Are</p>
            </MotionReveal>
            <SplitReveal
              onView
              text="A bioorganics manufacturer built for the dealer network"
              className="text-headline mt-4 text-brand-950"
            />
            <MotionReveal delay={0.1}>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  We combine scientific agricultural practice with strong field support - helping
                  dealers, distributors, and the farmers they serve get dependable results from
                  every input.
                </p>
                <p>
                  From plant growth promoters and organic fertilizers to soil conditioners and
                  spray adjuvants, every product is formulated to support sustainable and
                  productive farming.
                </p>
                <p>
                  Our field teams work alongside dealers in {company.operatingStates.join(" and ")}{" "}
                  - demonstrating correct application, collecting feedback, and building the
                  long-term relationships this business runs on.
                </p>
              </div>
              <Link
                href="/about"
                className="group mt-10 inline-flex items-center gap-3 text-base font-medium text-brand-700 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-brand-600 text-white transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight aria-hidden className="size-5" />
                </span>
                Learn more about us
              </Link>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* Pinned story */}
      <PinnedStory eyebrow="Why Dealers Choose Us" title="Built on the soil, backed in the field" steps={story} />

      {/* Categories */}
      {activeCategories.length > 0 ? (
        <section className="bg-brand-50">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
            <MotionReveal>
              <p className="text-xs font-semibold tracking-[0.3em] text-brand-600 uppercase">Product Range</p>
            </MotionReveal>
            <SplitReveal
              onView
              text="Solutions for every stage of the crop cycle"
              className="text-headline mt-4 max-w-3xl text-brand-950"
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {activeCategories.map((category, index) => {
                const Icon = categoryIcons[category.categoryName] ?? DEFAULT_CATEGORY_ICON;
                return (
                  <MotionReveal key={category.categoryId} delay={Math.min(index * 0.05, 0.3)}>
                    <Link
                      href={`/products?category=${category.categoryId}`}
                      className="group flex h-full min-h-44 flex-col rounded-3xl border border-brand-900/10 bg-white p-6 transition-[background-color,color,translate] duration-500 hover:-translate-y-1 hover:bg-brand-900 hover:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      <Icon aria-hidden className="size-7 text-brand-600 transition-colors group-hover:text-gold-300" />
                      <p className="mt-6 font-display text-xl leading-snug">{category.categoryName}</p>
                      <p className="mt-auto flex items-center justify-between pt-4 text-xs font-medium text-brand-600 transition-colors group-hover:text-brand-200">
                        {category.productCount} product{category.productCount === 1 ? "" : "s"}
                        <ArrowUpRight aria-hidden className="size-4" />
                      </p>
                    </Link>
                  </MotionReveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Featured products */}
      {featured.length > 0 ? (
        <section className="bg-cream-50">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <MotionReveal>
                  <p className="text-xs font-semibold tracking-[0.3em] text-brand-600 uppercase">
                    Featured Products
                  </p>
                </MotionReveal>
                <SplitReveal onView text="From our current range" className="text-headline mt-4 text-brand-950" />
              </div>
              <Link
                href="/products"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-brand-900/20 px-6 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-900 hover:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                View all products
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product, index) => (
                <MotionReveal key={product.productId} delay={Math.min(index * 0.08, 0.3)}>
                  <ProductCard product={product} />
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Presence */}
      <section className="grain relative isolate overflow-hidden bg-brand-950 text-white">
        <ParallaxImage
          src="/images/field-aerial.webp"
          alt=""
          sizes="100vw"
          className="absolute inset-0 -z-10 opacity-30"
        />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
          <MotionReveal>
            <p className="text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase">Where We Operate</p>
          </MotionReveal>
          <SplitReveal
            onView
            text={`Serving ${company.operatingStates.join(" and ")}`}
            className="text-headline mt-4 max-w-4xl"
          />
          <MotionReveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-brand-100">
              Our dealer and distribution network is growing across{" "}
              {company.operatingStates.join(" and ")}, with our registered office in{" "}
              {company.registeredState}.
            </p>
          </MotionReveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {company.operatingStates.map((state, index) => (
              <MotionReveal key={state} delay={index * 0.1}>
                <div className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
                  <p className="font-display text-4xl sm:text-5xl">{state}</p>
                  <p className="mt-3 text-sm text-brand-200">
                    {state === company.registeredState
                      ? "Registered office & operations"
                      : "Dealer & distribution network"}
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
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-28 text-center sm:px-6 lg:px-8 lg:py-40">
          <SplitReveal
            onView
            text="Partner with us as a dealer or distributor"
            className="text-headline max-w-4xl"
          />
          <MotionReveal delay={0.1}>
            <p className="max-w-xl text-pretty text-brand-100">
              Join our growing network in {company.operatingStates.join(" and ")}. Send an
              inquiry and our team will get in touch to discuss dealership terms, product
              training, and territory support.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <Magnetic>
              <Link href="/contact" className={primaryCta}>
                Send an Inquiry
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Magnetic>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
