import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
export default function ProductGrid({ items }: { items: Product[] }) {
  return <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 sm:gap-3">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>;
}
export function GridSkeleton({ n = 8 }: { n?: number }) {
  return <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 sm:gap-3">{Array.from({ length: n }).map((_, i) => <div key={i} className="skeleton h-24 w-full" />)}</div>;
}
