"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryView from "@/components/CategoryView";
import { ProductGridPlaceholder } from "@/components/ProductGrid";
import { getCategories, getProductsByCategory } from "@/lib/market-data";
import type { Category, Product } from "@/lib/types";

export default function CategoryPage() {
  const params = useParams<{ auth: string }>();
  const auth = params.auth;
  const [category, setCategory] = useState<Category | null>(null);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    Promise.all([getCategories(), getProductsByCategory(auth)])
      .then(([categories, products]) => {
        if (!active) return;
        setCategory(categories.find((item) => item.auth === auth) ?? null);
        setItems(products);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [auth]);

  if (loading) return <ProductGridPlaceholder />;
  if (error) return <p role="alert">Could not load this category. Check your connection and try again.</p>;
  if (!category) {
    return <div className="py-12 text-center"><h1 className="text-2xl font-bold">Category not found</h1><Link className="link link-primary mt-3 inline-block" href="/">Return home</Link></div>;
  }

  return (
    <>
      <div className="mb-7 border-b market-rule pb-5">
        <p className="market-kicker text-sm font-semibold text-secondary">পণ্যের বিভাগ</p>
        <h1 className="mt-1 text-3xl font-bold">{category.nameBn}</h1>
      </div>
      {items.length ? <CategoryView items={items} /> : <p className="opacity-70">এই বিভাগে কোনো পণ্য পাওয়া যায়নি।</p>}
    </>
  );
}
