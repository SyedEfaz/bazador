import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/market-data";
import CategoryView from "@/components/CategoryView";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map(({ slug }) => ({ auth: slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ auth: string }> }) {
  const { auth: slug } = await params;
  const categories = getCategories();
  const products = getProducts();
  const cat = categories.find((category) => category.slug === slug);
  if (!cat) notFound();
  const items = products.filter((product) => product.category === slug);
  return (
    <>
      <div className="mb-7 border-b market-rule pb-5">
        <p className="market-kicker text-sm font-semibold text-secondary">পণ্যের বিভাগ</p>
        <h1 className="mt-1 text-3xl font-bold">{cat.nameBn}</h1>
      </div>
      {items.length ? <CategoryView items={items} /> : <p className="opacity-70">এই বিভাগে এখনো কোনো পণ্য নেই।</p>}
    </>
  );
}
