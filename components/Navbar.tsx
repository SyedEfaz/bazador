import Link from "next/link";
import { getCategories } from "@/lib/api";
import { bnDate } from "@/lib/bn";
import CategoryLinks from "./CategoryLinks";
import AuthActions from "./AuthActions";

export default async function Navbar() {
  const cats = await getCategories();
  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="market-shell flex items-center justify-between gap-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <Link href="/" aria-label="বাজার দর হোম" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-lg text-primary-content shadow-sm">
            🧺
          </Link>
          <div className="min-w-0">
            <Link href="/" className="block text-lg font-bold leading-tight text-neutral">বাজার দর</Link>
            <p className="truncate text-[11px] leading-tight opacity-65">{bnDate()} <span aria-hidden="true">·</span> বাংলাদেশের বাজার</p>
          </div>
        </div>
        <AuthActions />
      </div>
      <nav aria-label="পণ্যের বিভাগ" className="market-shell market-nav-scroll overflow-x-auto pb-2">
        <CategoryLinks cats={cats} />
      </nav>
    </header>
  );
}
