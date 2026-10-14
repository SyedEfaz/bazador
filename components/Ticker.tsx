import { getProducts } from "@/lib/market-data";
import { formatPct, formatPrice, unitShort } from "@/lib/bn";

export default function Ticker() {
  const items = getProducts().slice(0, 14);
  if (!items.length) return null;
  const row = items.map((p) => {
    const d = p.change;
    const color = d.dir === "up" ? "text-error" : d.dir === "down" ? "text-success" : "opacity-60";
    return (
      <span key={p.id} className="mx-4 whitespace-nowrap text-xs sm:mx-6 sm:text-sm">
        {p.nameBn} দাম {formatPrice(p.today)} টাকা/{unitShort(p.unit)}{" "}
        <b className={`${color} inline-flex items-center gap-1`}>{formatPct(d.pct)}%</b>
      </span>
    );
  });
  return (
    <div className="marquee overflow-hidden border-b border-base-300 bg-base-200 py-1.5" role="region" aria-label="নমুনা দামের তালিকা">
      <div className="marquee-track">{row}<div className="flex" aria-hidden="true">{row}</div></div>
    </div>
  );
}
