import { GridSkeleton } from "@/components/ProductGrid";
export default function Loading() {
  
  return (<div className="space-y-6"><div className="skeleton h-56 w-full rounded-3xl" /><div className="skeleton h-8 w-48" /><GridSkeleton n={8} /></div>);
}
