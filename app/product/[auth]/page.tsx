"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import AuthenticatedProduct from "@/components/AuthenticatedProduct";
import { getProduct } from "@/lib/market-data";
import { useAsyncData } from "@/lib/use-async-data";

export default function ProductPage() {
  const params = useParams<{ auth: string }>();
  const auth = params.auth;
  const fetchProduct = useCallback(() => getProduct(auth), [auth]);
  const { data: product, loading, error } = useAsyncData(fetchProduct);

  if (loading) return (
    <div role="status" className="mx-auto max-w-5xl animate-pulse rounded-2xl border border-base-300 p-8 text-center">
      <span className="sr-only">পণ্য লোড হচ্ছে...</span>
      <span aria-hidden="true">Loading product…</span>
    </div>
  );
  if (error) return <p role="alert">Could not load this product. Check your connection and try again.</p>;
  if (!product) return <div className="py-12 text-center"><h1 className="text-2xl font-bold">Product not found</h1><Link className="link link-primary mt-3 inline-block" href="/">Return home</Link></div>;
  return <AuthenticatedProduct product={product} />;
}
