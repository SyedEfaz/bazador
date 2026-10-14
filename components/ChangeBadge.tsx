import { formatPct } from "@/lib/bn";
import type { Product } from "@/lib/types";
export default function ChangeBadge({ change }: { change: Product["change"] }) {
  const cls = change.dir === "up" ? "badge-error" : change.dir === "down" ? "badge-success" : "badge-ghost";
  return <span className={`badge ${cls} badge-outline font-semibold`}>{formatPct(change.pct)}%</span>;
}
