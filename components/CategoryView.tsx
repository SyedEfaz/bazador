"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";

export default function CategoryView({ items }: { items: Product[] }) {
  const [sortOrder, setSortOrder] = useState("default");
  const sortedItems = useMemo(() => {
    if (sortOrder === "asc") return [...items].sort((a, b) => a.today - b.today);
    if (sortOrder === "desc") return [...items].sort((a, b) => b.today - a.today);
    return items;
  }, [items, sortOrder]);
  return (
    <>
      <div className="flex justify-end mb-4">
        <label className="flex items-center gap-2 text-sm">সাজান
          <select className="select select-bordered select-sm" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      <ProductGrid items={sortedItems} />
    </>
  );
}
