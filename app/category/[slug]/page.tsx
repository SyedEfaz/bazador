import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import CategoryView from "@/components/CategoryView";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [cats, all] = await Promise.all([getCategories(), getProducts()]);
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) notFound();
  const items = all.filter((p) => p.category === slug);
  return (
    <>
      <div className="mb-7 border-b market-rule pb-5">
        <p className="market-kicker text-sm font-semibold text-secondary">পণ্যের বিভাগ</p>
        <h1 className="mt-1 text-3xl font-bold">{cat.icon} {cat.nameBn}</h1>
      </div>
      {items.length ? <CategoryView items={items} /> : <p className="opacity-70">এই বিভাগে এখনো কোনো পণ্য নেই।</p>}
    </>
  );
}
