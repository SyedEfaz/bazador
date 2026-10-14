import { getProducts } from "@/lib/api";
import { formatPct, formatPrice, unitShort } from "@/lib/bn";

export default async function Ticker() {
  const items = (await getProducts()).slice(0, 14);
  if (!items.length) return null;
  const row = items.map((p) => {
    const d = p.change!;
    const color = d.dir === "up" ? "text-error" : d.dir === "down" ? "text-success" : "opacity-60";
    return (
      <span key={p.id} className="mx-4 whitespace-nowrap text-xs sm:mx-6 sm:text-sm">
        {p.image} {p.nameBn} দাম {formatPrice(p.today)} টাকা/{unitShort(p.unit)}{" "}
        <b className={color}>{d.dir === "up" ? "▲" : d.dir === "down" ? "▼" : "–"} {formatPct(d.pct)}%</b>
      </span>
    );
  });
  return (
    <div className="marquee overflow-hidden border-b border-base-300 bg-base-200 py-1.5" role="region" aria-label="দামের হালনাগাদ">
      <div className="marquee-track">{row}<div className="flex" aria-hidden="true">{row}</div></div>
    </div>
  );
}
