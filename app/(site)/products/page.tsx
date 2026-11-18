import { PackageSearch } from "lucide-react";
import type { Metadata } from "next";
import { FilterSelect } from "@/components/shared/FilterSelect";
import { EmptyState } from "@/components/shared/EmptyState";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { ProductCard } from "@/components/shared/ProductCard";
import { PageHero } from "@/components/shared/PageHero";
import { company } from "@/lib/config/company";
import { getCategories, getPublicProducts } from "@/lib/services/products";
import { paramNumber } from "@/lib/url";

export const metadata: Metadata = {
  title: "Products",
  description: `Bioorganic agricultural inputs by ${company.shortName} Bioorganics: plant growth promoters, organic fertilizers, soil conditioners, enzymes, and spray adjuvants.`,
};

export default async function ProductsPage(props: PageProps<"/products">) {
  const searchParams = await props.searchParams;
  const categoryId = paramNumber(searchParams, "category");

  const [products, categories] = await Promise.all([
    getPublicProducts(categoryId),
    getCategories(),
  ]);
  const activeCategory = categoryId
    ? categories.find((c) => c.categoryId === categoryId)
    : undefined;

  const categoryOptions = categories
    .filter((category) => category.productCount > 0)
    .map((category) => ({
      value: String(category.categoryId),
      label: category.categoryName,
    }));

  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Bioorganic inputs for productive farming"
        size="headline"
        image="/images/paddy-mist.webp"
        lede="Every product below is part of our current manufactured range, with usage, dosage, and pack sizes taken directly from the official product literature."
      />

      <section className="bg-cream-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {(categoryOptions.length > 0 || categoryId) && (
          <nav aria-label="Filter by category" className="mb-10">
            <FilterSelect
              label="Category"
              param="category"
              allLabel="All categories"
              options={categoryOptions}
            />
          </nav>
        )}

        {products.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="No products in this category"
            hint={
              activeCategory
                ? `${activeCategory.categoryName} has no published products yet. Choose another category.`
                : "No products are published yet."
            }
          />
        ) : (
          <ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <li key={product.productId}>
                <MotionReveal delay={Math.min(index * 0.05, 0.25)} className="h-full">
                  <ProductCard product={product} />
                </MotionReveal>
              </li>
            ))}
          </ul>
        )}
      </div>
      </section>
    </>
  );
}
