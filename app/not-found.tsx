import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SplitReveal } from "@/components/shared/motion/SplitReveal";

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-950 px-4 text-center text-white">
      <Image
        src="/images/wheat-sprouts.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-brand-950/60 via-brand-950/40 to-brand-950" />
      <div className="relative flex flex-col items-center gap-6">
        <p className="text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase">Error 404</p>
        <SplitReveal as="h1" text="This row is unplanted" className="text-display max-w-4xl" />
        <p className="max-w-md text-base text-brand-200">
          The page you are looking for does not exist or may have moved. Head back to the
          homepage or browse our products.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-base font-medium text-brand-900 transition-colors hover:bg-gold-100 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
          >
            Go to homepage
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          <Link
            href="/products"
            className="inline-flex h-12 items-center rounded-full border border-white/30 px-6 text-base font-medium text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
          >
            Browse products
          </Link>
        </div>
      </div>
    </main>
  );
}
