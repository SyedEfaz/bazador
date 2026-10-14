export default function Loading() {
  return (
    <div className="space-y-6" role="status">
      <span className="sr-only">বিভাগের পণ্য লোড হচ্ছে...</span>

      <div aria-hidden="true" className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-7">
        <div className="market-loading-placeholder h-4 w-28 rounded" />
        <div className="mt-3 flex items-center gap-3">
          <div className="market-loading-placeholder h-10 w-10 rounded-xl" />
          <div className="market-loading-placeholder h-9 w-48 max-w-[70%] rounded-lg" />
        </div>
      </div>
      <div aria-hidden="true" className="flex justify-end">
        <div className="market-loading-placeholder h-9 w-44 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 sm:gap-3" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="market-loading-card rounded-xl border p-3.5">
            <div className="flex items-center gap-3">
              <div className="market-loading-placeholder h-10 w-10 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="market-loading-placeholder h-4 w-3/4 rounded" />
                <div className="market-loading-placeholder h-3 w-1/3 rounded" />
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div className="space-y-2">
                <div className="market-loading-placeholder h-3 w-20 rounded" />
                <div className="market-loading-placeholder h-5 w-28 rounded" />
              </div>
              <div className="market-loading-placeholder h-6 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
