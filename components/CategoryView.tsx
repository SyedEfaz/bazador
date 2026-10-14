"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice, parseBn } from "@/lib/bn";
import ProductGrid from "./ProductGrid";

export default function CategoryView({ items }: { items: Product[] }) {
  const [sort, setSort] = useState("default");
  const sorted = useMemo(() => {
    const priceOf = (p: Product) => parseBn(formatPrice(p.today)); // Bengali string -> number
    if (sort === "asc") return [...items].sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === "desc") return [...items].sort((a, b) => priceOf(b) - priceOf(a));
    return items;
  }, [items, sort]);
  return (
    <>
      <div className="flex justify-end mb-4">
        <label className="flex items-center gap-2 text-sm">সাজান
          <select className="select select-bordered select-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      <ProductGrid items={sorted} />
    </>
  );
}
