import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
export default function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 sm:gap-3">
      {items.map((product) => <ProductCard key={product.id} p={product} />)}
    </div>
  );
}
export function GridSkeleton({ n = 8 }: { n?: number }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 sm:gap-3" aria-hidden="true">
      {Array.from({ length: n }, (_, index) => (
        <div key={index} className="market-loading-card rounded-xl border p-3.5">
          <div className="flex items-center gap-3">
            <div className="market-shimmer h-10 w-10 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="market-shimmer h-4 w-3/4 rounded" />
              <div className="market-shimmer h-3 w-1/3 rounded" />
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="space-y-2">
              <div className="market-shimmer h-3 w-20 rounded" />
              <div className="market-shimmer h-5 w-28 rounded" />
            </div>
            <div className="market-shimmer h-6 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
