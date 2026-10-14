import { GridSkeleton } from "@/components/ProductGrid";
export default function Loading() {
  return (<div className="space-y-6"><div className="skeleton h-10 w-56" /><GridSkeleton n={8} /></div>);
}
