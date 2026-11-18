"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Phone-width replacement for sortable column headers: a single select that
 * writes the same `?sort=&dir=` params the headers use.
 */
export function SortSelect({ options }: { options: { field: string; label: string }[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "";
  const dir = searchParams.get("dir") === "desc" ? "desc" : "asc";
  const current = sort ? `${sort}:${dir}` : "";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      const [field, direction] = value.split(":");
      params.set("sort", field);
      params.set("dir", direction);
    } else {
      params.delete("sort");
      params.delete("dir");
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <label className="relative flex items-center gap-2 text-sm text-muted-foreground">
      Sort by
      <span className="relative flex-1">
        <select
          value={current}
          onChange={(event) => handleChange(event.target.value)}
          className="h-11 w-full cursor-pointer appearance-none rounded-full border bg-card pr-9 pl-4 text-base font-medium text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <option value="">Default</option>
          {options.flatMap((option) => [
            <option key={`${option.field}:asc`} value={`${option.field}:asc`}>
              {option.label}, ascending
            </option>,
            <option key={`${option.field}:desc`} value={`${option.field}:desc`}>
              {option.label}, descending
            </option>,
          ])}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
        />
      </span>
    </label>
  );
}
