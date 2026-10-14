import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, unitLabel } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.slug}`} className="price-card card bg-base-100 border border-base-300 hover:border-primary transition-all duration-200">
      <div className="card-body p-4 gap-1">
        <div className="mb-1 grid h-12 w-12 place-items-center rounded-xl bg-base-200 text-3xl" aria-hidden="true">{p.image}</div>
        <h3 className="font-semibold text-lg leading-tight">{p.nameBn}</h3>
        <p className="text-sm opacity-60">{unitLabel(p.unit)}</p>
        <div className="mt-2 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs opacity-60">আজ</p>
            <p className="text-xl font-bold text-primary">{formatPrice(p.today)} টাকা</p>
          </div>
          <ChangeBadge change={p.change!} />
        </div>
      </div>
    </Link>
  );
}
