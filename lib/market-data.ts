import type { Category, Market, Product, ProductInput } from "./types";

const API_BASE_URL = (process.env.NEXT_PUBLIC_BAZARDOR_API_URL || "https://openapi.programming-hero.com/api/bazardor").replace(/\/$/, "");

async function getData<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`BazarDor API request failed (${response.status}): ${path}`);
  }

  const payload: unknown = await response.json();
  // The API normally returns an array directly. Accept a `data` wrapper too,
  // so a response envelope does not break the pages.
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

function withChange(product: ProductInput): Product {
  if (product.change) return product as Product;
  const baseline = product.yesterday || product.today;
  const percent = baseline ? ((product.today - baseline) / baseline) * 100 : 0;
  return {
    ...product,
    change: {
      dir: Math.abs(percent) < 0.05 ? "flat" : percent > 0 ? "up" : "down",
      pct: Math.abs(Number(percent.toFixed(1))),
    },
  };
}

export async function getCategories(): Promise<Category[]> {
  return getData<Category[]>("/categories");
}

export async function getProducts(): Promise<Product[]> {
  const products = await getData<Array<ProductInput & { markets?: Market[] }>>("/products");
  return products.map(withChange);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getData<Array<ProductInput & { markets?: Market[] }>>(
    `/products?category=${encodeURIComponent(category)}`,
  );
  return products.map(withChange);
}

export async function getProduct(slug: string): Promise<(Product & { markets: Market[] }) | null> {
  const products = await getData<Array<ProductInput & { markets?: Market[] }>>("/products");
  const match = products.find((item) => item.slug === slug);
  if (!match) return null;

  const product = await getData<ProductInput & { markets?: Market[] }>(`/products/${match.id}`);
  return { ...withChange(product), markets: product.markets ?? match.markets ?? [] };
}
