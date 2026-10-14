export type Product = {
  id: number; slug: string; nameBn: string; category: string; categoryNameBn: string;
  unit: string; today: number; yesterday: number; lastWeek?: number; lastMonth?: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
};
export type ProductInput = Omit<Product, "change"> & { change?: Product["change"] };
export type Market = { market: string; division: string; min: number; max: number };
export type Category = { id: number | string; slug: string; nameBn: string };
