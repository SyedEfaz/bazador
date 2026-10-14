import type { Category, Market, Product } from "./types";
const BASES = ["https://api.api-store.workers.dev/api/bazardor", "https://api.abcz.workers.dev/api/bazardor"];

async function get<T>(path: string): Promise<T> {
  let lastErr: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error(`${res.status} ${base}${path}`);
      return (await res.json()) as T;
    } catch (e) { lastErr = e; }
  }
  throw lastErr;
}
const list = <T,>(x: any): T[] => (Array.isArray(x) ? x : x?.data ?? x?.items ?? []);

export function withChange(p: Product): Product {
  const base = p.yesterday || p.today;
  const pct = base ? ((p.today - base) / base) * 100 : 0;
  const dir = Math.abs(pct) < 0.05 ? "flat" : pct > 0 ? "up" : "down";
  return { ...p, change: { dir, pct: Math.abs(+pct.toFixed(1)) } };
}
export async function getProducts(): Promise<Product[]> {
  try { return list<Product>(await get("/products")).map(withChange); } catch { return []; }
}
export async function getCategories(): Promise<Category[]> {
  try { return list<Category>(await get("/categories")); } catch { return []; }
}
export async function getProduct(slug: string): Promise<(Product & { markets: Market[] }) | null> {
  const all = await getProducts();
  const found = all.find((p) => p.slug === slug);
  if (!found) return null;
  try {
    const full = await get<Product & { markets: Market[] }>(`/products/${found.id}`);
    return { ...withChange(full), markets: full.markets ?? [] };
  } catch { return { ...found, markets: [] }; }
}
