import Link from "next/link";
import { getCategories } from "@/lib/api";
import { bnDate } from "@/lib/bn";
import CategoryLinks from "./CategoryLinks";
import AuthActions from "./AuthActions";

export default async function Navbar() {
  const cats = await getCategories();
  return (
    <header className="bg-base-100/95 border-b border-base-300 sticky top-0 z-40 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <Link href="/" className="text-xl sm:text-2xl font-bold text-primary">বাজার দর</Link>
          <p className="text-xs opacity-70">{bnDate()} <span aria-hidden="true">·</span> বাংলাদেশের বাজার</p>
        </div>
        <AuthActions />
      </div>
      <nav aria-label="পণ্যের বিভাগ" className="max-w-6xl mx-auto px-4 pb-2 overflow-x-auto"><CategoryLinks cats={cats} /></nav>
    </header>
  );
}
