import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/market-data";
import AuthenticatedProduct from "@/components/AuthenticatedProduct";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().map(({ slug }) => ({ auth: slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ auth: string }> }) {
  const { auth } = await params;
  const p = getProduct(auth);
  if (!p) notFound();
  return <AuthenticatedProduct product={p} />;
}
