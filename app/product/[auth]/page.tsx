"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AuthenticatedProduct from "@/components/AuthenticatedProduct";
import { getProduct } from "@/lib/market-data";
import type { Market, Product } from "@/lib/types";

type ProductWithMarkets = Product & { markets: Market[] };

export default function ProductPage() {
  const params = useParams<{ auth: string }>();
  const slug = params.auth;
  const [product, setProduct] = useState<ProductWithMarkets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    getProduct(slug)
      .then((item) => { if (active) setProduct(item); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  if (loading) return <div className="mx-auto max-w-5xl animate-pulse rounded-2xl border border-base-300 p-8 text-center">Loading product…</div>;
  if (error) return <p role="alert">Could not load this product. Check your connection and try again.</p>;
  if (!product) return <div className="py-12 text-center"><h1 className="text-2xl font-bold">Product not found</h1><Link className="link link-primary mt-3 inline-block" href="/">Return home</Link></div>;
  return <AuthenticatedProduct product={product} />;
}
