"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import CategoryView from "@/components/CategoryView";
import { ProductGridPlaceholder } from "@/components/ProductGrid";
import { getCategories, getProductsByCategory } from "@/lib/market-data";
import { useAsyncData } from "@/lib/use-async-data";

export default function CategoryPage() {
  const params = useParams<{ auth: string }>();
  const auth = params.auth;
  const fetchCategoryData = useCallback(async () => {
    const [categories, items] = await Promise.all([getCategories(), getProductsByCategory(auth)]);
    return {
      category: categories.find((item) => item.auth === auth) ?? null,
      items,
    };
  }, [auth]);
  const { data, loading, error } = useAsyncData(fetchCategoryData);

  if (loading) return <ProductGridPlaceholder />;
  if (error) return <p role="alert">Could not load this category. Check your connection and try again.</p>;
  const category = data?.category ?? null;
  const items = data?.items ?? [];
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
