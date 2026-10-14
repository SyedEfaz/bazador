import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, unitLabel } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";
import ProductIcon from "./ProductIcon";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.auth}`} className="price-card card border border-base-300 bg-base-100 transition-all duration-200 hover:border-primary">
      <div className="card-body gap-2.5 p-3 sm:p-3.5">
        <div className="flex items-center gap-2.5">
          <ProductIcon product={p} className="h-10 w-10" />
          <div className="min-w-0">
            <h3 className="truncate font-semibold leading-tight">{p.nameBn}</h3>
            <p className="text-xs opacity-60">{unitLabel(p.unit)}</p>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-[11px] opacity-60">নমুনা দাম</p>
            <p className="font-bold leading-tight text-neutral">{formatPrice(p.today)} টাকা</p>
          </div>
          <ChangeBadge change={p.change} />
        </div>
      </div>
    </Link>
  );
}
