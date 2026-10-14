import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { formatPrice, unitLabel } from "@/lib/bn";
import ChangeBadge from "@/components/ChangeBadge";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();
  const mins = p.markets.map((m) => m.min), maxs = p.markets.map((m) => m.max);
  const min = mins.length ? Math.min(...mins) : p.today;
  const max = maxs.length ? Math.max(...maxs) : p.today;
  const avg = p.markets.length ? Math.round(p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / p.markets.length) : p.today;
  const divisions = [...new Set(p.markets.map((m) => m.division))];
  const stat = (label: string, v: number) => (
    <div className="rounded-2xl bg-base-200 p-4 text-center">
      <p className="text-sm opacity-70">{label}</p>
      <p className="text-2xl font-bold text-primary">{formatPrice(v)} টাকা</p>
    </div>
  );
  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-base-200 text-4xl" aria-hidden="true">{p.image}</span>
        <h1 className="text-3xl font-bold">{p.nameBn}</h1>
        <ChangeBadge change={p.change!} />
      </div>
      <p className="mt-3 max-w-2xl opacity-75">আজকের গড় দাম {formatPrice(p.today)} টাকা; গতকাল ছিল {formatPrice(p.yesterday)} টাকা।</p>
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="badge badge-primary">{p.categoryIcon} {p.categoryNameBn}</span>
        <span className="badge badge-outline">{unitLabel(p.unit)}</span>
      </div>
      <div className="grid sm:grid-cols-3 gap-3 mt-6">
        {stat("সর্বনিম্ন দাম", min)}{stat("সর্বোচ্চ দাম", max)}{stat("গড় দাম", avg)}
      </div>
      <h2 className="section-heading text-2xl font-bold mt-10 mb-5">বাজারভিত্তিক আজকের দাম</h2>
      {divisions.map((d) => (
        <div key={d} className="mb-6">
          <h3 className="font-semibold mb-2 text-secondary">{d} বিভাগ</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {p.markets.filter((m) => m.division === d).map((m) => (
              <div key={m.market} className="flex items-center justify-between gap-3 rounded-xl border border-base-300 bg-base-100 p-4">
                <span>{m.market}</span>
                <span className="text-right font-semibold">{formatPrice(m.min)} – {formatPrice(m.max)} টাকা</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
