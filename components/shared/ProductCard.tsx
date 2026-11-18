import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ProductWithDetails } from "@/lib/types/catalog";

/** Public catalog card: real product cutout floating on a paper-toned surface. */
export function ProductCard({ product }: { product: ProductWithDetails }) {
  const imageSrc = product.details.imageCutoutUrl ?? product.imageUrl;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-900/10 bg-cream-50 transition-[box-shadow,translate] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(5,46,24,0.45)]">
      <div className="relative aspect-[5/4] overflow-hidden bg-[radial-gradient(circle_at_50%_40%,var(--color-brand-100),var(--color-cream-100))]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${product.name} product pack`}
            fill
            className="object-contain p-6 drop-shadow-[0_18px_22px_rgba(5,46,24,0.25)] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-2"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <p className="text-sm text-brand-700">{product.categoryName}</p>
        <h3 className="font-display text-2xl leading-tight tracking-tight">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.details.shortDescription}
        </p>
        <span className="mt-auto flex items-center justify-between pt-4 text-sm font-medium text-brand-700">
          View details
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-600 text-white transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight aria-hidden className="size-4" />
          </span>
        </span>
      </div>
      <span className="pointer-events-none absolute inset-0 rounded-3xl ring-ring/60 ring-inset group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}
