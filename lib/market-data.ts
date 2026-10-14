import type { Category, Market, Product, ProductInput } from "./types";

const categories: Category[] = [
  { id: "rice", slug: "rice", nameBn: "চাল" },
  { id: "lentils", slug: "lentils", nameBn: "ডাল" },
  { id: "oil", slug: "oil", nameBn: "তেল" },
  { id: "vegetables", slug: "vegetables", nameBn: "সবজি" },
  { id: "fish", slug: "fish", nameBn: "মাছ" },
  { id: "meat", slug: "meat", nameBn: "মাংস" },
  { id: "eggs", slug: "eggs", nameBn: "ডিম" },
];

const products: Array<ProductInput & { markets: Market[] }> = [
  { id: 1, slug: "miniket-rice", nameBn: "মিনিকেট চাল", category: "rice", categoryNameBn: "চাল", unit: "kg", today: 75, yesterday: 72, lastWeek: 70, lastMonth: 68, markets: [{ market: "কারওয়ান বাজার", division: "ঢাকা", min: 72, max: 78 }, { market: "রিয়াজউদ্দিন বাজার", division: "চট্টগ্রাম", min: 73, max: 79 }] },
  { id: 2, slug: "coarse-rice", nameBn: "মোটা চাল", category: "rice", categoryNameBn: "চাল", unit: "kg", today: 58, yesterday: 60, lastWeek: 62, lastMonth: 64, markets: [{ market: "কারওয়ান বাজার", division: "ঢাকা", min: 56, max: 60 }, { market: "নিউ মার্কেট", division: "চট্টগ্রাম", min: 57, max: 61 }] },
  { id: 3, slug: "masoor-dal", nameBn: "মসুর ডাল", category: "lentils", categoryNameBn: "ডাল", unit: "kg", today: 130, yesterday: 128, markets: [{ market: "কারওয়ান বাজার", division: "ঢাকা", min: 125, max: 135 }, { market: "খাতুনগঞ্জ", division: "চট্টগ্রাম", min: 126, max: 134 }] },
  { id: 4, slug: "soybean-oil", nameBn: "সয়াবিন তেল", category: "oil", categoryNameBn: "তেল", unit: "litre", today: 172, yesterday: 175, markets: [{ market: "কারওয়ান বাজার", division: "ঢাকা", min: 168, max: 176 }, { market: "রিয়াজউদ্দিন বাজার", division: "চট্টগ্রাম", min: 169, max: 177 }] },
  { id: 5, slug: "potato", nameBn: "আলু", category: "vegetables", categoryNameBn: "সবজি", unit: "kg", today: 45, yesterday: 42, markets: [{ market: "কারওয়ান বাজার", division: "ঢাকা", min: 42, max: 48 }, { market: "নিউ মার্কেট", division: "চট্টগ্রাম", min: 43, max: 49 }] },
  { id: 6, slug: "onion", nameBn: "পেঁয়াজ", category: "vegetables", categoryNameBn: "সবজি", unit: "kg", today: 80, yesterday: 84, markets: [{ market: "কারওয়ান বাজার", division: "ঢাকা", min: 76, max: 84 }, { market: "খাতুনগঞ্জ", division: "চট্টগ্রাম", min: 77, max: 85 }] },
  { id: 7, slug: "tomato", nameBn: "টমেটো", category: "vegetables", categoryNameBn: "সবজি", unit: "kg", today: 60, yesterday: 55, markets: [{ market: "কারওয়ান বাজার", division: "ঢাকা", min: 55, max: 65 }, { market: "নিউ মার্কেট", division: "চট্টগ্রাম", min: 56, max: 66 }] },
  { id: 8, slug: "tilapia", nameBn: "তেলাপিয়া মাছ", category: "fish", categoryNameBn: "মাছ", unit: "kg", today: 220, yesterday: 225, markets: [{ market: "কারওয়ান বাজার", division: "ঢাকা", min: 210, max: 230 }, { market: "রিয়াজউদ্দিন বাজার", division: "চট্টগ্রাম", min: 215, max: 235 }] },
  { id: 9, slug: "ruhi", nameBn: "রুই মাছ", category: "fish", categoryNameBn: "মাছ", unit: "kg", today: 380, yesterday: 370, markets: [{ market: "কারওয়ান বাজার", division: "ঢাকা", min: 360, max: 400 }, { market: "খাতুনগঞ্জ", division: "চট্টগ্রাম", min: 365, max: 405 }] },
  { id: 10, slug: "broiler-chicken", nameBn: "ব্রয়লার মুরগি", category: "meat", categoryNameBn: "মাংস", unit: "kg", today: 205, yesterday: 210, markets: [{ market: "কারওয়ান বাজার", division: "ঢাকা", min: 195, max: 210 }, { market: "নিউ মার্কেট", division: "চট্টগ্রাম", min: 198, max: 212 }] },
  { id: 11, slug: "beef", nameBn: "গরুর মাংস", category: "meat", categoryNameBn: "মাংস", unit: "kg", today: 780, yesterday: 780, markets: [{ market: "কারওয়ান বাজার", division: "ঢাকা", min: 760, max: 800 }, { market: "রিয়াজউদ্দিন বাজার", division: "চট্টগ্রাম", min: 765, max: 805 }] },
  { id: 12, slug: "eggs-dozen", nameBn: "ডিম", category: "eggs", categoryNameBn: "ডিম", unit: "dozen", today: 150, yesterday: 145, markets: [{ market: "কারওয়ান বাজার", division: "ঢাকা", min: 144, max: 156 }, { market: "নিউ মার্কেট", division: "চট্টগ্রাম", min: 145, max: 157 }] },
];

function withChange(product: ProductInput): Product {
  const baseline = product.yesterday || product.today;
  const percentage = baseline ? ((product.today - baseline) / baseline) * 100 : 0;
  const direction = Math.abs(percentage) < 0.05 ? "flat" : percentage > 0 ? "up" : "down";
  return { ...product, change: { dir: direction, pct: Math.abs(Number(percentage.toFixed(1))) } };
}

export function getCategories(): Category[] {
  return categories;
}

export function getProducts(): Product[] {
  return products.map(withChange);
}

export function getProduct(slug: string): (Product & { markets: Market[] }) | null {
  const product = products.find((item) => item.slug === slug);
  return product ? { ...withChange(product), markets: product.markets } : null;
}
