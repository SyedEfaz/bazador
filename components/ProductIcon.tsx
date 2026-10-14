import Image from "next/image";
import type { Product } from "@/lib/types";

export default function ProductIcon({ product, className = "" }: { product: Pick<Product, "image">; className?: string }) {
  return (
    <span aria-hidden="true" className={`relative grid shrink-0 place-items-center overflow-hidden rounded-xl bg-base-200 ${className}`}>
      {product.image ? (
        <Image src={product.image} alt="" fill unoptimized sizes="64px" className="rounded-xl object-cover" />
      ) : (
        <span className="text-2xl leading-none">🛍️</span>
      )}
    </span>
  );
}
