export default function Loading() {
  return (
    <div className="space-y-8" role="status">
      <span className="sr-only">বাজার দর লোড হচ্ছে...</span>
      <section aria-hidden="true" className="market-loading-hero overflow-hidden rounded-3xl border p-6 sm:p-9">
        <div className="grid items-center gap-7">
          <div className="space-y-4">
            <div className="market-loading-placeholder h-7 w-36 rounded-full" />
            <div className="market-loading-placeholder h-9 w-full max-w-md rounded-lg" />
            <div className="market-loading-placeholder h-4 w-full max-w-lg rounded" />
            <div className="market-loading-placeholder h-4 w-4/5 max-w-sm rounded" />
            <div className="market-loading-placeholder mt-2 h-10 w-36 rounded-lg" />
          </div>
        </div>
      </section>

      {[0, 1, 2].map((section) => (
        <section key={section} aria-hidden="true" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="market-loading-placeholder h-7 w-40 rounded-lg" />
            <div className="market-loading-placeholder h-4 w-28 rounded" />
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-3">
            {Array.from({ length: section === 2 ? 6 : 3 }, (_, index) => (
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
        </section>
      ))}
    </div>
  );
}
