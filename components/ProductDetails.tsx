import type { Market, Product } from "@/lib/types";
import { formatPrice, unitLabel } from "@/lib/bn";
import ChangeBadge from "@/components/ChangeBadge";
import ProductIcon from "@/components/ProductIcon";

export default function ProductDetails({ product }: { product: Product & { markets: Market[] } }) {
  const prices = product.markets.flatMap(({ min, max }) => [min, max]);
  const low = prices.length ? Math.min(...prices) : product.today;
  const high = prices.length ? Math.max(...prices) : product.today;
  const average = prices.length
    ? Math.round(prices.reduce((total, price) => total + price, 0) / prices.length)
    : product.today;

  return (
    <article className="mx-auto max-w-5xl rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-base-300 pb-5">
        <div className="flex min-w-0 items-center gap-3">
          <ProductIcon product={product} className="h-14 w-14 sm:h-16 sm:w-16" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
            <div className="mt-1 flex flex-wrap gap-2">
              <span className="badge badge-primary badge-outline">{product.categoryNameBn}</span>
              <span className="badge badge-ghost">{unitLabel(product.unit)}</span>
            </div>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs opacity-65">আজকের নমুনা গড় দাম</p>
          <p className="text-2xl font-bold text-primary">{formatPrice(product.today)} টাকা</p>
          <ChangeBadge change={product.change} />
        </div>
      </header>

      <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
        {[["সর্বনিম্ন", low], ["সর্বোচ্চ", high], ["গড় দাম", average]].map(([label, value]) => (
          <div key={String(label)} className="rounded-xl bg-base-200 p-3 text-center sm:p-4">
            <p className="text-xs opacity-65 sm:text-sm">{label}</p>
            <p className="mt-1 text-lg font-bold sm:text-xl">{formatPrice(Number(value))} টাকা</p>
          </div>
        ))}
      </div>

      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold sm:text-xl">বাজারভিত্তিক দাম</h2>
            <p className="text-xs opacity-60">নমুনা বাজার তথ্য</p>
          </div>
          <span className="badge badge-ghost">{product.markets.length} টি বাজার</span>
        </div>
        <div className="overflow-x-auto rounded-xl border border-base-300">
          <table className="table table-zebra table-sm sm:table-md">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বোচ্চ</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((market) => (
                <tr key={`${market.market}-${market.division}`}>
                  <td className="font-medium">{market.market}</td>
                  <td>{market.division}</td>
                  <td className="text-right">{formatPrice(market.min)} টাকা</td>
                  <td className="text-right">{formatPrice(market.max)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs opacity-60">এগুলো নমুনা দাম, লাইভ বাজার তথ্য নয়।</p>
      </section>
    </article>
  );
}
