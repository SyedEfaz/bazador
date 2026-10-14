import { formatPct } from "@/lib/bn";
import type { Product } from "@/lib/types";
export default function ChangeBadge({ change }: { change: NonNullable<Product["change"]> }) {
  const cls = change.dir === "up" ? "badge-error" : change.dir === "down" ? "badge-success" : "badge-ghost";
  const sym = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "-";
  return <span className={`badge ${cls} badge-outline font-semibold`}>{sym} {formatPct(change.pct)}%</span>;
}
