import { GridSkeleton } from "@/components/ProductGrid";
export default function Loading() {
  return (
    <div className="market-loading space-y-6" role="status" aria-live="polite">
      <span className="sr-only">বিভাগের পণ্য লোড হচ্ছে...</span>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-7">
        <div className="market-shimmer h-4 w-28 rounded" />
        <div className="mt-3 flex items-center gap-3">
          <div className="market-shimmer h-10 w-10 rounded-xl" />
          <div className="market-shimmer h-9 w-48 max-w-[70%] rounded-lg" />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="market-shimmer h-9 w-44 rounded-lg" />
      </div>
      <GridSkeleton n={8} />
    </div>
  );
}
