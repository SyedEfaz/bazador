import { getProducts } from "@/lib/api";
import { formatPct, formatPrice, unitShort } from "@/lib/bn";

export default async function Ticker() {
  const items = (await getProducts()).slice(0, 14);
  if (!items.length) return null;
  const row = items.map((p) => {
    const d = p.change!;
    const color = d.dir === "up" ? "text-success" : d.dir === "down" ? "text-error" : "opacity-60";
    return (
      <span key={p.id} className="mx-6 whitespace-nowrap text-sm">
        {p.image} {p.nameBn} দাম {formatPrice(p.today)} টাকা/{unitShort(p.unit)}{" "}
        <b className={color}>{d.dir === "up" ? "▲" : d.dir === "down" ? "▼" : "–"} {formatPct(d.pct)}%</b>
      </span>
    );
  });
  return (
    <div className="marquee bg-base-200 border-b border-base-300 overflow-hidden py-2" role="region" aria-label="দামের হালনাগাদ">
      <div className="marquee-track">{row}<div className="flex" aria-hidden="true">{row}</div></div>
    </div>
  );
}
