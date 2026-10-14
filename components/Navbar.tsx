"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/market-data";
import type { Category } from "@/lib/types";
import CategoryLinks from "./CategoryLinks";
import AuthActions from "./AuthActions";

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);
  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="market-shell flex items-center justify-between gap-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="min-w-0">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold leading-tight text-neutral">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-content" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 9h16l-1.4 10H5.4L4 9Z" />
                  <path d="M8 9a4 4 0 0 1 8 0M8 13v2m4-2v2m4-2v2" />
                </svg>
              </span>
              <span>বাজার দর</span>
            </Link>
            <p className="truncate text-[11px] leading-tight opacity-65">বাংলাদেশের বাজার · ডেমো মূল্য</p>
          </div>
        </div>
        <AuthActions />
      </div>
      <nav aria-label="পণ্যের বিভাগ" className="market-shell market-nav-scroll overflow-x-auto pb-2">
        <CategoryLinks cats={categories} />
      </nav>
    </header>
  );
}
