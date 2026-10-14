import type { Product } from "@/lib/types";

const icons: Record<string, string> = {
  "miniket-rice": "🌾",
  "coarse-rice": "🌾",
  "masoor-dal": "🫘",
  "soybean-oil": "🫙",
  potato: "🥔",
  onion: "🧅",
  tomato: "🍅",
  tilapia: "🐟",
  ruhi: "🐟",
  "broiler-chicken": "🍗",
  beef: "🥩",
  "eggs-dozen": "🥚",
};

export default function ProductIcon({ product, className = "" }: { product: Pick<Product, "slug">; className?: string }) {
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-xl bg-base-200 ${className}`}>
      <span className="text-2xl leading-none">{icons[product.slug] ?? "🛍️"}</span>
    </span>
  );
}
